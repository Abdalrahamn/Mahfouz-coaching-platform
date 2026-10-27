# MAHFOUZ — قواعد تمبليت التحولات

مرجع دائم معتمد من صاحب المشروع بتاريخ 4 أكتوبر 2026. يُقرأ عند استقبال صور Before / After جديدة أو تعديل بوستر تحول. التعليمات هنا تخص تركيب البوستر، وتحافظ على قواعد الخصوصية والموقع.

## المطلوب من صاحب المشروع

يبعت صورتين فقط: الأولى Before والثانية After، إلا لو سمّاهم بالعكس صراحة. استخدم تمبليت Mahfouz Transformation الذهبي المصحح افتراضيًا؛ لو اختار تمبليت آخر، استخدم اختياره. لو ترتيب الصور غير واضح، اسأل عن الترتيب فقط. لا تطلب منه إعادة شرح التصميم.

## المرجع المحفوظ

- التصميم الذهبي المصحح: `public/assets/transformations/transformation-05-brush-60.webp`.
- التمبليت الشخصي: `$artifact-template-mahfouz-transformation`، وتعليماته محفوظة في `~/.codex/skills/artifact-template-mahfouz-transformation/SKILL.md`.
- مرجع PNG ومعاينته داخل التمبليت: `assets/reference.png` و`assets/preview.png`.
- تمبليتات مستقلة أخرى: Orange وClassic وGreen؛ لا تغيّرها تلقائيًا عند تعديل الذهبي.

## تركيب كل زوج صور

1. حافظ على صورة الكوتش، الخلفية، اللوجو، الألوان، النصوص، المزايا والإطارين في التصميم المختار.
2. Before في الإطار الشمال وAfter في الإطار اليمين، حتى في الموقع العربي. لا تعكس ترتيب البوستر بسبب RTL.
3. الصورتان تملآن مساحة الإطارين بالكامل، بما فيها المنطقة أسفل العناوين. لا تترك أجزاء من صور العملاء القديمة أو أيديهم أو ملابسهم.
4. اضبط القص والمقياس لكل صورة حسب محتواها. اجعل حجم الرأس والجسم متقاربًا قدر الإمكان، واحفظ الرأس والجزء المفيد للمقارنة. لا تمدد الصورة ولا تغيّر نسب الجسم أو العضلات أو الملابس ولا تخترع أجزاء مخفية.
5. السهم الذهبي طبقة أمامية فوق الصورتين، كامل وواضح، ويتجه من Before إلى After. لا تحجبه الصور أو تقص طرفه.
6. BEFORE وAFTER واضحان عند أسفل كل صورة، بتنسيق التصميم: Before أبيض على أسود، After أسود على ذهبي. لا تضف عنوان موقع أو واجهة فوق البوستر.
7. استخدم بكسلات صور الأشخاص الأصلية. إن استُخدمت أداة تعديل الصور للتكوين، لا تعتمد على إعادة توليد الجسم؛ أعد تركيب صور الأشخاص الأصلية وحافظ على صورة الكوتش الأصلية.

## قاعدة علامة الوجه

افحص كل وش عميل لوحده قبل القص وبعده:

- وش ظاهر من غير تغطية: شرطة صغيرة معتمة على العينين بالذهبي `#EFC52B`.
- عليه إيموجي أو شرطة أو موبايل أو أي تغطية: حافظ على الموجود ولا تضف علامة أخرى.
- الوش غائب أو مقصوص أو مخفي أو غير ظاهر: لا تضف علامة.
- لا تضف علامة على وش الكوتش.

العلامة تُدمج في بكسلات الصورة نهائيًا، وليست CSS. لا تستخدم دائرة سوداء كبيرة أو تعيد كشف وجه متغطّي.

## مكتبة صور Before وAfter الأصلية

احفظ كل صور تحول جديدة فور استلامها كزوج مستقل في `private/transformations/pairs/pair-NNN/`، بعيدًا عن ملفات أي تمبليت:

- `before-original.<ext>`: الصورة الأولى الأصلية كما أُرسلت.
- `after-original.<ext>`: الصورة الثانية الأصلية كما أُرسلت.
- `pair.json`: ترتيب الصور، تاريخ الاستلام، المسارات، الأبعاد وبصمة SHA-256، مع رابط البوستر الناتج إن وُجد.
- الفهرس العام: `private/transformations/pairs/index.json`.

احتفظ بالامتداد والبايتات الأصلية دون تعديل أو قص أو علامات؛ أي نسخ مموهة أو مقصوصة توضع منفصلة في `processed/`. استخدم رقم زوج جديد بلا أسماء عملاء، ولا تستبدل ملفات زوج سابق. تغيير أو حذف تمبليت لا يغيّر هذه المكتبة. عند تغيير التصميم، ارجع للأصول المستقلة وطبّق قصًا مناسبًا وقاعدة الوجه من جديد، ثم احفظ بوسترًا جديدًا. ملفات المكتبة خاصة ولا تُنشر في public أو Git.

