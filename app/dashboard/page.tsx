import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

import {
  getUserLinksCount,
  getUserLinksCountBySearch,
  getUserLinksPaginated,
  getUserLinksPaginatedBySearch,
} from "@/data/links";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateLinkDialog } from "@/components/dashboard/create-link-dialog";
import { LinkActions } from "@/components/dashboard/link-actions";

const ALLOWED_LIMITS = [5, 10, 20] as const;
const DEFAULT_LIMIT = 5;

type DashboardPageProps = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    query?: string;
    status?: string;
  }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const params = (await searchParams) ?? {};
  const status = params.status;

  const parsedLimit = Number(params.limit);
  const limit = ALLOWED_LIMITS.includes(
    parsedLimit as (typeof ALLOWED_LIMITS)[number],
  )
    ? parsedLimit
    : DEFAULT_LIMIT;

  const parsedPage = Number(params.page);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const query = params.query?.trim() ?? "";

  const makeHref = (nextPage: number, nextLimit: number, nextQuery: string) => {
    const search = new URLSearchParams();
    search.set("page", String(nextPage));
    search.set("limit", String(nextLimit));

    if (nextQuery) {
      search.set("query", nextQuery);
    }

    return `?${search.toString()}`;
  };

  const totalCount = query
    ? await getUserLinksCountBySearch(userId, query)
    : await getUserLinksCount(userId);
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const currentPage = Math.min(page, totalPages);

  const links = query
    ? await getUserLinksPaginatedBySearch(userId, query, currentPage, limit)
    : await getUserLinksPaginated(userId, currentPage, limit);

  const previousHref = makeHref(Math.max(1, currentPage - 1), limit, query);
  const nextHref = makeHref(Math.min(totalPages, currentPage + 1), limit, query);

  const statusMessage =
    status === "created"
      ? {
          tone: "success",
          text: "Link created successfully.",
        }
      : status === "updated"
      ? {
          tone: "success",
          text: "Link updated successfully.",
        }
      : status === "deleted"
      ? {
          tone: "success",
          text: "Link deleted successfully.",
        }
      : status === "create-error"
      ? {
          tone: "error",
          text: "Could not create link. Make sure the slug is unique and the destination URL is valid.",
        }
      : status === "update-error"
      ? {
          tone: "error",
          text: "Could not update link. Make sure the slug is unique and the destination URL is valid.",
        }
      : status === "delete-error"
      ? {
          tone: "error",
          text: "Could not delete link. Please try again.",
        }
      : null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-24">
        <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
              Save and keep your url shortened
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              URL Shortner Dashboard
            </h1>
          </div>
          <UserButton />
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your links</CardTitle>
            <CardDescription>
              {query && totalCount > 0
                ? `${totalCount} matching shortened link${totalCount === 1 ? "" : "s"} in your account`
                : totalCount > 0
                ? `${totalCount} shortened link${totalCount === 1 ? "" : "s"} in your account`
                : "No links have been created yet"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <CreateLinkDialog page={currentPage} limit={limit} query={query} />
            </div>

            {statusMessage ? (
              <p
                className={
                  statusMessage.tone === "success"
                    ? "mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
                    : "mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                }
              >
                {statusMessage.text}
              </p>
            ) : null}

            <form action="/dashboard" method="get" className="mb-4 flex flex-wrap items-center gap-2" suppressHydrationWarning>
              <input
                type="search"
                name="query"
                defaultValue={query}
                placeholder="Search by slug or destination"
                suppressHydrationWarning
                className="h-10 w-full min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none ring-emerald-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
              <input type="hidden" name="page" defaultValue="1" />
              <input type="hidden" name="limit" defaultValue={String(limit)} />
              <button
                type="submit"
                suppressHydrationWarning
                className="h-10 rounded-md border border-zinc-300 px-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600"
              >
                Search
              </button>
              {query ? (
                <Link
                  href={makeHref(1, limit, "")}
                  className="h-10 rounded-md border border-zinc-300 px-3 text-sm font-medium leading-10 text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600"
                >
                  Clear
                </Link>
              ) : null}
            </form>

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span>Per page:</span>
                <div className="flex items-center gap-2">
                  {ALLOWED_LIMITS.map((value) => (
                    <Link
                      key={value}
                      href={makeHref(1, value, query)}
                      className={`rounded-md border px-3 py-1 transition ${
                        limit === value
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : "border-zinc-300 text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600"
                      }`}
                    >
                      {value}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Page {currentPage} of {totalPages}
              </div>
            </div>

            {links.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                {query
                  ? "No links matched your search."
                  : "Create your first short link to see it appear here."}
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
                      <LinkActions
                        link={{
                          id: link.id,
                          slug: link.slug,
                          destination: link.destination,
                        }}
                        page={currentPage}
                        limit={limit}
                        query={query}
                      />
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-400">
                      Created {new Date(link.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {totalCount > 0 && (
              <div className="mt-6 flex items-center justify-between">
                {currentPage > 1 ? (
                  <Link
                    href={previousHref}
                    className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600"
                  >
                    Previous
                  </Link>
                ) : (
                  <span className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-400 dark:border-zinc-800 dark:text-zinc-600">
                    Previous
                  </span>
                )}

                {currentPage < totalPages ? (
                  <Link
                    href={nextHref}
                    className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600"
                  >
                    Next
                  </Link>
                ) : (
                  <span className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-400 dark:border-zinc-800 dark:text-zinc-600">
                    Next
                  </span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
