# Search visibility investigation — 18 November 2026

Production origin: https://mahfouz-coaching.pages.dev/ . Inspection date uses Africa/Cairo. This is a debugging handoff, not a ranking guarantee.

## Confirmed findings and evidence limits

1. **Google Search Console, live account inspection:** `/ar` and `/en` both reported “URL is not on Google” and “URL is unknown to Google”. No referring sitemap or referring page was detected and last crawl was N/A. This is the strongest evidence for the present Google discovery/indexing problem. It is not evidence of a ranking penalty.
2. **Sitemaps report, live:** `/sitemap.xml`, submitted 16 November, still showed Unknown / Couldn't fetch / 0 discovered pages with no last-read date. Root cause remains unresolved. Previous 16 November notes record a successful live fetch by Google's inspection tool; do not treat that older result as a successful sitemap processing report today.
3. **Overview, live:** 0 total web search clicks; indexing overview was processing data. The detailed Performance report was not inspected; zero impressions or an average rank must not be invented.
4. **Google search UI:** the first visible results page for `عبدالرحمن محفوظ كوتش أونلاين`, using `hl=ar&gl=eg` in the signed-in browser, did not contain the production domain. This is a personalized snapshot of one query, not a universal rank measurement.
5. **Integrated Web Search:** the session's `web.run` tool returned `https://mahfouz-coaching.pages.dev/ar` for searches including `site:mahfouz-coaching.pages.dev` and the coach's Arabic name/service. The tool does not disclose its underlying search index. Do not call this a Google result, Bing result, or an independent ChatGPT/Gemini/Claude recommendation test. Tool-reported cached title/text were older than the live HTTP title/text, indicating the retrieved representation had not fully caught up with the current site.
6. **Public HTTP inspection:** root, Arabic, English, robots and sitemap returned 200. `/ar` and `/en` had `index, follow, max-image-preview:large`; no X-Robots-Tag was returned. Canonicals were self-referential. Reciprocal Arabic/English alternates, Person/Service/WebPage/ImageObject JSON-LD and official social links were present. Sitemap contained 10 URLs including both pricing guides; the earlier record of 8 URLs is historical.
7. **AI access:** robots permits `User-Agent: *`, excluding private/verification paths. This does not opt out OAI-SearchBot. Allowing access is eligibility, not guaranteed inclusion or a recommendation. No fresh direct ChatGPT, Claude or Gemini recommendation run was performed during this inspection. Do not confuse Google's AI Overviews/AI Mode documentation with a test of the standalone Gemini app.

No site changes, indexing requests, sitemap submissions, Cloudflare settings changes or publication were made during the above observations.

## Arabic default versus x-default

The production root already opens Arabic for a new visitor. The source entry page selects `/en` only for the saved `mahfouz-language=en` cookie, otherwise `/ar`; root HTML language and canonical are Arabic. Existing returning visitors can therefore land in English without English being the fresh-visit default.

The alternate-language fallback `x-default` currently points to `/en` on both locale pages. It is a language fallback hint, not the visitor's cookie, a command to index English only, or a blocker for `/ar`. Both pages have their own canonicals and reciprocal language links. There is no evidence it caused “URL is unknown to Google”. Arabic x-default would align the hint with the audience, but is optional and was not changed in this pass; the owner asked for an explanation first. Keep both complete locale routes and saved preferences.

An old browser regression test incorrectly expected English for missing/invalid cookies. Its expectations were corrected to match the existing Arabic behavior; the site redirect itself was not changed.

## Owner keyword request and implementation

Use real visible copy in `src/lib/content.ts`, not repeated keyword lists, hidden text or a meta-keywords tag. Google does not need every spelling repeated in every section. No search volumes or difficulty estimates were obtained.

- `مدرب أونلاين في مصر`: Arabic SEO title and service description. English equivalents remain online fitness coach / online personal trainer in Egypt.
- `تدريب أونلاين في مصر`: service heading and pricing introduction. Existing prices guide still targets `أسعار التدريب الأونلاين في مصر`.
- `كابتن أونلاين في مصر`: a new useful question/answer in the existing prices guide explaining credentials, personalized plans and support options. English guide has equivalent content.
- `أونلاين كوتشينج`: service eyebrow, FAQ heading, SEO description and guide introduction.
- `كابتن عبدالرحمن محفوظ` and spaced `كابتن عبد الرحمن محفوظ`: existing brand mentions and the About eyebrow. These are spelling variants for the same coach, not separate entities. The English About eyebrow now names the coach.
- Related service intent: personalized workout plan, flexible nutrition, daily WhatsApp support and online coaching packages remain attached to their actual sections. Prices, payment, privacy, media and ten FAQ answers are preserved.

Implementation is in the local checkout only until explicitly recorded as deployed. Building an export does not update the public site. Do not claim these new texts are indexed just because the build succeeds.

## Timing and success criteria

Google says crawling can take days to weeks, and requesting a crawl does not guarantee inclusion. SEO effects can take weeks to assess and sometimes months. Search Console was verified 15 November, only three days before this inspection; that date is not proof of the website's first publication or of a bot's first visit.

