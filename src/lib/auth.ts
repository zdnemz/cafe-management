"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function generateToken(userId: number) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET tidak ditemukan di environment variables");
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
}
