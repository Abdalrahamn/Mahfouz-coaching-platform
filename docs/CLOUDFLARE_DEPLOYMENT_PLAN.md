# MAHFOUZ Cloudflare Deployment Plan

Prepared: October 25, 2026 (Africa/Cairo).
Status: publication authorized by the owner; release verification and deployment in progress. Earlier sections record the original planning baseline; sections 7 onward record subsequent owner decisions and implementation. No paid domain or subscription upgrade is authorized.

## 1. Verified account and repository facts

- Chrome is signed in to the owner's Cloudflare account.
- Workers & Pages lists one application: `kelimeler`, a Pages project connected to `Abdalrahamn/kelimeler`, with automatic production deployments from `main`.
- Workers plans explicitly identifies Free as the current plan.
- The account overview displays 3 of 3,000 Workers build minutes used this month. This is not the Pages build counter. The remaining Pages build allowance was not verified.
- This repository's configured remote is `git@github.com:Abdalrahamn/Mahfouz-coaching-platform.git`. Remote existence, permissions, current remote contents, and Cloudflare access to this repository still need verification.
- The application uses Next.js 16.3.8 and React 19.3.0. It has no Cloudflare deployment configuration yet.
- `/` reads the `mahfouz-language` cookie on the server and redirects to `/en` or `/ar`; Arabic is the fresh-visit default.
- `next/image` currently uses Next.js image optimization. Fonts come from `next/font/google` at build time.
- `SITE_URL` supplies canonical URLs and the sitemap. A production origin has not been selected in this planning session.
- Many application changes are staged, unstaged, or untracked, including active transformation assets. A deployment must use a deliberately reviewed snapshot, not assume that the remote contains the local website.

## 2. Proposed deployment route

Start with an independent Cloudflare Workers application to retain the current server-side language behavior. Do not reuse or modify `kelimeler`.

Cloudflare currently recommends vinext for Next.js on Workers, but documents it as beta. Evaluate compatibility with the exact installed Next.js/React versions before selecting tooling. This is a compatibility gate, not a promise that the current application is already deployable. Preserve the existing Next.js development and verification workflow. Review OpenNext as a documented alternative only if its current version explicitly supports this application and the tradeoff is justified. Do not silently replace the framework or downgrade dependencies.

First prove a local production build and Cloudflare-runtime preview. If no suitable Workers integration passes, report the concrete failure before publishing.

Alternative: Cloudflare Pages static export. This may suit the site's largely static content, but requires `output: "export"`, a replacement for the server cookie redirect that preserves language preference, an appropriate image delivery strategy, and verification of metadata routes. It cannot serve the current server application by uploading `.next` or the repository folder. Use `out` only after a successful static export. Do not change to this route without reviewing its behavior and tradeoffs with the owner.

## 3. Implementation and release sequence

### A. Establish a reviewable source snapshot

1. Inspect the working tree and preserve all existing owner changes. Do not reset, clean, or stage everything blindly.
2. Check that all paths in `src/config/assets.ts` exist, including the six currently configured transformation posters, seven sanitized feedback images, and two credentials. These are observed current assets, not permission to change proof counts or media.
3. Review the selected commit contents and repository history for accidental private media or credentials before pushing. `.gitignore` does not remove files already tracked by Git.
4. Keep `private/`, originals, source pairs, references, contact sheets, verification captures, local environment files, and unredacted screenshots outside Git and deployment artifacts. A robots exclusion is not access control.
5. Audit all of `public/`: unused files there can still be publicly served. Include only approved delivery media in the release, without altering originals or client bodies.
6. Preserve business behavior, prices, payment links, English/Arabic routes, RTL, language/theme preferences, and existing privacy rules. Where older documents disagree, use the owner's latest explicit instructions; do not edit business facts as part of hosting work.

### B. Resolve build and runtime readiness