Use milestones rather than a promised first-place date: sitemap successfully read; URL is on Google; first impressions for the coach's name; measurable service-query impressions/clicks; then independently repeated AI citation/recommendation tests. No reliable date can be given for first place on broad coaching keywords or in model answers.

## Next actions, in order

1. Complete build/static checks and inspect changed copy at mobile and desktop in both languages. Record exact results below.
2. Publish the reviewed source through the existing Cloudflare Pages Git deployment when authorized. Keep the same domain; do not migrate to a different hosting platform for this keyword pass.
3. Follow up Search Console’s failed sitemap processing report. A fresh live sitemap inspection succeeded at 20:16 Cairo on 18 November (details below), but this does not establish successful processing of the submitted sitemap. Inspect the report’s detailed error and last-read status. If processing remains failed, compare CDN/firewall logs for verified Googlebot against successful inspection requests. Do not assume Cloudflare is blocking Google without those logs.
4. Request indexing for the two homepages and the useful prices guide when quota permits, and record the actual accepted/failed status. Repeated requests do not speed crawling. None were submitted in this pass.
5. After indexing, record query/page/country/date impressions, clicks, CTR and average position. Split brand-name searches from broad service phrases. Start with Egypt and Arabic, preserving English access.
6. Build helpful, owner-reviewed answers to actual prospective-client questions, linked from relevant sections. Seek accurate public professional profiles and genuine editorial references/links. The current link inventory/authority was not measured, so do not claim a verified backlink shortage.
7. Repeat independent web-enabled AI tests with the same generic prompt, without supplying the domain, then a separate branded prompt. Save model/product/date/prompt/citations. A branded lookup is not a generic recommendation success.

## Primary references

- Google crawling timing and request quota: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- Google SEO effects and no guaranteed first rank: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Language alternates and x-default: https://developers.google.com/search/docs/specialty/international/localized-versions
- Google Search AI features (not standalone Gemini): https://developers.google.com/search/docs/appearance/ai-features
- OpenAI Docs, OAI-SearchBot versus GPTBot: https://developers.openai.com/api/docs/bots

## Cloudflare-specific public checks

The production host is `mahfouz-coaching.pages.dev`, not a deployment-specific preview URL. Cloudflare documents automatic `X-Robots-Tag: noindex` on preview deployments; that header was absent on the production routes inspected here. Hosting on Cloudflare Pages or using a production pages.dev address is not, by itself, evidence of an indexing block.

Ran 16 GET checks: normal, Googlebot, Bingbot and OAI-SearchBot user-agent strings against `/ar`, `/en`, `/robots.txt` and `/sitemap.xml`. All returned 200 without redirects, challenge text, `cf-mitigated`, or X-Robots-Tag. Each path's response-body SHA-256 matched across all four user agents. Sitemap returned `application/xml`, parsed successfully as sitemap XML and contained 10 URLs; robots returned text/plain.

**Fresh Google-side evidence:** Search Console Test Live URL for `/sitemap.xml` completed on **18 November 2026 at 20:16:53 Cairo**. It reported “URL is available to Google”; crawled as **Google Inspection Tool smartphone**; **Crawl allowed: Yes; Page fetch: Successful; Indexing allowed: Yes**. This is an actual Google inspection fetch, unlike user-agent simulation. It establishes reachability during that test. It does not prove scheduled Googlebot access from every IP, accepted sitemap processing, or indexing of either homepage. A sitemap XML file is a discovery resource and does not need to be indexed as a search-result page. The disagreement with the submitted-sitemap report remains unresolved; do not invent a specific Cloudflare fault or claim its resolution.

Important limit: these requests originated from this workstation, not verified crawler IP addresses. A matching user-agent alone does not authenticate Googlebot. The tests rule out an observed user-agent-only block from this location, not every possible region/IP/WAF restriction. No firewall settings were changed.

Read-only Cloudflare dashboard inspection confirmed the site is a **Production** Pages deployment from `main`, associated with `Abdalrahamn/Mahfouz-coaching-platform`, current source commit `652fff5cf3ba2f3c1f1a60f8a9abb1918a25fa86`. Automatic deployments are enabled; build command is `npm run build`, output is `out`, and production `SITE_URL` equals the actual production host. Preview access shows the default public-preview setting. There is no evidence of a preview-only URL being used as the production canonical. These Pages settings do not expose a verified Googlebot access log; no claim about such logs is made. No Cloudflare setting was changed.

Reference: https://developers.cloudflare.com/pages/configuration/preview-deployments/ and https://developers.cloudflare.com/bots/concepts/bot/verified-bots/ .

## Verification and deployment

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: all 5 tests passed.
- `SITE_URL=https://mahfouz-coaching.pages.dev npm run build`: passed, static export generated.
- Prettier on changed TypeScript files: passed.
- Browser inspection: homepages and pricing guides in Arabic and English at 390px and 1280px; correct RTL/LTR, changed text present, no horizontal document overflow. Service sections visually inspected in both locales and sizes; guide layout inspected too.
- Existing Arabic-default browser regression: passed (1 test), including missing/invalid preferences and saved English/Arabic cookies.
- Full historical browser suite was not rerun; it contains other older feature expectations unrelated to this copy change.
- No commit, push or deployment performed in this pass. No claim that the new keyword copy is live or indexed.