الأزواج المستلمة حتى الآن محفوظة: `pair-001` مرتبط بالبوستر 05، و`pair-002` مرتبط بالبوستر 06، و`pair-003` مرتبط بالبوستر 07، و`pair-004` مرتبط بالبوستر 08، و`pair-005` مرتبط بالبوستر 09.

## الحفظ والإضافة

- كل زوج ينتج بوسترًا كاملًا مستقلًا محفوظًا باسم ورقم جديد؛ لا يستبدل النتائج الموجودة.
- احتفظ بالأصول ومعاينات العمل في `private/` فقط. لا تنشر الأصول غير المموهة.
- احفظ النسخة النهائية المصححة للعرض في `public/assets/transformations/` بصيغة WebP وبالأبعاد الحقيقية.
- عند طلب إضافته للموقع، أضف البوستر الجديد إلى `src/config/assets.ts` مع الحفاظ على جميع النتائج السابقة.
- الكاروسيل يحرك البوسترات الكاملة: 3 على الكمبيوتر، 2 في العرض المتوسط، 1 على الموبايل. المدة 3.8 ثانية مع إيقاف واستكمال. لا تبدّل صور Before/After داخل تمبليت ثابت في الموقع.
- لا تخترع أسماء عملاء أو أرقام نتائج أو مدة تحول أو ادعاءات.

## مرجع التنفيذ الحالي

التركيب السابق موجود في `private/templates/mahfouz-transformations/render-template.mjs` و`refine-poster.mjs`. إحداثيات القص وعلامات الوش والمخرجات فيهما تخص الزوج السابق فقط؛ لا تشغّلهما على صور جديدة بنفس الإحداثيات ولا تكتب فوق البوستر 05. استخدمهما كمرجع للطبقات، واضبط مدخلات وقص وإحداثيات كل زوج جديد، واحتفظ بأصوله في مجلد مستقل.

## المراجعة قبل التسليم

افتح البوستر كاملًا وبحجم قريب من عرضه في الموقع. تأكد من ملء الإطارين، عدم وجود بقايا صور قديمة، ظهور الرأس، سلامة نسب الجسم، وضوح السهم فوق الصور والعناوين أسفلها، وصحة قاعدة الوش. عند إضافة البوستر للموقع، راجع العربي والإنجليزي على الكمبيوتر والموبايل والفحوصات المطلوبة في AGENTS.md.

## التصميم المعتمد بعد إلغاء التجارب — 5 أكتوبر 2026

صاحب المشروع ألغى تحديثات التمبليت المستقيم وحدد البوستر الموجود في الموقع كمرجع نهائي. استخدم Mahfouz Transformation الأصلي المرتبط بـ `transformation-05-brush-60.webp`: نفس صورة الكوتش، المحتوى، الإطارين المائلين، السهم، عناوين Before/After، كتابة Transformation والخاتمة العربية وDM ME. لا تستخدم تجارب الإطارات المستقيمة أو تعديلات الوش والإضاءة والحواف والعناوين الأخيرة. التمبليت المستقيم مؤرشف وغير نشط. كل زوج جديد يُركّب على التصميم الأصلي ويُحفظ مستقلًا، دون استبدال النتائج الموجودة. قاعدة الوجه المشروطة محفوظة كما هي.

Owner brush-marker update — October 5, 2026: for uncovered visible client eyes, use an opaque gold dry-brush slash rising from lower-left to upper-right, with tapered broken bristle edges matching the supplied poster 04. Never use a plain rectangular block. Preserve existing emoji/markers/phone coverage and skip absent/hidden faces. Original photographs remain untouched privately.

تحديث حجم العلامة: 5 أكتوبر 2026 — تكبير فرشة تغطية العينين بنحو 60% حول مركزها، مع الحفاظ على الميل والحواف وقاعدة الوجوه الظاهرة فقط.

