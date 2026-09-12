import html2pdf from 'html2pdf.js';
import { defaultTourEquipment } from '../pages/TourTripDetail';

/**
 * Converts any image URL (local asset, CORS-enabled CDN, or external domain)
 * into a Base64 Data URL so html2canvas renders it cleanly without blank spaces or canvas errors.
 * Includes a strict 2-second timeout per image so external network issues never freeze PDF downloads.
 */
export const urlToBase64 = (rawUrl) => {
  if (!rawUrl) return Promise.resolve(null);

  const url = typeof rawUrl === 'string' ? rawUrl : (rawUrl?.url || rawUrl?.src || rawUrl?.path || '');
  if (!url || typeof url !== 'string') return Promise.resolve(null);
  if (url.startsWith('data:')) return Promise.resolve(url);

  return new Promise((resolve) => {
    let resolved = false;
    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(null);
      }
    }, 2000);

    const safeResolve = (val) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        resolve(val);
      }
    };

    const srcUrl = url.startsWith('/') ? `${window.location.origin}${url}` : url;

    fetch(srcUrl, { mode: 'cors' })
      .then((res) => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.blob();
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result && typeof reader.result === 'string' && reader.result.startsWith('data:image')) {
            safeResolve(reader.result);
          } else {
            tryCanvasFallback(srcUrl, safeResolve);
          }
        };
        reader.onerror = () => tryCanvasFallback(srcUrl, safeResolve);
        reader.readAsDataURL(blob);
      })
      .catch(() => {
        tryCanvasFallback(srcUrl, safeResolve);
      });
  });
};

const tryCanvasFallback = (url, resolve) => {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width || 600;
      canvas.height = img.naturalHeight || img.height || 400;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      if (dataUrl && dataUrl.startsWith('data:image')) {
        resolve(dataUrl);
      } else {
        resolve(null);
      }
    } catch (e) {
      resolve(null);
    }
  };
  img.onerror = () => {
    resolve(null);
  };
  img.src = url;
};

/**
 * Generates and triggers download of a high-quality PDF for any Trek, Package, or Tour.
 */
