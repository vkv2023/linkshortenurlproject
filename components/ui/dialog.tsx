"use client";

import { useEffect } from "react";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

type DialogContentProps = React.HTMLAttributes<HTMLDivElement>;

function Dialog({ open, onOpenChange, children }: DialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 cursor-default bg-zinc-950/60"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-10 w-full max-w-lg">{children}</div>
    </div>
  );
}

function DialogContent({ className, ...props }: DialogContentProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl outline-none dark:border-zinc-800 dark:bg-zinc-950",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

function DialogHeader({ className, ...props }: DialogContentProps) {
  return <div className={["space-y-2", className].filter(Boolean).join(" ")} {...props} />;
}

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={[
        "text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={[
        "text-sm text-zinc-500 dark:text-zinc-400",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: DialogContentProps) {
  return (
    <div
      className={[
        "mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle };