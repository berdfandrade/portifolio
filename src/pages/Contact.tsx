import { useEffect, useState, type ReactNode } from 'react';
import TopBar from '../components/TopBar';
import { usePageTitle } from '../components/Layout';
import { CONTACT, emailUrl, instagramUrl, whatsappUrl } from '../data/contact';
import { useI18n } from '../i18n';

const AVATAR = `${import.meta.env.BASE_URL}assets/avatar.png`;

/** Hora atual no Brasil, atualizada a cada 30 segundos. */
function useBrazilTime(locale: string) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const format = new Intl.DateTimeFormat(locale, { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [locale]);
  return time;
}

const ICONS = {
  whatsapp: 'M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zM9 8.5c.3 2.8 2.7 5.2 5.5 5.5l1-1.3 2 .9c-.2 1.3-1.3 2-2.6 1.9C11.2 15.1 8.9 12.8 8.5 9.1c-.1-1.3.6-2.4 1.9-2.6l.9 2z',
  email: 'M3 6h18v12H3zM3 7l9 6.5L21 7',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6zM17.3 6.7v.1',
};

function Icon({ path, size = 22 }: { path: string; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

export default function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  usePageTitle(c.title);
  const time = useBrazilTime(t.locale);
  const [message, setMessage] = useState('');
  const text = message.trim();

  return (
    <>
      <TopBar title={c.title} />
      <main className="contact-page">
        <section className="contact-hero">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1>{c.heading}</h1>
          <p className="lede">{c.intro}</p>
          {time && <p className="contact-clock"><span className="pulse" aria-hidden="true" />{c.clock(time)}</p>}
        </section>

        {/* Conversa no estilo do Mensagens: o que a pessoa digita aparece como balão e vai pronto para o WhatsApp ou o e-mail */}
        <section className="chat-card" aria-labelledby="chat-title">
          <h2 id="chat-title" className="sr-only">{c.chatLabel}</h2>
          <div className="chat-head">
            <img src={AVATAR} width={40} height={40} alt="" />
            <div>
              <strong>Bernardo</strong>
              <span>{c.whatsapp} · {CONTACT.whatsapp.display}</span>
            </div>
          </div>
          <div className="chat-thread" aria-hidden="true">
            <p className="bubble in">{c.greeting}</p>
            {text ? (
              <p className="bubble out" key="out">{text}</p>
            ) : (
              <p className="bubble out typing" key="typing" title={c.typing}><span /><span /><span /></p>
            )}
          </div>
          <div className="chat-compose">
            <label className="sr-only" htmlFor="contact-message">{c.chatLabel}</label>
            <textarea
              id="contact-message"
              rows={3}
              placeholder={c.placeholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="chat-actions">
              <a className="send whatsapp" href={whatsappUrl(text)} target="_blank" rel="noreferrer">
                <Icon path={ICONS.whatsapp} size={18} />{c.sendWhatsapp}
              </a>
              <a className="send email" href={emailUrl(c.emailSubject, text)}>
                <Icon path={ICONS.email} size={18} />{c.sendEmail}
              </a>
            </div>
            <p className="chat-note">{c.sendNote}</p>
          </div>
        </section>

        <section className="channels" aria-labelledby="channels-title">
          <h2 id="channels-title">{c.channels}</h2>
          <div className="channel-grid">
            <Channel kind="whatsapp" label={c.whatsapp} value={CONTACT.whatsapp.display} copyValue={`+${CONTACT.whatsapp.number}`} href={whatsappUrl()} action={c.openWhatsapp} external />
            <Channel kind="email" label={c.email} value={CONTACT.email} copyValue={CONTACT.email} href={emailUrl()} action={c.openEmail} />
            <Channel kind="instagram" label={c.instagram} value={`@${CONTACT.instagram}`} href={instagramUrl} action={c.openInstagram} external />
          </div>
        </section>
      </main>
    </>
  );
}

/** Linha de um canal: ícone no estilo de app, nome, endereço e a ação; o cartão todo é o link, e copiar fica à direita. */
function Channel(props: { kind: keyof typeof ICONS; label: string; value: string; copyValue?: string; href: string; action: ReactNode; external?: boolean }) {
  const { t } = useI18n();
  const c = t.contact;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(props.copyValue!);
      setCopied(true);
    } catch {
      /* sem acesso à área de transferência: o endereço continua visível para copiar à mão */
    }
  };

  return (
    <article className={`channel ${props.kind}`}>
      <span className="app-icon" aria-hidden="true"><Icon path={ICONS[props.kind]} size={24} /></span>
      <div className="channel-text">
        <h3>{props.label}</h3>
        {/* O link cobre o cartão inteiro (::after): tocar em qualquer lugar abre o canal. */}
        <a className="channel-link" href={props.href} {...(props.external && { target: '_blank', rel: 'noreferrer' })}>
          <span className="channel-value">
            {/* Em telas estreitas o endereço só quebra depois do @, nunca no meio de uma palavra. */}
            {props.value.split('@').map((part, i) => (i === 0 ? part : <span key={i}>@<wbr />{part}</span>))}
          </span>
          <span className="channel-hint">{props.action}</span>
        </a>
      </div>
      {props.copyValue && (
        <button type="button" className={`channel-copy${copied ? ' is-copied' : ''}`} onClick={copy} aria-label={c.copy(props.label)}>
          {copied ? (
            <><svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>{c.copied}</>
          ) : (
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 9h11v11H9zM5 15H4V4h11v1" /></svg>
          )}
        </button>
      )}
      {!props.copyValue && (
        <svg className="channel-arrow" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 16L16 8M9 8h7v7" />
        </svg>
      )}
      <span className="sr-only" aria-live="polite">{copied ? c.copiedAnnounce(props.label) : ''}</span>
    </article>
  );
}
