export function siteOrigin() {
  const value = process.env.SITE_URL;
  if (!value) return undefined;
  const parsed = new URL(value);
  if (!["https:", "http:"].includes(parsed.protocol))
    throw new Error("SITE_URL must be an HTTP(S) origin");
  return parsed.origin;
}