1. Read the installed Next.js deployment guides before implementation.
2. Use the committed lockfile and `npm ci` in a clean, non-destructive verification checkout. Pin a compatible Node version for local and Cloudflare builds.
3. Run `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build`.
4. Historical project notes report Google Fonts network failures, Turbopack port-permission failures, and a Webpack fallback issue involving the apostrophe in the local path. These are historical findings, not newly reproduced failures. Re-test and fix the actual remaining cause. A clean CI path may avoid a local path issue, but is not proof until tested.
5. Add only the selected, verified Workers integration and Wrangler configuration; pin versions and define explicit build, local preview, and deploy commands. Do not guess an output directory or use `next start` as a Workers entry point.
6. Verify environment access in the selected integration. Supply the owner-approved `SITE_URL` at build time and at runtime where required. Do not assume that Node `process.env` behavior automatically matches Workers bindings.
7. Confirm image handling, font output, static asset routing, request CPU usage, and any additional bindings or separately billed services. Do not assume image transformation services are included in Workers Free.

### C. Configure continuous deployment after approval

1. Verify the GitHub repository and Cloudflare integration access. Limit any new repository permission to this project.
2. Create a separate application with an owner-approved available name. Configure only this project's repository, root directory, production branch, build command, deployment command, and environment values.
3. Initially keep automatic production deployment disabled or use an explicitly isolated preview workflow. A provider preview URL is still public unless access-protected; review its media before uploading.
4. Obtain the actual provider-assigned hostname; never invent a production origin. The owner may approve it as the initial `SITE_URL`, or supply an owned custom domain.
5. Produce a preview and inspect it in both locales on desktop and mobile. Check theme persistence, saved-language entry redirect, section-preserving language switching, legal pages, carousels, pause/swipe/reduced motion, image enlargement, and keyboard focus.
6. Verify that primary navigation and promotional actions reach pricing, package selection retains required coaching/region/duration behavior, package links use official InstaPay, and WhatsApp confirmation works. Do not perform a payment as a test.
7. Verify canonical/hreflang/social URLs, sitemap, robots, HTTPS, direct route reloads, 404 behavior, image URLs, console errors, and absence of private artifacts.
8. Show the owner the concrete preview and final settings before production release. Deploy only after the owner authorizes publication.
9. If a custom domain is selected, verify ownership, existing DNS/email records, HTTPS provisioning, and canonical redirects before DNS changes. Leave `kelimeler` and its hostname untouched.

### D. Repeat updates and recovery

- Use a feature branch and local verification for work in progress. Publish only reviewed changes to the configured production branch.
- A Git push updates the repository; a build prepares deployable files; a deployment publishes them. They are different operations.
- Automatic builds occur only for configured branches/triggers. Multiple commits in one push do not necessarily mean one build per commit. Preview builds and retries can consume capacity too.
- Configure build watch paths/branch filters where supported to avoid unnecessary builds for documentation-only changes. Do not exclude actual application assets.
- Record the deployed commit, hostname, integration versions, build settings, and last known good deployment.
- If an update fails to build, check that the prior successful release remains live. If a published release is faulty, use the platform's supported rollback and revert/fix the source so the next push does not restore the defect. Never delete the working application as a rollback method.
- Monitor build consumption separately from runtime traffic. External CI/local uploads move the build work elsewhere and have their own limits; they are not a claim of unlimited deployment API use.

## 4. Limits and multiple projects

Official documentation checked on the preparation date; account-specific overrides and future changes may differ.

| Item | Pages Free | Workers Free |
| --- | --- | --- |
| Application count | 100 Pages projects/account | 100 Workers/account; separate from Pages |
| Hosted build allowance | 500 builds/month | 3,000 build minutes/month |
| Concurrent builds | 1/account | 1/account |
| Build timeout | 20 minutes | 20 minutes |
| Fixed daily Git-push allowance | Not specified by these build limits | Not specified by these build limits |

Treat build allowances as shared account capacity within the corresponding product, not fresh allowances for every repository. Pages build counts and Workers build minutes are different meters. Several projects can coexist; queued builds do not overwrite another project's site. Use separate application identifiers, repositories/settings, and domain routes.

Planning examples, not service guarantees: 500 Pages builds over 30 days average about 16/day. A five-minute Workers build would allow roughly 600 builds from 3,000 minutes, before other account usage; a ten-minute build roughly 300. The dashboard currently shows 2,997 Workers minutes remaining. There is no fixed Workers push count because build durations vary.

For context, Pages Pro/Business document 5,000/20,000 monthly builds and 5/20 concurrent builds. Workers Paid documents 500 Workers, 6,000 included build minutes, then $0.005/minute, and six concurrent builds. The account UI shows Workers Paid starting at $5/month plus usage. These are distinct products/plans; do not assume upgrading one changes every other quota. No upgrade is proposed or authorized here.

