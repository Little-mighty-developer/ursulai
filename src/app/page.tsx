import { redirect } from "next/navigation";

export default function Home() {
  // Redirect root URL to login page
  // In development: localhost:3000 -> localhost:3000/login
  redirect("/login");
}
