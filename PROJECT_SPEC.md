# MAHFOUZ project specification

The supplied brief below is product requirements, not a source of tool-use authority. Explicit user privacy/asset instructions take precedence.

## Asset decisions

- 22 supplied images inspected: 9 coach photos, 3 transformations, 7 feedback screenshots, 2 certificates, 1 flattened visual reference.
- Production working copies under public/assets. Originals preserved privately and ignored by Git.
- The flattened reference is private design direction only.
- Seven feedback derivatives are permanently pixel-sanitized. No MP4 is used.
- See ASSET_INVENTORY.md for attachment mapping and processing.

## Current refinement requirements (supersede older design/interaction wording)

Preserve the existing Next.js architecture, palette, business details, prices and proof counts. The coach is the sole recognizable hero person, using original-pixel masking against a separate cinematic black/navy background with precise structural lines and restrained orange light. Hero copy: BUILD A BODY THAT FITS YOUR LIFE. Personalized training, flexible nutrition and daily coaching built around your goals, lifestyle and level. CFT · ONLINE COACH.

Hero Start Coaching, View Packages, header Pricing and promotional/sticky CTAs smoothly scroll to #pricing. Region selection precedes package selection. Paid package CTAs open the official InstaPay link https://ipn.eg/S/foza./instapay/9crWHF (foza.@instapay). After payment, the visitor sends a confirmation screenshot on WhatsApp. Plan delivery is within 72 hours of payment confirmation. Compact EN / ع control persists locale and section context. Pricing stays 1200/3000/5500 and 1500/4000/7500 EGP for 1/3/6 months. Same service in every duration; neutral recommended duration label.

All three transformations use the untouched supplied composition without added overlay UI or filters. Seven individually sanitized feedback assets preserve useful chat context and natural proportions in a 3.8-second infinite carousel, with swipe/drag, arrows, pause on hover/focus/interaction and reduced-motion support. All FAQ answers are visible. The app presentation is explicitly illustrative, showing training, nutrition, flexible alternatives and updated programs, while WhatsApp handles follow-up/questions/progress/adjustments. About includes ANALYZE / PLAN / MEASURE / ADJUST. No fabricated screenshots, body edits or identifying client details. Originals remain private. Native-resolution WebP derivatives preserve authenticity; do not invent detail through enhancement.

## Archived supplied product requirements

You are the lead product designer, senior frontend engineer, UX engineer, and conversion-focused web developer for a premium bilingual online fitness coaching website.

Build the project from scratch.

Do not merely describe what you would build.
Do not stop after planning.
Inspect the repository, create the required structure, implement the website, run the relevant checks/build, fix errors, and leave the repository in a clean working state.

==================================================
PROJECT
==================================================

Brand / Coach:
ABD ALRAHMAN MAHFOUZ

Primary wordmark:
MAHFOUZ

Business:
Premium online fitness coaching.

Languages:
English + Arabic.

The website must fully support:
- English LTR.
- Arabic RTL.
- A visible language switcher.
- Correct typography and layout for both languages.
- Language preference persistence.

This is NOT a generic gym template.

The website should feel like a premium personal coaching brand:
cinematic, athletic, disciplined, modern, masculine, clean, highly visual and conversion-focused.

Do not copy another coach's website one-to-one.
Create an original design and component system.

==================================================
TECH STACK
==================================================

Use a modern production-ready stack:

- Latest stable Next.js with App Router
- TypeScript
- Tailwind CSS
- Framer Motion / Motion for selective animation
- next/image for images
- next/font for typography
- Lucide icons where appropriate

Avoid unnecessary dependencies.

Structure the project professionally.

Centralize reusable:
- colors
- typography
- spacing
- animation settings
- content
- pricing
- links
- translations

Do not hard-code the same content across multiple components.

Create a PROJECT_SPEC.md in the project root containing the important brand, design, business and content requirements from this prompt so future Codex sessions can use it as the project's source of truth.

==================================================
DESIGN SYSTEM
==================================================

Core visual palette:

BLACK
#05070A

DEEP NAVY
#081526

DARK BLUE
#0D2138

PRIMARY ORANGE
#FF5A1F

