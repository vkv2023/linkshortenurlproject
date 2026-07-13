import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userDetails = [
    { label: "User ID", value: user.id },
    { label: "First name", value: user.firstName ?? "Not provided" },
    { label: "Last name", value: user.lastName ?? "Not provided" },
    { label: "Email", value: user.emailAddresses[0]?.emailAddress ?? "Not provided" },
    { label: "Username", value: user.username ?? "Not provided" },
    {
      label: "Created",
      value: user.createdAt ? new Date(user.createdAt).toLocaleString() : "Unknown",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-24">
        <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
              Account
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Profile
            </h1>
          </div>
          <UserButton />
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Account details</CardTitle>
            <CardDescription>Your Clerk profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.fullName ?? "User profile"}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 text-2xl font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  {user.firstName?.[0] ?? user.username?.[0] ?? "U"}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                  {user.fullName ?? user.username ?? "User"}
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {user.emailAddresses[0]?.emailAddress ?? "No email"}
                </p>
              </div>
            </div>

            <ul className="mt-8 space-y-3">
              {userDetails.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800"
                >
                  <span className="font-medium text-zinc-500">{item.label}</span>
                  <span className="text-right text-zinc-950 dark:text-zinc-50">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
