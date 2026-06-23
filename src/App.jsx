import { useEffect, useMemo, useRef, useState } from 'react'
import Logo from './components/Logo.jsx'

/* ----------------------------- Контакты / ссылки ---------------------------- */
const PHONE_HUMAN = '+7 925 127-91-13'
const PHONE_RAW = '79251279113'
const WA = (text) =>
  `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(text)}`
const TG = `https://t.me/+${PHONE_RAW}`
const media = (file) => `${import.meta.env.BASE_URL}media/${file}`

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
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${shown ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}

function useCountdown() {
  const target = useMemo(() => {
    const now = new Date()
    const d = new Date(now)
    const day = now.getDay() // 0 = Вс
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
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  }
}

const pad = (n) => String(n).padStart(2, '0')

/* --------------------------------- Иконки ---------------------------------- */
const Ico = {
  shield: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  cam: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <rect x="3" y="7" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M16 10l5-3v10l-5-3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  ),
  bell: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 16V11a6 6 0 1112 0v5l2 2H4l2-2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M10 20a2 2 0 004 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  fire: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 3c1 3-2 4-2 7a2 2 0 104 0c0 0 2 1 2 4a4 4 0 11-8 0c0-5 4-7 4-11z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  ),
  phone: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 3h3l2 5-2 1c1 3 3 5 6 6l1-2 5 2v3c0 1-1 2-2 2A16 16 0 014 6c0-1 1-3 2-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  ),
  wa: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1112 20zm4.4-5.6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 01-1.9-1.2 7.2 7.2 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2c0 1.3.9 2.5 1.1 2.7s1.9 2.9 4.6 4c1.7.7 2.3.8 3.1.7.5-.1 1.4-.6 1.6-1.1s.2-1 .1-1.1-.2-.2-.5-.3z"/>
    </svg>
  ),
  tg: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M21.9 4.3l-3.3 15.6c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.3-.1-.5-.6-.2L6.4 13.2 1.6 11.7c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.4 1.3z"/>
    </svg>
  ),
  clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  drop: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  ),
  lock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M8 10V8a4 4 0 018 0v2" stroke="currentColor" strokeWidth="1.7"/>
    </svg>
  ),
  chevron: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

/* --------------------------------- Шапка ----------------------------------- */
function Header({ onCta }) {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        solid ? 'bg-navy-900/90 shadow-lg backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex items-center justify-between py-3">
        <Logo />
        <div className="hidden items-center gap-6 md:flex">
          <span className="text-sm text-white/70">Москва и МО</span>
          <a href={`tel:+${PHONE_RAW}`} className="text-sm font-bold text-white hover:text-brand-teal">
            {PHONE_HUMAN}
          </a>
          <button onClick={onCta} className="btn-primary !py-3 !px-5 text-sm">
            Рассчитать стоимость
          </button>
        </div>
        <a href={`tel:+${PHONE_RAW}`} className="btn-primary !p-3 md:hidden" aria-label="Позвонить">
          <Ico.phone className="h-5 w-5" />
        </a>
      </div>
    </header>
  )
}

