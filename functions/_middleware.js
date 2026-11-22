// Send the legacy pages.dev hostname and www to the canonical apex domain (301).
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === "mahfouz-coaching.pages.dev" || url.hostname === "www.coachmahfouz.com") {
    return Response.redirect(`https://coachmahfouz.com${url.pathname}${url.search}`, 301);
  }
  return context.next();
}
