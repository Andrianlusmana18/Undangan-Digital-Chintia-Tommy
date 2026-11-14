"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WEDDING_DATA } from "@/data/weddingData";
import { copyToClipboard } from "@/lib/clipboard";
import { buildWhatsAppMessage, formatGuestUrl } from "@/lib/whatsappMessage";

function cleanPhone(num: string): string {
  let cleaned = num.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  }
  return cleaned;
}

export default function GuestLinkGeneratorPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [pinInput, setPinInput] = useState("");
  const [pinErrorMsg, setPinErrorMsg] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const [baseUrl, setBaseUrl] = useState("http://localhost:3000");
  const [tab, setTab] = useState<"single" | "bulk">("single");

  // Single Guest State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Bulk Guest State
  const [bulkInput, setBulkInput] = useState(
    "Bapak Ahmad & Istri\nIbu Siti Rahmawati\nKeluarga Besar Bpk. Hendra\nSahabatku Dimas Prasetya"
  );
  const [bulkList, setBulkList] = useState<{ id: number; name: string; url: string; msg: string }[]>([]);
  const [copiedBulkIdx, setCopiedBulkIdx] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
      // Verifikasi sesi aman ke server melalui cookie HttpOnly
      fetch("/api/auth-tamu")
        .then((res) => res.json())
        .then((data) => {
          if (data.blocked) {
            setIsBlocked(true);
            setIsAuthenticated(false);
            router.replace("/");
            return;
          }
          setIsAuthenticated(Boolean(data.authenticated));
        })
        .catch(() => setIsAuthenticated(false));
    }
  }, [router]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim() || isVerifying || isBlocked) return;

    setIsVerifying(true);
    setPinErrorMsg("");

    try {
      const res = await fetch("/api/auth-tamu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setPinErrorMsg("");
      } else if (data.blocked) {
        setIsBlocked(true);
        setPinErrorMsg(data.error || "Akses diblokir! Kembali ke halaman undangan...");
        setTimeout(() => {
          router.replace("/");
        }, 1600);
      } else {
        setPinInput("");
        setPinErrorMsg(data.error || "PIN salah! Silakan coba lagi.");
      }
    } catch {
      setPinErrorMsg("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLock = async () => {
    try {
      await fetch("/api/auth-tamu", { method: "DELETE" });
    } catch {}
    setIsAuthenticated(false);
    setPinInput("");
  };

  const guestNameClean = name.trim();
  const guestLink = formatGuestUrl(baseUrl, guestNameClean);
  const waTemplate = buildWhatsAppMessage(guestNameClean, guestLink);

  const copyText = async (txt: string, type: "link" | "message" | "bulk"): Promise<boolean> => {
    const ok = await copyToClipboard(txt);
    if (!ok) return false;
    if (type === "link") {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else if (type === "message") {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    }
    return true;
  };

  const openWhatsApp = (tamuName: string, tamuPhone?: string) => {
    const link = formatGuestUrl(baseUrl, tamuName);
    const msg = buildWhatsAppMessage(tamuName, link);
    const encodedMsg = encodeURIComponent(msg);
    const targetPhone = tamuPhone ? cleanPhone(tamuPhone) : "";
    const waUrl = targetPhone
      ? `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodedMsg}`
      : `https://api.whatsapp.com/send?text=${encodedMsg}`;

    window.open(waUrl, "_blank");
  };

  const processBulk = () => {
    const lines = bulkInput
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const generated = lines.map((item, idx) => {
      const url = formatGuestUrl(baseUrl, item);
      return {
        id: idx + 1,
        name: item,
        url,
        msg: buildWhatsAppMessage(item, url),
      };
    });

    setBulkList(generated);
  };

  useEffect(() => {
    processBulk();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl]);

  // Loading state
  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-[#f3efe9]" />;
  }

  // PIN LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3efe9] px-4 py-12">
        <div className="w-full max-w-[380px] rounded-[26px] border border-[#8b6a56]/25 bg-white p-7 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#4b3441] text-white shadow-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h1 className="font-playfair mt-5 text-[22px] font-bold text-[#322026]">
            Area Khusus Mempelai
          </h1>
          <p className="font-corm mt-1.5 text-[15px] text-[#6d5e62]">
            Halaman ini dilindungi. Masukkan PIN keamanan untuk mengakses generator undangan WhatsApp.
          </p>

          <form onSubmit={handleUnlock} className="mt-6 space-y-4">
            <div>
              <input
                type="password"
                maxLength={6}
                disabled={isBlocked}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinErrorMsg("");
                }}
                placeholder="Masukkan PIN (4 Digit)"
                className="w-full text-center tracking-[0.4em] font-mono rounded-xl border border-[#d6cbc5] bg-[#faf8f5] px-4 py-3 text-[18px] font-bold text-[#2e2427] outline-none placeholder:tracking-normal placeholder:font-sans placeholder:text-[13px] placeholder:text-[#a09496] focus:border-[#4b3441] focus:ring-1 focus:ring-[#4b3441] disabled:opacity-50"
                autoFocus
                required
              />
              {pinErrorMsg && (
                <p className="font-pop mt-2 text-[12px] font-medium text-red-600 animate-shake">
                  {isBlocked ? "⛔" : "❌"} {pinErrorMsg}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifying || isBlocked}
              className="font-pop w-full rounded-xl bg-[#4b3441] py-3 text-[13px] font-semibold text-white shadow-md transition hover:bg-[#3b2732] active:scale-95 disabled:opacity-60"
            >
              {isBlocked ? "Akses Diblokir..." : isVerifying ? "Memverifikasi..." : "Buka Kunci Akses"}
            </button>
          </form>

          <div className="mt-6 border-t border-[#8b6a56]/15 pt-4">
            <Link href="/" className="font-pop text-[12px] text-[#7a5849] hover:underline">
              ← Kembali ke Undangan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // UNLOCKED GENERATOR DASHBOARD
  return (
    <div className="min-h-screen bg-[#f3efe9] px-4 py-8 text-[#2e2427]">
      <div className="mx-auto max-w-[640px]">
        {/* Header */}
        <div className="mb-6 rounded-[22px] border border-[#8b6a56]/20 bg-white/80 p-6 shadow-sm backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="font-pop rounded-full bg-[#4b3441] px-3 py-1 text-[10px] font-semibold tracking-wider text-white uppercase">
              Asisten Pengantin (Terverifikasi)
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLock}
                className="font-pop text-[11px] font-semibold text-red-700 hover:underline"
              >
                🔒 Kunci
              </button>
              <Link
                href="/"
                className="font-pop text-[12px] font-medium text-[#7a5849] hover:underline"
              >
                ← Halaman Utama
              </Link>
            </div>
          </div>
          <h1 className="font-playfair mt-3 text-[24px] font-bold text-[#322026]">
            Generator Undangan WhatsApp
          </h1>
          <p className="font-corm mt-1 text-[15px] text-[#6d5e62]">
            Format undangan resmi yang sopan, rapi, dan tautan khusus anti-terpotong untuk dibagikan ke para tamu.
          </p>

          {/* Tab Selector */}
          <div className="mt-5 flex gap-2 rounded-xl bg-[#eee8df] p-1">
            <button
              onClick={() => setTab("single")}
              className={`font-pop flex-1 rounded-lg py-2 text-[12px] font-semibold transition ${
                tab === "single"
                  ? "bg-white text-[#4b3441] shadow-sm"
                  : "text-[#6d5e62] hover:text-[#4b3441]"
              }`}
            >
              Kirim Satuan (Cepat)
            </button>
            <button
              onClick={() => setTab("bulk")}
              className={`font-pop flex-1 rounded-lg py-2 text-[12px] font-semibold transition ${
                tab === "bulk"
                  ? "bg-white text-[#4b3441] shadow-sm"
                  : "text-[#6d5e62] hover:text-[#4b3441]"
              }`}
            >
              Buat Sekaligus Banyak (Massal)
            </button>
          </div>
        </div>

        {tab === "single" ? (
          /* SINGLE GENERATOR */
          <div className="space-y-5">
            {/* Input Card */}
            <div className="rounded-[22px] border border-[#8b6a56]/20 bg-white p-6 shadow-sm">
              <h2 className="font-playfair text-[17px] font-bold text-[#3a282d]">
                1. Masukkan Identitas Tamu
              </h2>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="font-pop mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#6b585c]">
                    Nama Lengkap / Panggilan Tamu *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Bapak Ahmad & Istri, dr. Hendra, atau Dimas"
                    className="w-full rounded-xl border border-[#d6cbc5] bg-[#faf8f5] px-4 py-3 text-[14px] text-[#2e2427] outline-none placeholder:text-[#a09496] focus:border-[#4b3441] focus:ring-1 focus:ring-[#4b3441]"
                  />
                </div>

                <div>
                  <label className="font-pop mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#6b585c]">
                    Nomor WhatsApp Tamu (Opsional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 08123456789 atau kosongkan jika ingin pilih kontak manual"
                    className="w-full rounded-xl border border-[#d6cbc5] bg-[#faf8f5] px-4 py-3 text-[14px] text-[#2e2427] outline-none placeholder:text-[#a09496] focus:border-[#4b3441] focus:ring-1 focus:ring-[#4b3441]"
                  />
                  <p className="font-pop mt-1 text-[11px] text-[#8a7a7e]">
                    * Jika dikosongkan, tombol kirim akan membuka WhatsApp agar Anda bisa memilih kontak di HP.
                  </p>
                </div>
              </div>

              {/* Link Hasil */}
              <div className="mt-5 rounded-xl border border-[#c7a67b]/40 bg-[#f9f6f0] p-3.5">
                <p className="font-pop text-[10px] font-bold uppercase tracking-wider text-[#7a5a48]">
                  Tautan Khusus Tamu (Anti-Terpotong):
                </p>
                <div className="mt-1 flex items-center justify-between gap-2 overflow-hidden">
                  <span className="truncate font-mono text-[12px] text-[#4b3441]">
                    {guestLink}
                  </span>
                  <button
                    onClick={() => copyText(guestLink, "link")}
                    className="font-pop shrink-0 rounded-lg bg-[#6a5248] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#7e6256] active:scale-95"
                  >
                    {copiedLink ? "✓ Tersalin" : "Salin Link"}
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Card & Action */}
            <div className="rounded-[22px] border border-[#8b6a56]/20 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-playfair text-[17px] font-bold text-[#3a282d]">
                  2. Format Pesan WhatsApp Resmi
                </h2>
                <a
                  href={guestLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-pop text-[11px] font-medium text-[#7a5849] hover:underline"
                >
                  Buka Tampilan Undangan ↗
                </a>
              </div>

              <div className="mt-3 whitespace-pre-line rounded-xl border border-[#d6cbc5] bg-[#fdfcfb] p-4 font-sans text-[13px] leading-relaxed text-[#3b2d30]">
                {waTemplate}
              </div>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <button
                  onClick={() => openWhatsApp(guestNameClean || "Tamu Undangan", phone)}
                  className="font-pop flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-[13px] font-bold text-white shadow-md transition hover:bg-[#20ba59] active:scale-95"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.151-1.272-.469-2.423-1.496-.896-.799-1.501-1.787-1.677-2.088-.176-.301-.019-.464.132-.614.135-.136.301-.351.452-.527.151-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.151-.678-1.632-.93-2.238-.244-.59-.493-.51-.678-.52l-.578-.01c-.2 0-.527.075-.803.376-.276.301-1.054 1.03-1.054 2.513 0 1.483 1.08 2.915 1.231 3.116.15.2 2.125 3.245 5.148 4.552.719.311 1.28.497 1.718.636.723.23 1.381.198 1.9.12.578-.087 1.78-.727 2.031-1.43.251-.703.251-1.306.176-1.43-.075-.125-.276-.201-.577-.352z" />
                  </svg>
                  Kirim via WhatsApp
                </button>

                <button
                  onClick={() => copyText(waTemplate, "message")}
                  className="font-pop flex items-center justify-center gap-1.5 rounded-xl border border-[#4b3441] bg-white px-5 py-3.5 text-[13px] font-semibold text-[#4b3441] transition hover:bg-[#f6f2ec] active:scale-95"
                >
                  {copiedMessage ? "✓ Pesan Tersalin" : "Salin Pesan"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* BULK GENERATOR */
          <div className="space-y-5">
            <div className="rounded-[22px] border border-[#8b6a56]/20 bg-white p-6 shadow-sm">
              <h2 className="font-playfair text-[17px] font-bold text-[#3a282d]">
                Paste Daftar Nama Tamu (Satu Nama per Baris)
              </h2>
              <p className="font-corm mt-1 text-[14px] text-[#6d5e62]">
                Salin daftar nama dari Excel, buku catatan, atau chat WhatsApp dan tempel di kotak berikut:
              </p>

              <textarea
                rows={6}
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                placeholder="Bapak Ahmad & Istri&#10;Ibu Siti Rahmawati&#10;Dian Sastrowardoyo..."
                className="mt-3 w-full rounded-xl border border-[#d6cbc5] bg-[#faf8f5] p-3 font-mono text-[13px] text-[#2e2427] outline-none focus:border-[#4b3441]"
              />

              <button
                onClick={processBulk}
                className="font-pop mt-3 rounded-xl bg-[#4b3441] px-5 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#3b2732] active:scale-95"
              >
                Perbarui Daftar ({bulkList.length} Tamu)
              </button>
            </div>

            {/* Bulk Table */}
            <div className="rounded-[22px] border border-[#8b6a56]/20 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-playfair text-[17px] font-bold text-[#3a282d]">
                  Daftar Tautan Siap Kirim ({bulkList.length})
                </h3>
              </div>

              <div className="mt-4 max-h-[460px] space-y-3 overflow-y-auto pr-1">
                {bulkList.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between gap-2.5 rounded-xl border border-[#e4dcce] bg-[#fbf9f6] p-3.5 sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0">
                      <p className="font-playfair text-[14px] font-bold text-[#322026]">
                        {idx + 1}. {item.name}
                      </p>
                      <p className="truncate font-mono text-[11px] text-[#7a6458]">
                        {item.url}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        onClick={() => openWhatsApp(item.name)}
                        title="Kirim ke WhatsApp"
                        className="font-pop inline-flex items-center gap-1 rounded-lg bg-[#25D366] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#20ba59] active:scale-95"
                      >
                        Kirim WA
                      </button>

                      <button
                        onClick={async () => {
                          if (await copyText(item.msg, "bulk")) {
                            setCopiedBulkIdx(idx);
                            setTimeout(() => setCopiedBulkIdx(null), 1800);
                          }
                        }}
                        className="font-pop rounded-lg border border-[#8b6a56]/40 bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#4b3441] transition hover:bg-[#f6efe9] active:scale-95"
                      >
                        {copiedBulkIdx === idx ? "✓ Tersalin" : "Salin Pesan"}
                      </button>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        title="Buka pratinjau"
                        className="font-pop rounded-lg bg-[#efe8df] px-2 py-1.5 text-[11px] font-medium text-[#4b3441] hover:bg-[#e4dcce]"
                      >
                        ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
