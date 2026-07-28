// A Preact island is static unless given client:*.
import { useEffect, useRef } from 'preact/hooks';
import { mountTypewriter } from '../scripts/typewriter';

interface HeroButton {
  href: string;
  label: string;
}

interface Props {
  status: string;
  status_href?: string;
  title: string[];
  subtitle: string;
  beneficiaries?: string[];
  typewriter_underline?: boolean;
  primary_button: HeroButton;
  secondary_button: HeroButton;
}

const missionLine1 = 'We are an independent research institute with a mission to';
const missionLine2 = 'ensure that frontier AI is safe, aligned and accountable to';

export default function Hero({
  status,
  status_href,
  title,
  subtitle,
  beneficiaries = [],
  typewriter_underline = false,
  primary_button,
  secondary_button,
}: Props) {
  const typewriterRef = useRef<HTMLParagraphElement>(null);
  const initialBeneficiary = beneficiaries[0];

  useEffect(() => {
    const typewriter = typewriterRef.current;

    if (!typewriter) {
      return;
    }

    return mountTypewriter(typewriter);
  }, []);

  return (
    <header class="hero" data-reveal>
      <canvas
        class="hero-canvas"
        data-widget="hero-cycle"
        aria-hidden="true"
      >
      </canvas>
      <div class="hero-copy">
        {status_href ? (
          <a class="status-pill" href={status_href}>
            <span aria-hidden="true"></span>
            {status}
          </a>
        ) : (
          <p class="status-pill">
            <span aria-hidden="true"></span>
            {status}
          </p>
        )}
        <h1>
          {title.map((line, index) => (
            index === 2 ? (
              <em class="glitch" data-text={line}>
                {line}
              </em>
            ) : (
              <span>
                {line}
              </span>
            )
          ))}
        </h1>
        <p
          ref={typewriterRef}
          class="hero-subtitle"
          data-widget="hero-typewriter"
          data-text={subtitle}
          data-beneficiaries={JSON.stringify(beneficiaries)}
          data-underline={typewriter_underline ? 'true' : 'false'}
          aria-label={subtitle}
        >
          <span class="hero-typewriter-line">
            <span class="hero-typewriter-text">
              {missionLine1}
            </span>
          </span>
          <span class="hero-typewriter-line">
            <span class="hero-typewriter-text">
              {missionLine2}
            </span>
          </span>
          <span class="hero-typewriter-line hero-typewriter-dynamic">
            <span
              class="hero-typewriter-glitch"
              data-text={initialBeneficiary}
            >
              <span class="hero-typewriter-text">
                {initialBeneficiary}
              </span>
              <span
                class="hero-typewriter-cursor"
                aria-hidden="true"
              >
              </span>
            </span>
          </span>
        </p>
        <nav class="actions" aria-label="Primary actions">
          <a class="button primary" href={primary_button.href}>
            {primary_button.label}
          </a>
          <a class="button" href={secondary_button.href}>
            {secondary_button.label}
          </a>
        </nav>
        <div class="graph-switcher" aria-label="Hero visual">
          <button
            class="active"
            type="button"
            data-hero-mode="planes"
            title="Layered planes"
          >
          </button>
          <button
            type="button"
            data-hero-mode="sphere"
            title="Alignment sphere"
          >
          </button>
          <button
            type="button"
            data-hero-mode="contour"
            title="Contour field"
          >
          </button>
        </div>
      </div>
    </header>
  );
}
