import { Translated } from "@/i18n/Translated";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroArt } from "./HeroArt";
const slides = [
  {
    label: "NIGHTMARE × LOJA",
    image: "/images/mu/dk.jpg",
    title: (
      <>
        <Translated text="O poder tem" />
        <br />
        <Translated text="um novo nome." />
      </>
    ),
    description: "Itens da temporada disponíveis na loja.",
    cta: "Ir à loja",
    to: "/shop",
  },
  {
    label: "BEM-VINDO AO PESADELO",
    image: "/images/mu/dw.jpg",
    title: (
      <>
        <Translated text="Nightmare" />
        <br />
        <Translated text="Season 6" />
      </>
    ),
    description:
      "Experiência x3 e drop x3. 250 resets. Uma nova história para conquistar.",
    cta: "Jogue agora",
    to: "/download",
  },
];
export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const move = (n: number) =>
    setIndex((i) => (i + n + slides.length) % slides.length);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6000,
    );
    return () => clearInterval(timer);
  }, [paused]);
  const slide = slides[index];
  return (
    <section
      className="hero"
      aria-label="Destaques"
      aria-roledescription="carrossel"
    >
      <HeroArt image={slide.image} />
      <div className="hero-content">
        <p className="mb-7 text-sm font-bold tracking-[.2em]">
          <Translated text={slide.label} />
        </p>
        <h1 className="hero-title">
          <Translated text={slide.title} />
        </h1>
        <p className="hero-description my-6 max-w-sm text-lg">
          <Translated text={slide.description} />
        </p>
        <Button asChild size="lg" className="min-w-44 rounded-full text-lg">
          <Link to={slide.to}>
            <Translated text={slide.cta} />
            <ArrowUpRight />
          </Link>
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-3 top-1/2 z-10 hide-mobile"
        onClick={() => move(-1)}
        aria-label="Destaque anterior"
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-3 top-1/2 z-10 hide-mobile"
        onClick={() => move(1)}
        aria-label="Próximo destaque"
      >
        <ChevronRight />
      </Button>
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={"Destaque " + (i + 1)}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className={
              "h-2.5 rounded-full " +
              (i === index ? "w-8 bg-white" : "w-2.5 bg-white/40")
            }
          />
        ))}
        <Button
          size="icon"
          variant="ghost"
          aria-label={paused ? "Retomar" : "Pausar"}
          onClick={() => setPaused(!paused)}
        >
          {paused ? (
            <Play className="h-4 w-4" />
          ) : (
            <Pause className="h-4 w-4" />
          )}
        </Button>
      </div>
    </section>
  );
}
