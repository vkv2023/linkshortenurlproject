"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { deleteLink } from "@/data/links";

import { buildDashboardHref } from "./utils";

export async function deleteLinkAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const id = Number(formData.get("id"));
  let status = "deleted";

  try {
    await deleteLink(id, userId);
  } catch {
    status = "delete-error";
  }

  revalidatePath("/dashboard");
  redirect(buildDashboardHref(formData, status));
}