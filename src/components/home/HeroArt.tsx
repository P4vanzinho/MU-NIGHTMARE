export function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg viewBox="0 0 760 560" preserveAspectRatio="xMaxYMax meet">
        <defs>
          <linearGradient id="armor" x2="1" y2="1">
            <stop stopColor="#c3a0ff" />
            <stop offset="1" stopColor="#49358e" />
          </linearGradient>
        </defs>
        <path
          fill="#9973ee"
          opacity=".3"
          d="M180 520 20 170l210 100L350 20l65 280 280-210-50 430z"
        />
        <g transform="translate(70 30)">
          <path fill="url(#armor)" d="m90 185 90-32 86 36 55 345H24z" />
          <path fill="#352355" d="m95 105 75-70 75 70-15 86-58 26-60-28z" />
          <path fill="#d1b5ff" d="m95 105 75-70 75 70-67-27z" />
          <path
            fill="#f7ff19"
            d="m125 127 28 9-4 8-24-4zm67 9 28-9v13l-24 4z"
          />
          <path
            fill="#9c77dc"
            d="m30 190 74-12-23 80-66-18zm220-12 74 12 16 50-66 18z"
          />
          <path fill="#b69bef" d="M85 240h26v277H85z" />
        </g>
        <g transform="translate(340 100)">
          <path fill="#ebb963" d="m90 170 92-14 62 64 23 299H25z" />
          <path fill="#744068" d="m75 75 95-49 69 97-10 88-60-11-59 20z" />
          <path fill="#e4a88e" d="m119 111 72-1-11 61-33 14-28-28z" />
          <path fill="#f7ff19" d="m128 124 20 5-4 6-16-2zm35 5 21-5v9l-17 2z" />
          <path fill="#7043a5" d="m93 185 72 65 43-78 24 337H78z" />
          <path fill="#f4d18d" d="m177 224 149-102 13 18-151 112z" />
          <path fill="#ece0ff" d="m323 125 29-92 6 96-25 11z" />
        </g>
        <path
          fill="#ffffff"
          opacity=".25"
          d="m420 400 20-20 10 15 12-30 5 43 20 12-50 6z"
        />
      </svg>
    </div>
  );
}
