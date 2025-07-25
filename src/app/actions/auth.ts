"use server";

import { validate } from "@/lib/validator";
import { loginSchema, registerSchema } from "@/schemas/authSchema";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { generateToken, setAuthCookie, clearAuthCookie } from "@/lib/auth";
import type { AuthResult } from "@/types/auth";
import { redirect } from "next/navigation";

// ======================
// LOGIN
// ======================
export async function login(
  prevState: unknown,
  formData: FormData,
): Promise<AuthResult> {
  try {
    const validatedFields = await validate(loginSchema, {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: validatedFields.error,
      };
    }

    const { email, password } = validatedFields.data;

    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.password) {
      return { success: false, message: "Email atau password salah" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Email atau password salah" };
    }

    const token = await generateToken(user.id);
    await setAuthCookie(token);

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Login berhasil",
      user: userData,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Terjadi kesalahan server. Silakan coba lagi.",
    };
  }
}

// ======================
// LOGOUT
// ======================
export async function logout(): Promise<void> {
  try {
    clearAuthCookie();
    revalidatePath("/");
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Gagal logout");
  }
  redirect("/");
}

// ======================
// GET CURRENT USER
// ======================
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) return null;
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET tidak ditemukan");

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };

    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

// ======================
// REGISTER
// ======================
export async function register(
  prevState: unknown,
  formData: FormData,
): Promise<AuthResult> {
  try {
    const validatedFields = await validate(registerSchema, {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: validatedFields.error,
      };
    }

    const { name, email, password } = validatedFields.data;

    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return { success: false, message: "Email sudah terdaftar" };
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await db.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "customer",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    const token = await generateToken(newUser.id);
    await setAuthCookie(token);

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Registrasi berhasil",
      user: newUser,
    };
  } catch (error) {
    console.error("Register error:", error);
    return {
      success: false,
      message: "Terjadi kesalahan server. Silakan coba lagi.",
    };
  }
}
