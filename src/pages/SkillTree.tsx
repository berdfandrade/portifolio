import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import TopBar from '../components/TopBar';
import { usePageTitle } from '../components/Layout';
import { ALL_SKILLS, STATUS, TREE, type Branch, type Skill, type SkillStatus } from '../data/skills';

const toneStyle = (branch: Branch) => ({ '--tone': branch.tone, '--tone-label': branch.label }) as CSSProperties;

const count = (status: SkillStatus) => ALL_SKILLS.filter((s) => s.skill.status === status).length;
const pct = (n: number) => `${((n / ALL_SKILLS.length) * 100).toFixed(1)}%`;

export default function SkillTree() {
  usePageTitle('Skill Tree');
  // Índice em ALL_SKILLS da habilidade aberta na gaveta, ou null com a gaveta fechada.
  const [open, setOpen] = useState<number | null>(null);
  const done = count('done');
  const wip = count('wip');

  return (
    <>
      <TopBar title="Skill Tree" />
      <main className="skills-page">
        <section className="skills-hero">
          <div className="skills-intro">
            <p className="eyebrow">Classe Desenvolvedor</p>
            <h1>Skill Tree</h1>
            <p className="lede">O mapa do que já domino, do que estou treinando e do que vem por aí. Toque numa habilidade para ver os detalhes.</p>
          </div>
          <div className="skills-progress">
            <div className="row">
              <span className="title">Progresso</span>
              <span className="summary">{done} dominadas · {wip} treinando · {ALL_SKILLS.length} no total</span>
            </div>
            <div className="bar" aria-hidden="true">
              <span className="done" style={{ width: pct(done) }} />
              <span className="wip" style={{ width: pct(wip) }} />
            </div>
            <div className="legend">
              {(['done', 'wip', 'locked'] as const).map((s) => (
                <span key={s}><span className={`dot ${s}`} />{STATUS[s].text}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="tree" aria-label="Árvore de habilidades">
          {TREE.map((branch) => {
            const unlocked = branch.skills.filter((s) => s.status !== 'locked').length;
            return (
              <div key={branch.name} className="branch" style={toneStyle(branch)}>
                <div className="branch-head">
                  <span className="tag">{branch.tag}</span>
                  <h2>{branch.name}</h2>
                  <span className="count">{unlocked} de {branch.skills.length} desbloqueadas</span>
                </div>
                <ol className="branch-skills">
                  {branch.skills.map((skill, i) => (
                    <li key={skill.id} className={`skill-node ${skill.status}`}>
                      {i > 0 && <span className="link" aria-hidden="true" />}
                      <button
                        type="button"
                        className={`skill-tile ${skill.status}`}
                        aria-haspopup="dialog"
                        aria-label={`${skill.label}, ${STATUS[skill.status].text.toLowerCase()}. Abrir detalhes`}
                        onClick={() => setOpen(ALL_SKILLS.findIndex((s) => s.skill.id === skill.id))}
                      >
                        <SkillIcon skill={skill} size={32} />
                        <StatusBadge status={skill.status} />
                      </button>
                      <span className="skill-label">{skill.label}</span>
                      <span className={`skill-status ${skill.status}`}>{STATUS[skill.status].text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </section>
      </main>
      <SkillDrawer index={open} onChange={setOpen} />
    </>
  );
}

function SkillIcon({ skill, size }: { skill: Skill; size: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={size > 40 ? 1.6 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={skill.icon} />
    </svg>
  );
}

function StatusBadge({ status }: { status: SkillStatus }) {
  return (
    <span className={`skill-badge ${status}`} aria-hidden="true">
      {status === 'done' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>}
      {status === 'wip' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M12 4a8 8 0 1 1-8 8" /></svg>}
      {status === 'locked' && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 11h12v10H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3" /></svg>}
    </span>
  );
}

/** Gaveta lateral com os detalhes de uma habilidade (<dialog> nativo: Esc fecha e o foco volta ao bloco). */
function SkillDrawer({ index, onChange }: { index: number | null; onChange: (index: number | null) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  // Guarda a última habilidade aberta para o conteúdo não sumir durante a animação de saída.
  const last = useRef(0);
  if (index !== null) last.current = index;
  const current = index ?? last.current;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  const { skill, branch, index: pos } = ALL_SKILLS[current];
  const go = (delta: number) => onChange((current + delta + ALL_SKILLS.length) % ALL_SKILLS.length);
  const select = (id: string) => onChange(ALL_SKILLS.findIndex((s) => s.skill.id === id));
  const onClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) onChange(null); // clique no fundo escurecido
  };

  const requires = pos > 0 ? branch.skills[pos - 1].label : 'Nada — ponto de partida';
  const unlocks = pos < branch.skills.length - 1 ? branch.skills[pos + 1].label : 'Fim do ramo (por enquanto)';

  return (
    <dialog ref={ref} className="skill-drawer" aria-labelledby="skill-drawer-title" style={toneStyle(branch)} onClose={() => onChange(null)} onClick={onClick}>
      <div className="drawer-top">
        <span className="drawer-branch">{branch.name}</span>
        <button type="button" className="drawer-close" aria-label="Fechar detalhes" onClick={() => onChange(null)}>
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>

      <div className="drawer-body">
        <div className="drawer-hero">
          <div className={`skill-tile big ${skill.status}`}>
            <SkillIcon skill={skill} size={46} />
          </div>
          <h2 id="skill-drawer-title">{skill.label}</h2>
          <span className={`skill-pill ${skill.status}`}>{STATUS[skill.status].text}</span>
          <p>{skill.desc}</p>
        </div>

        <dl className="drawer-facts">
          <div><dt>Requer</dt><dd>{requires}</dd></div>
          <div><dt>Desbloqueia</dt><dd>{unlocks}</dd></div>
          <div><dt>Usada em</dt><dd>{skill.usedIn}</dd></div>
        </dl>

        <div className="drawer-path">
          <span className="eyebrow">Caminho no ramo</span>
          <ol>
            {branch.skills.map((s) => (
              <li key={s.id}>
                <button type="button" className={s.id === skill.id ? 'current' : undefined} aria-current={s.id === skill.id ? 'step' : undefined} onClick={() => select(s.id)}>
                  <span className={`dot ${s.status}`} />
                  <span className="name">{s.label}</span>
                  <span className="state">{STATUS[s.status].text}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="drawer-nav">
        <button type="button" className="prev" onClick={() => go(-1)}>‹ Anterior</button>
        <button type="button" className="next" onClick={() => go(1)}>Próxima ›</button>
      </div>
    </dialog>
  );
}
