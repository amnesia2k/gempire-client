import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Link href={"/admin-dashboard"} className="rounded-xl border px-4 py-2">
        Go To Admin Dahsboard
      </Link>
    </div>
  );
}