/* ---------------------------------- Hero ----------------------------------- */
function Hero({ onCta }) {
  const c = useCountdown()
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={media('hero-house-dusk.jpg')}
      >
        <source src={media('hero-video.mp4')} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/40" />

      <div className="container-x relative z-10 py-12">
        <div className="max-w-2xl">
          <span className="eyebrow animate-fadeUp">Видеонаблюдение · сигнализация · умный дом</span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Возьмём ваш загородный дом под охрану за{' '}
            <span className="text-brand-teal">2–3 дня</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            Видеонаблюдение 4K, сигнализация и датчики — единая система в вашем смартфоне.
            Проектируем, монтируем и обслуживаем сами. Гарантия 5 лет.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button onClick={onCta} className="btn-primary text-base">
              Рассчитать стоимость за 2 минуты
            </button>
            <a href={WA('Здравствуйте! Хочу рассчитать видеонаблюдение для загородного дома.')} target="_blank" rel="noreferrer" className="btn-wa">
              <Ico.wa className="h-5 w-5" /> Написать в WhatsApp
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75">
            {['14 лет на рынке', '850+ домов', 'Гарантия 5 лет', 'Работаем по договору'].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <Ico.check className="h-4 w-4 text-brand-teal" /> {t}
              </span>
            ))}
          </div>

          {/* Плашка акции */}
          <div className="mt-8 inline-flex flex-wrap items-center gap-4 rounded-2xl border border-brand-orange/30 bg-brand-orange/10 px-5 py-3">
            <span className="text-sm font-bold text-brand-orange">🔥 −10% на монтаж до конца недели</span>
            <span className="flex items-center gap-1.5 font-display text-lg font-bold tabular-nums">
              {[['дн', c.d], ['ч', c.h], ['мин', c.m], ['сек', c.s]].map(([u, v]) => (
                <span key={u} className="flex flex-col items-center">
                  <span className="rounded-md bg-navy-700 px-2 py-1">{pad(v)}</span>
                  <span className="mt-0.5 text-[9px] font-medium uppercase text-white/50">{u}</span>
                </span>
              ))}
            </span>
          </div>
        </div>
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
    <section className="relative py-20">
      <img src={media('pain-house-night.jpg')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-navy-900/80" />
      <div className="container-x relative">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold sm:text-4xl">
            Пока вас нет, дом остаётся один на один с рисками
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pains.map((p, idx) => (
            <Reveal key={p.t} delay={idx * 70} className="card">
              <p.i className="h-9 w-9 text-brand-orange" />
              <h3 className="mt-4 text-lg font-bold">{p.t}</h3>
              <p className="mt-2 text-sm text-white/70">{p.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120} className="mt-10 rounded-2xl border border-brand-teal/30 bg-brand-teal/[0.07] p-6 sm:p-8">
          <p className="text-lg text-white/90">
            <span className="font-bold text-brand-teal">ВИДЖИО</span> собирает единый «организм» безопасности:
            камеры видят ночью на 50 м, тревога летит вам в приложение за секунды, а за всю систему отвечает
            одна команда. <span className="font-bold">Всё сработает вовремя.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------- Комплекты ------------------------------- */
function Kits({ onPick }) {
  const kits = [
    {
      name: 'ОБЗОР',
      tag: 'Видеонаблюдение под ключ',
      price: 'от 159 000 ₽',
      img: 'kit-obzor-camera.jpg',
      featured: false,
      items: [
        '8 IP-камер 4K, ИК-подсветка до 50 м',
        'Видеорегистратор 4 ТБ, архив до 30 суток',
        'Мобильное приложение, просмотр 24/7',
        'Скрытый монтаж, настройка, обучение',
        'Гарантия 5 лет',
      ],
    },
    {
      name: 'БАСТИОН',
      tag: 'Комплексная безопасность',
      price: 'от 390 000 ₽',
      img: 'kit-bastion-system.jpg',
      featured: true,
      items: [
        'Всё из комплекта «Обзор», плюс:',
        'Охранная сигнализация + датчики движения',
        'Датчики дыма, протечки и газа',
        'Умные замки и контроль ворот (СКУД)',
        'Интеграция с умным домом + опция пульта ГБР',
        'Приоритетная поддержка 24/7',
      ],
    },
  ]
  return (
    <section id="kits" className="py-20">
      <div className="container-x">
        <Reveal className="text-center">
          <span className="eyebrow">Готовые решения</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">Два комплекта под ваш дом</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Точную конфигурацию подберём бесплатно на выезде — под площадь, планировку и задачи.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {kits.map((k, idx) => (
            <Reveal key={k.name} delay={idx * 100}>
              <div
                className={`group flex h-full flex-col overflow-hidden rounded-3xl border ${
                  k.featured ? 'border-brand-orange/50 bg-brand-orange/[0.06]' : 'border-white/10 bg-white/[0.03]'
                } shadow-card`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={media(k.img)} alt={`Комплект ${k.name}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  {k.featured && (
                    <span className="absolute right-4 top-4 rounded-full bg-brand-orange px-3 py-1 text-xs font-bold text-white">
                      🏆 Хит продаж
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">{k.tag}</span>
                  <h3 className="mt-1 font-display text-2xl font-extrabold">«{k.name}»</h3>
                  <div className="mt-2 font-display text-3xl font-extrabold text-white">{k.price}</div>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {k.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-sm text-white/80">
                        <Ico.check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => onPick(k.name)} className={`mt-6 ${k.featured ? 'btn-primary' : 'btn-ghost'} w-full`}>
                    Выбрать «{k.name}»
                  </button>
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
    <section className="py-20">
      <div className="container-x">
        <Reveal className="text-center">
          <span className="eyebrow">Почему ВИДЖИО</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">Цифры, за которыми — спокойствие</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {b.map((x, idx) => (
            <Reveal key={x.t} delay={idx * 60} className="card text-center">
              <div className="font-display text-4xl font-extrabold text-brand-teal sm:text-5xl">
                {x.n}
                <span className="ml-1 text-xl text-white/60">{x.u}</span>
              </div>
              <p className="mt-3 text-sm text-white/70">{x.t}</p>
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
    { n: '03', t: 'Монтаж за 2–3 дня', d: 'Свои инженеры, скрытая проводка, чистая работа.' },
    { n: '04', t: 'Запуск и обучение', d: 'Настроим приложение, всё покажем, передадим на гарантию.' },
  ]
  return (
    <section className="py-20">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="eyebrow">Как работаем</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">4 шага — и дом под защитой</h2>
          <div className="mt-8 space-y-5">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-4">
                <div className="font-display text-2xl font-extrabold text-brand-orange">{s.n}</div>
                <div>
                  <h3 className="text-lg font-bold">{s.t}</h3>
                  <p className="mt-1 text-sm text-white/70">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120} className="overflow-hidden rounded-3xl border border-white/10 shadow-card">
          <img src={media('process-engineer.jpg')} alt="Инженер ВИДЖИО устанавливает камеру видеонаблюдения" className="aspect-[3/2] w-full object-cover" />
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------- Приложение -------------------------------- */
function AppBlock() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal className="order-2 overflow-hidden rounded-3xl border border-white/10 shadow-card lg:order-1">
          <video className="aspect-video w-full object-cover" autoPlay muted loop playsInline poster={media('app-phone.jpg')}>
            <source src={media('app-video.mp4')} type="video/mp4" />
          </video>
        </Reveal>
        <Reveal delay={100} className="order-1 lg:order-2">
          <span className="eyebrow">Контроль в кармане</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Весь дом — в одном приложении
          </h2>
          <p className="mt-4 text-white/80">
            Смотрите все камеры онлайн, получайте мгновенные тревоги, ставьте дом на охрану и открывайте
            ворота гостям — из любой точки мира, со смартфона.
          </p>
          <ul className="mt-6 space-y-3">
            {['Живой просмотр и архив за 30 дней', 'Пуш-уведомления о движении и тревогах', 'Сценарии умного дома и СКУД', 'Один аккаунт для всей семьи'].map((t) => (
              <li key={t} className="flex items-center gap-3 text-white/85">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-teal/15 text-brand-teal"><Ico.check className="h-4 w-4" /></span>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------- Кейсы ----------------------------------- */
function Cases() {
  const cases = [
    { img: 'case-1-villa.jpg', t: 'Дом 450 м², Новая Рига', d: '8 камер 4K по периметру + сигнализация. Смонтировано за 2 дня.' },
    { img: 'case-2-brick.jpg', t: 'Коттедж 320 м², Дмитровское ш.', d: 'Видеонаблюдение, датчики протечки и дыма, умный замок.' },
    { img: 'case-3-estate.jpg', t: 'Усадьба 760 м², Минское ш.', d: 'Комплекс «Бастион»: периметр, СКУД, вывод на пульт ГБР.' },
  ]
  return (
    <section className="py-20">
      <div className="container-x">
        <Reveal className="text-center">
          <span className="eyebrow">Наши работы</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">Объекты, которые мы защитили</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cases.map((c, idx) => (
            <Reveal key={c.t} delay={idx * 90} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-card">
              <div className="aspect-[3/2] overflow-hidden">
                <img src={media(c.img)} alt={c.t} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="font-bold">{c.t}</h3>
                <p className="mt-2 text-sm text-white/70">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- Отзывы ---------------------------------- */
function Reviews() {
  const r = [
    { n: 'Алексей', c: 'Истра', t: 'Поставили 6 камер и сигнализацию за два дня, провода спрятали идеально. Теперь вижу участок из любой командировки.' },
    { n: 'Марина', c: 'Красногорск', t: 'Выбирали долго, остановились на ВИДЖИО из-за гарантии и договора. Приехали в срок, всё объяснили по приложению. Спокойна за дом.' },
    { n: 'Сергей', c: 'Одинцово', t: 'Сделали комплекс: видео + датчики протечки. Один раз сработал датчик — пуш пришёл мгновенно, успели приехать. Реально работает.' },
  ]
  return (
    <section className="py-20">
      <div className="container-x">
        <Reveal className="text-center">
          <span className="eyebrow">Отзывы</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">Что говорят владельцы домов</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {r.map((x, idx) => (
            <Reveal key={x.n} delay={idx * 90} className="card">
              <div className="text-brand-orange">★★★★★</div>
              <p className="mt-3 text-white/85">«{x.t}»</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-teal/20 font-bold text-brand-teal">{x.n[0]}</span>
                <div className="text-sm">
                  <div className="font-bold">{x.n}</div>
                  <div className="text-white/60">{x.c}</div>
                </div>
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
    { i: Ico.bell, t: 'Сдадим в срок', d: 'Не уложимся — компенсируем. Всё сработает вовремя.' },
  ]
  return (
    <section className="py-20">
      <div className="container-x">
        <Reveal className="text-center">
          <span className="eyebrow">Гарантии</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">Берём ответственность на себя</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {g.map((x, idx) => (
            <Reveal key={x.t} delay={idx * 70} className="card text-center">
              <x.i className="mx-auto h-10 w-10 text-brand-teal" />
              <h3 className="mt-4 font-bold">{x.t}</h3>
              <p className="mt-2 text-sm text-white/70">{x.d}</p>
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
  const total = QUIZ.length

  const estimate = useMemo(() => {
    // грубая прикидка диапазона по ответам
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
    const summary =
      `Заявка с калькулятора ВИДЖИО:%0A` +
      QUIZ.map((q, i) => `• ${q.q}: ${ans[i] || '—'}`).join('%0A') +
      `%0A• Ориентир: ${estimate}%0A• Телефон: ${phone}`
    window.open(WA(decodeURIComponent(summary)), '_blank')
    setDone(true)
  }

  return (
    <section id="quiz" ref={openRef} className="py-20">
      <div className="container-x">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-700 to-navy-900 shadow-card">
          <div className="grid lg:grid-cols-5">
            <div className="border-b border-white/10 p-8 lg:col-span-2 lg:border-b-0 lg:border-r">
              <span className="eyebrow">Калькулятор</span>
              <h2 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
                Рассчитайте стоимость защиты дома
              </h2>
              <p className="mt-3 text-sm text-white/70">
                4 вопроса — и вы получите ориентир по цене. Точную смету пришлём за 3 часа.
              </p>
              <div className="mt-6 flex items-center gap-2">
                {Array.from({ length: total }).map((_, i) => (
                  <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-brand-orange' : 'bg-white/15'}`} />
                ))}
              </div>
            </div>

            <div className="p-8 lg:col-span-3">
              {done ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-teal/20 text-brand-teal"><Ico.check className="h-8 w-8" /></span>
                  <h3 className="mt-4 font-display text-2xl font-bold">Заявка отправлена!</h3>
                  <p className="mt-2 text-white/70">Мы открыли чат — отправьте сообщение, и инженер свяжется с вами в течение 15 минут.</p>
                </div>
              ) : step < total ? (
                <div>
                  <div className="text-sm text-brand-teal">Шаг {step + 1} из {total}</div>
                  <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">{QUIZ[step].q}</h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {QUIZ[step].opts.map((o) => (
                      <button
                        key={o}
                        onClick={() => pick(o)}
                        className={`rounded-xl border px-4 py-4 text-left text-sm font-semibold transition ${
                          ans[step] === o ? 'border-brand-orange bg-brand-orange/15' : 'border-white/15 bg-white/5 hover:border-brand-teal/50'
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button onClick={() => setStep((s) => s - 1)} className="mt-5 text-sm text-white/60 hover:text-white">← Назад</button>
                  )}
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="rounded-xl border border-brand-teal/30 bg-brand-teal/10 p-5">
                    <div className="text-sm text-white/70">Предварительный расчёт для вашего дома:</div>
                    <div className="mt-1 font-display text-3xl font-extrabold text-brand-teal">{estimate}</div>
                  </div>
                  <h3 className="mt-6 font-bold">Куда отправить точную смету?</h3>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className="mt-3 w-full rounded-xl border border-white/15 bg-navy-900 px-4 py-4 text-white placeholder-white/40 outline-none focus:border-brand-teal"
                  />
                  <button type="submit" className="btn-primary mt-4 w-full">Получить смету в WhatsApp</button>
                  <p className="mt-3 text-center text-xs text-white/50">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.</p>
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
    { q: 'Поможете на этапе стройки?', a: 'Это идеальный момент: заложим скрытую проводку, пока стены открыты, и дадим скидку 15%. Сделаем проект слаботочки заранее.' },
  ]
  const [open, setOpen] = useState(0)
  return (
    <section className="py-20">
      <div className="container-x max-w-3xl">
        <Reveal className="text-center">
          <span className="eyebrow">Вопросы и ответы</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">Отвечаем на частые вопросы</h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {items.map((it, i) => (
            <div key={it.q} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
                <span className="font-semibold">{it.q}</span>
                <Ico.chevron className={`h-5 w-5 shrink-0 text-brand-teal transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`grid transition-all duration-300 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-white/70">{it.a}</p>
                </div>
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
  const submit = (e) => {
    e.preventDefault()
    window.open(WA(`Здравствуйте! Меня зовут ${name || '—'}, мой телефон ${phone}. Хочу получить расчёт со скидкой 10%.`), '_blank')
  }
  return (
    <section id="final" className="relative overflow-hidden py-20">
      <img src={media('final-night-house.png')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/85 to-navy-900/70" />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Узнайте стоимость защиты вашего дома — со скидкой 10%
          </h2>
          <p className="mt-3 text-white/80">Перезвоним за 15 минут, посчитаем точную смету. Без навязывания.</p>
        </div>
        <form onSubmit={submit} className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" className="rounded-xl border border-white/15 bg-navy-900/80 px-4 py-4 text-white placeholder-white/40 outline-none focus:border-brand-teal" />
          <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" className="rounded-xl border border-white/15 bg-navy-900/80 px-4 py-4 text-white placeholder-white/40 outline-none focus:border-brand-teal" />
          <button type="submit" className="btn-primary sm:col-span-2">Получить расчёт со скидкой 10%</button>
        </form>
        <div className="mx-auto mt-5 flex max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={WA('Здравствуйте! Хочу расчёт видеонаблюдения для дома.')} target="_blank" rel="noreferrer" className="btn-wa flex-1 sm:flex-none">
            <Ico.wa className="h-5 w-5" /> WhatsApp
          </a>
          <a href={TG} target="_blank" rel="noreferrer" className="btn-ghost flex-1 sm:flex-none">
            <Ico.tg className="h-5 w-5 text-brand-teal" /> Telegram
          </a>
          <a href={`tel:+${PHONE_RAW}`} className="btn-ghost flex-1 sm:flex-none">
            <Ico.phone className="h-5 w-5 text-brand-teal" /> {PHONE_HUMAN}
          </a>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- Футер ----------------------------------- */
function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-900 py-12">
      <div className="container-x grid gap-8 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Видеонаблюдение и системы безопасности под ключ для загородных домов от 300 м² в Москве
            и Московской области.
          </p>
        </div>
        <div className="text-sm text-white/70">
          <div className="font-bold text-white">Контакты</div>
          <a href={`tel:+${PHONE_RAW}`} className="mt-3 block hover:text-brand-teal">{PHONE_HUMAN}</a>
          <div className="mt-2">Москва и Московская область</div>
          <div className="mt-2">Пн–Вс, 9:00–21:00</div>
          <div className="mt-3 flex gap-3">
            <a href={WA('Здравствуйте!')} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 text-[#25D366] hover:bg-white/10"><Ico.wa className="h-5 w-5" /></a>
            <a href={TG} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-lg bg-white/5 text-brand-teal hover:bg-white/10"><Ico.tg className="h-5 w-5" /></a>
          </div>
        </div>
        <div className="text-sm text-white/60">
          <div className="font-bold text-white">Реквизиты</div>
          <p className="mt-3">ООО «Виджио» · ИНН 0000000000</p>
          <p className="mt-2">Цены на сайте носят информационный характер и не являются публичной офертой.</p>
          <a href="#" className="mt-2 inline-block underline hover:text-white">Политика конфиденциальности</a>
        </div>
      </div>
      <div className="container-x mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/45">
        © {new Date().getFullYear()} ВИДЖИО. Все права защищены. · Сайт создан компанией{' '}
        <a href="https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering" target="_blank" rel="noreferrer" className="font-semibold text-brand-teal hover:underline">
          ЛендингСфера
        </a>
      </div>
    </footer>
  )
}

/* ----------------------------- Мобильный CTA-бар --------------------------- */
function MobileBar({ onCta }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-900/95 p-3 backdrop-blur md:hidden">
      <div className="flex gap-2">
        <button onClick={onCta} className="btn-primary flex-1 !py-3 text-sm">Рассчитать</button>
        <a href={WA('Здравствуйте! Хочу расчёт видеонаблюдения.')} target="_blank" rel="noreferrer" className="btn-wa !px-4 !py-3"><Ico.wa className="h-5 w-5" /></a>
        <a href={`tel:+${PHONE_RAW}`} className="btn-ghost !px-4 !py-3"><Ico.phone className="h-5 w-5" /></a>
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
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" onClick={() => setShow(false)}>
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-navy-800 p-8 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setShow(false)} className="absolute right-4 top-4 text-2xl leading-none text-white/50 hover:text-white">×</button>
        <div className="text-4xl">🎁</div>
        <h3 className="mt-3 font-display text-2xl font-extrabold">Уже уходите?</h3>
        <p className="mt-2 text-white/75">Заберите <b className="text-brand-teal">бесплатный аудит безопасности дома</b> + смету за 3 часа. И скидку 10% на монтаж.</p>
        <button onClick={() => { setShow(false); onCta() }} className="btn-primary mt-5 w-full">Получить аудит бесплатно</button>
        <a href={WA('Здравствуйте! Хочу бесплатный аудит безопасности дома и смету.')} target="_blank" rel="noreferrer" className="btn-wa mt-3 w-full"><Ico.wa className="h-5 w-5" /> Написать в WhatsApp</a>
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
        <Pain />
        <Kits onPick={scrollToQuiz} />
        <Benefits />
        <Process />
        <AppBlock />
        <Cases />
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
