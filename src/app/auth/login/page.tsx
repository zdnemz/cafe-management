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
import { useAuthStore } from "@/store/auth-store";
import { withGuest } from "@/hoc/withAuth";
import { login } from "@/app/actions/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RootLayout from "@/components/layouts/RootLayout";

export default withGuest(function () {
  const router = useRouter();
  const { setUser, setLoading } = useAuthStore();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);

        const res = await login(null, formData);

        if (!res.success) {
          toast.error(res.message || "Failed to login");
          return;
        }

        if (res.user) {
          await setUser(res.user);

          toast.success("Login successfuly! Redirecting...");

          switch (res.user.role) {
            case "ADMIN":
              router.push("/admin/dashboard");
              break;
            case "STAFF":
              router.push("/staff/dashboard");
              break;
            default:
              router.push("/profile");
              break;
          }
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Something went wrong, try again later!");
      } finally {
        setLoading(false);
      }
    });
  }

  const loading = isPending;

  return (
    <RootLayout>
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md rounded-2xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-muted-foreground flex justify-center text-sm">
            {"don't have an account? "}
            <span
              className="text-primary ml-1 cursor-pointer hover:underline"
              onClick={() => router.push("/auth/register")}
            >
              Register
            </span>
          </CardFooter>
        </Card>
      </div>
    </RootLayout>
  );
});