Owner marker-shape rule — October 26, 2026: the face marker is always the gold dry-brush slash over the eyes. The genital marker is an opaque gold (#EFC52B) round circle, placed only over the genital area, never a slash or block. If the genital area is not visible in the frame (cropped, hidden by a banner or out of frame), add nothing. Inspect each Before/After independently. Original photographs remain untouched privately.

## Owner calm-footer rule — October 27, 2026

This supersedes all older instructions to preserve the promotional footer or enlarged face marks. Every transformation poster, existing or new, keeps the comparison dominant and a clear TRANSFORMATION title. Remove «عايز تعمل تحول زي ده», «جاهز تبدأ تغييرك», large DM ME / FOR ONLINE COACHING panels, extra promotional lines and decorative CTA boxes. Use only a small, quiet DM below the title, with generous breathing room and no invented claims. Do not preserve the obsolete footer merely because it appears in a retained template reference. Use the active `*-calm-v2.webp` media as the footer direction. Keep the source photos, original body proportions, coach and privacy rules. For new photos, use a comfortable crop rather than a tight zoom; uncovered visible eyes get a modest opaque gold dry-brush slash that covers the eyes without covering most of the face. Existing phone/emoji coverage stays untouched. Inspect each photograph independently. Untouched originals remain private.

## Owner round-face-marker and full-frame rule — October 27, 2026

The owner now prefers modest opaque gold (#EFC52B) circles for visible uncovered client faces. This supersedes older requirements that the face marker must always be a dry-brush slash. Keep existing phone/emoji coverage unless the owner explicitly asks to replace or additionally cover it; the owner specifically requested circular coverage for the supplied meme portraits in poster 17. Do not mark the coach. Genital markers remain circles only over visible genital regions. Never alter private originals. Each source photo must cover the complete tilted photo polygon, including its upper-right and lower-left corners: use proportional cover cropping, never contain padding or blank margins. Inspect each crop independently and adjust vertical placement; keep the calm TRANSFORMATION + small DM footer. Poster 16 (the side-view pair) is fourth in the shared carousel by owner selection.

## Owner numeric-results exception — October 27, 2026

Preserve all existing owner-approved numeric-result posters exactly as delivered before the calm-footer edit. This is an explicit exception to the calm TRANSFORMATION + small DM rule: never remove, rewrite, shrink away or replace approved weight/result captions, including «نزلنا 35 كيلو», «نزلنا 25 كيلو», «من 85 إلى 60 كجم», or the original 86-to-70 kg result. Retain their original footer styling and the supplied gold-brush «ابعتلي DM» treatment. Posters 01, 07, 08 and 09 have been restored byte-for-byte from the pre-calm archive as `*-results-restored.webp`; do not apply new face-marker, crop or footer restyling to these protected historical posters without explicit owner instruction. Preserve existing source pixels and privacy marks. Other posters and future posters without approved numeric copy keep the calm footer. Do not invent new numbers or claims.

## Owner clarification: numeric copy is opt-in; brush DM is approved — October 27, 2026

Add numeric results only to a specific poster when the owner explicitly requests or supplies those numbers. The currently approved numeric posters remain protected. Do not make numeric-result text the default for other posters. The small DM / «ابعتلي DM» over a yellow-gold brush stroke is approved and must be retained wherever present; the calm-footer rule does not require removing this brush treatment. Keep the existing delivered posters unchanged for this clarification. Continue to omit the large promotional question and oversized CTA panels from ordinary posters.

## Owner completed-poster DM footer — October 27, 2026

Ordinary posters must look complete through the bottom of the canvas. Use a clearly legible larger black DM centered on a wide yellow-gold dry-brush stroke, with balanced padding; do not leave a tiny plain DM or a large unused lower area. Active ordinary posters use `-dm-brush-v3.webp` at the full portrait height (941 × 1672 for the gold template; 719/720 × 1280 for legacy variants). This supersedes the tiny-DM treatment. Keep TRANSFORMATION above the footer, source people pixels, privacy masks and the selected carousel order. Add numeric result copy only when explicitly supplied/requested for that poster; protected numeric-result posters 01/07/08/09 and their original brush footers remain unchanged.

## Explicit result-copy approvals — October 27, 2026

Preserve these poster-specific owner-approved additions; they are not general claims: poster 13 «من 90 إلى 65 كيلو» / «نزلنا 25 كيلو مع شكل جسم أحسن»; poster 14 «زدنا 5 كيلو» / «وشكل عضلات أحسن»; poster 08 keeps «نزلنا 35 كيلو» and adds «+ من غير ترهلات نهائيًا»; new poster 18 «من 97 إلى 79 كيلو» / «نزلنا 18 كيلو». Poster 16 Before face-circle radius increased from 35 to 38 native poster pixels by explicit request; After circle unchanged. Numeric-copy protection applies to all owner-approved result captions, including new approvals, rather than only the original 01/07/08/09 list. Source bodies and private originals remain unchanged.

## Latest owner gallery order — October 27, 2026

Keep the first three gallery entries unchanged: posters 04, 06 and 08. Place poster 13 (the 90 → 65 kg / 25 kg woman transformation) fourth, then retain every other poster in its existing relative order. This supersedes the earlier instruction that poster 16 must be fourth; poster 16 now follows poster 13. Apply the same shared order in both locales.