export const generatePackagePDF = async (item) => {
  if (!item) return;

  try {
    const getImgString = (img) => {
      if (!img) return null;
      if (typeof img === 'string') return img;
      if (typeof img === 'object') return img.url || img.src || img.path || null;
      return null;
    };

    // 1. Fetch & convert logo and key images to Base64 Data URLs (with timeouts)
    const logoBase64 = await urlToBase64('/logo.jpg');
    
    const rawMainImg = item.image || item.banner || (Array.isArray(item.gallery) && item.gallery[0]);
    const mainImgUrl = getImgString(rawMainImg);
    const coverImageBase64 = mainImgUrl ? await urlToBase64(mainImgUrl) : null;
    
    const galleryUrls = (item.gallery || [])
      .map(getImgString)
      .filter(g => g && g !== mainImgUrl)
      .slice(0, 6);
    const galleryBase64ListRaw = await Promise.all(galleryUrls.map(url => urlToBase64(url)));
    const galleryBase64List = galleryBase64ListRaw.filter(img => img && typeof img === 'string' && img.startsWith('data:image'));

    const routeMapUrl = getImgString(item.routeMap);
    const routeMapBase64 = routeMapUrl ? await urlToBase64(routeMapUrl) : null;

    // Process day images if present
    const itinerary = item.itinerary || [];
    const processedItinerary = await Promise.all(
      itinerary.map(async (day) => {
        const dayImg = getImgString(day.image || day.img);
        const dayImgBase64 = dayImg ? await urlToBase64(dayImg) : null;
        return { 
          ...day, 
          dayImgBase64: (dayImgBase64 && typeof dayImgBase64 === 'string' && dayImgBase64.startsWith('data:image')) ? dayImgBase64 : null 
        };
      })
    );

    // 2. Prepare HTML Container and attach to DOM (required for html2canvas in production)
    const element = document.createElement('div');
    element.id = 'pdf-itinerary-export-container';
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.left = '0';
    element.style.width = '794px';
    element.style.zIndex = '-99999';
    element.style.padding = '30px 25px';
    element.style.fontFamily = "'Inter', 'Helvetica Neue', Arial, sans-serif";
    element.style.color = '#1e293b';
    element.style.backgroundColor = '#ffffff';
    element.style.boxSizing = 'border-box';
    document.body.appendChild(element);

    // --- HEADER BRANDING WITH LOGO ---
    const validLogo = logoBase64 && typeof logoBase64 === 'string' && logoBase64.startsWith('data:image') ? logoBase64 : null;
    const headerHtml = `
      <div style="border-bottom: 2.5px solid #e53a24; padding-bottom: 14px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          ${validLogo ? `<img src="${validLogo}" alt="Zenex Logo" style="height: 48px; width: auto; object-fit: contain; border-radius: 6px;" />` : ''}
          <div>
            <h1 style="color: #1e3a8a; margin: 0; font-size: 20px; font-weight: 800;">Zenex Travels and Tours</h1>
            <p style="color: #e53a24; margin: 2px 0 0 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Himalayan Tours & Trekking Experts</p>
          </div>
        </div>
        <div style="text-align: right; font-size: 10.5px; color: #475569; line-height: 1.4;">
          <p style="margin: 0; font-weight: 700; color: #0f172a;">zenextravels.com</p>
          <p style="margin: 1px 0 0 0;">Phone: +977 9767476521</p>
          <p style="margin: 1px 0 0 0;">Email: info@zenextravels.com</p>
        </div>
      </div>
    `;

    // --- TRIP TITLE & SUBTITLE ---
    const title = item.title || 'Trekking & Tour Package';
    const category = item.category || item.region || item.destination || 'Nepal Tours';
    const duration = item.duration || (item.quickFacts && item.quickFacts.duration) || 'N/A';
    const priceStr = item.price ? String(item.price) : '';
    const price = priceStr ? (priceStr.startsWith('US') ? priceStr : `US$${priceStr.replace(/[^0-9.]/g, '')}`) : 'Inquire for price';

    const tripTitleHtml = `
      <div style="margin-bottom: 18px;">
        <div style="display: inline-block; background-color: #e53a24; color: #ffffff; padding: 3px 10px; border-radius: 16px; font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 6px;">${category}</div>
        <h2 style="color: #0f172a; font-size: 22px; margin: 0 0 6px 0; font-weight: 800; line-height: 1.2;">${title}</h2>
        <p style="color: #64748b; font-size: 12px; margin: 0; font-weight: 600;">
          Duration: <span style="color: #0f172a;">${duration}</span> &nbsp;|&nbsp; Price: <span style="color: #10b981; font-weight: 700;">${price}</span>
        </p>
      </div>
    `;

    // --- COVER FEATURED IMAGE ---
    const validCover = coverImageBase64 && typeof coverImageBase64 === 'string' && coverImageBase64.startsWith('data:image') ? coverImageBase64 : null;
    const coverHtml = validCover ? `
      <div style="margin-bottom: 20px; border-radius: 10px; overflow: hidden; max-height: 250px; width: 100%; border: 1px solid #e2e8f0; background-color: #f8fafc;">
        <img src="${validCover}" alt="${title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 10px; display: block;" />
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
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; page-break-inside: avoid;">
        <h3 style="color: #1e3a8a; margin: 0 0 8px 0; font-size: 13px; font-weight: 700; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Trip Facts & Quick Info</h3>
        <table style="width: 100%; font-size: 11px; border-collapse: collapse;">
          ${factsEntries.reduce((acc, curr, idx, arr) => {
            if (idx % 2 === 0) {
              const next = arr[idx + 1];
              acc.push(`
                <tr>
                  <td style="padding: 4px 0; font-weight: 700; color: #475569; width: 22%;">${curr[0]}:</td>
                  <td style="padding: 4px 0; color: #0f172a; font-weight: 600; width: 28%;">${curr[1]}</td>
                  ${next ? `
                    <td style="padding: 4px 0; font-weight: 700; color: #475569; width: 22%;">${next[0]}:</td>
                    <td style="padding: 4px 0; color: #0f172a; font-weight: 600; width: 28%;">${next[1]}</td>
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
    const cleanDescription = (typeof descriptionText === 'string' ? descriptionText : '')
      .replace(/<div[^>]*>.*?<\/div>/gs, '')
      .replace(/<img[^>]*>/g, '')
      .replace(/### (.*?)\n/g, '<h4 style="color:#1e3a8a;margin-top:8px;margin-bottom:4px;font-size:12px;">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    const overviewHtml = cleanDescription ? `
      <div style="margin-bottom: 20px; page-break-inside: avoid;">
        <h3 style="color: #1e3a8a; font-size: 14px; font-weight: 700; margin: 0 0 8px 0; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px;">Trip Overview</h3>
        <div style="font-size: 11.5px; line-height: 1.5; color: #334155; margin: 0; text-align: justify;">${cleanDescription}</div>
      </div>
    ` : '';

    // --- HIGHLIGHTS ---
    const highlights = item.highlights || [];
    const highlightsHtml = highlights.length > 0 ? `
      <div style="margin-bottom: 20px; page-break-inside: avoid;">
        <h3 style="color: #1e3a8a; font-size: 14px; font-weight: 700; margin: 0 0 8px 0; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px;">Major Highlights</h3>
        <ul style="margin: 0; padding-left: 18px; font-size: 11px; color: #334155; line-height: 1.5;">
          ${highlights.map(h => `<li style="margin-bottom: 3px;">${typeof h === 'object' ? (h.title || h.text || '') : h}</li>`).join('')}
        </ul>
      </div>
    ` : '';

    // --- TRIP GALLERY IMAGES ---
    const galleryHtml = galleryBase64List.length > 0 ? `
      <div style="margin-bottom: 20px; page-break-inside: avoid;">
        <h3 style="color: #1e3a8a; font-size: 14px; font-weight: 700; margin: 0 0 8px 0; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px;">Photo Gallery</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-start;">
          ${galleryBase64List.map(imgSrc => `
            <div style="width: 31%; height: 90px; border-radius: 6px; overflow: hidden; border: 1px solid #cbd5e1;">
              <img src="${imgSrc}" alt="Gallery Image" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    // --- ROUTE MAP IMAGE ---
    const validRouteMap = routeMapBase64 && typeof routeMapBase64 === 'string' && routeMapBase64.startsWith('data:image') ? routeMapBase64 : null;
    const routeMapHtml = validRouteMap ? `
      <div style="margin-bottom: 20px; page-break-inside: avoid;">
        <h3 style="color: #1e3a8a; font-size: 14px; font-weight: 700; margin: 0 0 8px 0; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px;">Route Map</h3>
        <div style="border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; text-align: center; padding: 4px; background-color: #f8fafc;">
          <img src="${validRouteMap}" alt="Route Map" style="max-width: 100%; height: auto; max-height: 240px; object-fit: contain; border-radius: 6px;" />
        </div>
      </div>
    ` : '';

    // --- OUTLINE ITINERARY TABLE ---
    const outlineItineraryHtml = processedItinerary.length > 0 ? `
      <div style="margin-bottom: 20px; page-break-inside: avoid;">
        <h3 style="color: #1e3a8a; font-size: 14px; font-weight: 700; margin: 0 0 8px 0; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px;">Outline Itinerary</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 10.5px;">
          <thead>
            <tr style="background-color: #0f172a; color: #ffffff;">
              <th style="padding: 6px 8px; text-align: left; width: 45%; border-radius: 4px 0 0 0;">Day & Title</th>
              <th style="padding: 6px 8px; text-align: left; width: 25%;">Max Altitude</th>
              <th style="padding: 6px 8px; text-align: left; width: 30%; border-radius: 0 4px 0 0;">Activity / Accommodation</th>
            </tr>
          </thead>
          <tbody>
            ${processedItinerary.map((day, idx) => {
              let dayNumStr = day.dayNumber || (idx + 1);
              let dayLabel = day.day ? String(day.day).trim() : `Day ${String(dayNumStr).padStart(2, '0')}`;
              if (/^D\s+Day/i.test(dayLabel)) dayLabel = dayLabel.replace(/^D\s+/i, '');
              const bg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
              return `
                <tr style="background-color: ${bg}; border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 5px 8px; font-weight: 700; color: #0f172a;">${dayLabel}: ${day.title || ''}</td>
                  <td style="padding: 5px 8px; color: #475569;">${day.maxAltitude || '-'}</td>
                  <td style="padding: 5px 8px; color: #475569;">${day.overnight || day.accommodation || day.activity || '-'}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    ` : '';

    // --- DETAILED DAY-BY-DAY ITINERARY ---
    const detailedItineraryHtml = processedItinerary.length > 0 ? `
      <div style="page-break-before: always; margin-top: 10px;">
        <h3 style="color: #1e3a8a; font-size: 15px; font-weight: 800; margin: 0 0 12px 0; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Detailed Day-by-Day Itinerary</h3>
        ${processedItinerary.map((day, idx) => {
          let dayNumStr = day.dayNumber || (idx + 1);
          const dayDesc = typeof (day.description || day.desc || day.details || '') === 'string' ? (day.description || day.desc || day.details || '') : '';
          return `
            <div style="margin-bottom: 14px; border-left: 3px solid #10b981; padding-left: 10px; page-break-inside: avoid;">
              <h4 style="margin: 0 0 3px 0; color: #0f172a; font-size: 12.5px; font-weight: 700;">Day ${dayNumStr}: ${day.title || ''}</h4>
              ${day.maxAltitude ? `<p style="margin: 0 0 3px 0; font-size: 10px; color: #64748b; font-weight: 600;">Max Altitude: ${day.maxAltitude}</p>` : ''}
              <p style="margin: 0; font-size: 11px; line-height: 1.45; color: #334155; text-align: justify;">${dayDesc}</p>
              ${day.dayImgBase64 ? `
                <div style="margin-top: 6px; border-radius: 6px; overflow: hidden; max-height: 120px; border: 1px solid #e2e8f0;">
                  <img src="${day.dayImgBase64}" alt="Day ${dayNumStr}" style="width: 100%; height: 120px; object-fit: cover;" />
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
      <div style="page-break-before: always; margin-top: 10px;">
        <h3 style="color: #1e3a8a; font-size: 15px; font-weight: 800; margin: 0 0 12px 0; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Cost Details</h3>
        <table style="width: 100%; border-collapse: collapse; page-break-inside: avoid;">
          <tr>
            <td style="width: 50%; vertical-align: top; padding-right: 8px;">
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px;">
                <h4 style="color: #15803d; font-size: 12px; font-weight: 700; margin: 0 0 6px 0;">✓ What's Included</h4>
                <ul style="margin: 0; padding-left: 14px; font-size: 10.5px; color: #166534; line-height: 1.45;">
                  ${includes.map(inc => `<li style="margin-bottom: 2px;">${typeof inc === 'object' ? (inc.title || inc.text || '') : inc}</li>`).join('')}
                </ul>
              </div>
            </td>
            <td style="width: 50%; vertical-align: top; padding-left: 8px;">
              <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px;">
                <h4 style="color: #b91c1c; font-size: 12px; font-weight: 700; margin: 0 0 6px 0;">✕ What's Excluded</h4>
                <ul style="margin: 0; padding-left: 14px; font-size: 10.5px; color: #991b1b; line-height: 1.45;">
                  ${excludes.map(exc => `<li style="margin-bottom: 2px;">${typeof exc === 'object' ? (exc.title || exc.text || '') : exc}</li>`).join('')}
                </ul>
              </div>
            </td>
          </tr>
        </table>
      </div>
    ` : '';

    // --- ESSENTIAL INFORMATION, EQUIPMENT & FAQS ---
    const essential = item.essentialInfo || item.usefulInfo || item.information;
    const gearRaw = item.equipment || item.packingList || item.equipmentList;
    const gear = (gearRaw && (Array.isArray(gearRaw) ? gearRaw.length > 0 : true)) ? gearRaw : defaultTourEquipment;
    const faqs = item.faqs || [];

    let extraInfoHtml = '';
    if (essential || gear || (faqs && faqs.length > 0)) {
      let content = '';

      // Render Essential Info
      if (essential) {
        let essentialHtml = '';
        if (Array.isArray(essential)) {
          essentialHtml = essential.map(info => {
            if (typeof info === 'string') {
              return `<p style="margin:4px 0;">${info.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
            }
            const infoTitle = info.title || '';
            const infoContent = (typeof (info.content || info.details || '') === 'string' ? (info.content || info.details || '') : '')
              .replace(/### (.*?)\n/g, '<h5 style="color:#0f766e;margin:6px 0 2px 0;font-size:11px;">$1</h5>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n/g, '<br/>');
            return `
              <div style="margin-bottom: 8px; background-color: #fffbebf5; border: 1px solid #fef3c7; border-radius: 6px; padding: 8px 10px;">
                <strong style="color: #b45309; font-size: 11.5px; display: block; margin-bottom: 3px;">${infoTitle}</strong>
                <div style="font-size: 10px; color: #451a03; line-height: 1.45;">${infoContent}</div>
              </div>
            `;
          }).join('');
        } else if (typeof essential === 'string') {
          essentialHtml = essential.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');
        }
        content += `<h4 style="color:#1e3a8a;margin-top:10px;margin-bottom:6px;font-size:12.5px;font-weight:700;">Essential Information</h4>${essentialHtml}`;
      }

      // Render Equipment / Packing List
      if (gear) {
        let gearHtml = '';
        if (Array.isArray(gear)) {
          gearHtml = gear.map(cat => {
            if (typeof cat === 'string') {
              return `<li style="margin-bottom:2px;">${cat}</li>`;
            }
            if (cat && (cat.category || cat.items)) {
              const categoryName = cat.category || 'Gear Checklist';
              const itemsList = (cat.items || []).map(it => {
                if (typeof it === 'string') return `<li style="margin-bottom:2px;">${it}</li>`;
                const isRequired = it.required !== false;
                const reqBadge = isRequired ? '<span style="color:#0f766e;font-weight:bold;">[✓ Required]</span> ' : '<span style="color:#64748b;">[Optional]</span> ';
                const itemName = it.name || '';
                const itemDesc = it.description ? ` (${it.description})` : '';
                const qtyStr = it.quantity > 1 ? ` (x${it.quantity})` : '';
                return `<li style="margin-bottom:2px;">${reqBadge}<strong>${itemName}</strong>${qtyStr}${itemDesc}</li>`;
              }).join('');
              return `
                <div style="margin-bottom: 8px; background-color: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 6px; padding: 8px 10px;">
                  <strong style="color: #0f766e; font-size: 11.5px; display: block; margin-bottom: 3px;">${categoryName}</strong>
                  <ul style="margin: 0; padding-left: 14px; font-size: 10px; color: #134e4a; line-height: 1.45;">${itemsList}</ul>
                </div>
              `;
            }
            return '';
          }).join('');
          if (gearHtml.startsWith('<li')) {
            gearHtml = `<ul style="padding-left:14px;margin:3px 0;font-size:10px;">${gearHtml}</ul>`;
          }
        } else if (typeof gear === 'string') {
          gearHtml = gear.replace(/\n/g, '<br/>');
        }
        content += `<h4 style="color:#1e3a8a;margin-top:10px;margin-bottom:6px;font-size:12.5px;font-weight:700;">Packing & Equipment List</h4>${gearHtml}`;
      }

      // Render FAQs
      if (faqs && faqs.length > 0) {
        content += `<h4 style="color:#1e3a8a;margin-top:12px;margin-bottom:6px;font-size:12.5px;font-weight:700;">Frequently Asked Questions</h4>`;
        faqs.forEach(faq => {
          content += `
            <div style="margin-bottom: 6px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 10px;">
              <strong style="font-size:11px;color:#0f172a;display:block;margin-bottom:2px;">Q: ${faq.question || faq.title || ''}</strong>
              <p style="margin:0;font-size:10.5px;color:#475569;line-height:1.4;">${faq.answer || faq.desc || ''}</p>
            </div>
          `;
        });
      }

      extraInfoHtml = `
        <div style="margin-top: 18px; page-break-inside: avoid;">
          <h3 style="color: #1e3a8a; font-size: 14px; font-weight: 700; margin: 0 0 8px 0; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px;">Essential Details, Equipment & FAQs</h3>
          ${content}
        </div>
      `;
    }

    // --- FOOTER BRANDING ---
    const footerHtml = `
      <div style="margin-top: 25px; border-top: 1px dashed #cbd5e1; padding-top: 12px; text-align: center; font-size: 10px; color: #64748b; page-break-inside: avoid;">
        <p style="margin: 0; font-weight: 600;">Thank you for choosing Zenex Travels and Tours. Himalayan Tours & Trekking Experts.</p>
        <p style="margin: 3px 0 0 0;">For bookings, customizations & inquiries: <strong>+977 9767476521</strong> | <strong>info@zenextravels.com</strong> | <strong>zenextravels.com</strong></p>
        <p style="margin: 3px 0 0 0; color: #94a3b8; font-size: 9px;">© ${new Date().getFullYear()} Zenex Travels and Tours. All Rights Reserved.</p>
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
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        onclone: (clonedDoc) => {
          // Remove document stylesheets in clonedDoc to prevent html2canvas from crashing on unsupported modern CSS features like Tailwind v4 oklch(...) colors.
          // The PDF container element uses 100% self-contained inline CSS styles.
          const stylesheets = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
          stylesheets.forEach(s => {
            try { s.remove(); } catch (e) {}
          });

          // Reset cloned element positioning from offscreen (-9999px) to (0, 0) inside cloned document
          const clonedEl = clonedDoc.getElementById('pdf-itinerary-export-container');
          if (clonedEl) {
            clonedEl.style.position = 'static';
            clonedEl.style.left = '0';
            clonedEl.style.top = '0';
            clonedEl.style.zIndex = '1';
            clonedEl.style.opacity = '1';
            clonedEl.style.visibility = 'visible';
          }
        }
      },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['css', 'legacy'] }
    };

    const getHtml2Pdf = () => {
      if (typeof html2pdf === 'function') return html2pdf;
      if (html2pdf && typeof html2pdf.default === 'function') return html2pdf.default;
      if (typeof window !== 'undefined' && typeof window.html2pdf === 'function') return window.html2pdf;
      return html2pdf;
    };

    try {
      const html2pdfLib = getHtml2Pdf();
      if (!html2pdfLib) {
        throw new Error('html2pdf library is unavailable');
      }
      await html2pdfLib().from(element).set(opt).save();
    } finally {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  } catch (err) {
    console.error("PDF generation failed:", err);
    alert("Could not generate PDF itinerary. Please try again.");
  }
};
