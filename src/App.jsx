import { useEffect, useMemo, useRef, useState } from 'react'
import Logo from './components/Logo.jsx'

/* ----------------------------- Контакты / ссылки ---------------------------- */
const PHONE_HUMAN = '+7 925 127-91-13'
const PHONE_RAW = '79251279113'
// MAX-мессенджер. У MAX НЕТ ссылки-чата по номеру телефона (в отличие от wa.me) —
// нужен личный профиль вида https://max.ru/u/XXXXXXXX (или @бот / ссылка-приглашение).
// Вставьте сюда вашу ссылку MAX — и все кнопки заработают.
const MAX_URL = 'https://max.ru/'
const MAX = (_text) => MAX_URL
const TG = `https://t.me/+${PHONE_RAW}`
const media = (file) => `${import.meta.env.BASE_URL}media/${file}`
const POLICY_HREF = `${import.meta.env.BASE_URL}politika.html`

/* Чекбокс согласия на обработку персональных данных (152-ФЗ). */
function ConsentCheck({ checked, onChange, id, tone = 'light' }) {
  const base = tone === 'dark' ? 'text-cream/60' : 'text-ink-500'
  return (
    <label htmlFor={id} className={`flex cursor-pointer items-start gap-2.5 text-left text-xs leading-snug ${base}`}>
      <input
        id={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
      />
      <span>
        Я даю согласие на обработку персональных данных в соответствии с Федеральным законом
        № 152-ФЗ «О персональных данных» и принимаю{' '}
        <a href={POLICY_HREF} target="_blank" rel="noreferrer" className="underline hover:text-gold">
          Политику обработки персональных данных
        </a>.
      </span>
    </label>
  )
}

/* ------------------------------- Утилиты UI -------------------------------- */
function Reveal({ children, className = '', as: Tag = 'div', delay = 0 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${shown ? 'is-visible' : ''} ${className}`}>
      {children}
    </Tag>
  )
}

function useCountdown() {
  const target = useMemo(() => {
    const now = new Date()
    const d = new Date(now)
    const day = now.getDay()
    const daysUntilSunday = (7 - day) % 7
    d.setDate(now.getDate() + daysUntilSunday)
    d.setHours(23, 59, 59, 0)
    if (d.getTime() <= now.getTime()) d.setDate(d.getDate() + 7)
    return d.getTime()
  }, [])
  const [left, setLeft] = useState(target - Date.now())
  useEffect(() => {
    const t = setInterval(() => setLeft(target - Date.now()), 1000)
    return () => clearInterval(t)
  }, [target])
  const s = Math.max(0, Math.floor(left / 1000))
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 }
}
const pad = (n) => String(n).padStart(2, '0')

/* --------------------------------- Иконки ---------------------------------- */
const Ico = {
  shield: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  cam: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="7" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M16 10l5-3v10l-5-3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>),
  bell: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M6 16V11a6 6 0 1112 0v5l2 2H4l2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M10 20a2 2 0 004 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  fire: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3c1 3-2 4-2 7a2 2 0 104 0c0 0 2 1 2 4a4 4 0 11-8 0c0-5 4-7 4-11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>),
  phone: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M6 3h3l2 5-2 1c1 3 3 5 6 6l1-2 5 2v3c0 1-1 2-2 2A16 16 0 014 6c0-1 1-3 2-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>),
  max: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 5h16a1 1 0 011 1v10a1 1 0 01-1 1H9l-4 3v-3H4a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M8 12l2.5-3 3 4L16 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  tg: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M21.9 4.3l-3.3 15.6c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.3-.1-.5-.6-.2L6.4 13.2 1.6 11.7c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.4 1.3z"/></svg>),
  clock: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  lock: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8 10V8a4 4 0 018 0v2" stroke="currentColor" strokeWidth="1.6"/></svg>),
  wallet: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M16 12h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M3 9h13" stroke="currentColor" strokeWidth="1.6"/></svg>),
  route: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.6"/><circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.6"/><path d="M8.4 6H15a3 3 0 010 6H9a3 3 0 000 6h6.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  chevron: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
}

const NAV = [
  { href: '#projects', label: 'Проекты' },
  { href: '#team', label: 'Команда' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#faq', label: 'Вопросы' },
]

/* --------------------------------- Шапка ----------------------------------- */
function Header({ onCta }) {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const link = solid ? 'text-ink-500 hover:text-gold' : 'text-cream/80 hover:text-white'
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${solid ? 'bg-cream/95 shadow-[0_10px_30px_-20px_rgba(21,21,26,0.4)] backdrop-blur' : 'bg-transparent'}`}>
      <div className="container-x flex items-center justify-between py-3">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={`text-sm font-semibold transition-colors ${link}`}>{n.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <a href={`tel:+${PHONE_RAW}`} className={`text-sm font-bold transition-colors ${solid ? 'text-ink hover:text-gold' : 'text-white'}`}>{PHONE_HUMAN}</a>
          <button onClick={onCta} className="btn-primary !py-3 !px-5 text-sm">Рассчитать</button>
        </div>
        <a href={`tel:+${PHONE_RAW}`} className="btn-primary !p-3 md:hidden" aria-label="Позвонить"><Ico.phone className="h-5 w-5" /></a>
      </div>
    </header>
  )
}

/* ---------------------------------- Hero ----------------------------------- */
function Hero({ onCta }) {
  const c = useCountdown()
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink pt-20 text-cream">
      <video className="absolute inset-0 h-full w-full object-cover opacity-90" autoPlay muted loop playsInline poster={media('hero-cozy-end.png')}>
        <source src={media('hero-cozy.mp4')} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

      <div className="container-x relative z-10 py-12">
        <div className="max-w-2xl">
          <span className="eyebrow animate-fadeUp">Проектирование · монтаж · обслуживание</span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
            Видеонаблюдение и безопасность вашего дома —{' '}
            <span className="text-gold">под ключ за 2–3 дня</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cream/80">
            Проектируем, монтируем и обслуживаем сами: камеры 4K, охранная сигнализация и датчики —
            всё в одном приложении. Гарантия 5 лет, поддержка 24/7.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={onCta} className="btn-primary text-base">Рассчитать стоимость за 2 минуты</button>
            <a href={MAX('Здравствуйте! Хочу рассчитать видеонаблюдение для загородного дома.')} target="_blank" rel="noreferrer" className="btn-max">
              <Ico.max className="h-5 w-5" /> Написать в MAX
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-cream/75">
            {['14 лет на рынке', '850+ домов', 'Гарантия 5 лет', 'Работаем по договору'].map((t) => (
              <span key={t} className="inline-flex items-center gap-2"><Ico.check className="h-4 w-4 text-gold" /> {t}</span>
            ))}
          </div>

          <div className="mt-9 inline-flex flex-wrap items-center gap-4 rounded-2xl border border-gold/40 bg-white/5 px-5 py-3 backdrop-blur-sm">
            <span className="text-sm font-bold text-gold">−10% на монтаж до конца недели</span>
            <span className="flex items-center gap-1.5 font-display text-xl font-semibold tabular-nums">
              {[['дн', c.d], ['ч', c.h], ['мин', c.m], ['сек', c.s]].map(([u, v]) => (
                <span key={u} className="flex flex-col items-center">
                  <span className="rounded-md bg-white/10 px-2 py-1 text-cream">{pad(v)}</span>
                  <span className="mt-0.5 text-[9px] font-medium uppercase tracking-wide text-cream/50">{u}</span>
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------- Преимущества (стрип) ------------------------- */
function Advantages() {
  const a = [
    { i: Ico.route, t: 'Бесплатный выезд инженера', d: 'Замер и оценка объекта в течение 24 часов.' },
    { i: Ico.clock, t: 'Монтаж за 2–3 дня', d: 'Свои штатные бригады, чистая работа.' },
    { i: Ico.shield, t: 'Гарантия 5 лет', d: 'Фиксируем в договоре, сервис — бесплатно.' },
    { i: Ico.wallet, t: 'Рассрочка 0%', d: 'До 12 месяцев без переплат и банка.' },
  ]
  return (
    <section className="bg-cream py-14">
      <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {a.map((x, i) => (
          <Reveal key={x.t} delay={i * 70} className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-soft text-gold"><x.i className="h-6 w-6" /></span>
            <div>
              <h3 className="text-base font-bold text-ink">{x.t}</h3>
              <p className="mt-1 text-sm text-ink-500">{x.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------ Боль/Решение ------------------------------- */
function Pain() {
  const pains = [
    { i: Ico.lock, t: 'Проникновение в отъезд', d: 'Дом неделями стоит пустым — а вы узнаёте о проблеме по факту.' },
    { i: Ico.fire, t: 'Пожар и протечка', d: 'Без датчиков короткое замыкание или прорыв трубы — это ущерб на миллионы.' },
    { i: Ico.cam, t: '«Слепые» камеры', d: 'Дешёвые камеры ночью дают кашу, а архив часто вообще не пишется.' },
    { i: Ico.shield, t: 'Никто не отвечает', d: 'Камеры от одних, сигнализация от других — за систему в целом не отвечает никто.' },
  ]
  return (
    <section className="bg-cream-200 py-20">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">Зачем это нужно</span>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold sm:text-5xl">Пока вас нет, дом остаётся один на один с рисками</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pains.map((p, idx) => (
            <Reveal key={p.t} delay={idx * 70} className="card">
              <p.i className="h-9 w-9 text-gold" />
              <h3 className="mt-4 text-lg font-bold text-ink">{p.t}</h3>
              <p className="mt-2 text-sm text-ink-500">{p.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120} className="mt-8 rounded-2xl border border-gold/30 bg-gold-soft/60 p-6 sm:p-8">
          <p className="text-lg text-ink">
            <span className="font-bold text-gold">ВИДЖИО</span> собирает единый «организм» безопасности: камеры видят
            ночью на 50 м, тревога летит вам в приложение за секунды, а за всю систему отвечает одна команда.{' '}
            <span className="font-bold">Всё сработает вовремя.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------- Комплекты -------------------------------- */
function Kits({ onPick }) {
  const kits = [
    { name: 'ОБЗОР', tag: 'Видеонаблюдение под ключ', price: 'от 159 000 ₽', img: 'kit-obzor-camera.jpg', featured: false,
      items: ['8 IP-камер 4K, ИК-подсветка до 50 м', 'Видеорегистратор 4 ТБ, архив до 30 суток', 'Мобильное приложение, просмотр 24/7', 'Монтаж, настройка и обучение', 'Гарантия 5 лет'] },
    { name: 'БАСТИОН', tag: 'Комплексная безопасность', price: 'от 390 000 ₽', img: 'kit-bastion-system.jpg', featured: true,
      items: ['Всё из комплекта «Обзор», плюс:', 'Охранная сигнализация + датчики движения', 'Датчики дыма, протечки и газа', 'Умные замки и контроль доступа', 'Интеграция с умным домом и сценариями', 'Приоритетная поддержка 24/7'] },
  ]
  return (
    <section id="kits" className="bg-cream py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow eyebrow-center justify-center">Готовые решения</span>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Два комплекта под ваш дом</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-500">Точную конфигурацию подберём бесплатно на выезде — под площадь, планировку и задачи.</p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {kits.map((k, idx) => (
            <Reveal key={k.name} delay={idx * 100}>
              <div className={`group flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-card ${k.featured ? 'border-gold' : 'border-ink/10'}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={media(k.img)} alt={`Комплект ${k.name}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  {k.featured && (<span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold text-white">Хит продаж</span>)}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{k.tag}</span>
                  <h3 className="mt-2 text-3xl font-semibold text-ink">«{k.name}»</h3>
                  <div className="mt-2 font-display text-4xl font-semibold text-ink">{k.price}</div>
                  <ul className="mt-6 flex-1 space-y-2.5">
                    {k.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-sm text-ink-500"><Ico.check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span>{it}</span></li>
                    ))}
                  </ul>
                  <button onClick={() => onPick(k.name)} className={`mt-7 w-full ${k.featured ? 'btn-primary' : 'btn-outline'}`}>Выбрать «{k.name}»</button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------- Выгоды --------------------------------- */
function Benefits() {
  const b = [
    { n: '2–3', u: 'дня', t: 'монтаж под ключ, без грязи и хаоса' },
    { n: '50', u: 'метров', t: 'ночная съёмка — лица и номера читаемы' },
    { n: '<10', u: 'секунд', t: 'тревога долетает в ваш смартфон' },
    { n: '5', u: 'лет', t: 'гарантия + бесплатный сервис в 1-й год' },
    { n: '24/7', u: '', t: 'поддержка и удалённая диагностика' },
    { n: '100', u: '%', t: 'объектов сдаём без замечаний' },
  ]
  return (
    <section className="bg-cream-200 py-20">
      <div className="container-x">
        <Reveal className="text-center">
          <span className="eyebrow eyebrow-center justify-center">Почему ВИДЖИО</span>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Цифры, за которыми — спокойствие</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-3">
          {b.map((x, idx) => (
            <Reveal key={x.t} delay={idx * 60} className="card text-center">
              <div className="font-display text-5xl font-semibold text-gold">{x.n}<span className="ml-1 text-xl text-ink-500">{x.u}</span></div>
              <p className="mt-3 text-sm text-ink-500">{x.t}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------- Как работаем ------------------------------ */
function Process() {
  const steps = [
    { n: '01', t: 'Заявка и выезд за 24 часа', d: 'Бесплатно приедем, замерим, оценим объект и риски.' },
    { n: '02', t: 'Проект и смета за 3 часа', d: 'Фиксированная цена в договоре — без сюрпризов.' },
    { n: '03', t: 'Монтаж за 2–3 дня', d: 'Свои инженеры, аккуратная работа без грязи и хаоса.' },
    { n: '04', t: 'Запуск и обучение', d: 'Настроим приложение, всё покажем и научим пользоваться.' },
  ]
  return (
    <section className="bg-cream py-20">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="eyebrow">Как работаем</span>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">4 шага — и дом под защитой</h2>
          <div className="mt-10 space-y-6">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-5">
                <div className="font-display text-3xl font-semibold text-gold">{s.n}</div>
                <div className="border-b border-ink/10 pb-5">
                  <h3 className="text-lg font-bold text-ink">{s.t}</h3>
                  <p className="mt-1 text-sm text-ink-500">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120} className="overflow-hidden rounded-3xl border border-ink/10 shadow-soft">
          <img src={media('process-engineer.jpg')} alt="Инженер ВИДЖИО устанавливает камеру видеонаблюдения" className="aspect-[3/2] w-full object-cover" />
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------- Проекты ---------------------------------- */
function Projects() {
  const cases = [
    { img: 'case-1-villa.jpg', t: 'Дом 450 м², Новая Рига', d: '8 камер 4K по периметру + сигнализация. Смонтировано за 2 дня.' },
    { img: 'case-2-brick.jpg', t: 'Коттедж 320 м², Дмитровское ш.', d: 'Видеонаблюдение, датчики протечки и дыма, умный замок.' },
    { img: 'case-3-estate.jpg', t: 'Усадьба 760 м², Минское ш.', d: 'Комплекс «Бастион»: периметр, датчики, умные замки, контроль доступа.' },
  ]
  return (
    <section id="projects" className="bg-cream-200 py-20">
      <div className="container-x">
        <Reveal className="text-center">
          <span className="eyebrow eyebrow-center justify-center">Наши работы</span>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Объекты, которые мы защитили</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cases.map((c, idx) => (
            <Reveal key={c.t} delay={idx * 90} className="group overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
              <div className="aspect-[3/2] overflow-hidden">
                <img src={media(c.img)} alt={c.t} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-ink">{c.t}</h3>
                <p className="mt-2 text-sm text-ink-500">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------- Приложение -------------------------------- */
function AppBlock() {
  return (
    <section className="bg-cream py-20">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal className="order-2 overflow-hidden rounded-3xl border border-ink/10 shadow-soft lg:order-1">
          <video className="aspect-video w-full object-cover" autoPlay muted loop playsInline poster={media('app-phone.jpg')}>
            <source src={media('app-video.mp4')} type="video/mp4" />
          </video>
        </Reveal>
        <Reveal delay={100} className="order-1 lg:order-2">
          <span className="eyebrow">Контроль в кармане</span>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Весь дом — в одном приложении</h2>
          <p className="mt-5 text-ink-500">Смотрите все камеры онлайн, получайте мгновенные тревоги и управляйте системой безопасности — из любой точки мира, со смартфона.</p>
          <ul className="mt-6 space-y-3">
            {['Живой просмотр и архив за 30 дней', 'Пуш-уведомления о движении и тревогах', 'Сценарии умного дома', 'Один аккаунт для всей семьи'].map((t) => (
              <li key={t} className="flex items-center gap-3 text-ink"><span className="grid h-7 w-7 place-items-center rounded-lg bg-gold-soft text-gold"><Ico.check className="h-4 w-4" /></span>{t}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------- Команда --------------------------------- */
function Team() {
  const stats = [['14 лет', 'на рынке'], ['850+', 'объектов'], ['Штат', 'свои инженеры'], ['5 лет', 'гарантия']]
  return (
    <section id="team" className="bg-ink py-20 text-cream">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal className="overflow-hidden rounded-3xl border border-white/10 shadow-soft">
          <img src={media('process-engineer.jpg')} alt="Команда инженеров ВИДЖИО" className="aspect-[3/2] w-full object-cover" />
        </Reveal>
        <Reveal delay={100}>
          <span className="eyebrow">Команда</span>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Инженеры, а не случайные подрядчики</h2>
          <p className="mt-5 text-cream/80">
            Монтаж выполняют штатные инженеры ВИДЖИО с профильным опытом. Мы сами проектируем, монтируем
            и обслуживаем — поэтому за результат отвечает одна команда, а не цепочка субподрядчиков.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {stats.map(([n, t]) => (
              <div key={t}>
                <div className="font-display text-3xl font-semibold text-gold">{n}</div>
                <div className="mt-1 text-xs text-cream/60">{t}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------- Отзывы ---------------------------------- */
function Reviews() {
  const r = [
    { n: 'Алексей', c: 'Истра', t: 'Поставили 6 камер и сигнализацию за два дня, смонтировали очень аккуратно. Теперь вижу участок из любой командировки.' },
    { n: 'Марина', c: 'Красногорск', t: 'Выбирали долго, остановились на ВИДЖИО из-за гарантии и договора. Приехали в срок, всё объяснили по приложению. Спокойна за дом.' },
    { n: 'Сергей', c: 'Одинцово', t: 'Сделали комплекс: видео + датчики протечки. Один раз сработал датчик — пуш пришёл мгновенно, успели приехать. Реально работает.' },
  ]
  return (
    <section id="reviews" className="bg-cream py-20">
      <div className="container-x">
        <Reveal className="text-center">
          <span className="eyebrow eyebrow-center justify-center">Отзывы</span>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Что говорят владельцы домов</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {r.map((x, idx) => (
            <Reveal key={x.n} delay={idx * 90} className="card">
              <div className="tracking-widest text-gold">★★★★★</div>
              <p className="mt-3 text-ink">«{x.t}»</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-soft font-bold text-gold">{x.n[0]}</span>
                <div className="text-sm"><div className="font-bold text-ink">{x.n}</div><div className="text-ink-500">{x.c}</div></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- Гарантии --------------------------------- */
function Guarantees() {
  const g = [
    { i: Ico.shield, t: 'Гарантия 5 лет', d: 'На монтаж — фиксируем в договоре.' },
    { i: Ico.clock, t: 'Сервис бесплатно', d: 'Первый год обслуживания — за наш счёт.' },
    { i: Ico.check, t: 'Официально', d: 'Договор, акты, все закрывающие документы.' },
    { i: Ico.clock, t: 'Соблюдаем сроки', d: 'Срок монтажа закреплён в договоре — и мы его держим.' },
  ]
  return (
    <section className="bg-cream-200 py-20">
      <div className="container-x">
        <Reveal className="text-center">
          <span className="eyebrow eyebrow-center justify-center">Гарантии</span>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Берём ответственность на себя</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {g.map((x, idx) => (
            <Reveal key={x.t} delay={idx * 70} className="card text-center">
              <x.i className="mx-auto h-10 w-10 text-gold" />
              <h3 className="mt-4 font-bold text-ink">{x.t}</h3>
              <p className="mt-2 text-sm text-ink-500">{x.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- Квиз-калькулятор ---------------------------- */
const QUIZ = [
  { q: 'Площадь дома', opts: ['до 300 м²', '300–500 м²', '500–800 м²', 'более 800 м²'] },
  { q: 'Что защищаем?', opts: ['Периметр и въезд', 'Дом внутри', 'Периметр + дом', 'Весь участок и постройки'] },
  { q: 'Нужна сигнализация и датчики?', opts: ['Только видео', 'Видео + сигнализация', 'Видео + сигнализация + датчики', 'Полный комплекс + СКУД'] },
  { q: 'Стадия объекта', opts: ['Дом готов', 'Идёт ремонт', 'Стройка (черновая)', 'Только планирую'] },
]

function Quiz({ openRef }) {
  const [step, setStep] = useState(0)
  const [ans, setAns] = useState({})
  const [phone, setPhone] = useState('')
  const [done, setDone] = useState(false)
  const [agree, setAgree] = useState(false)
  const total = QUIZ.length

  const estimate = useMemo(() => {
    let base = 159000
    const area = ans[0]
    if (area === '300–500 м²') base += 60000
    if (area === '500–800 м²') base += 150000
    if (area === 'более 800 м²') base += 280000
    const scope = ans[2]
    if (scope === 'Видео + сигнализация') base += 70000
    if (scope === 'Видео + сигнализация + датчики') base += 140000
    if (scope === 'Полный комплекс + СКУД') base += 250000
    const fmt = (n) => n.toLocaleString('ru-RU')
    return `от ${fmt(base)} ₽`
  }, [ans])

  const pick = (opt) => {
    setAns((a) => ({ ...a, [step]: opt }))
    setTimeout(() => setStep((s) => Math.min(s + 1, total)), 150)
  }
  const submit = (e) => {
    e.preventDefault()
    if (!agree) return
    const summary = `Заявка с калькулятора ВИДЖИО:%0A` + QUIZ.map((q, i) => `• ${q.q}: ${ans[i] || '—'}`).join('%0A') + `%0A• Ориентир: ${estimate}%0A• Телефон: ${phone}`
    window.open(MAX(decodeURIComponent(summary)), '_blank')
    setDone(true)
  }

  return (
    <section id="quiz" ref={openRef} className="bg-cream py-20">
      <div className="container-x">
        <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-soft">
          <div className="grid lg:grid-cols-5">
            <div className="border-b border-ink/10 bg-ink p-8 text-cream lg:col-span-2 lg:border-b-0">
              <span className="eyebrow">Калькулятор</span>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Рассчитайте стоимость защиты дома</h2>
              <p className="mt-4 text-cream/70">Ответьте на 4 вопроса — покажем ориентир по цене и пришлём точную смету за 3 часа.</p>
              <div className="mt-8 hidden gap-2 lg:flex">
                {QUIZ.map((_, i) => (<span key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-gold' : 'bg-white/15'}`} />))}
              </div>
            </div>
            <div className="p-8 lg:col-span-3">
              {done ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-gold-soft text-gold"><Ico.check className="h-8 w-8" /></div>
                  <h3 className="mt-4 text-2xl font-semibold text-ink">Заявка отправлена!</h3>
                  <p className="mt-2 text-ink-500">Мы уже считаем вашу смету и свяжемся в течение 15 минут.</p>
                </div>
              ) : step < total ? (
                <div>
                  <div className="text-sm font-semibold text-gold">Шаг {step + 1} из {total}</div>
                  <h3 className="mt-2 text-2xl font-semibold text-ink">{QUIZ[step].q}</h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {QUIZ[step].opts.map((o) => (
                      <button key={o} onClick={() => pick(o)} className={`rounded-xl border px-4 py-4 text-left text-sm font-semibold transition ${ans[step] === o ? 'border-gold bg-gold-soft text-ink' : 'border-ink/15 bg-cream text-ink hover:border-gold'}`}>{o}</button>
                    ))}
                  </div>
                  {step > 0 && (<button onClick={() => setStep((s) => s - 1)} className="mt-5 text-sm text-ink-500 hover:text-gold">← Назад</button>)}
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="rounded-xl border border-gold/40 bg-gold-soft/60 p-5">
                    <div className="text-sm text-ink-500">Предварительный расчёт для вашего дома:</div>
                    <div className="mt-1 font-display text-4xl font-semibold text-ink">{estimate}</div>
                  </div>
                  <h3 className="mt-6 font-bold text-ink">Куда отправить точную смету?</h3>
                  <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" className="mt-3 w-full rounded-xl border border-ink/15 bg-cream px-4 py-4 text-ink placeholder-ink-500/50 outline-none focus:border-gold" />
                  <div className="mt-4"><ConsentCheck id="consent-quiz" checked={agree} onChange={setAgree} /></div>
                  <button type="submit" disabled={!agree} className="btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50">Получить смету в MAX</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------- FAQ ----------------------------------- */
function Faq() {
  const items = [
    { q: 'Камеры действительно видят ночью?', a: 'Да. Мы ставим IP-камеры 4K с ИК-подсветкой до 50 м — ночью читаются лица и автомобильные номера. Для тёмных зон используем камеры с цветной ночной съёмкой (Full Color).' },
    { q: 'Что с интернетом за городом?', a: 'Работаем с любым каналом: оптика, 4G-роутер с резервированием, при необходимости — две SIM разных операторов. Архив пишется локально на регистратор, даже если интернет пропал.' },
    { q: 'Можно сделать без проводов?', a: 'Частично — есть Wi-Fi и автономные камеры. Но для дома 300 м²+ мы рекомендуем проводные PoE-камеры: стабильнее, надёжнее и без проблем с батареями. Решаем по проекту.' },
    { q: 'Успеете смонтировать быстро?', a: 'Стандартный монтаж комплекта — 2–3 дня. Выезд инженера для замеров — в течение 24 часов с момента заявки.' },
    { q: 'Что входит в гарантию 5 лет?', a: 'Гарантия на монтажные работы и настройку. На оборудование действует гарантия производителя. Первый год сервисного обслуживания — бесплатно.' },
    { q: 'Работаете в дальнем Подмосковье?', a: 'Да, выезжаем по всей Московской области. Уточните адрес — рассчитаем сроки и логистику.' },
    { q: 'Поможете на этапе стройки?', a: 'Это идеальный момент: проложим кабельные трассы заранее, пока стены открыты, и дадим скидку 15%. Сделаем проект слаботочных систем заблаговременно.' },
  ]
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="bg-cream py-20">
      <div className="container-x max-w-3xl">
        <Reveal className="text-center">
          <span className="eyebrow eyebrow-center justify-center">Вопросы и ответы</span>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Отвечаем на частые вопросы</h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {items.map((it, i) => (
            <div key={it.q} className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
                <span className="font-semibold text-ink">{it.q}</span>
                <Ico.chevron className={`h-5 w-5 shrink-0 text-gold transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`grid transition-all duration-300 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden"><p className="px-5 pb-5 text-sm text-ink-500">{it.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------- Финальный CTA ----------------------------- */
function FinalCta() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [agree, setAgree] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (!agree) return
    window.open(MAX(`Здравствуйте! Меня зовут ${name || '—'}, мой телефон ${phone}. Хочу получить расчёт со скидкой 10%.`), '_blank')
  }
  return (
    <section id="final" className="relative overflow-hidden bg-ink py-20 text-cream">
      <img src={media('final-night-house.png')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/70" />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow eyebrow-center justify-center">Заявка</span>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">Узнайте стоимость защиты дома — со скидкой 10%</h2>
          <p className="mt-4 text-cream/80">Перезвоним за 15 минут, посчитаем точную смету. Без навязывания.</p>
        </div>
        <form onSubmit={submit} className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" className="rounded-xl border border-white/15 bg-white/5 px-4 py-4 text-cream placeholder-cream/40 outline-none focus:border-gold" />
          <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" className="rounded-xl border border-white/15 bg-white/5 px-4 py-4 text-cream placeholder-cream/40 outline-none focus:border-gold" />
          <div className="sm:col-span-2"><ConsentCheck id="consent-final" checked={agree} onChange={setAgree} tone="dark" /></div>
          <button type="submit" disabled={!agree} className="btn-primary sm:col-span-2 disabled:cursor-not-allowed disabled:opacity-50">Получить расчёт со скидкой 10%</button>
        </form>
        <div className="mx-auto mt-5 flex max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={MAX('Здравствуйте! Хочу расчёт видеонаблюдения для дома.')} target="_blank" rel="noreferrer" className="btn-max flex-1 sm:flex-none"><Ico.max className="h-5 w-5" /> MAX</a>
          <a href={TG} target="_blank" rel="noreferrer" className="btn-tg flex-1 sm:flex-none"><Ico.tg className="h-5 w-5" /> Telegram</a>
          <a href={`tel:+${PHONE_RAW}`} className="btn-outline flex-1 border-white/25 text-cream hover:border-gold hover:text-gold sm:flex-none"><Ico.phone className="h-5 w-5" /> {PHONE_HUMAN}</a>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- Футер ----------------------------------- */
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-900 py-12 text-cream">
      <div className="container-x grid gap-8 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-cream/60">Видеонаблюдение и системы безопасности под ключ для загородных домов от 300 м² в Москве и Московской области.</p>
        </div>
        <div className="text-sm text-cream/70">
          <div className="font-bold text-cream">Контакты</div>
          <a href={`tel:+${PHONE_RAW}`} className="mt-3 block hover:text-gold">{PHONE_HUMAN}</a>
          <a href="tel:+74956986108" className="mt-1 block hover:text-gold">+7 (495) 698-61-08</a>
          <a href="mailto:vidzhio@yandex.ru" className="mt-1 block hover:text-gold">vidzhio@yandex.ru</a>
          <div className="mt-2">Москва и Московская область</div>
          <div className="mt-2">Пн–Вс, 9:00–21:00</div>
          <div className="mt-3 flex gap-3">
            <a href={MAX('Здравствуйте!')} target="_blank" rel="noreferrer" aria-label="Написать в MAX" className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 text-[#B24DFF] hover:bg-white/10"><Ico.max className="h-5 w-5" /></a>
            <a href={TG} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 text-[#2AABEE] hover:bg-white/10"><Ico.tg className="h-5 w-5" /></a>
          </div>
        </div>
        <div className="text-sm text-cream/60">
          <div className="font-bold text-cream">Реквизиты</div>
          <p className="mt-3">ООО «Виджио»</p>
          <p className="mt-1">ИНН 7723877678 · КПП 772301001</p>
          <p className="mt-1">ОГРН 1137746582270</p>
          <p className="mt-1">109469, г. Москва, ул. Братиславская, д. 27, корп. 1, пом. VI, ком. 12–20</p>
          <p className="mt-1">Лицензия МЧС № 77-06-2022-005285 от 29.12.2022</p>
          <p className="mt-2 text-cream/45">Цены на сайте носят информационный характер и не являются публичной офертой.</p>
          <a href={POLICY_HREF} target="_blank" rel="noreferrer" className="mt-2 inline-block underline hover:text-gold">Политика обработки персональных данных</a>
        </div>
      </div>
      <div className="container-x mt-10 border-t border-white/10 pt-6 text-center text-xs text-cream/45">
        © {new Date().getFullYear()} ВИДЖИО. Все права защищены. · Сайт создан компанией{' '}
        <a href="https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering" target="_blank" rel="noreferrer" className="font-semibold text-gold hover:underline">ЛендингСфера</a>
      </div>
    </footer>
  )
}

/* ----------------------------- Мобильный CTA-бар --------------------------- */
function MobileBar({ onCta }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 p-3 backdrop-blur md:hidden">
      <div className="flex gap-2">
        <button onClick={onCta} className="btn-primary flex-1 !py-3 text-sm">Рассчитать</button>
        <a href={MAX('Здравствуйте! Хочу расчёт видеонаблюдения.')} target="_blank" rel="noreferrer" className="btn-max !px-4 !py-3"><Ico.max className="h-5 w-5" /></a>
        <a href={`tel:+${PHONE_RAW}`} className="btn-outline !px-4 !py-3"><Ico.phone className="h-5 w-5" /></a>
      </div>
    </div>
  )
}

/* ------------------------------- Поп-ап выхода ----------------------------- */
function ExitPopup({ onCta }) {
  const [show, setShow] = useState(false)
  const fired = useRef(false)
  useEffect(() => {
    const onLeave = (e) => {
      if (e.clientY <= 0 && !fired.current && !sessionStorage.getItem('exit_seen')) {
        fired.current = true
        sessionStorage.setItem('exit_seen', '1')
        setShow(true)
      }
    }
    document.addEventListener('mouseout', onLeave)
    return () => document.removeEventListener('mouseout', onLeave)
  }, [])
  if (!show) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/70 p-4" onClick={() => setShow(false)}>
      <div className="relative w-full max-w-md rounded-3xl border border-ink/10 bg-white p-8 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setShow(false)} className="absolute right-4 top-4 text-2xl leading-none text-ink-500 hover:text-ink">×</button>
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-soft text-gold"><Ico.shield className="h-7 w-7" /></div>
        <h3 className="mt-4 text-3xl font-semibold text-ink">Уже уходите?</h3>
        <p className="mt-2 text-ink-500">Заберите <b className="text-gold">бесплатный аудит безопасности дома</b> + смету за 3 часа. И скидку 10% на монтаж.</p>
        <button onClick={() => { setShow(false); onCta() }} className="btn-primary mt-5 w-full">Получить аудит бесплатно</button>
        <a href={MAX('Здравствуйте! Хочу бесплатный аудит безопасности дома и смету.')} target="_blank" rel="noreferrer" className="btn-outline mt-3 w-full"><Ico.max className="h-5 w-5" /> Написать в MAX</a>
      </div>
    </div>
  )
}

/* ---------------------------------- App ------------------------------------ */
export default function App() {
  const quizRef = useRef(null)
  const scrollToQuiz = () => quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return (
    <div className="overflow-x-hidden">
      <Header onCta={scrollToQuiz} />
      <main>
        <Hero onCta={scrollToQuiz} />
        <Advantages />
        <Pain />
        <Kits onPick={scrollToQuiz} />
        <Benefits />
        <Process />
        <Projects />
        <AppBlock />
        <Team />
        <Reviews />
        <Guarantees />
        <Quiz openRef={quizRef} />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar onCta={scrollToQuiz} />
      <div className="h-16 md:hidden" />
      <ExitPopup onCta={scrollToQuiz} />
    </div>
  )
}
