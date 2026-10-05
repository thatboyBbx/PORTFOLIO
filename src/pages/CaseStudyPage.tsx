import { useParams, Link, Navigate } from "react-router-dom";
import { projectsData } from "../content/projects";
import StatusBadge from "../components/ui/StatusBadge";
import styles from "./CaseStudyPage.module.css";

const sections = [
  "Context",
  "Approach",
  "Architecture",
  "Decisions",
  "Evaluation",
];
const ids = ["context", "system", "architecture", "decisions", "outcome"];

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData.find((entry) => entry.slug === slug);
  if (!project) return <Navigate to="/404" replace />;
  const links = project.links.filter(
    (link) => link.url !== `/work/${project.slug}`,
  );
  return (
    <article
      className={`container ${styles.container} ${project.printPages === 2 ? styles.twoPage : ""}`}
    >
      <Link to="/work" className={styles.backLink}>
        ← All work
      </Link>
      <header className={styles.header}>
        <div className={styles.projectNum}>CASE STUDY / {project.number}</div>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.tagline}>{project.overview.outcome}</p>
        <div className={styles.metadata}>
          <StatusBadge status={project.status} />
          <span>{project.role}</span>
          {project.period && <span>{project.period}</span>}
        </div>
        <ul className={styles.technologies} aria-label="Project technologies">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        {links.length > 0 && (
          <div className={styles.resources}>
            {links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </header>
      <div className={styles.caseLayout}>
        <nav className={styles.stickyNav} aria-label="Case study sections">
          {sections.map((section, index) => (
            <a
              key={section}
              href={`#${ids[index]}`}
              className={styles.navSectionItem}
            >
              0{index + 1} {section}
            </a>
          ))}
        </nav>
        <div>
          <section id="context" className={styles.section}>
            <div className={styles.sectionHeader}>01 / CONTEXT</div>
            <h2 className={styles.sectionTitle}>
              The problem & my contribution
            </h2>
            <p className={styles.prose}>{project.overview.context}</p>
            <ul className={styles.list}>
              {project.overview.constraints.map((constraint) => (
                <li key={constraint}>{constraint}</li>
              ))}
            </ul>
          </section>
          <section id="system" className={styles.section}>
            <div className={styles.sectionHeader}>02 / APPROACH</div>
            <h2 className={styles.sectionTitle}>From input to useful output</h2>
            <p className={styles.prose}>{project.overview.approach}</p>
            {project.pipelineSteps && (
              <ol className={styles.pipelineList}>
                {project.pipelineSteps.map((step) => (
                  <li key={step.step} className={styles.pipelineStep}>
                    <h3 className={styles.stepLabel}>
                      {step.step} / {step.label}
                    </h3>
                    <p className={styles.stepDetail}>{step.detail}</p>
                  </li>
                ))}
              </ol>
            )}
            {project.figures
              ?.filter((figure) => figure.section === "system")
              .map((figure) => (
                <figure key={figure.src} className={styles.figure}>
                  <a
                    href={figure.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open workflow diagram at full size"
                  >
                    <img
                      src={figure.src}
                      alt={figure.alt}
                      width="720"
                      height={figure.height ?? 390}
                    />
                  </a>
                  <figcaption>
                    {figure.caption} <span>Open diagram ↗</span>
                  </figcaption>
                </figure>
              ))}
          </section>
          <section id="architecture" className={styles.section}>
            <div className={styles.sectionHeader}>03 / ARCHITECTURE</div>
            <h2 className={styles.sectionTitle}>How the pieces fit</h2>
            <p className={styles.prose}>{project.systemArchitecture.summary}</p>
            {project.figures
              ?.filter((figure) => figure.section === "architecture")
              .map((figure) => (
                <figure key={figure.src} className={styles.figure}>
                  <a
                    href={figure.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open architecture diagram at full size"
                  >
                    <img
                      src={figure.src}
                      alt={figure.alt}
                      width="720"
                      height={figure.height ?? 350}
                      loading="lazy"
                    />
                  </a>
                  <figcaption>
                    {figure.caption} <span>Open diagram ↗</span>
                  </figcaption>
                </figure>
              ))}
            <dl className={styles.components}>
              {project.systemArchitecture.components.map((component) => (
                <div key={component.name}>
                  <dt>{component.name}</dt>
                  <dd>{component.description}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section id="decisions" className={styles.section}>
            <div className={styles.sectionHeader}>04 / DECISIONS</div>
            <h2 className={styles.sectionTitle}>Engineering trade-offs</h2>
            <div className={styles.decisionsGrid}>
              {project.technicalDecisions.map((decision) => (
                <div key={decision.title} className={styles.decisionCard}>
                  <h3 className={styles.decisionTitle}>{decision.title}</h3>
                  <p className={styles.decisionChoice}>{decision.choice}</p>
                  <p className={styles.decisionRationale}>
                    {decision.rationale}
                  </p>
                  <p className={styles.decisionTradeOff}>
                    Trade-off: {decision.tradeOff}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section id="outcome" className={styles.section}>
            <div className={styles.sectionHeader}>05 / EVALUATION</div>
            <h2 className={styles.sectionTitle}>Results, with boundaries</h2>
            <p className={styles.prose}>{project.evaluation.summary}</p>
            {project.evaluation.metrics && (
              <dl className={styles.metrics}>
                {project.evaluation.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.label}</dt>
                    <dd className={styles.metricValue}>{metric.value}</dd>
                    <dd className={styles.metricDetail}>{metric.detail}</dd>
                  </div>
                ))}
              </dl>
            )}
            <ul className={styles.list}>
              {project.evaluation.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            {project.evaluation.limitations && (
              <aside
                className={styles.boundaries}
                aria-labelledby="limitations-title"
              >
                <h3 id="limitations-title" className={styles.decisionTitle}>
                  What this does not prove
                </h3>
                <ul className={styles.list}>
                  {project.evaluation.limitations.map((limitation) => (
                    <li key={limitation}>{limitation}</li>
                  ))}
                </ul>
                <p className={styles.prose}>{project.evaluation.nextSteps}</p>
              </aside>
            )}
            {project.evaluation.sourceNote && (
              <p className={styles.sourceNote}>
                {project.evaluation.sourceNote}
              </p>
            )}
          </section>
          <Link to="/contact" className={styles.backLink}>
            Discuss this work →
          </Link>
        </div>
      </div>
    </article>
  );
}
