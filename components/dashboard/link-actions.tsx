"use client";

import { useState } from "react";
import Link from "next/link";

import { deleteLinkAction } from "@/app/dashboard/actions/delete-link";
import { updateLinkAction } from "@/app/dashboard/actions/update-link";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type DashboardLink = {
  id: number;
  slug: string;
  destination: string;
};

type LinkActionsProps = {
  link: DashboardLink;
  page: number;
  limit: number;
  query: string;
};

export function LinkActions({ link, page, limit, query }: LinkActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setIsEditOpen(true)}
          suppressHydrationWarning
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => setIsDeleteOpen(true)}
          suppressHydrationWarning
          className="rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700 transition hover:border-red-400 dark:border-red-900 dark:text-red-300 dark:hover:border-red-800"
        >
          Delete
        </button>
        <Link
          href={link.destination}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-emerald-600 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-emerald-500 dark:text-emerald-300 dark:hover:border-emerald-400"
        >
          Visit
        </Link>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit link</DialogTitle>
            <DialogDescription>
              Update the slug or destination for /{link.slug}.
            </DialogDescription>
          </DialogHeader>

          <form action={updateLinkAction} className="mt-6 space-y-4">
            <input type="hidden" name="id" value={link.id} />
            <input type="hidden" name="page" value={page} />
            <input type="hidden" name="limit" value={limit} />
            <input type="hidden" name="query" value={query} />

            <div className="space-y-2">
              <label htmlFor={`edit-slug-${link.id}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Slug
              </label>
              <input
                id={`edit-slug-${link.id}`}
                type="text"
                name="slug"
                defaultValue={link.slug}
                required
                maxLength={64}
                className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none ring-emerald-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor={`edit-destination-${link.id}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Destination URL
              </label>
              <input
                id={`edit-destination-${link.id}`}
                type="url"
                name="destination"
                defaultValue={link.destination}
                required
                className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none ring-emerald-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                suppressHydrationWarning
                className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                suppressHydrationWarning
                className="rounded-md border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Save changes
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete link</DialogTitle>
            <DialogDescription>
              This will permanently remove /{link.slug}. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <form action={deleteLinkAction} className="mt-6 space-y-4">
            <input type="hidden" name="id" value={link.id} />
            <input type="hidden" name="page" value={page} />
            <input type="hidden" name="limit" value={limit} />
            <input type="hidden" name="query" value={query} />

            <DialogFooter>
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                suppressHydrationWarning
                className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                suppressHydrationWarning
                className="rounded-md border border-red-600 bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
              >
                Delete link
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}