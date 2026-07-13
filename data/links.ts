import { desc, eq } from "drizzle-orm";
import db from "@/db";
import { shortLinks } from "@/db/schema";

/**
 * Fetch all links for a specific user, ordered by creation date (newest first)
 * @param userId - The Clerk user ID
 * @returns Array of links belonging to the user
 */
export async function getUserLinks(userId: string) {
  return db
    .select({
      id: shortLinks.id,
      slug: shortLinks.slug,
      destination: shortLinks.destination,
      createdAt: shortLinks.createdAt,
      updatedAt: shortLinks.updatedAt,
    })
    .from(shortLinks)
    .where(eq(shortLinks.userId, userId))
    .orderBy(desc(shortLinks.createdAt));
}

/**
 * Fetch a single link by slug
 * @param slug - The short link slug
 * @returns The link or undefined if not found
 */
export async function getLinkBySlug(slug: string) {
  const result = await db
    .select({
      id: shortLinks.id,
      slug: shortLinks.slug,
      destination: shortLinks.destination,
      userId: shortLinks.userId,
      createdAt: shortLinks.createdAt,
    })
    .from(shortLinks)
    .where(eq(shortLinks.slug, slug));

  return result[0];
}

/**
 * Create a new short link
 * @param slug - The short link slug
 * @param destination - The destination URL
 * @param userId - The Clerk user ID
 * @returns The created link
 */
export async function createLink(
  slug: string,
  destination: string,
  userId: string,
) {
  const result = await db
    .insert(shortLinks)
    .values({
      slug,
      destination,
      userId,
    })
    .returning({
      id: shortLinks.id,
      slug: shortLinks.slug,
      destination: shortLinks.destination,
      createdAt: shortLinks.createdAt,
    });

  return result[0];
}
