import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { OrbitControls, useOrbit, useWidth } from '../components/orbit';
import TopBar from '../components/TopBar';
import { usePageTitle } from '../components/Layout';
import type { Branch, Skill, SkillStatus } from '../data/skills';
import { useI18n } from '../i18n';

const toneStyle = (branch: Branch) => ({ '--tone': branch.tone, '--tone-label': branch.label }) as CSSProperties;

// Grade do mapa, em px: cada ramo ocupa as colunas que usa (no mínimo 3), com um respiro entre os ramos.
const CELL_W = 72;
const CELL_H = 88;
const TILE = 52;
const PAD_X = 16;
const HEAD = 72;
const PAD_B = 28;
const BRANCH_GAP = 24;

const branchWidth = (branch: Branch) => Math.max(3, ...branch.skills.map((s) => s.col + 1)) * CELL_W;
const cellY = (row: number) => HEAD + row * CELL_H + CELL_H / 2;

type View = '2d' | '3d';
const VIEW_KEY = 'skill-tree-view';

/** A visualização escolhida fica guardada neste navegador (se o armazenamento estiver disponível). */
function savedView(): View {
  try {
    return localStorage.getItem(VIEW_KEY) === '3d' ? '3d' : '2d';
  } catch {
    return '2d';
  }
}

/** Linha em "cotovelo" do requisito até a habilidade, como nas árvores de habilidade de jogos. */
function edgePath(x1: number, y1: number, x2: number, y2: number) {
  const start = y1 + TILE / 2;
  const end = y2 - TILE / 2;
  if (x1 === x2) return `M${x1} ${start}V${end}`;
  const mid = end - 16;
  return `M${x1} ${start}V${mid}H${x2}V${end}`;
}

export default function SkillTree() {
  const { t, skills } = useI18n();
  const st = t.skills;
  usePageTitle('Skill Tree');
  const count = (status: SkillStatus) => skills.filter((s) => s.skill.status === status).length;
  const pct = (n: number) => `${((n / skills.length) * 100).toFixed(1)}%`;
  // Índice em `skills` da habilidade aberta na gaveta, ou null com a gaveta fechada.
  const [open, setOpen] = useState<number | null>(null);
  const [view, setView] = useState<View>(savedView);
  const chooseView = (v: View) => {
    setView(v);
    try {
      localStorage.setItem(VIEW_KEY, v);
    } catch {
      /* sem armazenamento: a escolha vale só nesta visita */
    }
  };
  const done = count('done');
  const wip = count('wip');

  return (
    <>
      <TopBar title="Skill Tree" />
      <main className="skills-page">
        <section className="skills-hero">
          <div className="skills-intro">
            <p className="eyebrow">{st.eyebrow}</p>
            <h1>Skill Tree</h1>
            <p className="lede">{st.intro}</p>
          </div>
          <div className="skills-progress">
            <div className="row">
              <span className="title">{st.progress}</span>
              <span className="summary">{st.summary(done, wip, skills.length)}</span>
            </div>
            <div className="bar" aria-hidden="true">
              <span className="done" style={{ width: pct(done) }} />
              <span className="wip" style={{ width: pct(wip) }} />
            </div>
            <div className="legend">
              {(['done', 'wip', 'locked'] as const).map((s) => (
                <span key={s}><span className={`dot ${s}`} />{st.status[s]}</span>
              ))}
            </div>
          </div>
        </section>

        <div className="map-toolbar">
          <div className="view-switch" role="group" aria-label={st.viewLabel}>
            {(['2d', '3d'] as const).map((v) => (
              <button key={v} type="button" aria-pressed={view === v} onClick={() => chooseView(v)}>
                {v === '2d' ? st.view2d : st.view3d}
              </button>
            ))}
          </div>
        </div>
        {(['stack', 'human'] as const).map((group) => (
          <SkillMap key={group} group={group} is3d={view === '3d'} onOpen={(id) => setOpen(skills.findIndex((s) => s.skill.id === id))} />
        ))}
      </main>
      <SkillDrawer index={open} onChange={setOpen} />
    </>
  );
}

