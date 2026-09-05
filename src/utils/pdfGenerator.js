import html2pdf from 'html2pdf.js';

/**
 * Converts an image URL to a base64 Data URL so html2canvas renders it cleanly.
 */
export const urlToBase64 = (url) => {
  if (!url) return Promise.resolve(null);
  if (url.startsWith('data:')) return Promise.resolve(url);

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width || 600;
        canvas.height = img.naturalHeight || img.height || 400;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      } catch (err) {
        resolve(url);
      }
    };
    img.onerror = () => {
      resolve(url);
    };
    const srcUrl = url.startsWith('/') ? `${window.location.origin}${url}` : url;
    img.src = srcUrl;
  });
};

/**
 * Generates and triggers download of a high quality PDF for any Trek, Package, or Tour.
 */
export const generatePackagePDF = async (item) => {
  if (!item) return;

  // 1. Fetch & convert logo and key images to Base64 Data URLs
  const logoBase64 = await urlToBase64('/logo.jpg');
  
  const mainImgUrl = item.image || item.banner || (Array.isArray(item.gallery) && item.gallery[0]);
  const coverImageBase64 = mainImgUrl ? await urlToBase64(mainImgUrl) : null;
  
  const galleryUrls = (item.gallery || []).filter(g => g !== mainImgUrl).slice(0, 6);
  const galleryBase64List = await Promise.all(galleryUrls.map(url => urlToBase64(url)));

  const routeMapBase64 = item.routeMap ? await urlToBase64(item.routeMap) : null;

  // Process day images if present
  const itinerary = item.itinerary || [];
  const processedItinerary = await Promise.all(
    itinerary.map(async (day) => {
      const dayImg = day.image || day.img;
      const dayImgBase64 = dayImg ? await urlToBase64(dayImg) : null;
      return { ...day, dayImgBase64 };
    })
  );

  // 2. Prepare HTML Sections
  const element = document.createElement('div');
  element.style.padding = '35px 30px';
  element.style.fontFamily = "'Inter', 'Helvetica Neue', Arial, sans-serif";
  element.style.color = '#1e293b';
  element.style.backgroundColor = '#ffffff';

  // --- HEADER BRANDING WITH LOGO ---
  const headerHtml = `
    <div style="border-bottom: 2.5px solid #e53a24; padding-bottom: 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 14px;">
        ${logoBase64 ? `<img src="${logoBase64}" alt="Zenex Logo" style="height: 52px; width: auto; object-fit: contain; border-radius: 6px;" />` : ''}
        <div>
          <h1 style="color: #1e3a8a; margin: 0; font-size: 22px; font-weight: 800; tracking-tight: -0.5px;">Zenex Travels and Tours</h1>
          <p style="color: #e53a24; margin: 3px 0 0 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Himalayan Tours & Trekking Experts</p>
        </div>
      </div>
      <div style="text-align: right; font-size: 11px; color: #475569; line-height: 1.4;">
        <p style="margin: 0; font-weight: 700; color: #0f172a;">zenextravels.com</p>
        <p style="margin: 2px 0 0 0;">Phone: +977 9767476521</p>
        <p style="margin: 2px 0 0 0;">Email: info@zenextravels.com</p>
      </div>
    </div>
  `;

  // --- TRIP TITLE & SUBTITLE ---
  const title = item.title || 'Trekking Package';
  const category = item.category || item.region || item.destination || 'Trekking & Tours';
  const duration = item.duration || (item.quickFacts && item.quickFacts.duration) || 'N/A';
  const price = item.price ? (item.price.startsWith('US') ? item.price : `US$${item.price.replace(/[^0-9.]/g, '')}`) : 'Inquire for price';

  const tripTitleHtml = `
    <div style="margin-bottom: 20px;">
      <div style="display: inline-block; background-color: #e53a24; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">${category}</div>
      <h2 style="color: #0f172a; font-size: 24px; margin: 0 0 6px 0; font-weight: 800; line-height: 1.2;">${title}</h2>
      <p style="color: #64748b; font-size: 12.5px; margin: 0; font-weight: 600;">
        Duration: <span style="color: #0f172a;">${duration}</span> &nbsp;|&nbsp; Starting Price: <span style="color: #10b981; font-weight: 700;">From ${price}</span>
      </p>
    </div>
  `;

  // --- COVER FEATURED IMAGE ---
  const coverHtml = coverImageBase64 ? `
    <div style="margin-bottom: 22px; border-radius: 12px; overflow: hidden; max-height: 260px; width: 100%; border: 1px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
      <img src="${coverImageBase64}" alt="${title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 12px;" />
    </div>
  ` : '';

  // --- QUICK FACTS GRID ---
  let factsEntries = [];
  if (item.facts && typeof item.facts === 'object') {
    factsEntries = Object.entries(item.facts);
  } else if (Array.isArray(item.quickInfo)) {
    factsEntries = item.quickInfo.map(i => [i.label, i.value]);
  } else {
    const qf = item.quickFacts || {};
    if (duration) factsEntries.push(['Duration', duration]);
    if (item.difficulty || qf.difficulty) factsEntries.push(['Trip Grade', item.difficulty || qf.difficulty]);
    if (qf.maxAltitude) factsEntries.push(['Max. Altitude', qf.maxAltitude]);
    if (qf.bestSeason || qf.bestTime) factsEntries.push(['Best Season', qf.bestSeason || qf.bestTime]);
    if (qf.starts || item.starts) factsEntries.push(['Starts In', qf.starts || item.starts || 'Kathmandu']);
    if (qf.ends || item.ends) factsEntries.push(['Ends In', qf.ends || item.ends || 'Kathmandu']);
    if (qf.accommodation) factsEntries.push(['Accommodation', qf.accommodation]);
    if (qf.meals) factsEntries.push(['Meals', qf.meals]);
  }

  const factsHtml = factsEntries.length > 0 ? `
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 18px; margin-bottom: 22px; page-break-inside: avoid;">
      <h3 style="color: #1e3a8a; margin: 0 0 10px 0; font-size: 14px; font-weight: 700; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">Trip Facts & Overview</h3>
      <table style="width: 100%; font-size: 11.5px; border-collapse: collapse;">
        ${factsEntries.reduce((acc, curr, idx, arr) => {
          if (idx % 2 === 0) {
            const next = arr[idx + 1];
            acc.push(`
              <tr>
                <td style="padding: 5px 0; font-weight: 700; color: #475569; width: 22%;">${curr[0]}:</td>
                <td style="padding: 5px 0; color: #0f172a; font-weight: 600; width: 28%;">${curr[1]}</td>
                ${next ? `
                  <td style="padding: 5px 0; font-weight: 700; color: #475569; width: 22%;">${next[0]}:</td>
                  <td style="padding: 5px 0; color: #0f172a; font-weight: 600; width: 28%;">${next[1]}</td>
                ` : '<td colspan="2"></td>'}
              </tr>
            `);
          }
          return acc;
        }, []).join('')}
      </table>
    </div>
  ` : '';

  // --- OVERVIEW / DESCRIPTION ---
  const descriptionText = item.description || item.overview || item.desc || '';
  const cleanDescription = descriptionText
    .replace(/<div[^>]*>.*?<\/div>/gs, '')
    .replace(/<img[^>]*>/g, '')
    .replace(/### (.*?)\n/g, '<h4 style="color:#1e3a8a;margin-top:10px;margin-bottom:4px;font-size:13px;">$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  const overviewHtml = cleanDescription ? `
    <div style="margin-bottom: 22px; page-break-inside: avoid;">
      <h3 style="color: #1e3a8a; font-size: 15px; font-weight: 700; margin: 0 0 8px 0; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px;">Trip Overview</h3>
      <div style="font-size: 12px; line-height: 1.6; color: #334155; margin: 0; text-align: justify;">${cleanDescription}</div>
    </div>
  ` : '';

  // --- HIGHLIGHTS ---
  const highlights = item.highlights || [];
  const highlightsHtml = highlights.length > 0 ? `
    <div style="margin-bottom: 22px; page-break-inside: avoid;">
      <h3 style="color: #1e3a8a; font-size: 15px; font-weight: 700; margin: 0 0 8px 0; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px;">Major Highlights</h3>
      <ul style="margin: 0; padding-left: 18px; font-size: 11.5px; color: #334155; line-height: 1.6;">
        ${highlights.map(h => `<li style="margin-bottom: 4px;">${typeof h === 'object' ? (h.title || h.text) : h}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  // --- TRIP GALLERY IMAGES ---
  const galleryHtml = galleryBase64List.length > 0 ? `
    <div style="margin-bottom: 22px; page-break-inside: avoid;">
      <h3 style="color: #1e3a8a; font-size: 15px; font-weight: 700; margin: 0 0 10px 0; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px;">Photo Gallery</h3>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-start;">
        ${galleryBase64List.map(imgSrc => `
          <div style="width: 31%; height: 95px; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1;">
            <img src="${imgSrc}" alt="Gallery Image" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  // --- ROUTE MAP IMAGE ---
  const routeMapHtml = routeMapBase64 ? `
    <div style="margin-bottom: 22px; page-break-inside: avoid;">
      <h3 style="color: #1e3a8a; font-size: 15px; font-weight: 700; margin: 0 0 10px 0; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px;">Trek Route Map</h3>
      <div style="border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0; text-align: center; padding: 6px; background-color: #f8fafc;">
        <img src="${routeMapBase64}" alt="Route Map" style="max-width: 100%; height: auto; max-height: 260px; object-fit: contain; border-radius: 6px;" />
      </div>
    </div>
  ` : '';

  // --- OUTLINE ITINERARY TABLE ---
  const outlineItineraryHtml = processedItinerary.length > 0 ? `
    <div style="margin-bottom: 25px; page-break-inside: avoid;">
      <h3 style="color: #1e3a8a; font-size: 15px; font-weight: 700; margin: 0 0 10px 0; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px;">Outline Itinerary</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
        <thead>
          <tr style="background-color: #0f172a; color: #ffffff;">
            <th style="padding: 7px 10px; text-align: left; width: 45%; border-radius: 6px 0 0 0;">Day & Title</th>
            <th style="padding: 7px 10px; text-align: left; width: 25%;">Max Altitude</th>
            <th style="padding: 7px 10px; text-align: left; width: 30%; border-radius: 0 6px 0 0;">Activity / Accommodation</th>
          </tr>
        </thead>
        <tbody>
          ${processedItinerary.map((day, idx) => {
            let dayNumStr = day.dayNumber || (idx + 1);
            let dayLabel = day.day ? day.day.trim() : `Day ${String(dayNumStr).padStart(2, '0')}`;
            if (/^D\s+Day/i.test(dayLabel)) dayLabel = dayLabel.replace(/^D\s+/i, '');
            const bg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
            return `
              <tr style="background-color: ${bg}; border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 6px 10px; font-weight: 700; color: #0f172a;">${dayLabel}: ${day.title || ''}</td>
                <td style="padding: 6px 10px; color: #475569;">${day.maxAltitude || '-'}</td>
                <td style="padding: 6px 10px; color: #475569;">${day.overnight || day.accommodation || day.activity || '-'}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  ` : '';

  // --- DETAILED DAY-BY-DAY ITINERARY ---
  const detailedItineraryHtml = processedItinerary.length > 0 ? `
    <div style="page-break-before: always; margin-top: 15px;">
      <h3 style="color: #1e3a8a; font-size: 16px; font-weight: 800; margin: 0 0 14px 0; border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Detailed Day-by-Day Itinerary</h3>
      ${processedItinerary.map((day, idx) => {
        let dayNumStr = day.dayNumber || (idx + 1);
        const dayDesc = day.description || day.desc || day.details || '';
        return `
          <div style="margin-bottom: 16px; border-left: 3px solid #10b981; padding-left: 12px; page-break-inside: avoid;">
            <h4 style="margin: 0 0 4px 0; color: #0f172a; font-size: 13px; font-weight: 700;">Day ${dayNumStr}: ${day.title || ''}</h4>
            ${day.maxAltitude ? `<p style="margin: 0 0 4px 0; font-size: 10.5px; color: #64748b; font-weight: 600;">Max Altitude: ${day.maxAltitude}</p>` : ''}
            <p style="margin: 0; font-size: 11.5px; line-height: 1.5; color: #334155; text-align: justify;">${dayDesc}</p>
            ${day.dayImgBase64 ? `
              <div style="margin-top: 8px; border-radius: 6px; overflow: hidden; max-height: 140px; border: 1px solid #e2e8f0;">
                <img src="${day.dayImgBase64}" alt="Day ${dayNumStr}" style="width: 100%; height: 140px; object-fit: cover;" />
              </div>
            ` : ''}
          </div>
        `;
      }).join('')}
    </div>
  ` : '';

  // --- COST DETAILS (INCLUDES & EXCLUDES) ---
  const includes = item.costIncludes || item.inclusions || item.includes || [];
  const excludes = item.costExcludes || item.exclusions || item.excludes || [];

  const costDetailsHtml = (includes.length > 0 || excludes.length > 0) ? `
    <div style="page-break-before: always; margin-top: 15px;">
      <h3 style="color: #1e3a8a; font-size: 16px; font-weight: 800; margin: 0 0 14px 0; border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Cost Details</h3>
      <table style="width: 100%; border-collapse: collapse; page-break-inside: avoid;">
        <tr>
          <td style="width: 50%; vertical-align: top; padding-right: 12px;">
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 12px;">
              <h4 style="color: #15803d; font-size: 13px; font-weight: 700; margin: 0 0 8px 0;">✓ What's Included</h4>
              <ul style="margin: 0; padding-left: 16px; font-size: 11px; color: #166534; line-height: 1.5;">
                ${includes.map(inc => `<li style="margin-bottom: 3px;">${inc}</li>`).join('')}
              </ul>
            </div>
          </td>
          <td style="width: 50%; vertical-align: top; padding-left: 12px;">
            <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 12px;">
              <h4 style="color: #b91c1c; font-size: 13px; font-weight: 700; margin: 0 0 8px 0;">✕ What's Excluded</h4>
              <ul style="margin: 0; padding-left: 16px; font-size: 11px; color: #991b1b; line-height: 1.5;">
                ${excludes.map(exc => `<li style="margin-bottom: 3px;">${exc}</li>`).join('')}
              </ul>
            </div>
          </td>
        </tr>
      </table>
    </div>
  ` : '';

  // --- ESSENTIAL INFORMATION & GEAR ---
  const essential = item.essentialInfo || item.usefulInfo || item.information;
  const gear = item.equipment || item.packingList;
  const faqs = item.faqs || [];

  let extraInfoHtml = '';
  if (essential || gear || (faqs && faqs.length > 0)) {
    let content = '';
    if (essential) {
      const formattedEssential = typeof essential === 'string' ? essential.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n\n/g, '<br/>') : essential;
      content += `<h4 style="color:#1e3a8a;margin-top:10px;margin-bottom:4px;font-size:13px;font-weight:700;">Essential & Useful Information</h4><div style="font-size:11px;line-height:1.5;color:#334155;margin-bottom:12px;">${formattedEssential}</div>`;
    }
    if (gear) {
      content += `<h4 style="color:#1e3a8a;margin-top:10px;margin-bottom:4px;font-size:13px;font-weight:700;">Equipment & Packing Checklist</h4><div style="font-size:11px;line-height:1.5;color:#334155;margin-bottom:12px;">${Array.isArray(gear) ? `<ul style="padding-left:16px;margin:3px 0;">${gear.map(i => `<li>${i}</li>`).join('')}</ul>` : gear}</div>`;
    }
    if (faqs && faqs.length > 0) {
      content += `<h4 style="color:#1e3a8a;margin-top:10px;margin-bottom:6px;font-size:13px;font-weight:700;">Frequently Asked Questions</h4>`;
      faqs.forEach(faq => {
        content += `<div style="margin-bottom:8px;"><strong style="font-size:11.5px;color:#0f172a;">Q: ${faq.question || faq.title}</strong><p style="margin:2px 0 0 0;font-size:11px;color:#475569;line-height:1.4;">${faq.answer || faq.desc}</p></div>`;
      });
    }

    extraInfoHtml = `
      <div style="margin-top: 20px; page-break-inside: avoid;">
        <h3 style="color: #1e3a8a; font-size: 15px; font-weight: 700; margin: 0 0 10px 0; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px;">Important Information & FAQs</h3>
        ${content}
      </div>
    `;
  }

  // --- FOOTER BRANDING ---
  const footerHtml = `
    <div style="margin-top: 30px; border-top: 1px dashed #cbd5e1; padding-top: 14px; text-align: center; font-size: 10.5px; color: #64748b; page-break-inside: avoid;">
      <p style="margin: 0; font-weight: 600;">Thank you for choosing Zenex Travels and Tours. Himalayan Tours & Trekking Experts.</p>
      <p style="margin: 4px 0 0 0;">For bookings, customizations & inquiries: <strong>+977 9767476521</strong> | <strong>info@zenextravels.com</strong> | <strong>zenextravels.com</strong></p>
      <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 9.5px;">© ${new Date().getFullYear()} Zenex Travels and Tours. All Rights Reserved.</p>
    </div>
  `;

  // Assemble full HTML document inside invisible wrapper
  element.innerHTML = `
    ${headerHtml}
    ${tripTitleHtml}
    ${coverHtml}
    ${factsHtml}
    ${overviewHtml}
    ${highlightsHtml}
    ${galleryHtml}
    ${routeMapHtml}
    ${outlineItineraryHtml}
    ${detailedItineraryHtml}
    ${costDetailsHtml}
    ${extraInfoHtml}
    ${footerHtml}
  `;

  // Configure html2pdf options
  const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_itinerary.pdf`;
  const opt = {
    margin:       [10, 10, 12, 10],
    filename:     fileName,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { 
      scale: 2, 
      useCORS: true,
      allowTaint: true,
      logging: false,
      onclone: (clonedDoc) => {
        const styles = clonedDoc.querySelectorAll('style');
        styles.forEach(s => {
          if (s.textContent && s.textContent.includes('oklch')) {
            s.textContent = s.textContent.replace(/oklch\([^)]+\)/g, '#333333');
          }
        });
      }
    },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  await html2pdf().from(element).set(opt).save();
};