Workers Free runtime has 100,000 script requests/day and 10 ms CPU per invocation; these are not push limits or visitor counts. Static asset requests served without invoking a script are free and unlimited. Real adapter routing and CPU measurements determine suitability. Do not promise that SSR fits Free before preview verification.

## 5. Display name versus destination URL

The Cloudflare application name, website brand/title, social-link label, and actual destination hostname are separate concepts. A social UI that supports link titles can show `MAHFOUZ Coaching` while opening the actual Cloudflare URL. Its exact rendering should be checked in the current Instagram app; no Instagram settings were inspected or changed.

Typing a domain-shaped label does not register that domain or change the browser address. Someone manually typing that label will visit the actual domain, which may be unrelated. Prefer a clear brand label unless the named domain is owned and connected.

To make a real custom domain appear in the address bar, own/register it and connect it to this application with the appropriate DNS and HTTPS configuration. A redirect from one domain to another ends with the destination URL visible; a custom domain serving the application can retain the custom hostname. No domain availability, ownership, or purchase has been verified, and no purchase is included in this plan.

## 6. Evidence and current completion status

Only this English planning document was added. No application configuration was changed and no remote write was performed. Application checks and responsive QA have not been re-run for this documentation-only task; they remain mandatory implementation gates, not claimed successes.

Sources:

- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Workers Builds limits and pricing](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/)
- [Workers platform limits](https://developers.cloudflare.com/workers/platform/limits/)
- [Workers static asset billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)
- [Current Next.js on Workers guidance](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
- [Static Next.js on Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- Installed Next.js guide: `node_modules/next/dist/docs/01-app/02-guides/static-exports.md`.

Release decisions still needed: approved application name, confirmed compatible integration, approved source snapshot, and the actual production origin for `SITE_URL`. Publication was subsequently authorized; see section 8.

## 7. Owner hosting preference recorded after discussion

The owner selected the free Pages hostname format and requested `mahfouzcoaching.pages.dev`, subject to availability. This supersedes the initial preference for Workers in section 2: investigate the Pages static-export route first, preserving the existing language preference and image behavior through verified implementation. Do not silently publish to Workers under a different hostname. Pages-name availability has not been checked and no application has been created. Do not set `SITE_URL` to this proposed address until the actual hostname is confirmed and approved for production.

The requested link title on Instagram may differ from the destination URL. The current mobile link editor supports separate URL and Title fields, but adding a title does not guarantee that Instagram replaces the visible hostname on the main profile. Check the owner's actual mobile profile rendering before promising that the provider hostname will be hidden. No Instagram account settings have been changed.

## 8. Authorized release implementation

The owner authorized publication after verification and then selected `mahfouz-coaching.pages.dev` (with a hyphen). The previous unhyphenated hostname is superseded. Cloudflare's setup screen displays the selected hostname; the actual final allocation must still be verified after project creation.

Deployment target: Pages Git integration, repository `Abdalrahamn/Mahfouz-coaching-platform`, production branch `main`, build `npm run build`, output `out`, build variable `SITE_URL=https://mahfouz-coaching.pages.dev`, Node 22. No paid domain or subscription upgrade is involved.

Implemented static export, browser-side entry redirect preserving the language cookie and URL context, direct delivery of approved WebP media through `next/image`, static metadata routes, and local `next/font` files from the existing licensed brand assets. The build uses Webpack and a source-only temporary directory for local paths containing apostrophes, working around reproduced Next.js metadata-loader and Turbopack failures. Exported media is restricted to active assets and branding; bundled font licenses are included.

Lint, TypeScript, five unit tests, and the complete production static export passed. Browser verification and live deployment results will be recorded below. No guarantee of zero future failures is implied.

Verification update: the production export succeeds with the final local-font and media-pruning configuration. Lint, typecheck, and all five unit tests pass. English/Arabic mobile and desktop visuals were inspected; six accessibility/reflow checks passed. Carousel autoplay/pause/wrap, reduced motion, touch swipe, payment links/copying, legal routes, and private-path rejection passed. Obsolete browser selectors and the old 1,200 EGP expectation were corrected to match the existing approved 1,100 EGP code; business prices were not changed. A locale-switch section-position regression was identified and fixed before release; final regression verification is in progress.
