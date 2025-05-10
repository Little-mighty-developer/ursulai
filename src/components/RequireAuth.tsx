"use client";
import { useSession, signIn } from "next-auth/react";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <p className="mb-4">You must be signed in to view this page.</p>
          <button
            onClick={() => signIn()}
            className="bg-purple-800 text-white font-semibold py-2 px-6 rounded-lg"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
