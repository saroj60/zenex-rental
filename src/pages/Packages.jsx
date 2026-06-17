import React, { useEffect } from 'react';
import { ArrowRight, MapPin, CheckCircle2, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

export const featuredPackages = [
  {
    id: 'kathmandu-chandragiri-4d',
    title: '4 Days Kathmandu & Chandragiri Hills Tour',
    location: 'Kathmandu & Chandragiri',
    category: 'Tours',
    tripCode: 'DNTT/T/4D/07',
    price: 'US$1290',
    persons: 'for 2 Persons',
    img: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/ae/9a/f1.jpg'
  },
  {
    id: 'tibet-tour-6d',
    title: '6 Days Tibet Tour',
    location: 'Lhasa',
    category: 'Tours',
    tripCode: 'DNTT/OB/T/04',
    price: 'US$1850',
    persons: 'for 2 Persons',
    img: 'https://www.tibettravel.org/assets/images/shigatse/6-days-lhasa-to-shigatse-tour-8.jpg'
  },
  {
    id: 'kailash-16d',
    title: '16 Days Kailash Mansarovar Tour via Kerung',
    location: 'Nepal & Tibet',
    category: 'Tours',
    tripCode: 'DNTT/KT/02',
    price: 'US$4500',
    persons: 'for 2 Persons',
    img: 'https://media.app.dreamtibet.com/uploads/fullbanner/mt-kailash-manasarover-tour.webp'
  },
  {
    id: 'annapurna-11d',
    title: '11 Days Annapurna Circuit Trek',
    location: 'Kathmandu, Besishahar, Chame, Manang, Yak Kharka, Thorung-La Pass, Muktinath, Jomsom & Pokhara',
    category: 'Treks',
    tripCode: 'DNTT/ACT/11',
    price: 'US$2960',
    persons: 'for 2 Persons',
    img: 'https://himalayatrip.com/wp-content/uploads/2026/05/Thomas-team-thorong-la-pass.jpeg.webp'
  },
  {
    id: 'poon-hill-8d',
    title: '8 Days Ghorepani Poon Hill Trek',
    location: 'Kathmandu, Pokhara, Nayapul, Ghorepani, Poon Hill & Ghandruk',
    category: 'Treks',
    tripCode: 'DNTT/GPH/02',
    price: 'US$1750',
    persons: 'for 2 Persons',
    img: 'https://media.app.mysticadventureholidays.com/uploads/package/gallery/f2.webp'
  },
  {
    id: 'bhutan-6d',
    title: '6 Days Bhutan Tour',
    location: 'Nepal & Bhutan',
    category: 'Tours',
    tripCode: 'DNTT/BHT/06',
    price: 'US$3380',
    persons: 'for 2 Persons',
    img: 'https://www.nepalpackagetour.com/public/uploads/bhutan_tour/Tiger%20nest.jpg'
  },
  {
    id: 'nepal-poon-hill-12d',
    title: '12 Days Nepal Tour with Poon Hill Trek',
    location: 'Kathmandu, Chitwan, Pokhara, Ghorepani, Poon Hill & Ghandruk Village',
    category: 'Tours',
    tripCode: 'DNTT/T/12D/04',
    price: 'US$2380',
    persons: 'for 2 Persons',
    img: 'https://api.himalayantrekkers.com/api/file-upload/trips%2FMarch2021%2Fpoon-hill-trek.jpg'
  },
  {
    id: 'muktinath-yatra-8d',
    title: '8 Days Muktinath Tour (Yatra)',
    location: 'Kathmandu, Chitwan, Pokhara, Jomsom & Muktinath',
    category: 'Tours',
    tripCode: 'DNTT/T/8D/01',
    price: 'US$2090',
    persons: 'for 2 Persons',
    img: 'https://www.muktinathdarshan.com/sites/default/files/basic/Muktinath-Packages.jpg'
  },
  {
    id: 'kathmandu-tour-4d',
    title: '4 Days Kathmandu Tour',
    location: 'Kathmandu',
    category: 'Tours',
    tripCode: 'DNTT/T/4D/08',
    price: 'US$720',
    persons: 'for 2 Persons',
    img: 'https://www.attractivetravelnepal.com/wp-content/uploads/2022/09/kathmandu-tour.jpg'
  },
  {
    id: 'kathmandu-pokhara-4d',
    title: '4 Days Kathmandu & Pokhara Tour',
    location: 'Kathmandu & Pokhara',
    category: 'Tours',
    tripCode: 'DNTT/T/4D/09',
    price: 'US$815',
    persons: 'per person',
    img: 'https://trippokhara.com/uploads/beautiful%20city%20of%20nepal%20-%20Pokhara.webp'
  },
  {
    id: 'ktm-chitwan-pokhara-5d',
    title: '5 Days Kathmandu, Chitwan & Pokhara Tour',
    location: 'Kathmandu, Chitwan & Pokhara',
    category: 'Tours',
    tripCode: 'DNTT/T/5D/08',
    price: 'US$1490',
    persons: 'per person',
    img: 'https://www.easytournepal.com/admin/public/images/trip/kathmandu-pokhara-lumbini-chitwan-tour.jpg'
  },
  {
    id: 'ktm-chitwan-pokhara-lumbini-5d',
    title: '5 Days Kathmandu, Chitwan, Pokhara & Lumbini Tour',
    location: 'Kathmandu, Chitwan, Pokhara & Lumbini',
    category: 'Tours',
    tripCode: 'DNTT/T/5D/07',
    price: 'US$1785',
    persons: 'per person',
    img: 'https://www.himalayajourneys.com/assets/images/tour/kathmandu-pokhara-lumbini-tour.jpg'
  },
  {
    id: 'ktm-pokhara-muktinath-5d',
    title: '5 Days Kathmandu, Pokhara & Muktinath Tour',
    location: 'Kathmandu, Pokhara & Muktinath',
    category: 'Tours',
    tripCode: 'DNTT/T/5D/06',
    price: 'US$1265',
    persons: 'per person',
    img: 'https://cimages1.touristlink.com/data/cache/J/O/M/S/O/M/M/U/jomsom-muktinath_2_640_480.jpg'
  },
  {
    id: 'ktm-chitwan-pokhara-lumbini-6d',
    title: '6 Days Kathmandu, Chitwan, Pokhara & Lumbini Tour',
    location: 'Kathmandu, Chitwan, Pokhara & Lumbini',
    category: 'Tours',
    tripCode: 'DNTT/T/6D/07',
    price: 'US$1945',
    persons: 'per person',
    img: 'https://www.kathmandusummitadventure.com/wp-content/uploads/2023/09/chitwan-pokhara-lumbini-tour.jpg'
  },
  {
    id: 'ktm-bandipur-pokhara-6d',
    title: '6 Days Kathmandu, Bandipur & Pokhara Tour',
    location: 'Kathmandu, Bandipur & Pokhara',
    category: 'Tours',
    tripCode: 'DNTT/T/6D/06',
    price: 'US$895',
    persons: 'per person',
    img: 'https://www.himalayantrekkingpath.com/_next/image?url=https%3A%2F%2Fmedia.app.himalayantrekkingpath.com%2Fuploads%2Ffullbanner%2Fparagliding-pokhara-1.webp&w=3840&q=75&dpl=dpl_3KNdaNwCDiUgUVh4mjVZ9wigSein'
  },
  {
    id: 'ktm-pokhara-muktinath-6d',
    title: '6 Days Kathmandu, Pokhara & Muktinath Tour',
    location: 'Kathmandu, Pokhara & Muktinath',
    category: 'Tours',
    tripCode: 'DNTT/T/6D/05',
    price: 'US$1315',
    persons: 'per person',
    img: 'https://media.hikingadventuretreks.com/uploads/socialmedia/kathmandu-pokhara-bandipur-.jpg'
  },
  {
    id: 'ktm-pokhara-nagarkot-7d',
    title: '7 Days Kathmandu, Pokhara & Nagarkot tour',
    location: 'Kathmandu, Pokhara & Nagarkot',
    category: 'Tours',
    tripCode: 'DNTT/T/7D/07',
    price: 'US$1135',
    persons: 'per person',
    img: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/99/55/a1.jpg'
  },
  {
    id: 'ktm-pokhara-chitwan-7d',
    title: '7 Days Kathmandu, Pokhara & Chitwan Tour',
    location: 'Kathmandu, Pokhara & Chitwan',
    category: 'Tours',
    tripCode: 'DNTT/T/7D-04',
    price: 'US$1070',
    persons: 'per person',
    img: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/f8/0f/2b.jpg'
  },
  {
    id: 'ktm-chitwan-pokhara-7d',
    title: '7 Days Kathmandu, Chitwan & Pokhara Tour',
    location: 'Kathmandu, Chitwan & Pokhara',
    category: 'Tours',
    tripCode: 'DNTT/T/7D/02',
    price: 'US$1105',
    persons: 'per person',
    img: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/9c/eb/cf.jpg'
  },
  {
    id: 'ktm-pokhara-jomsom-muktinath-7d',
    title: '7 Day Kathmandu, Pokhara, Jomsom & Muktinath tour',
    location: 'Kathmandu, Pokhara, Jomsom & Muktinath',
    category: 'Tours',
    tripCode: 'DNTT/T/7D/04',
    price: 'US$1810',
    persons: 'for 2 Persons',
    img: 'https://cdn.pixabay.com/photo/2017/02/14/03/03/ama-dablam-2064522_1280.jpg'
  },
  {
    id: 'ktm-nagarkot-dhulikhel-7d',
    title: '7 Days Kathmandu, Nagarkot & Dhulikhel Tour',
    location: 'Kathmandu, Nagarkot & Dhulikhel',
    category: 'Tours',
    tripCode: 'DNTT/T/7D/01',
    price: 'US$1140',
    persons: 'per person',
    img: 'https://www.nestadventure.com/wp-content/uploads/2019/06/Nagarkot-Tour-Mountain-View.jpg'
  },
  {
    id: 'ktm-bandipur-pokhara-7d',
    title: '7 Days Kathmandu, Bandipur & Pokhara Tour',
    location: 'Kathmandu, Bandipur & Pokhara',
    category: 'Tours',
    tripCode: 'DNTT/T/7D/06',
    price: 'US$1045',
    persons: 'per person',
    img: 'https://www.enepaltour.com/public/images/upload/package/slider/1457243443_pokhara.jpg'
  },
  {
    id: 'ktm-chitwan-pokhara-lumbini-7d',
    title: '7 Days Kathmandu, Chitwan, Pokhara & Lumbini Tour',
    location: 'Kathmandu, Chitwan, Pokhara & Lumbini',
    category: 'Tours',
    tripCode: 'DNTT/T/7D/03',
    price: 'US$1675',
    persons: 'per person',
    img: 'https://www.nepalhimalayastrekking.com/public/uploads/caption-5.jpg'
  },
  {
    id: 'ktm-bandipur-pokhara-trek-8d',
    title: '8 Days Kathmandu, Bandipur, Pokhara Tour with Trek',
    location: 'Kathmandu, Bandipur, Pokhara',
    category: 'Tours',
    tripCode: 'DNTT/T/8D/05',
    price: 'US$1185',
    persons: 'per person',
    img: 'https://thehimalayantimes.com/uploads/imported_images/wp-content/uploads/2018/04/Bhaktapur-Durbar-Square.jpg'
  },
  {
    id: 'ktm-pokhara-chitwan-nagarkot-8d',
    title: '8 Days Kathmandu, Pokhara, Chitwan & Nagarkot Tour',
    location: 'Kathmandu, Pokhara, Chitwan, Nagarkot',
    category: 'Tours',
    tripCode: 'DNTT/T/8D/04',
    price: 'US$1275',
    persons: 'per person',
    img: 'https://newbusinessage.prixacdn.net/img/news/20211020114526_20191017121120_1571271950.jpg'
  },
  {
    id: 'ktm-pokhara-chitwan-rafting-8d',
    title: '8 Days Kathmandu, Pokhara, Chitwan Tour with Rafting',
    location: 'Kathmandu, Pokhara, Chitwan',
    category: 'Tours',
    tripCode: 'DNTT/T/8D/02',
    price: 'US$1450',
    persons: 'per person',
    img: 'https://cms.altitudehimalaya.com/media/Kathmandu/Nepal-River-Rafting-Tour.png'
  },
  {
    id: 'ktm-pokhara-muktinath-chitwan-8d',
    title: '8 Days Kathmandu, Pokhara, Muktinath & Chitwan Tour',
    location: 'Kathmandu, Pokhara, Muktinath, Chitwan',
    category: 'Tours',
    tripCode: 'DNTT/T/8D/01',
    price: 'US$1385',
    persons: 'per person',
    img: 'https://www.bestheritagetour.com/public/images/upload/package/slider/chitwan-national-park-3.jpg'
  },
  {
    id: 'ktm-pokhara-lumbini-chitwan-8d',
    title: '8 Days Kathmandu, Pokhara, Lumbini & Chitwan Tour',
    location: 'Kathmandu, Pokhara, Lumbini, Chitwan',
    category: 'Tours',
    tripCode: 'DNTT/T/8D/03',
    price: 'US$1530',
    persons: 'per person',
    img: 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'ktm-pokhara-chitwan-nagarkot-9d',
    title: '9 Days Kathmandu, Pokhara, Chitwan & Nagarkot Tour',
    location: 'Kathmandu, Pokhara, Chitwan, Nagarkot',
    category: 'Tours',
    tripCode: 'DNTT/T/9D/04',
    price: 'US$1440',
    persons: 'per person',
    img: 'https://peacefulnepal.com/wp-content/uploads/2023/08/1-1080x720.jpg'
  },
  {
    id: 'ktm-pokhara-chitwan-trek-9d',
    title: '9 Days Kathmandu, Pokhara, Chitwan Tour with Trek',
    location: 'Kathmandu, Pokhara, Chitwan',
    category: 'Tours',
    tripCode: 'DNTT/T/9D/05',
    price: 'US$1615',
    persons: 'per person',
    img: 'https://www.bestheritagetour.com/public/images/upload/package/slider/photo-2025-09-05-06-21-44-1.jpg'
  },
  {
    id: 'ktm-pokhara-chitwan-rafting-9d',
    title: '9 Days Kathmandu, Pokhara, Chitwan Tour with Rafting',
    location: 'Kathmandu, Pokhara, Chitwan',
    category: 'Tours',
    tripCode: 'DNTT/T/9D/03',
    price: 'US$1550',
    persons: 'per person',
    img: 'https://himalayanadventuretreks.com/wp-content/uploads/2025/02/White-Water-Rafting.webp'
  },
  {
    id: 'ktm-pokhara-muktinath-chitwan-9d',
    title: '9 Days Kathmandu, Pokhara, Muktinath & Chitwan Tour',
    location: 'Kathmandu, Pokhara, Muktinath, Chitwan',
    category: 'Tours',
    tripCode: 'DNTT/T/9D/01',
    price: 'US$1715',
    persons: 'per person',
    img: 'https://yatrinepal.com/sites/default/files/styles/cover/public/deers-at-chitwan.jpg?itok=dfFRop6o'
  },
  {
    id: 'ktm-pokhara-lumbini-chitwan-9d',
    title: '9 Days Kathmandu, Pokhara, Lumbini & Chitwan Tour',
    location: 'Kathmandu, Pokhara, Lumbini, Chitwan',
    category: 'Tours',
    tripCode: 'DNTT/T/9D/02',
    price: 'US$1600',
    persons: 'per person',
    img: 'https://www.nepalpackagetour.com/public/uploads/tour/Kathmandu-Pokhara-Chitwan-Travel-Package.jpg'
  },
  {
    id: 'nepal-tour-ghandruk-trek-10d',
    title: '10 Days Nepal Tour with Ghandruk Trek',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/10D/04',
    price: 'US$1625',
    persons: 'per person',
    img: 'https://galaxyworldtravels.com/storage/uploads/adventure/images/316794042251447.jpeg'
  },
  {
    id: 'nepal-tour-rafting-10d',
    title: '10 Days Nepal Tour with Rafting',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/10D/03',
    price: 'US$1700',
    persons: 'per person',
    img: 'https://wildernesstours.com/wp-content/uploads/2025/11/High-Adventure-Rafting-Feature-Image.webp'
  },
  {
    id: 'nepal-tour-muktinath-10d',
    title: '10 Days Nepal Tour with Muktinath',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/10D/01',
    price: 'US$1880',
    persons: 'per person',
    img: 'https://www.visithimalayastrek.com/uploads/photos/1/Mustang-Muktinath-Temple.jpg'
  },
  {
    id: 'nepal-tour-lumbini-10d',
    title: '10 Days Nepal Tour with Lumbini',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/10D/02',
    price: 'US$1745',
    persons: 'per person',
    img: 'https://lumbinidevtrust.gov.np/upload_file/images/slider/1721894939_276597348_lumbini.jpg'
  },
  {
    id: 'nepal-tour-ghandruk-trek-11d',
    title: '11 Days Nepal Tour with Ghandruk Village Trek',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT-T-11D-03',
    price: 'US$2160',
    persons: 'for 2 Persons',
    img: 'https://tibetanencounter.com/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-14-at-6.48.44-pm-800x436.jpeg'
  },
  {
    id: 'nepal-tour-muktinath-11d',
    title: '11 Days Nepal Tour with Muktinath',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/11D/01',
    price: 'US$2820',
    persons: 'for 2 Persons',
    img: 'https://www.nepaltrekkinginhimalaya.com/images/articles/ophNq-muktinath.jpg'
  },
  {
    id: 'nepal-tour-lumbini-11d',
    title: '11 Days Nepal Tour with Lumbini',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/11D/02',
    price: 'US$2260',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1611892370612-0ac8e4a4507a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHVtYmluaXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 'nepal-tour-poon-hill-trek-12d',
    title: '12 Days Nepal Tour with Poon Hill Trek',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/12D/04',
    price: 'US$2380',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1589800463007-3be49fe18b92?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'nepal-tour-ghandruk-trek-12d',
    title: '12 Days Nepal Tour with Ghandruk Trek',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/12D/03',
    price: 'US$2380',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1704180724080-c923aa1ee129?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'nepal-tour-muktinath-12d',
    title: '12 Days Nepal Tour with Muktinath',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/12D/01',
    price: 'US$3480',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1540961286473-8ad1368dc1bd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'nepal-tour-lumbini-12d',
    title: '12 Days Nepal Tour with Lumbini',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/12D/02',
    price: 'US$2420',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1616166831783-f239fea49bdc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'explore-nepal-tour-13d',
    title: '13 Days Explore Nepal Tour',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/13D/03',
    price: 'US$3490',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1513614835783-51537729c8ba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'explore-nepal-tour-poon-hill-trek-13d',
    title: '13 Days Explore Nepal Tour with Poon Hill Trek',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/13D/04',
    price: 'US$2830',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1725009562005-adba89f6951f?q=80&w=1102&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'discover-nepal-tour-13d',
    title: '13 Days Discover Nepal Tour',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/13D/02',
    price: 'US$2740',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'discover-nepal-tour-ghandruk-trek-13d',
    title: '13 Days Discover Nepal Tour with Ghandruk Trek',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/13D/01',
    price: 'US$2850',
    persons: 'for 2 Persons',
    img: 'https://plus.unsplash.com/premium_photo-1692102550644-b3969be679ad?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'explore-nepal-tour-poon-hill-trek-14d',
    title: '14 Days Explore Nepal Tour with Poon Hill Trek',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/14D/04',
    price: 'US$2940',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'explore-nepal-tour-14d',
    title: '14 Days Explore Nepal Tour',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/14D/03',
    price: 'US$3660',
    persons: 'for 2 Persons',
    img: 'https://plus.unsplash.com/premium_photo-1670782711832-bf4d7638114a?q=80&w=1315&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'discover-nepal-tour-14d',
    title: '14 Days Discover Nepal Tour',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/14D/02',
    price: 'US$2790',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1553886334-43d24f24d3bd?q=80&w=1177&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'discover-nepal-tour-ghandruk-trek-14d',
    title: '14 Days Discover Nepal Tour with Ghandruk Trek',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/14D/01',
    price: 'US$2820',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1696576834819-37a40bfd21c6?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'discover-nepal-tour-tiger-tracking-bardia-15d',
    title: '15 Day Discover Nepal Tour with Tiger Tracking in Bardia',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/15D/05',
    price: 'US$4150',
    persons: 'for 2 Persons',
    img: 'https://tigerencounter.com/wp-content/uploads/2019/03/Tiger-Encounter-in-Bardia-National-Park-2.jpg'
  },
  {
    id: 'explore-nepal-tour-15d',
    title: '15 Days Explore Nepal Tour',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/15D/04',
    price: 'US$3830',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'discover-nepal-tour-15d',
    title: '15 Days Discover Nepal Tour',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/15D/03',
    price: 'US$3140',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1504448252408-b32799ff32f3?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'explore-nepal-tour-poon-hill-trek-15d',
    title: '15 Days Explore Nepal Tour with Poon Hill Trek',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/15D/05',
    price: 'US$3080',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1574410206732-0000dbcb116d?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'discover-nepal-tour-ghandruk-trek-15d',
    title: '15 Days Discover Nepal Tour with Ghandruk Trek',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/15D/02',
    price: 'US$3140',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1545309451-2369945f85a1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'discover-nepal-tour-16d',
    title: '16 Day Discover Nepal Tour',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/16D/02',
    price: 'Price on Request',
    persons: 'for 2 Persons',
    img: 'https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'discover-nepal-tour-tiger-tracking-bardia-16d',
    title: '16 Day Discover Nepal Tour with Tiger Tracking in Bardia',
    location: 'Nepal',
    category: 'Tours',
    tripCode: 'DNTT/T/16D/01',
    price: 'Price on Request',
    persons: 'for 2 Persons',
    img: 'https://republicaimg.nagariknewscdn.com/shared/web/uploads/media/TigerBardia-1200x560_20201027200017.jpg'
  },
  {
    id: 'nature-heals-package-3d',
    title: '3 Days Nature Heals Package',
    location: 'Nepal',
    category: 'Wellness',
    tripCode: 'DNTT/W/3D/01',
    price: 'Price on Request',
    persons: 'for 1 Person',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1220&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

const Packages = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcf9ee] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden min-h-[400px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544735716-87fa59a45b4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Nepal Himalayas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-md">
            Featured Packages
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-sm">
            Explore Nepal's majestic Himalayas with our top-rated Packages for the ultimate adventure and cultural experience.
          </p>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPackages.map((pkg) => (
            <Link to={`/packages/${pkg.id}`} key={pkg.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col group hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden relative">
              <div className="relative h-56 overflow-hidden">
                <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  {pkg.category}
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90 text-sm font-medium">
                  <MapPin size={16} className="text-[#ea580c]" />
                  <span className="line-clamp-1 drop-shadow-sm">{pkg.location}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl text-gray-900 font-bold mb-4 leading-snug line-clamp-2">
                  {pkg.title}
                </h3>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                  <div>
                    <span className="text-[#ea580c] font-bold text-xl">{pkg.price}</span>
                    <span className="text-gray-500 text-xs ml-1 font-medium">{pkg.persons}</span>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-[#ea580c] group-hover:text-white transition-colors duration-300">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
