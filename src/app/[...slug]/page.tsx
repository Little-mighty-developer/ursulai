import { redirect } from "next/navigation";

export default function CatchAll() {
  // Redirect any unrecognized URL to login page
  // This catch-all route will only match routes that don't have
  // a more specific match (like /dashboard, /login, /api/*, etc.)
  redirect("/login");
}
