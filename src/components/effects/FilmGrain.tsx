export function FilmGrain() {
  return (
    <svg
      className="film-grain"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <filter id="film-grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.035 0"
        />
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>
      <rect width="100%" height="100%" filter="url(#film-grain-filter)" />
    </svg>
  )
}
