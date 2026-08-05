import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type {
  SurveyQuestionAggregate,
  SurveyReportData,
  SurveySectionId,
} from '../utils/SurveyReportData';
import styles from './SurveyReportApp.module.css';

export interface SurveyReportChapter {
  slug: string;
  section?: SurveySectionId;
  eyebrow: string;
  title: string;
  deck: string;
}

export interface SurveyReportFinding {
  headline: string;
  insight: string;
}

export interface SurveyReportStat {
  eyebrow: string;
  value: string;
  label: string;
  href: string;
}

export interface SurveyMethodologyCopy {
  deck: string;
  collection: string;
  denominator: string;
  otherYearLabel: string;
  otherYearHref: string;
}

interface Props {
  report: SurveyReportData;
  chapters: SurveyReportChapter[];
  findings: Record<string, SurveyReportFinding>;
  stats: SurveyReportStat[];
  methodology: SurveyMethodologyCopy;
}

const formatShare = (share: number) => `${Math.round(share)}%`;
const formatDelta = (delta: number) =>
  `${delta > 0 ? '+' : delta < 0 ? '−' : ''}${Math.abs(Math.round(delta))}`;
const chapterQuestions = (report: SurveyReportData, chapter: SurveyReportChapter) =>
  chapter.section
    ? report.questions.filter((question) => question.section === chapter.section)
    : [];

function DeltaChip({ delta, compare }: { delta?: number; compare: boolean }) {
  if (!compare || delta === undefined) return null;
  return (
    <span
      class={`${styles.delta} ${delta < 0 ? styles.deltaDown : ''}`}
      title="Percentage-point change from 2024"
    >
      {formatDelta(delta)}
    </span>
  );
}

function BarRows({
  question,
  compare,
  options = question.options,
}: {
  question: SurveyQuestionAggregate;
  compare: boolean;
  options?: SurveyQuestionAggregate['options'];
}) {
  return (
    <ol class={styles.barRows}>
      {options.map((option, index) => (
        <li class={index === 0 ? styles.leadingBar : ''} key={index}>
          <div class={styles.barLabel}>
            <span>{option.label}</span>
            <span class={styles.barReadout}>
              {formatShare(option.share)}
              <DeltaChip delta={option.delta} compare={compare} />
            </span>
          </div>
          <div
            class={`${styles.barTrack} ${compare ? styles.comparedTrack : ''}`}
            aria-hidden="true"
          >
            {compare && option.previousShare !== undefined && (
              <i
                class={styles.previousBar}
                style={{ width: `${Math.min(option.previousShare, 100)}%` }}
              />
            )}
            <b class={styles.currentBar} style={{ width: `${Math.min(option.share, 100)}%` }} />
          </div>
        </li>
      ))}
    </ol>
  );
}

function InlineChart({
  question,
  compare,
}: {
  question: SurveyQuestionAggregate;
  compare: boolean;
}) {
  const topOptions = question.options.slice(0, 8);
  const remaining = question.options.slice(8);
  return (
    <figure class={styles.inlineChart} aria-label={question.label}>
      {question.multiChoice && <div class={styles.chartMeta}>Multiple selections allowed</div>}
      <BarRows question={question} compare={compare} options={topOptions} />
      {remaining.length > 0 && (
        <details class={styles.longTail}>
          <summary>View all {question.options.length} options</summary>
          <BarRows question={question} compare={compare} options={remaining} />
        </details>
      )}
    </figure>
  );
}

