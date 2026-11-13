"use client";

import React, { useEffect, useState, useCallback } from "react";
import { WEDDING_DATA, WishMessage } from "@/data/weddingData";
import Reveal from "@/components/Reveal";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const ICON: Record<string, string> = { Hadir: "✅", Ragu: "❔", Maaf: "❌" };
const lbl = "font-playfair mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4a3a3d]";
const field = "w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 text-[13px] text-[#3a2d30] outline-none placeholder:text-[#8b8084] focus:ring-1 focus:ring-[#4a2a2c]";

function formatTimeAgo(dateStr?: string): string {
  if (!dateStr) return "Baru saja";
  try {
    const d = new Date(dateStr);
    const diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 60) return "Baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
    return `${Math.floor(diff / 86400)} hari yang lalu`;
  } catch {
    return "Baru saja";
  }
}

export default function RsvpSection({ initialGuestName = "" }: { initialGuestName?: string }) {
  const [wishes, setWishes] = useState<WishMessage[]>(WEDDING_DATA.initialWishes);
  const [name, setName] = useState(initialGuestName);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Anti-spam cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  useEffect(() => {
    if (initialGuestName) setName(initialGuestName);
  }, [initialGuestName]);

  // Load from Supabase if configured, otherwise fallback to localStorage
  const loadWishes = useCallback(async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("wishes")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) {
          const formatted: WishMessage[] = data.map((item: any) => ({
            id: String(item.id),
            name: item.name,
            status: item.status as WishMessage["status"],
            message: item.message,
            timeAgo: formatTimeAgo(item.created_at),
          }));
          setWishes(formatted);
          return;
        }
      } catch (e) {
        console.log("Supabase fetch fallback:", e);
      }
    }

    // Local fallback
    try {
      const s = localStorage.getItem("chintia_wedding_wishes");
      if (s) {
        const p = JSON.parse(s);
        if (Array.isArray(p) && p.length) setWishes(p);
      }
    } catch {}
  }, []);

  useEffect(() => {
    loadWishes();

    // Setup Supabase Realtime subscription
    const client = supabase;
    if (isSupabaseConfigured && client) {
      const channel = client
        .channel("wishes-live")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "wishes" },
          (payload) => {
            const newItem = payload.new as any;
            if (newItem) {
              const formatted: WishMessage = {
                id: String(newItem.id),
                name: newItem.name,
                status: newItem.status as WishMessage["status"],
                message: newItem.message,
                timeAgo: "Baru saja",
              };
              setWishes((prev) => {
                if (prev.some((w) => w.id === formatted.id)) return prev;
                return [formatted, ...prev];
              });
            }
          }
        )
        .subscribe();

      return () => {
        client.removeChannel(channel);
      };
    }
  }, [loadWishes]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !status || !message.trim() || submitting || cooldown > 0) return;

    // Sanitasi dan batas karakter
    const cleanName = name.trim().slice(0, 60);
    const cleanMsg = message.trim().slice(0, 350);
    const validStatus = ["Hadir", "Ragu", "Maaf"].includes(status)
      ? (status as WishMessage["status"])
      : "Hadir";

    if (cleanName.length < 2 || cleanMsg.length < 2) return;

    setSubmitting(true);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from("wishes").insert([
          {
            name: cleanName,
            status: validStatus,
            message: cleanMsg,
          },
        ]);
        if (error) {
          console.error("Supabase insert error:", error);
          saveLocal(cleanName, validStatus, cleanMsg);
        }
      } else {
        saveLocal(cleanName, validStatus, cleanMsg);
      }

      setMessage("");
      setToast(true);
      setCooldown(25); // 25 detik jeda anti-spam
      setTimeout(() => setToast(false), 3500);
    } catch (err) {
      console.error("Submit error:", err);
      saveLocal(cleanName, validStatus, cleanMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const saveLocal = (n: string, s: WishMessage["status"], m: string) => {
    const next: WishMessage[] = [
      { id: String(Date.now()), name: n, status: s, message: m, timeAgo: "Baru saja" },
      ...wishes,
    ];
    setWishes(next);
    try {
      localStorage.setItem("chintia_wedding_wishes", JSON.stringify(next));
    } catch {}
  };

  return (
    <section className="relative overflow-hidden px-4 py-10">
      <img src="/images/v2/dark_floral.jpg" alt="" className="absolute inset-0 -z-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#1c1214]/30" />
      <Reveal className="relative mx-auto max-w-[420px] rounded-[34px] border border-white/50 bg-[#efe9e6]/60 px-6 pb-8 pt-8 shadow-[0_10px_40px_rgba(0,0,0,.35)] backdrop-blur-[10px]">
        <h2 className="font-script text-center text-[50px] leading-none text-[#2b1d22]">Rsvp</h2>
        <p className="font-corm mx-auto mt-4 max-w-[300px] text-center text-[14px] font-medium leading-snug text-[#3a2d30]">
          Mohon konfirmasi kehadiran serta berikan doa dan harapan terbaik untuk hari istimewa kami.
        </p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <div>
            <label className={lbl}>Nama</label>
            <input
              className={field}
              value={name}
              maxLength={60}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Anda (Maks. 60 huruf)"
              required
            />
          </div>
          <div>
            <label className={lbl}>Kehadiran</label>
            <select className={field} value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="" disabled>Pilih salah satu</option>
              <option value="Hadir">Hadir</option>
              <option value="Ragu">Masih Ragu</option>
              <option value="Maaf">Tidak Hadir</option>
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className={lbl}>Ucapan Doa</label>
              <span className="font-corm text-[11px] text-[#7a6a70]">
                {message.length}/350
              </span>
            </div>
            <textarea
              rows={3}
              maxLength={350}
              className={`${field} font-mono`}
              placeholder="Tulis ucapan atau doa..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting || cooldown > 0}
            className="font-playfair w-full rounded-[3px] bg-[#4a2a2c] py-3.5 text-[12px] font-bold uppercase tracking-[0.25em] text-[#f0e6e2] transition active:scale-[.99] disabled:opacity-60"
          >
            {submitting
              ? "Mengirim..."
              : cooldown > 0
              ? `Tunggu ${cooldown} Detik...`
              : "Kirim"}
          </button>
          {toast && (
            <p className="animate-fadeIn text-center text-[12px] font-medium text-[#2d5229]">
              ✓ Terima kasih, ucapan Anda telah tersimpan.
            </p>
          )}
        </form>

        <h3 className="font-playfair mt-9 text-center text-[15px] font-semibold uppercase tracking-[0.14em] text-[#4a2a2c]">
          Ucapan Tamu 💌
        </h3>
        <div className="mt-4 max-h-[340px] space-y-3 overflow-y-auto pr-1">
          {wishes.length === 0 ? (
            <div className="rounded-2xl border border-white/70 bg-white/35 px-5 py-6 text-center">
              <p className="font-corm text-[15px] italic text-[#4a383c]">
                Belum ada ucapan doa. Jadilah yang pertama memberikan doa restu untuk kedua mempelai ✨
              </p>
            </div>
          ) : (
            wishes.map((w) => (
              <div key={w.id} className="rounded-2xl border border-white/80 bg-white/40 px-5 py-4">
                <p className="font-playfair text-[14px] font-bold text-[#2f2226]">
                  {w.name} <span className="text-[12px]">{ICON[w.status]}</span>
                </p>
                <p className="font-corm mt-2 text-[15px] font-medium text-[#3a2d30]">{w.message}</p>
                <p className="font-corm mt-2 text-[11px] text-[#8a7e80]">{w.timeAgo}</p>
              </div>
            ))
          )}
        </div>
      </Reveal>
    </section>
  );
}
