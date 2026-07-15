"use client";

import { useState } from "react";

import { createLinkAction } from "@/app/dashboard/actions/create-link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CreateLinkDialogProps = {
  page: number;
  limit: number;
  query: string;
};

export function CreateLinkDialog({ page, limit, query }: CreateLinkDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        suppressHydrationWarning
        className="h-10 rounded-md border border-emerald-600 bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-500"
      >
        Create link
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create link</DialogTitle>
            <DialogDescription>
              Add a new short link to your collection.
            </DialogDescription>
          </DialogHeader>

          <form action={createLinkAction} className="mt-6 space-y-4">
            <input type="hidden" name="page" value={page} />
            <input type="hidden" name="limit" value={limit} />
            <input type="hidden" name="query" value={query} />

            <div className="space-y-2">
              <label
                htmlFor="create-slug"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Slug
              </label>
              <input
                id="create-slug"
                type="text"
                name="slug"
                placeholder="custom-slug"
                required
                maxLength={64}
                suppressHydrationWarning
                className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none ring-emerald-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="create-destination"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Destination URL
              </label>
              <input
                id="create-destination"
                type="url"
                name="destination"
                placeholder="https://example.com"
                required
                suppressHydrationWarning
                className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none ring-emerald-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
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
                Create link
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
