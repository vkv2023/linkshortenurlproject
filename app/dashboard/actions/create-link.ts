"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createLink } from "@/data/links";

import { buildDashboardHref } from "./utils";

export async function createLinkAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const slug = String(formData.get("slug") ?? "");
  const destination = String(formData.get("destination") ?? "");
  let status = "created";

  try {
    await createLink(slug, destination, userId);
  } catch {
    status = "create-error";
  }

  revalidatePath("/dashboard");
  redirect(buildDashboardHref(formData, status));
}