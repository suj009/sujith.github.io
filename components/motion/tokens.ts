/*
  One motion vocabulary for the whole site.

  Every animated component pulls its timing from here rather than inventing its
  own, which is what keeps the hero entrance, the scroll reveals, the card
  hovers and the order ticket feeling like one system instead of six.

  EASE is the JS twin of the --ease custom property in styles/tokens.css.
  If you change one, change the other.
*/

export const EASE = [0.22, 0.61, 0.36, 1] as const;

/** Interaction feedback — hover lifts, taps, toggles. Snappy, settles fast. */
export const SPRING = {
  type: "spring",
  stiffness: 320,
  damping: 22,
  mass: 1,
} as const;

/** Larger travel — panels, toasts, anything crossing real distance. */
export const SPRING_SOFT = {
  type: "spring",
  stiffness: 180,
  damping: 26,
  mass: 1,
} as const;

/**
 * Entrances and reveals, where a predictable duration reads better than
 * physics.
 *
 * Deliberately unhurried. This governs decorative choreography only — content
 * arriving as you reach it — so it can take its time. Interaction feedback
 * (SPRING below) must not: a hover or tap that takes this long reads as lag,
 * not as polish.
 */
export const GLIDE = {
  duration: 1.44,
  ease: EASE,
} as const;

/**
 * How far reveal/entrance elements travel, in px.
 *
 * Scaled up when the duration roughly doubled: holding the original 16px over
 * that much longer gave a slow crawl across a short gap, which reads as
 * sluggish rather than graceful. Left alone through the 20% adjustment above,
 * which was a request about speed — moving the amplitude again would change
 * how the entrance looks, not just how long it takes.
 */
export const RISE = 24;

/** Gap between staggered siblings, in seconds. */
export const STAGGER = 0.216;

/**
 * When a scroll reveal fires.
 *
 * `amount` is a fraction of the *element*, which makes a value like 0.25 a
 * trap: anything taller than four viewports can never show that much of itself
 * at once, so it would sit at its hidden initial state permanently. The About
 * column is one Reveal wrapping many paragraphs and is genuinely that tall on
 * a small phone.
 *
 * "some" fires as soon as any part crosses the boundary, which is safe at any
 * height; the negative bottom margin lifts that boundary off the fold so the
 * reveal still reads as a response to scrolling rather than firing early.
 */
export const VIEWPORT = {
  once: true,
  amount: "some",
  margin: "0px 0px -12% 0px",
} as const;