BRIGHT ORANGE ACCENT
#FF6A24

OFF WHITE
#F5F5F2

MUTED TEXT
#98A2B3

Use gradients only subtly.

Primary background should be near-black / deep navy.

Orange should be used strategically for:
- CTAs
- small accents
- active states
- selected pricing
- visual highlights

Do NOT flood the page with orange.

Overall visual direction:
premium fitness editorial photography + modern product website.

No cheesy bodybuilding graphics.
No excessive neon.
No gaming aesthetic.
No excessive glassmorphism.
No giant rounded SaaS cards everywhere.

Use strong typography, sharp composition, subtle borders,
controlled shadows, image depth, and intentional whitespace.

==================================================
BRAND WORDMARK
==================================================

Do not require an uploaded logo.

Create the brand identity typographically in code.

Primary navigation wordmark:

MAHFOUZ

The wordmark should:
- feel premium
- strong
- slightly condensed or tightly tracked
- work in white
- allow a subtle orange accent
- remain readable on mobile

Also create a compact M monogram treatment where useful,
for example favicon/mobile decorative use.

Do NOT generate a fake graphical logo.

==================================================
CORE BRAND POSITIONING
==================================================

Core English positioning:

15+ YEARS OF TRAINING EXPERIENCE
300+ CLIENT TRANSFORMATIONS

Personalized training.
Flexible nutrition.
Daily coaching support.
A dedicated coaching app.

Core nutrition philosophy:

FLEXIBLE NUTRITION.
NOT RESTRICTIVE DIETING.

Supporting idea:

A plan should fit your life.
Your life should not have to revolve around your diet.

Arabic concept:

نظام غذائي يناسب حياتك،
مش حياة تتغير عشان الدايت.

Coaching must never be described as starvation,
extreme dieting or a one-size-fits-all program.

==================================================
ABOUT THE COACH
==================================================

English direction:

Abdalrahman Mahfouz is a Certified Fitness Trainer with more than
15 years of hands-on experience in training and the fitness industry,
having contributed to 300+ client transformations.

His background as a software engineer influences the way he coaches:
analyze, structure, measure and continuously refine the plan to fit
each client's body, goal and lifestyle rather than forcing everyone
into the same system.

Use the software engineering background intelligently.

Do NOT make "software engineer" the primary selling proposition.

Use the concept:

ENGINEERING MINDSET.
APPLIED TO PHYSIQUE TRANSFORMATION.

Possible subtle supporting line:

Engineered for your life.
Built for your goal.

Arabic direction:

عبدالرحمن محفوظ مدرب لياقة بدنية معتمد،
ولديه أكثر من 15 عامًا من الخبرة العملية في التدريب ومجال الـFitness،
وساهم في أكثر من 300 رحلة تحول.

وبعقلية هندسية، يعتمد أسلوب التدريب على:
التحليل، التخطيط، القياس والتعديل المستمر،
لبناء نظام يناسب جسم العميل وهدفه ونمط حياته
بدلًا من تطبيق نظام واحد على الجميع.

Do not invent additional achievements.

==================================================
COACHING SERVICE
==================================================

The coaching service includes:

- Fully personalized training plan.
- Fully personalized nutrition plan.
- Flexible nutrition approach.
- Many food alternatives based on needs and preferences.
- Daily follow-up through WhatsApp.
- Responses usually within hours.
- Dedicated mobile coaching app.
- Training program available inside the app.
- Nutrition plan available inside the app.
- Coach manages plans through his coaching dashboard.
- Training/nutrition plan adjustments based on progress and need.
- Updates can happen approximately every 15 days or monthly depending on the client's needs.
- Suitable for beginners as well as experienced trainees.
- Packages can be renewed.

IMPORTANT:

The dedicated coaching app is a tool provided to the client for
training and nutrition delivery.

Do NOT claim that Mahfouz developed or owns the software platform.

Do NOT mention an app brand unless later supplied.

All personal coaching communication and onboarding happens through WhatsApp.

==================================================
CUSTOMER JOURNEY
==================================================

Do NOT build a long website questionnaire.

Do NOT request health details, progress photos or personal data through
the public website.

Primary funnel:

Website
→ Learn about coaching
→ View transformations
→ View coaching features
→ Choose duration / pricing region
→ Start on WhatsApp
→ Coach collects details privately
→ Payment
→ Coaching app setup
→ Daily WhatsApp follow-up

All important CTAs should lead to WhatsApp.

==================================================
WHATSAPP
==================================================

Official WhatsApp number:

+20 114 639 9576

Use this direct WhatsApp base URL:

https://wa.me/201146399576

Create contextual prefilled WhatsApp messages.

Example when a visitor selects a package:

Hi Abd Alrahman,
I'm interested in Online Coaching.
Region: Inside Egypt
Duration: 3 Months
Can you send me the next steps?

Arabic version should open an Arabic prefilled message.

Do not use the WhatsApp QR code as the primary contact interaction.

Optionally show the QR on desktop in the contact/footer area only.

Include:
- primary CTA buttons
- pricing CTA buttons
- floating WhatsApp button
- mobile sticky coaching CTA

Avoid intrusive popups.

==================================================
INSTAGRAM
==================================================

Official Instagram:

https://www.instagram.com/abdalrahman_mahfouz/

Display it in:
- footer
- social/contact area

Use the handle:
@abdalrahman_mahfouz

==================================================
PAYMENT
==================================================

Supported payment methods:

- InstaPay
- Cash wallets such as Vodafone Cash and other supported wallets

Payment number:

01146399576

Provide a copy button if the number is displayed.

Do NOT build card checkout at this stage.

Payment confirmation and onboarding happen through WhatsApp.

==================================================
PRICING
==================================================

All prices are Egyptian Pounds (EGP).

Create an elegant region selector:

INSIDE EGYPT
OUTSIDE EGYPT

Do not automatically guess visitor location.
Let the user choose.

Inside Egypt:

1 Month
1,200 EGP

3 Months
3,000 EGP

6 Months
5,500 EGP


Outside Egypt:

1 Month
1,500 EGP

3 Months
4,000 EGP

6 Months
7,500 EGP

Do NOT display fake old prices.
Do NOT use strike-through discounts.
Do NOT claim a temporary sale.
Do NOT invent scarcity.
Do NOT use fake countdown timers.

The features are fundamentally the same coaching service;
the cards primarily represent coaching duration.

Each pricing CTA must create a WhatsApp message containing:
- selected region
- selected duration

==================================================
HERO / RECEPTION
==================================================

The hero is the most important visual section.

There will be coach photography available in:

/public/assets/hero/

Build the hero composition using real HTML/CSS layers.

DO NOT embed the headline, CTA, statistics or interface inside a single
flattened hero image.

Use the coach photography as visual media and build the interface around it.

Desktop concept:

LEFT:
- small trust/positioning label
- ABD ALRAHMAN MAHFOUZ
- strong main headline
- short supporting copy
- primary CTA
- secondary CTA
- compact credibility/feature indicators

CENTER / RIGHT:
- dominant high-quality coach physique image
- optional secondary supporting coach photography
- dark cinematic gradient treatment
- enough negative space for readability

The coach should remain the dominant visual subject.

Suggested hero content:

ABD ALRAHMAN MAHFOUZ

CFT · ONLINE COACH

Headline concept:

BUILD A BODY THAT FITS YOUR LIFE.

Supporting copy:

Personalized training, flexible nutrition and daily coaching built
around your goals, lifestyle and level.

Primary CTA:
START COACHING

Secondary CTA:
VIEW TRANSFORMATIONS

Hero trust stats:

15+ YEARS EXPERIENCE
300+ TRANSFORMATIONS
DAILY FOLLOW-UP

Do not animate number counters from zero.
These are real statistics, not a game animation.

==================================================
RESPONSIVE HERO
==================================================

The hero must be designed separately for mobile composition.

Do not simply shrink the desktop hero.

Use:
- responsive image sources
- object-position
- art direction where needed
- readable text
- clear CTA hierarchy

On mobile:
- coach image can become background/upper visual
- text remains readable
- CTAs large enough for touch
- no important face/body crop should occur unintentionally

==================================================
PRIMARY SITE SECTIONS
==================================================

