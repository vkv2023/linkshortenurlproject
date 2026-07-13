import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

import { getUserLinks } from "@/data/links";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const links = await getUserLinks(userId);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-24">
        <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
              Your links
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Dashboard
            </h1>
          </div>
          <UserButton />
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your links</CardTitle>
            <CardDescription>
              {links.length > 0
                ? `${links.length} shortened link${links.length === 1 ? "" : "s"} in your account`
                : "No links have been created yet"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {links.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                Create your first short link to see it appear here.
              </div>
            ) : (
              <div className="space-y-4">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="rounded-2xl border border-zinc-200 p-4 shadow-sm dark:border-zinc-800"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                          /{link.slug}
                        </p>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                          {link.destination}
                        </p>
                      </div>
                      <Link
                        href={link.destination}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-emerald-600 hover:text-emerald-500"
                      >
                        Visit
                      </Link>
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-400">
                      Created {new Date(link.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
