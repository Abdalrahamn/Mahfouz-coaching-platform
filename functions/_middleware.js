// 1) Legacy pages.dev hostname and www -> canonical apex domain (301).
// 2) "/" -> /ar or /en at the edge (302, by saved language cookie) so visitors never
//    wait for a JS redirect page. Runs only on routes listed in public/_routes.json.
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (
    url.hostname === "mahfouz-coaching.pages.dev" ||
    url.hostname === "www.coachmahfouz.com"
  ) {
    return Response.redirect(
      `https://coachmahfouz.com${url.pathname}${url.search}`,
      301,
    );
  }
  if (url.pathname === "/") {
    const cookie = context.request.headers.get("Cookie") || "";
    const lang = /(?:^|;\s*)mahfouz-language=en(?:;|$)/.test(cookie)
      ? "en"
      : "ar";
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/${lang}${url.search}`,
        "Cache-Control": "private, no-store",
        Vary: "Cookie",
      },
    });
  }
  return context.next();
}
