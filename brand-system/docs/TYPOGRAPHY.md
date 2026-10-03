# Typography

| Role | Typeface | Guidance |
|---|---|---|
| Wordmark / display | Barlow Condensed | 600–800; strong, compact headings; avoid clipping |
| English body / controls | Manrope | 400 body, 600–800 emphasis; readable line lengths |
| Arabic body / headings | Cairo | natural proportions, generous leading; no artificial condensation or Latin tracking |

Use the typography roles and scale values from the token file. Responsive sizes belong to the target medium; hierarchy and family do not. Headings are compact but should not collapse into unreadable tight leading. Body copy generally uses 1.65–1.85 line-height, especially in Arabic. Labels and captions should not be the only place essential information appears.

Use locale-appropriate numerals for audience-facing copy. Isolate prices, IDs, Latin names and other mixed-script fragments with `bdi`/`unicode-bidi: isolate` when direction could become ambiguous. Set English `dir="ltr"`, Arabic `dir="rtl"`; align with logical CSS properties.
