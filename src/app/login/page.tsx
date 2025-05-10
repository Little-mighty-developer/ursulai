import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-purple-200">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/logo.png"
          alt="Ursul.AI Logo"
          width={64}
          height={64}
          className="mb-2"
        />
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
          Ursul.AI
        </h1>
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
        <a
          href="/api/auth/signin"
          className="flex-1 bg-white text-gray-800 font-semibold py-3 rounded-lg shadow text-center hover:bg-purple-50 transition text-lg"
        >
          Sign up
        </a>
        <a
          href="/api/auth/signin"
          className="flex-1 bg-purple-800 text-white font-semibold py-3 rounded-lg shadow text-center hover:bg-purple-700 transition text-lg"
        >
          Log in
        </a>
      </div>
    </div>
  );
}