/** Um painel do mapa (a stack ou as habilidades humanas): blocos e linhas de requisito. No 3D cada painel gira sozinho. */
function SkillMap({ group, is3d, onOpen }: { group: Branch['group']; is3d: boolean; onOpen: (id: string) => void }) {
  const ownOrbit = useOrbit({ initial: { x: 52, y: -14 }, limits: { x: [30, 66], y: [-45, 45] }, speed: { x: -0.2, y: -0.25 } });
  const orbit = is3d ? ownOrbit : null;
  const { t, tree } = useI18n();
  const st = t.skills;
  const branches = tree.filter((b) => b.group === group);
  // Posição horizontal de cada ramo: os ramos vêm lado a lado, cada um com a sua largura.
  const lefts = branches.map((_, i) => PAD_X + branches.slice(0, i).reduce((x, b) => x + branchWidth(b) + BRANCH_GAP, 0));
  const cellX = (bi: number, col: number) => lefts[bi] + col * CELL_W + CELL_W / 2;
  const rows = Math.max(...branches.flatMap((b) => b.skills.map((s) => s.row))) + 1;
  const width = lefts[lefts.length - 1] + branchWidth(branches[branches.length - 1]) + PAD_X;
  const height = HEAD + rows * CELL_H + PAD_B;

  // Linhas: as que levam a habilidades bloqueadas ficam apagadas e são desenhadas por baixo.
  const edges = branches.flatMap((branch, bi) => {
    const byId = new Map(branch.skills.map((s) => [s.id, s]));
    return branch.skills.flatMap((skill) =>
      (skill.requires ?? []).map((reqId) => {
        const req = byId.get(reqId)!;
        return {
          key: `${reqId}-${skill.id}`,
          active: skill.status !== 'locked',
          d: edgePath(cellX(bi, req.col), cellY(req.row), cellX(bi, skill.col), cellY(skill.row)),
        };
      }),
    );
  });
  edges.sort((a, b) => Number(a.active) - Number(b.active));

  // No 3D o painel vira um tabuleiro inclinado que gira com o arraste; a escala o encaixa na largura.
  const ref = useRef<HTMLElement>(null);
  const available = useWidth(ref);
  const fit = orbit && available ? Math.max(0.22, Math.min(1, (available - 32) / width) * 0.8) : 1;
  const mapStyle = orbit
    ? ({
        width,
        height,
        '--rx': `${orbit.rot.x}deg`,
        '--rz': `${orbit.rot.y}deg`,
        transform: `translate(-50%, -50%) scale(${fit}) rotateX(${orbit.rot.x}deg) rotateZ(${orbit.rot.y}deg)`,
      } as CSSProperties)
    : { width, height };

  return (
    <div className="map-block">
      <section
        ref={ref}
        className={`skill-map-scroll${orbit ? ' is-3d' : ''}${orbit?.dragging ? ' is-dragging' : ''}`}
        aria-label={st.groups[group]}
        style={orbit ? { height: Math.round(height * fit * 0.8 + 230) } : undefined}
        {...orbit?.handlers}
      >
        <div className="skill-map" style={mapStyle}>
          <svg className="skill-map-lines" width={width} height={height} aria-hidden="true">
            {edges.map((e) => <path key={e.key} d={e.d} className={e.active ? 'active' : undefined} />)}
          </svg>

          {branches.map((branch, bi) => {
            const unlocked = branch.skills.filter((s) => s.status !== 'locked').length;
            return (
              <div key={branch.name} style={toneStyle(branch)}>
                <h2 className="map-branch" style={{ left: lefts[bi], width: branchWidth(branch) }}>
                  <span className="tag">{branch.tag}</span>
                  <span className="name">{branch.name}</span>
                  <span className="count">{st.unlocked(unlocked, branch.skills.length)}</span>
                </h2>
                {branch.skills.map((skill) => (
                  <button
                    key={skill.id}
                    type="button"
                    className={`map-tile ${skill.status}`}
                    style={{ left: cellX(bi, skill.col) - TILE / 2, top: cellY(skill.row) - TILE / 2 }}
                    aria-haspopup="dialog"
                    aria-label={st.openDetails(skill.label, st.status[skill.status])}
                    onClick={() => onOpen(skill.id)}
                  >
                    {orbit && <><span className="side s-b" /><span className="side s-t" /><span className="side s-l" /><span className="side s-r" /></>}
                    <SkillIcon skill={skill} size={28} />
                    <StatusMark status={skill.status} />
                    <span className="map-tip" aria-hidden="true">
                      <strong>{skill.label}</strong>
                      <span className={`skill-status ${skill.status}`}>{st.status[skill.status]}</span>
                    </span>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </section>
      {orbit && <OrbitControls onNudge={orbit.nudge} onReset={orbit.reset} />}
    </div>
  );
}

function SkillIcon({ skill, size }: { skill: Skill; size: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={size > 40 ? 1.6 : 2} strokeLinecap="round" strokeLinejoin="round">
      <path d={skill.icon} />
    </svg>
  );
}

/** Marca no canto do bloco (onde os jogos mostram o nível): concluída, em treino ou bloqueada. */
function StatusMark({ status }: { status: SkillStatus }) {
  return (
    <span className={`map-mark ${status}`} aria-hidden="true">
      {status === 'done' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>}
      {status === 'wip' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"><path d="M12 4a8 8 0 1 1-8 8" /></svg>}
      {status === 'locked' && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 11h12v10H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3" /></svg>}
    </span>
  );
}

/** Gaveta lateral com os detalhes de uma habilidade (<dialog> nativo: Esc fecha e o foco volta ao bloco). */
function SkillDrawer({ index, onChange }: { index: number | null; onChange: (index: number | null) => void }) {
  const { t, skills } = useI18n();
  const st = t.skills;
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

  const { skill, branch } = skills[current];
  const go = (delta: number) => onChange((current + delta + skills.length) % skills.length);
  const select = (id: string) => onChange(skills.findIndex((s) => s.skill.id === id));
  const onClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) onChange(null); // clique no fundo escurecido
  };

  const list = (items: Skill[]) => new Intl.ListFormat(t.locale).format(items.map((s) => s.label));
  const before = branch.skills.filter((s) => skill.requires?.includes(s.id));
  const after = branch.skills.filter((s) => s.requires?.includes(skill.id));

  return (
    <dialog ref={ref} className="skill-drawer" aria-labelledby="skill-drawer-title" style={toneStyle(branch)} onClose={() => onChange(null)} onClick={onClick}>
      <div className="drawer-top">
        <span className="drawer-branch">{branch.name}</span>
        <button type="button" className="drawer-close" aria-label={st.closeDetails} onClick={() => onChange(null)}>
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>

      <div className="drawer-body">
        <div className="drawer-hero">
          <div className={`skill-tile big ${skill.status}`}>
            <SkillIcon skill={skill} size={46} />
          </div>
          <h2 id="skill-drawer-title">{skill.label}</h2>
          <span className={`skill-pill ${skill.status}`}>{st.status[skill.status]}</span>
          <p>{skill.desc}</p>
        </div>

        <dl className="drawer-facts">
          <div><dt>{st.requires}</dt><dd>{before.length ? list(before) : st.start}</dd></div>
          <div><dt>{st.unlocks}</dt><dd>{after.length ? list(after) : st.end}</dd></div>
          <div><dt>{st.usedIn}</dt><dd>{skill.usedIn}</dd></div>
        </dl>

        <div className="drawer-path">
          <span className="eyebrow">{st.path}</span>
          <ol>
            {branch.skills.map((s) => (
              <li key={s.id}>
                <button type="button" className={s.id === skill.id ? 'current' : undefined} aria-current={s.id === skill.id ? 'step' : undefined} onClick={() => select(s.id)}>
                  <span className={`dot ${s.status}`} />
                  <span className="name">{s.label}</span>
                  <span className="state">{st.status[s.status]}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="drawer-nav">
        <button type="button" className="prev" onClick={() => go(-1)}>{st.prev}</button>
        <button type="button" className="next" onClick={() => go(1)}>{st.next}</button>
      </div>
    </dialog>
  );
}
