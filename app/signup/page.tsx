import AuthForm from "@/components/auth/AuthForm";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border p-6">
        <h1 className="mb-4 text-2xl font-bold">Sign Up</h1>
        <Suspense fallback={<p className="text-sm text-slate-600">Loading signup form...</p>}>
          <AuthForm mode="signup" />
        </Suspense>
      </div>
    </main>
  );
}