export interface CoupleInfo {
  name: string;
  fullName: string;
  role: string;
  father: string;
  mother: string;
  instagram: string;
  instagramUrl: string;
  image: string;
}

export interface EventInfo {
  title: string;
  badge: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  note?: string;
  googleMapsUrl: string;
  googleCalendarUrl: string;
  distanceInfo?: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logo: string;
}

export interface WishMessage {
  id: string;
  name: string;
  status: "Hadir" | "Ragu" | "Maaf";
  message: string;
  timeAgo: string;
  createdAt?: string;
}

export const WEDDING_DATA = {
  general: {
    title: "WALIMATUL 'URS",
    coupleShort: "Chintia & Tommy",
    monogram: "C&T",
    weddingDate: "Sabtu, 28 November 2026",
    targetDateIso: "2026-11-28T10:00:00+07:00",
    audioTitle: "BERNAUNG • FEBY PUTRI",
    locationSummary: "BEKASI, JAWA BARAT",
    couplePhoto: "/images/couple-front.jpg",
  },
  groom: {
    name: "Tommy",
    fullName: "Tommy Halim",
    role: "MEMPELAI PRIA",
    father: "Bpk. Abdul Halim",
    mother: "Ibu Pahriyah",
    instagram: "@tommyhalim",
    instagramUrl: "https://instagram.com",
    image: "/images/couple-front.jpg",
  },
  bride: {
    name: "Chintia",
    fullName: "Chintia, S.M.",
    role: "MEMPELAI WANITA",
    father: "Bpk. Arnen",
    mother: "Ibu Siti",
    instagram: "@chintia",
    instagramUrl: "https://instagram.com",
    image: "/images/couple-front.jpg",
  },
  events: {
    akad: {
      badge: "IKRAR SUCI",
      title: "Akad Nikah",
      date: "Sabtu, 28 November 2026",
      time: "10.00 - 11.00 WIB",
      venueName: "Kediaman Mempelai",
      address: "Kampung Tapakserang RT 008 / RW 004, Desa Lenggahjaya, Kec. Cabangbungin, Kabupaten Bekasi, Jawa Barat",
      note: "Nuansa Formal Putih Bersih / Champagne Lembut",
      googleMapsUrl: "https://maps.app.goo.gl/yJAgCQxeYNpdMPx59",
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Chintia+%26+Tommy&dates=20261128T030000Z/20261128T040000Z&details=Akad+Nikah+Chintia+S.M+%26+Tommy+Halim&location=Kampung+Tapakserang+RT+008+RW+004,+Desa+Lenggahjaya,+Kec.+Cabangbungin,+Kabupaten+Bekasi,+Jawa+Barat",
    },
    resepsi: {
      badge: "PERAYAAN BERSAMA",
      title: "Resepsi Pernikahan",
      date: "Sabtu, 28 November 2026",
      time: "11.00 WIB - Selesai",
      venueName: "Kediaman Mempelai",
      address: "Kampung Tapakserang RT 008 / RW 004, Desa Lenggahjaya, Kec. Cabangbungin, Kabupaten Bekasi, Jawa Barat",
      distanceInfo: "Desa Lenggahjaya, Kec. Cabangbungin, Kab. Bekasi",
      googleMapsUrl: "https://maps.app.goo.gl/yJAgCQxeYNpdMPx59",
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Pernikahan+Chintia+%26+Tommy&dates=20261128T040000Z/20261128T090000Z&details=Resepsi+Pernikahan+Chintia+S.M+%26+Tommy+Halim&location=Kampung+Tapakserang+RT+008+RW+004,+Desa+Lenggahjaya,+Kec.+Cabangbungin,+Kabupaten+Bekasi,+Jawa+Barat",
    },
  },
  dressCode: {
    title: "Panduan Warna Tamu",
    subtitle: "Sentuhan warna busana yang selaras untuk mengabadikan memori penuh harmoni",
    note: "Pakaian Formal / Batik Modern / Gaun Elegan bernuansa pastel hangat",
    colors: [
      { name: "Rose Quartz", hex: "#E0A5A5" },
      { name: "Champagne", hex: "#CCA680" },
      { name: "Sage Green", hex: "#8E9E88" },
      { name: "Warm Ivory", hex: "#FAF6F0" },
    ],
  },
  liveStream: {
    title: "Live Streaming YouTube & Zoom",
    description: "Bagi sahabat dan keluarga terkasih yang berhalangan hadir secara langsung, doa restu Anda tetap dapat tersampaikan melalui tayangan interaktif kami.",
    youtubeUrl: "https://youtube.com",
    zoomUrl: "https://zoom.us",
  },
  stories: [
    {
      year: "2025",
      title: "Awal Bertemu",
      date: "Pertemuan Pertama",
      description: "Pertemuan kami terbilang singkat dan sederhana tanpa proses berliku, namun menghadirkan rasa tenang dan nyaman sejak pertama kali bertatap muka.",
    },
    {
      year: "2025",
      title: "Menjalin Komitmen",
      date: "Kemantapan Hati",
      description: "Tak butuh waktu lama untuk memantapkan hati. Kesamaan niat dan ketulusan menuntun langkah kami untuk saling mengikat komitmen, melangkah bersama penuh keyakinan.",
    },
    {
      year: "2025",
      title: "Hari Lamaran",
      date: "Prosesi Lamaran Resmi",
      description: "Dikelilingi kehangatan keluarga tercinta, niat tulus kami diwujudkan dalam ikatan lamaran resmi yang semakin mengukuhkan tekad menuju jenjang pernikahan.",
    },
    {
      year: "2026",
      title: "Menuju Pelaminan",
      date: "28 November 2026",
      description: "Kini perjalanan cinta kami bermuara di gerbang pernikahan. Dengan ridho Allah SWT serta doa restu orang tua, kami siap mengikrarkan akad suci bersama selamanya.",
    },
  ],
  bankAccounts: [
    {
      bankName: "BANK CENTRAL ASIA",
      accountHolder: "Bustomi",
      accountNumber: "7035305424",
      logo: "BCA",
    },
    {
      bankName: "E-WALLET DANA",
      accountHolder: "Chintia",
      accountNumber: "0838-9529-2697",
      logo: "DANA",
    },
  ],
  giftAddress: {
    recipient: "Chintia, S.M. & Tommy Halim",
    phone: "0812-8890-4521",
    address: "Kampung Tapakserang RT 008 / RW 004, Desa Lenggahjaya, Kec. Cabangbungin, Kabupaten Bekasi, Jawa Barat",
  },
  initialWishes: [] as WishMessage[],
};
