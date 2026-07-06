import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isSignedIn = Boolean(userId);

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-24">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
                Clerk authentication
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Secure your short-link app with a polished sign-in experience.
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal" />
                  <SignUpButton mode="modal" />
                </>
              ) : (
                <UserButton />
              )}
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-4">
              <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                This app now includes Clerk-powered sign-in and sign-up controls so
                your users can create an account and manage their session clearly.
              </p>
              <div className="flex flex-wrap gap-3">
                {!isSignedIn ? (
                  <>
                    <Link
                      href="/sign-in"
                      className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                    >
                      Continue to sign in
                    </Link>
                    <Link
                      href="/sign-up"
                      className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
                    >
                      Create an account
                    </Link>
                  </>
                ) : (
                  <p className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    You are signed in and can manage your account from the user menu.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-6 text-white shadow-lg dark:bg-zinc-800">
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
                What’s included
              </p>
              <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                <li>• Clerk provider in the app layout</li>
                <li>• Protected routes and Clerk middleware</li>
                <li>• Clear sign-in and sign-up actions in the UI</li>
                <li>• Signed-in user controls with a profile menu</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
