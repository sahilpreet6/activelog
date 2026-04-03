import AuthForm from "@/components/auth/AuthForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8">
        <h1 className="mb-2 text-3xl font-semibold text-slate-900">Log In</h1>
        <p className="mb-6 text-slate-600">Sign in to your account.</p>
        <Suspense fallback={<p className="text-sm text-slate-600">Loading login form...</p>}>
          <AuthForm mode="login" />
        </Suspense>
      </div>
    </main>
  );
}