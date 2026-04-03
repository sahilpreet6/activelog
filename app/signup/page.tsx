import AuthForm from "@/components/auth/AuthForm";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8">
        <h1 className="mb-2 text-3xl font-semibold text-slate-900">Create Account</h1>
        <p className="mb-6 text-slate-600">Sign up to start tracking.</p>
        <Suspense fallback={<p className="text-sm text-slate-600">Loading signup form...</p>}>
          <AuthForm mode="signup" />
        </Suspense>
      </div>
    </main>
  );
}