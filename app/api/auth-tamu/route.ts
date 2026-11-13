import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PIN = process.env.TAMU_SECRET_PIN || "1123";
const AUTH_SECRET = process.env.AUTH_SECRET || "chintia-tommy-wedding-secret-salt-2026";
const COOKIE_NAME = "chintia_tamu_auth_token";
const ATTEMPT_COOKIE = "chintia_tamu_attempts";

const MAX_WRONG_ALLOWED = 2; // Maksimal 2 kali salah; salah ke-3 (> 2) langsung blokir
const BLOCK_DURATION_MS = 15 * 60 * 1000; // Blokir selama 15 menit

// In-memory IP tracker sebagai perlindungan lapis kedua
const ipAttempts = new Map<string, { count: number; blockedUntil: number }>();

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local"
  );
}

function signData(payload: string): string {
  const sig = crypto.createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

function verifySignedData(token?: string): string | null {
  if (!token || !token.includes(".")) return null;
  const lastDot = token.lastIndexOf(".");
  const payload = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);
  const expected = crypto.createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");
  if (sig !== expected) return null;
  return payload;
}

function generateAuthToken(): string {
  return signData(Date.now().toString());
}

function verifyAuthToken(token?: string): boolean {
  const ts = verifySignedData(token);
  if (!ts) return false;
  const age = Date.now() - parseInt(ts, 10);
  return age >= 0 && age < 7 * 24 * 60 * 60 * 1000;
}

function getAttemptState(req: NextRequest): { count: number; blockedUntil: number } {
  const ip = getClientIp(req);
  const mem = ipAttempts.get(ip);
  let count = mem?.count || 0;
  let blockedUntil = mem?.blockedUntil || 0;

  const cookieVal = verifySignedData(req.cookies.get(ATTEMPT_COOKIE)?.value);
  if (cookieVal) {
    try {
      const parsed = JSON.parse(cookieVal);
      if (typeof parsed.count === "number" && parsed.count > count) {
        count = parsed.count;
      }
      if (typeof parsed.blockedUntil === "number" && parsed.blockedUntil > blockedUntil) {
        blockedUntil = parsed.blockedUntil;
      }
    } catch {}
  }

  // Reset jika masa blokir sudah lewat
  if (blockedUntil > 0 && Date.now() > blockedUntil) {
    count = 0;
    blockedUntil = 0;
    ipAttempts.delete(ip);
  }

  return { count, blockedUntil };
}

export async function GET(req: NextRequest) {
  const state = getAttemptState(req);
  const isBlocked = state.blockedUntil > Date.now();
  if (isBlocked) {
    return NextResponse.json({ authenticated: false, blocked: true });
  }

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  const isValid = verifyAuthToken(cookie);
  return NextResponse.json({
    authenticated: isValid,
    blocked: false,
    attempts: state.count,
    maxWrong: MAX_WRONG_ALLOWED,
  });
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const state = getAttemptState(req);

    if (state.blockedUntil > Date.now()) {
      return NextResponse.json(
        {
          success: false,
          blocked: true,
          error: "Akses diblokir karena terlalu banyak percobaan PIN yang salah.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const pin = String(body?.pin || "").trim();

    if (pin === PIN) {
      ipAttempts.delete(ip);
      const token = generateAuthToken();
      const res = NextResponse.json({ success: true, blocked: false });
      res.cookies.delete(ATTEMPT_COOKIE);
      res.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
      return res;
    }

    // PIN salah: tambah hitungan
    const nextCount = state.count + 1;
    const isNowBlocked = nextCount > MAX_WRONG_ALLOWED;
    const blockedUntil = isNowBlocked ? Date.now() + BLOCK_DURATION_MS : 0;

    ipAttempts.set(ip, { count: nextCount, blockedUntil });
    const signedAttempt = signData(JSON.stringify({ count: nextCount, blockedUntil }));

    const res = NextResponse.json(
      {
        success: false,
        blocked: isNowBlocked,
        attempts: nextCount,
        maxWrong: MAX_WRONG_ALLOWED,
        error: isNowBlocked
          ? "Akses diblokir! Anda salah memasukkan PIN lebih dari 2 kali."
          : nextCount === MAX_WRONG_ALLOWED
          ? "PIN salah (2/2). Peringatan terakhir: 1x salah lagi akses akan diblokir!"
          : `PIN salah (${nextCount}/${MAX_WRONG_ALLOWED}).`,
      },
      { status: isNowBlocked ? 403 : 401 }
    );

    res.cookies.set(ATTEMPT_COOKIE, signedAttempt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60, // 15 menit
    });

    return res;
  } catch {
    return NextResponse.json({ success: false, error: "Permintaan tidak valid" }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(COOKIE_NAME);
  return res;
}
