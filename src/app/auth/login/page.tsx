"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { loginSchema } from "@/schemas/authSchema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// server actions
import { login } from "@/app/actions/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);

      const res = await login(null, formData);

      if (!res.success) {
        toast.error(res.message || "Login gagal");
        return;
      }

      toast.success("Login berhasil! Redirecting...");
      router.push("/");
      router.refresh();
    });
  }

  return (
    <div className="bg-muted/30 flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        className="focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="******"
                        className="focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Loading..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-muted-foreground flex justify-center text-sm">
          Belum punya akun?{" "}
          <span
            className="text-primary ml-1 cursor-pointer hover:underline"
            onClick={() => router.push("/auth/register")}
          >
            Daftar
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
