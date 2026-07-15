import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import db from "@/db";
import { shortLinks } from "@/db/schema";

function normalizeSlug(rawSlug: string): string {
  return rawSlug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
}

function normalizeDestination(rawDestination: string): string {
  return rawDestination.trim();
}

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

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
 * Fetch total number of links for a specific user
 * @param userId - The Clerk user ID
 * @returns Total link count
 */
export async function getUserLinksCount(userId: string): Promise<number> {
  const result = await db
    .select({
      total: count(),
    })
    .from(shortLinks)
    .where(eq(shortLinks.userId, userId));

  return result[0]?.total ?? 0;
}

/**
 * Fetch total number of links for a specific user matching a search term
 * @param userId - The Clerk user ID
 * @param query - Search term matched against slug and destination
 * @returns Total matching link count
 */
export async function getUserLinksCountBySearch(
  userId: string,
  query: string,
): Promise<number> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return getUserLinksCount(userId);
  }

  const pattern = `%${trimmedQuery}%`;

  const result = await db
    .select({
      total: count(),
    })
    .from(shortLinks)
    .where(
      and(
        eq(shortLinks.userId, userId),
        or(ilike(shortLinks.slug, pattern), ilike(shortLinks.destination, pattern)),
      ),
    );

  return result[0]?.total ?? 0;
}

/**
 * Fetch paginated links for a specific user, ordered by creation date (newest first)
 * @param userId - The Clerk user ID
 * @param page - Current page number (1-based)
 * @param limit - Page size
 * @returns Paginated links belonging to the user
 */
export async function getUserLinksPaginated(
  userId: string,
  page: number,
  limit: number,
) {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);

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
    .orderBy(desc(shortLinks.createdAt))
    .offset((safePage - 1) * safeLimit)
    .limit(safeLimit);
}

/**
 * Fetch paginated links for a specific user matching a search term, ordered by creation date (newest first)
 * @param userId - The Clerk user ID
 * @param query - Search term matched against slug and destination
 * @param page - Current page number (1-based)
 * @param limit - Page size
 * @returns Paginated matching links belonging to the user
 */
export async function getUserLinksPaginatedBySearch(
  userId: string,
  query: string,
  page: number,
  limit: number,
) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return getUserLinksPaginated(userId, page, limit);
  }

  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const pattern = `%${trimmedQuery}%`;

  return db
    .select({
      id: shortLinks.id,
      slug: shortLinks.slug,
      destination: shortLinks.destination,
      createdAt: shortLinks.createdAt,
      updatedAt: shortLinks.updatedAt,
    })
    .from(shortLinks)
    .where(
      and(
        eq(shortLinks.userId, userId),
        or(ilike(shortLinks.slug, pattern), ilike(shortLinks.destination, pattern)),
      ),
    )
    .orderBy(desc(shortLinks.createdAt))
    .offset((safePage - 1) * safeLimit)
    .limit(safeLimit);
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
  const normalizedSlug = normalizeSlug(slug);
  const normalizedDestination = normalizeDestination(destination);

  if (!normalizedSlug) {
    throw new Error("Slug is required");
  }

  if (normalizedSlug.length > 64) {
    throw new Error("Slug must be 64 characters or fewer");
  }

  if (!normalizedDestination) {
    throw new Error("Destination URL is required");
  }

  if (!isValidHttpUrl(normalizedDestination)) {
    throw new Error("Destination URL must start with http:// or https://");
  }

  const existingLink = await getLinkBySlug(normalizedSlug);

  if (existingLink) {
    throw new Error("Slug is already in use");
  }

  const result = await db
    .insert(shortLinks)
    .values({
      slug: normalizedSlug,
      destination: normalizedDestination,
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

async function getOwnedLinkById(id: number, userId: string) {
  const result = await db
    .select({
      id: shortLinks.id,
      slug: shortLinks.slug,
      destination: shortLinks.destination,
      userId: shortLinks.userId,
    })
    .from(shortLinks)
    .where(and(eq(shortLinks.id, id), eq(shortLinks.userId, userId)));

  return result[0];
}

/**
 * Update an existing short link owned by a specific user
 * @param id - The link identifier
 * @param slug - The updated short link slug
 * @param destination - The updated destination URL
 * @param userId - The Clerk user ID
 * @returns The updated link
 */
export async function updateLink(
  id: number,
  slug: string,
  destination: string,
  userId: string,
) {
  const existingLink = await getOwnedLinkById(id, userId);

  if (!existingLink) {
    throw new Error("Link not found");
  }

  const normalizedSlug = normalizeSlug(slug);
  const normalizedDestination = normalizeDestination(destination);

  if (!normalizedSlug) {
    throw new Error("Slug is required");
  }

  if (normalizedSlug.length > 64) {
    throw new Error("Slug must be 64 characters or fewer");
  }

  if (!normalizedDestination) {
    throw new Error("Destination URL is required");
  }

  if (!isValidHttpUrl(normalizedDestination)) {
    throw new Error("Destination URL must start with http:// or https://");
  }

  if (normalizedSlug !== existingLink.slug) {
    const slugInUse = await getLinkBySlug(normalizedSlug);

    if (slugInUse && slugInUse.id !== id) {
      throw new Error("Slug is already in use");
    }
  }

  const result = await db
    .update(shortLinks)
    .set({
      slug: normalizedSlug,
      destination: normalizedDestination,
      updatedAt: new Date(),
    })
    .where(and(eq(shortLinks.id, id), eq(shortLinks.userId, userId)))
    .returning({
      id: shortLinks.id,
      slug: shortLinks.slug,
      destination: shortLinks.destination,
      createdAt: shortLinks.createdAt,
      updatedAt: shortLinks.updatedAt,
    });

  return result[0];
}

/**
 * Delete an existing short link owned by a specific user
 * @param id - The link identifier
 * @param userId - The Clerk user ID
 * @returns The deleted link
 */
export async function deleteLink(id: number, userId: string) {
  const existingLink = await getOwnedLinkById(id, userId);

  if (!existingLink) {
    throw new Error("Link not found");
  }

  const result = await db
    .delete(shortLinks)
    .where(and(eq(shortLinks.id, id), eq(shortLinks.userId, userId)))
    .returning({
      id: shortLinks.id,
      slug: shortLinks.slug,
      destination: shortLinks.destination,
      createdAt: shortLinks.createdAt,
    });

  return result[0];
}
