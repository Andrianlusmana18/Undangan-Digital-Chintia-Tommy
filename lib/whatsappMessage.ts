import { WEDDING_DATA } from "@/data/weddingData";

export function formatGuestUrl(baseUrl: string, guestName: string): string {
  const clean = guestName.trim();
  if (!clean) return baseUrl;
  // Replace space with '+' and ensure '&' is safely '%26' so WhatsApp link never breaks
  const encoded = encodeURIComponent(clean).replace(/%20/g, "+");
  return `${baseUrl}/?to=${encoded}`;
}

export function buildWhatsAppMessage(guestName: string, guestLink: string): string {
  const name = guestName.trim() || "Bapak/Ibu/Saudara/i";

  return `*UNDANGAN PERNIKAHAN DIGITAL*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

_Assalamu’alaikum Warahmatullahi Wabarakatuh_

Kepada Yth. Bapak/Ibu/Saudara/i:
*${name}*

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada hari istimewa pernikahan kami:

💍 *${WEDDING_DATA.groom.fullName}*
&
💍 *${WEDDING_DATA.bride.fullName}*

🗓 *Hari, Tanggal:*
${WEDDING_DATA.general.weddingDate}

⏰ *Waktu Acara:*
• Akad Nikah: ${WEDDING_DATA.events.akad.time}
• Resepsi: ${WEDDING_DATA.events.resepsi.time}

📍 *Lokasi:*
${WEDDING_DATA.events.akad.venueName}
${WEDDING_DATA.events.akad.address}

Untuk detail informasi acara, denah lokasi Google Maps, dan konfirmasi kehadiran, silakan buka tautan undangan resmi berikut:

🔗 *Link Undangan:*
${guestLink}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu bagi kami berdua.

Mohon maaf atas segala keterbatasan dalam penyampaian undangan ini.

_Wassalamu’alaikum Warahmatullahi Wabarakatuh_

Hormat kami yang berbahagia,
*${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name}*
Beserta Keluarga Besar`;
}
