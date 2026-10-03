# Motion

Motion communicates hierarchy or state; it is not decoration. Token timing: fast 160ms, normal 280ms, slow 480ms. Use standard ease-out for entry and a calm ease-in for exit.

Prefer opacity, small translate, restrained image-mask reveal, and button/card state transitions. Avoid bounce, spin, scroll hijacking, giant cursor effects, constant parallax and movement on every item. Keep video transitions direct or softly faded. Never delay essential content. Honor `prefers-reduced-motion` by removing nonessential movement and smooth scrolling.
