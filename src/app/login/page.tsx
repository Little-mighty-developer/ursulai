"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-purple-200">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/logo.png"
          alt="Ursul.AI Logo"
          width={350}
          height={350}
          className="mb-4"
          priority
        />
      </div>
      {/* Headline */}
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center leading-tight">
        Journal your feelings
        <br />
        with AI
      </h2>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Enhance self-care with tailored
        <br />
        AI-assisted journaling
      </p>
      {/* Illustration */}
      <div className="mb-8">
        <Image
          src="/jounral_icon.png"
          alt="Journal illustration"
          width={180}
          height={180}
          className="mx-auto"
        />
      </div>
      {/* Buttons */}
      <div className="flex gap-4 w-full max-w-xs">
        <button
          onClick={() => signIn("google")}
          className="flex-1 bg-white text-gray-800 font-semibold py-3 rounded-lg shadow text-center hover:bg-purple-50 transition text-lg"
        >
          Sign up with Google
        </button>
        <button
          onClick={() => signIn("google")}
          className="flex-1 bg-purple-800 text-white font-semibold py-3 rounded-lg shadow text-center hover:bg-purple-700 transition text-lg"
        >
          Log in with Google
        </button>
      </div>
    </div>
  );
}