function StageChart({
  question,
  compare,
}: {
  question: SurveyQuestionAggregate;
  compare: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const options = expanded ? question.options : question.options.slice(0, 8);

  useEffect(() => setExpanded(false), [question.id]);

  return (
    <div class={styles.stageChart} aria-live="polite">
      <header class={styles.stageHead}>
        <div>
          <span>QUESTION {String(question.number).padStart(2, '0')}</span>
          <h3>{question.label}</h3>
        </div>
      </header>
      <div class={`${styles.stageBars} ${expanded ? styles.stageBarsExpanded : ''}`}>
        <BarRows question={question} compare={compare} options={options} />
      </div>
      <footer class={styles.stageFooter}>
        <div class={`${styles.legend} ${!compare ? styles.legendSingle : ''}`}>
          <span>
            <i class={styles.legendCurrent} />
            2025
          </span>
          {compare && (
            <span>
              <i class={styles.legendPrevious} />
              2024
            </span>
          )}
        </div>
        {question.options.length > 8 && (
          <button type="button" onClick={() => setExpanded((value) => !value)}>
            {expanded ? 'Show top 8' : `View all ${question.options.length} options`}
          </button>
        )}
      </footer>
    </div>
  );
}

function Methodology({
  report,
  chapter,
  methodology,
}: {
  report: SurveyReportData;
  chapter: SurveyReportChapter;
  methodology: SurveyMethodologyCopy;
}) {
  const responseCounts = report.questions.map((question) => question.responseCount);
  const minimumResponses = Math.min(...responseCounts);
  const maximumResponses = Math.max(...responseCounts);

  return (
    <section class={styles.methodology} data-chapter-panel={chapter.slug} id="report-methodology">
      <header class={styles.chapterHead}>
        <p>{chapter.eyebrow}</p>
        <h2>{chapter.title}</h2>
        <div>{methodology.deck}</div>
      </header>
      <div class={styles.methodGrid}>
        <article>
          <span>RESPONSES</span>
          <strong>{report.responseRows}</strong>
          <p>
            Submitted rows in the 2025 source. Per-question nonblank respondent bases range from{' '}
            {minimumResponses} to {maximumResponses}.
          </p>
        </article>
        <article>
          <span>COLLECTION</span>
          <strong>2025</strong>
          <p>{methodology.collection}</p>
        </article>
      </div>
      <aside class={styles.methodNote}>
        <span>READING NOTE</span>
        <p>{methodology.denominator}</p>
      </aside>
      <a class={styles.otherYearLink} href={methodology.otherYearHref}>
        {methodology.otherYearLabel}
      </a>
    </section>
  );
}

export default function SurveyReportApp({ report, chapters, findings, stats, methodology }: Props) {
  const firstChapter = chapters.find((chapter) => chapter.section)?.slug ?? 'context';
  const initialQuestions = Object.fromEntries(
    chapters
      .filter((chapter) => chapter.section)
      .map((chapter) => [chapter.slug, chapterQuestions(report, chapter)[0]?.number ?? 1]),
  );
  const [enhanced, setEnhanced] = useState(false);
  const [activeChapter, setActiveChapter] = useState(firstChapter);
  const [activeQuestions, setActiveQuestions] = useState<Record<string, number>>(initialQuestions);
  const [compare, setCompare] = useState(true);
  const [desktop, setDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  const activeChapterData =
    chapters.find((chapter) => chapter.slug === activeChapter) ?? chapters[0];
  const activeChapterQuestions = useMemo(
    () => chapterQuestions(report, activeChapterData),
    [report, activeChapterData],
  );
  const activeQuestionNumber = activeQuestions[activeChapter] ?? activeChapterQuestions[0]?.number;
  const activeQuestion =
    activeChapterQuestions.find((question) => question.number === activeQuestionNumber) ??
    activeChapterQuestions[0];

  const showRoute = (slug: string, questionNumber?: number, scroll = true) => {
    const chapter = chapters.find((item) => item.slug === slug) ?? chapters[0];
    const selectedQuestion = questionNumber ?? chapterQuestions(report, chapter)[0]?.number;
    setActiveChapter(chapter.slug);
    if (selectedQuestion)
      setActiveQuestions((current) => ({ ...current, [chapter.slug]: selectedQuestion }));
    if (!scroll) return;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const target = questionNumber
          ? document.getElementById(`report-q-${questionNumber}`)
          : (document.querySelector(`[data-chapter-content="${chapter.slug}"]`) ??
            document.querySelector(`[data-chapter-panel="${chapter.slug}"]`));
        target?.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: questionNumber && desktop ? 'center' : 'start',
        });
      }),
    );
  };

  const readHash = (scroll = true) => {
    const [slug, questionPart] = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    const questionNumber = questionPart?.match(/^q(\d+)$/)?.[1];
    showRoute(slug || firstChapter, questionNumber ? Number(questionNumber) : undefined, scroll);
  };

  useEffect(() => {
    setEnhanced(true);
    const desktopQuery = matchMedia('(min-width: 1000px)');
    const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
    const syncMedia = () => {
      setDesktop(desktopQuery.matches);
      setReducedMotion(motionQuery.matches);
    };
    const onHashChange = () => readHash();
    syncMedia();
    desktopQuery.addEventListener('change', syncMedia);
    motionQuery.addEventListener('change', syncMedia);
    addEventListener('hashchange', onHashChange);
    const hasReportRoute = location.hash.startsWith('#/');
    if (!hasReportRoute) history.replaceState(null, '', `#/${firstChapter}`);
    readHash(hasReportRoute);
    return () => {
      desktopQuery.removeEventListener('change', syncMedia);
      motionQuery.removeEventListener('change', syncMedia);
      removeEventListener('hashchange', onHashChange);
    };
  }, []);

  useEffect(() => {
    if (!enhanced || !desktop || reducedMotion || !activeChapterData.section || !panelRef.current)
      return;
    const steps = [...panelRef.current.querySelectorAll<HTMLElement>('[data-report-step]')];
    let frame = 0;
    const updateActiveStep = () => {
      frame = 0;
      const activationLine = innerHeight * 0.45;
      const nearest = steps.reduce(
        (selection, step) => {
          const bounds = step.getBoundingClientRect();
          const distance =
            activationLine < bounds.top
              ? bounds.top - activationLine
              : activationLine > bounds.bottom
                ? activationLine - bounds.bottom
                : 0;
          return distance < selection.distance ? { step, distance } : selection;
        },
        { step: steps[0], distance: Number.POSITIVE_INFINITY },
      ).step;
      if (!nearest) return;
      const number = Number(nearest.dataset.questionNumber);
      setActiveQuestions((current) =>
        current[activeChapter] === number ? current : { ...current, [activeChapter]: number },
      );
      const nextHash = `#/${activeChapter}/q${number}`;
      if (location.hash !== nextHash) history.replaceState(null, '', nextHash);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveStep);
    };
    addEventListener('scroll', scheduleUpdate, { passive: true });
    addEventListener('resize', scheduleUpdate);
    scheduleUpdate();
    return () => {
      removeEventListener('scroll', scheduleUpdate);
      removeEventListener('resize', scheduleUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [activeChapter, activeChapterData.section, desktop, enhanced, reducedMotion]);

  const openRoute = (href: string) => {
    const [slug, questionPart] = href.replace(/^#\/?/, '').split('/').filter(Boolean);
    const number = questionPart?.match(/^q(\d+)$/)?.[1];
    if (location.hash !== href) history.pushState(null, '', href);
    showRoute(slug, number ? Number(number) : undefined);
  };

  const navigate = (event: Event, href: string) => {
    event.preventDefault();
    openRoute(href);
  };

  const selectRoute = (event: Event) => {
    openRoute((event.currentTarget as HTMLSelectElement).value);
  };

  return (
    <div
      class={`${styles.app} ${enhanced ? styles.enhanced : ''} ${reducedMotion ? styles.reducedMotion : ''}`}
    >
      <section class={styles.heroStats} aria-label="Headline survey findings">
        {stats.map((stat, index) => (
          <a key={stat.href} href={stat.href} onClick={(event) => navigate(event, stat.href)}>
            <span>
              {stat.eyebrow}
              <i>{String(index + 1).padStart(2, '0')}</i>
            </span>
            <strong>{stat.value}</strong>
            <p>{stat.label}</p>
          </a>
        ))}
      </section>

      <nav class={styles.chapterSwitcher} aria-label="Report chapters">
        <span>READ BY CHAPTER</span>
        <div class={styles.chapterTabs}>
          {chapters.map((chapter, index) => {
            const href = `#/${chapter.slug}`;
            return (
              <a
                key={chapter.slug}
                href={href}
                aria-current={enhanced && activeChapter === chapter.slug ? 'page' : undefined}
                onClick={(event) => navigate(event, href)}
              >
                <i>{String(index + 1).padStart(2, '0')}</i>
                {chapter.title}
              </a>
            );
          })}
        </div>
        <label class={styles.chapterSelectWrap}>
          <span>Chapter</span>
          <select value={`#/${activeChapter}`} onChange={selectRoute}>
            {chapters.map((chapter, index) => (
              <option key={chapter.slug} value={`#/${chapter.slug}`}>
                {String(index + 1).padStart(2, '0')} · {chapter.title}
              </option>
            ))}
          </select>
        </label>
        {activeChapter !== 'methodology' && (
          <button
            class={styles.compareToggle}
            type="button"
            role="switch"
            aria-checked={compare}
            onClick={() => setCompare((value) => !value)}
          >
            <span>VS 2024</span>
            <i class={styles.toggleTrack} aria-hidden="true">
              <b />
            </i>
            <strong>{compare ? 'ON' : 'OFF'}</strong>
          </button>
        )}
      </nav>

      <div class={styles.chapterViewport}>
        {chapters.map((chapter) => {
          if (!chapter.section)
            return (
              <div key={chapter.slug} hidden={enhanced && chapter.slug !== activeChapter}>
                <Methodology report={report} chapter={chapter} methodology={methodology} />
              </div>
            );
          const questions = chapterQuestions(report, chapter);
          return (
            <section
              key={chapter.slug}
              ref={chapter.slug === activeChapter ? panelRef : undefined}
              class={styles.chapterPanel}
              data-chapter-panel={chapter.slug}
              id={`report-chapter-${chapter.slug}`}
              hidden={enhanced && chapter.slug !== activeChapter}
            >
              <header class={styles.chapterHead}>
                <p>{chapter.eyebrow}</p>
                <h2>{chapter.title}</h2>
                <div>{chapter.deck}</div>
              </header>
              <div class={styles.chapterLayout} data-chapter-content={chapter.slug}>
                <nav class={styles.questionRail} aria-label={`${chapter.title} questions`}>
                  <ol>
                    {questions.map((question) => {
                      const href = `#/${chapter.slug}/q${question.number}`;
                      return (
                        <li key={question.id}>
                          <a
                            class={
                              activeQuestions[chapter.slug] === question.number
                                ? styles.activeRailLink
                                : ''
                            }
                            href={href}
                            onClick={(event) => navigate(event, href)}
                          >
                            Q{question.number}
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                  <label class={styles.questionSelectWrap}>
                    <span>Question</span>
                    <select
                      value={`#/${chapter.slug}/q${activeQuestions[chapter.slug]}`}
                      onChange={selectRoute}
                    >
                      {questions.map((question) => (
                        <option key={question.id} value={`#/${chapter.slug}/q${question.number}`}>
                          Q{question.number} · {question.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </nav>
                <article class={styles.steps}>
                  {questions.map((question) => {
                    const finding = findings[question.id];
                    const active = activeQuestions[chapter.slug] === question.number;
                    return (
                      <section
                        key={question.id}
                        class={`${styles.step} ${active ? styles.activeStep : ''}`}
                        data-report-step
                        data-report-question={question.id}
                        data-question-number={question.number}
                        id={`report-q-${question.number}`}
                      >
                        <div class={styles.stepIndex}>
                          FINDING {String(question.number).padStart(2, '0')}
                        </div>
                        <h3>{finding?.headline ?? question.label}</h3>
                        <p>{finding?.insight}</p>
                        <InlineChart question={question} compare={compare} />
                      </section>
                    );
                  })}
                </article>
                <aside class={styles.stageWrap} aria-label="Visual evidence">
                  {enhanced && activeQuestion && chapter.slug === activeChapter && (
                    <StageChart question={activeQuestion} compare={compare} />
                  )}
                </aside>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
