import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const features = [
  {
    title: "Instant link shortening",
    description:
      "Turn long, unwieldy URLs into clean, memorable short links with a single click.",
  },
  {
    title: "Secure Clerk auth",
    description:
      "Protect your dashboard and link management behind Clerk-powered sign in and sign up flows.",
  },
  {
    title: "Private dashboard",
    description:
      "Manage your shortened links from a dedicated authenticated dashboard built for easy updates.",
  },
  {
    title: "Modern Next.js UI",
    description:
      "A responsive App Router landing page with Tailwind styling and a polished user experience.",
  },
];

export default async function Home() {
  const { userId } = await auth();
  const isSignedIn = Boolean(userId);
  const user = isSignedIn ? await currentUser() : null;

  const userDetails = user
    ? [
        { label: "User ID", value: user.id },
        { label: "Name", value: user.fullName ?? "Not provided" },
        { label: "Email", value: user.emailAddresses[0]?.emailAddress ?? "Not provided" },
        { label: "Username", value: user.username ?? "Not provided" },
      ]
    : [];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-16 sm:px-8 lg:px-10">
        <section className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white/90 p-8 shadow-sm shadow-zinc-200/50 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 dark:shadow-black/30 sm:p-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-300">
                Your short link hub
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Shorten URLs faster, secure your dashboard, and share with confidence.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Use this app to convert long links into compact, shareable URLs while keeping access protected with Clerk authentication and a private management experience.
              </p>
              <div className="flex flex-wrap gap-3">
                {!isSignedIn ? (
                  <>
                    <Link
                      href="/sign-up"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                    >
                      Get started
                    </Link>
                    <Link
                      href="/sign-in"
                      className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
                    >
                      Sign in
                    </Link>
                  </>
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                    >
                      Open dashboard
                    </Link>
                    <UserButton />
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                    {feature.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {isSignedIn && user && (
          <section className="mt-12 rounded-[2rem] border border-zinc-200 bg-white/90 p-8 shadow-sm shadow-zinc-200/50 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 dark:shadow-black/30">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                  Signed-in user
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                  {user.fullName ?? user.username ?? "Current user"}
                </h2>
              </div>
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.fullName ?? "User profile"}
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : null}
            </div>

            <ul className="mt-6 space-y-3">
              {userDetails.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800"
                >
                  <span className="font-medium text-zinc-500 dark:text-zinc-400">
                    {item.label}
                  </span>
                  <span className="text-right text-zinc-950 dark:text-zinc-50">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_0.7fr]">
          <div className="rounded-[2rem] border border-zinc-200 bg-white/90 p-8 shadow-sm shadow-zinc-200/50 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 dark:shadow-black/30">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              What you can do
            </p>
            <div className="mt-8 space-y-6">
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                  Fast link creation
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Paste a long URL and generate a short, neat address that is easy to share and remember.
                </p>
              </div>
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                  Secure account control
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Clerk keeps sign in and sign up secure, so only authenticated users can access the dashboard.
                </p>
              </div>
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                  Dashboard management
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Review, update, and organize your short links from one convenient place.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-zinc-200 bg-zinc-950 p-8 text-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-300">
              Why this app works
            </p>
            <div className="mt-8 space-y-6 text-sm leading-7 text-zinc-300">
              <p>
                This landing page is built to highlight the app&apos;s core strengths: speed, security, and a polished link management workflow.
              </p>
              <p>
                With Clerk integrated authentication and a protected dashboard, you get both a great user experience and secure link control.
              </p>
              <p>
                The responsive layout adapts to mobile and desktop, making it easy to show off the app features wherever you browse.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