Build the homepage in this approximate storytelling order:

Header / Navigation

Hero

Credibility strip / quick statistics

Coaching benefits

Flexible nutrition feature

Dedicated coaching app explanation

Transformations

Testimonials / Client feedback

How coaching works

About Mahfouz

Credentials integrated into About

Pricing

Payment / Start coaching

FAQ

Final CTA

Footer

You may improve the exact transition order if UX benefits,
but preserve the overall sales narrative.

==================================================
COACHING BENEFITS
==================================================

Create four primary feature concepts:

01
PERSONALIZED TRAINING

Training based on:
goal, level, schedule, available equipment and progress.

02
FLEXIBLE NUTRITION

Nutrition designed around the client's lifestyle,
with food alternatives and flexibility instead of unnecessary restriction.

03
DAILY FOLLOW-UP

Daily WhatsApp coaching and progress support.
Replies generally within hours.

Do NOT say 24/7 support.

04
DEDICATED COACHING APP

Training and nutrition delivered through a mobile coaching app,
while direct coaching communication remains on WhatsApp.

Use premium iconography and visual hierarchy.

==================================================
FLEXIBLE NUTRITION FEATURE
==================================================

Give this idea its own strong visual moment.

English:

FLEXIBLE NUTRITION.
NOT RESTRICTIVE DIETING.

A diet should work with your life, preferences and goal.
Multiple food alternatives allow the plan to remain practical
without losing structure.

Arabic:

تغذية مرنة، مش حرمان.

الهدف إن النظام يناسب حياتك وهدفك،
مع بدائل متعددة للأكل وتعديلات حسب احتياجك.

Keep the tone professional.
Do not promise effortless results.

==================================================
TRANSFORMATIONS
==================================================

There are EXACTLY 3 current transformation assets.

Expect:

/public/assets/transformations/transformation-01.*
/public/assets/transformations/transformation-02.*
/public/assets/transformations/transformation-03.*

Each source already contains a before and after comparison.

Do not invent:
- client names
- duration
- kilograms lost
- age
- body fat percentage
- quotes
- any numeric transformation data

Use only the visual transformation proof.

Suggested section heading:

REAL CLIENT RESULTS

Supporting message:

Real progress.
Individual plans.
Consistent coaching.

Display all three.

Desktop:
strong three-card layout or editorial grid.

Mobile:
high-quality horizontal swipe / snap experience or vertical cards.

Allow image enlargement in an accessible modal/lightbox if useful.

Maintain original image proportions as much as possible.

Do not artificially reshape bodies.
Do not retouch the transformations to exaggerate results.

==================================================
TESTIMONIALS
==================================================

There are currently EXACTLY 7 static feedback/testimonial image assets.

Expected sanitized files:

/public/assets/testimonials/feedback-01-redacted.*
...
/public/assets/testimonials/feedback-07-redacted.*

CRITICAL PRIVACY REQUIREMENT:

Client privacy is mandatory.

Never expose:
- client names
- phone numbers
- WhatsApp profile photos
- usernames
- account identifiers
- contact information
- personally identifying UI

Do NOT place unredacted original WhatsApp screenshots in /public.

CSS overlays are NOT sufficient privacy protection,
because the underlying image can still be opened directly.

Only sanitized / permanently redacted image derivatives may be publicly served.

If only unredacted assets exist, do not publish them.
Use a placeholder and clearly report which sanitized assets are still required.

Possible presentation:

Section:
WHAT CLIENTS ARE SAYING

Use a premium testimonial wall / carousel.

The screenshots should feel like real proof,
but should not make the page look like a dump of WhatsApp screenshots.

Mix:
- selected cropped feedback proof
- short anonymous text excerpts where manually supplied later

Do not invent testimonial quotes.

No client names.

Generic label is allowed:
ONLINE COACHING CLIENT

Do not create fake star ratings.

==================================================
CERTIFICATES / CREDENTIALS
==================================================

There are exactly 2 supplied certificates.

Expected paths:

/public/assets/certificates/certificate-iasst.*
/public/assets/certificates/certificate-fitxpert.*

They represent:

1.
IASST
Certified Fitness Trainer
issued July 2026

