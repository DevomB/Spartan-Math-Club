/**
 * Shared SVG filter for chalk-rendered display text (rough edge + grain).
 * Apply with `filter: url(#chalk)` to text ≥ 24px only: never body copy,
 * buttons, or form fields.
 */
export function ChalkDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="chalk" x="-4%" y="-8%" width="108%" height="116%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="1.15" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="rough"
          />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -0.5" result="grain" />
          <feComposite in="rough" in2="grain" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
