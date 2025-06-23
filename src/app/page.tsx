import Link from "next/link";

/**
 * Renders the home page with a centered link to the admin dashboard.
 *
 * Displays a styled link that navigates users to the `/admin-dashboard` route.
 */
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Link href={"/admin-dashboard"} className="rounded-xl border px-4 py-2">
        Go To Admin Dashboard
      </Link>
    </div>
  );
}
