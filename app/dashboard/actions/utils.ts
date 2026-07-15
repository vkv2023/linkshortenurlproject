function parsePositiveInteger(value: FormDataEntryValue | null, fallback: number) {
  const parsedValue = Number(value);

  if (Number.isInteger(parsedValue) && parsedValue > 0) {
    return parsedValue;
  }

  return fallback;
}

export function buildDashboardHref(formData: FormData, status: string) {
  const page = parsePositiveInteger(formData.get("page"), 1);
  const limit = parsePositiveInteger(formData.get("limit"), 5);
  const query = String(formData.get("query") ?? "").trim();

  const search = new URLSearchParams();
  search.set("page", String(page));
  search.set("limit", String(limit));

  if (query) {
    search.set("query", query);
  }

  search.set("status", status);

  return `/dashboard?${search.toString()}`;
}