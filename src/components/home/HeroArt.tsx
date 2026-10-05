export function HeroArt({ image = "/images/mu/dk.jpg" }: { image?: string }) {
  return (
    <div className="hero-art" aria-hidden="true">
      <img src={image} alt="" fetchPriority="high" />
    </div>
  );
}