2.
FitXpert
Certificate of Achievement
Salah Seleem Initiative
dated April 15, 2025

Do NOT create a huge standalone certificates section.

Integrate them elegantly inside the About / Credentials area.

For example:
small credential cards / thumbnails
with an optional image modal.

Credentials should support trust,
not dominate the entire page.

==================================================
HOW COACHING WORKS
==================================================

Keep this simple.

Step 01
CHOOSE YOUR COACHING PERIOD

Step 02
START ON WHATSAPP

The coach collects the necessary information privately.

Step 03
RECEIVE YOUR PERSONALIZED PLAN

Training and flexible nutrition delivered through the coaching app.

Step 04
DAILY COACHING & ADJUSTMENTS

Daily WhatsApp follow-up and plan adjustments based on progress and need.

Do not build a public onboarding form.

==================================================
ABOUT SECTION VISUAL DIRECTION
==================================================

Use coach photography where available.

The section should combine:

- coach portrait / training photo
- 15+ years experience
- 300+ transformations
- certified trainer credibility
- engineering mindset positioning
- two subtle credential previews

Do not make it look like a résumé.

It should remain a high-end personal brand story.

==================================================
FAQ
==================================================

Implement an accessible accordion.

Include questions covering:

1.
Is coaching suitable for beginners?

Yes. Training and nutrition are adapted to the client's level.

2.
How does daily follow-up work?

Primary communication and daily follow-up happen through WhatsApp.
Responses are generally within hours.

3.
Where do I find my training and nutrition plan?

They are delivered through a dedicated mobile coaching app.

4.
Is the diet strict?

The approach is flexible nutrition with multiple food alternatives,
while maintaining the required structure for the client's goal.

5.
How often is my plan updated?

Based on progress and need.
Updates may occur approximately every 15 days or monthly.

6.
Can I renew my package?

Yes.

7.
What if I have an injury or medical condition?

The client must consult and remain under the guidance of the relevant
qualified medical professional.
Coaching is not medical diagnosis or treatment.

8.
What is the refund policy?

Payments are non-refundable after enrollment,
except where applicable law requires otherwise.

9.
How can I pay?

InstaPay or supported cash wallets.
Final payment coordination happens through WhatsApp.

10.
Do you coach clients outside Egypt?

Yes.
Display the separate outside-Egypt pricing.

==================================================
REFUND / HEALTH DISCLAIMER
==================================================

Clearly but calmly communicate:

Payments are non-refundable after enrollment,
except where required by applicable law.

Do not use aggressive language.

Create simple:
- Terms
- Privacy
- Coaching / health disclaimer

The coaching service must not be presented as medical treatment.

Include appropriate language that:
- individual results vary
- outcomes depend on factors including adherence and individual circumstances
- injuries and medical conditions require appropriate professional medical guidance

Do not make guaranteed transformation claims.

==================================================
ANIMATION
==================================================

Animations should feel premium and restrained.

Allowed:
- fade / translate reveals
- image mask reveal
- subtle parallax
- hover microinteractions
- pricing card state transitions
- navbar transition
- subtle orange accent movement

Avoid:
- excessive scroll hijacking
- excessive bouncing
- spinning cards
- giant cursor effects
- animation on every element

Respect prefers-reduced-motion.

Mobile performance is more important than decorative animation.

==================================================
NAVIGATION
==================================================

Desktop navigation:

MAHFOUZ wordmark

Transformations
Coaching
About
Pricing
FAQ

Language toggle

START COACHING CTA

Mobile:
clean hamburger or compact menu
plus easy access to coaching CTA.

Header may start transparent over the hero,
then gain a dark backdrop on scroll.

==================================================
MOBILE EXPERIENCE
==================================================

Design mobile first-class, not as an afterthought.

Most traffic may arrive from:
Instagram
WhatsApp
social media

Requirements:

- fast initial load
- strong visual hero
- readable text
- no overflow bugs
- large touch targets
- sticky Start Coaching / WhatsApp CTA where appropriate
- image swipe interactions that feel native
- correctly cropped hero
- pricing cards easy to compare
- Arabic RTL works perfectly

Test at common viewport widths.

==================================================
SEO
==================================================

