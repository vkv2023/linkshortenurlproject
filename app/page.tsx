import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const features = [
  {
    title: "Short links in seconds",
    description:
      "Convert long URLs into compact shareable links so every destination fits naturally in chat, email, and social posts.",
  },
  {
    title: "Clerk-secured access",
    description:
      "Use Clerk authentication to sign in, sign up, and keep your dashboard private to authenticated users.",
  },
  {
    title: "Protected dashboard",
    description:
      "A personalized area for managing your shortened links and monitoring your activity in one place.",
  },
  {
    title: "Built with Next.js",
    description:
      "A modern App Router experience with server components, Tailwind styling, and a clean responsive UI.",
  },
];

export default async function Home() {
  const { userId } = await auth();
  const isSignedIn = Boolean(userId);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-16 sm:px-8 lg:px-10">
        <section className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white/90 p-8 shadow-sm shadow-zinc-200/50 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 dark:shadow-black/30 sm:p-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-300">
                Link shortening made easy
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Create, protect, and manage short URLs with confidence.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                This app is designed to help you shorten and share long URLs quickly, backed by Clerk authentication and a modern dashboard experience.
              </p>
              <div className="flex flex-wrap gap-3">
                {!isSignedIn ? (
                  <>
                    <Link
                      href="/sign-in"
                      className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/sign-up"
                      className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
                    >
                      Create account
                    </Link>
                  </>
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                    >
                      Go to dashboard
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

        <section className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_0.7fr]">
          <div className="rounded-[2rem] border border-zinc-200 bg-white/90 p-8 shadow-sm shadow-zinc-200/50 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 dark:shadow-black/30">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              How it works
            </p>
            <div className="mt-8 space-y-6">
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                  1. Sign in
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Use Clerk to sign in securely or create a new account before managing your links.
                </p>
              </div>
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                  2. Create links
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Build concise URLs for any destination and keep the full link hidden behind a clean short path.
                </p>
              </div>
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                  3. Manage from dashboard
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Access your reserved dashboard to review your links, update them, and keep your work organized.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-zinc-200 bg-zinc-950 p-8 text-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-300">
              Why choose this app
            </p>
            <div className="mt-8 space-y-6 text-sm leading-7 text-zinc-300">
              <p>
                Designed for simplicity, this landing page puts the app&apos;s value front and center: secure access, smarter sharing, and a responsive experience built on modern web technologies.
              </p>
              <p>
                Clerk ensures your sessions are easy to manage, while the dashboard route gives authenticated users a private control panel.
              </p>
              <p>
                Lightweight styling and a flexible layout make it easy to expand the app with new link management features over time.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