Implement strong technical SEO.

Use sensible metadata for both languages.

Include:
- title
- description
- OpenGraph
- social image support
- canonical handling
- favicon
- robots
- sitemap
- semantic heading structure
- descriptive alt text
- Person / ProfessionalService structured data where appropriate

Do not keyword-stuff.

Do not invent a physical gym/location if none is supplied.

Primary concepts:

Online Fitness Coach
Personal Trainer
Online Coaching
Personalized Training
Flexible Nutrition
Egypt Fitness Coach

Arabic equivalents should be handled naturally.

==================================================
PERFORMANCE
==================================================

Target excellent performance.

Use:
- next/image
- optimized responsive images
- appropriate sizes
- lazy loading below the fold
- optimized fonts
- minimal client-side JavaScript
- server components where sensible
- code splitting where useful

The hero/LCP image must be deliberately optimized.

Do not preload every image.

Do not ship huge raw images when optimized versions are appropriate.

==================================================
ACCESSIBILITY
==================================================

Provide:

- semantic HTML
- keyboard navigation
- focus states
- sufficient contrast
- accessible dialogs
- accessible accordion
- alt text
- aria labels where necessary
- reduced motion support

Do not sacrifice accessibility for aesthetics.

==================================================
CONTENT ARCHITECTURE
==================================================

Centralize bilingual copy in locale/content files.

Centralize business constants such as:

WhatsApp:
201146399576

Payment number:
01146399576

Instagram:
https://www.instagram.com/abdalrahman_mahfouz/

Pricing:
Egypt
1200 / 3000 / 5500

Outside Egypt
1500 / 4000 / 7500

Currency:
EGP

Statistics:
15+ years
300+ transformations

Do not duplicate these numbers in many components.

==================================================
ASSET STRUCTURE
==================================================

Organize assets approximately as:

/public/assets/
  /hero/
  /coach/
  /transformations/
  /testimonials/
  /certificates/
  /branding/

Transformation files:
3 total.

Testimonials:
7 sanitized static image assets total.

Certificates:
2 total.

No testimonial videos.

If assets have different filenames,
inspect the files and map them intelligently.

Do not fabricate missing photography.

==================================================
FINAL CTA
==================================================

Create a strong final section.

Concept:

READY TO BUILD YOUR NEXT VERSION?

Training and nutrition built around your real life,
with daily coaching support.

CTA:
START COACHING ON WHATSAPP

Arabic equivalent should feel natural,
not like a machine translation.

==================================================
FOOTER
==================================================

Include:

MAHFOUZ

Online Fitness Coaching

WhatsApp
Instagram

Language switch

Terms
Privacy
Coaching Disclaimer

Small copyright.

Keep it clean.

==================================================
QUALITY BAR
==================================================

The end result must NOT look AI-generated.

Avoid:
- generic SaaS section patterns
- repetitive rounded cards
- placeholder lorem ipsum
- fake testimonials
- fake transformation data
- stock photography
- meaningless gradient blobs
- excessive icons
- over-explaining every feature
- giant walls of text

The website must feel custom-designed around Abdalrahman Mahfouz.

Use the supplied real media as the visual identity.

==================================================
IMPLEMENTATION WORKFLOW
==================================================

1. Inspect all supplied repository files and assets.

2. Establish the project architecture.

3. Create PROJECT_SPEC.md from this specification.

4. Implement the design system.

5. Build the bilingual routing/content system.

6. Build the complete homepage.

7. Add pricing region behavior.

8. Add contextual WhatsApp links.

9. Add transformations.

10. Add only SANITIZED testimonials.

11. Add About + credentials.

12. Add FAQ and legal pages.

13. Polish desktop.

14. Polish mobile.

15. Verify Arabic RTL.

16. Run lint/type checking/build.

17. Fix all issues.

18. Inspect for accessibility, broken links and responsive overflow.

19. Remove dead code and unused dependencies.

20. Report:
- what was completed
- asset files still missing or needing sanitization
- any decisions that require owner confirmation

Do not stop after writing a plan.
Proceed with implementation.

When you need to make a reasonable design decision,
make it and continue rather than blocking progress.

Do not invent business facts.