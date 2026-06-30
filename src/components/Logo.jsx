// Логотип ВИДЖИО — воссоздан по фирменному знаку:
// глаз (жирная «бровь»-свуш + многослойная сине-бирюзовая радужка) + воркмарк ВИДЖИО
// с дескрипторами «ГРУППА КОМПАНИЙ» (сверху) и «МОНТАЖ И ОБСЛУЖИВАНИЕ ИНЖЕНЕРНЫХ СИСТЕМ» (снизу).
// light = true — белый воркмарк для тёмного фона; иконка всегда в фирменном синем.
export default function Logo({ light = true, withTagline = true, className = '' }) {
  const text = light ? '#FFFFFF' : '#15315F'
  const sub = light ? 'rgba(255,255,255,0.72)' : 'rgba(21,49,95,0.72)'

  return (
    <span className={`inline-flex items-center gap-3 ${className}`} aria-label="ВИДЖИО — группа компаний">
      {/* Иконка-глаз */}
      <svg width="52" height="46" viewBox="0 0 72 64" className="shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="vNavy" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2B5B9A" />
            <stop offset="100%" stopColor="#143461" />
          </linearGradient>
          <radialGradient id="vIris" cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#5AA6F0" />
            <stop offset="45%" stopColor="#2E74C8" />
            <stop offset="78%" stopColor="#1BA9AC" />
            <stop offset="100%" stopColor="#147E92" />
          </radialGradient>
        </defs>

        {/* белое глазное яблоко (миндаль) */}
        <path d="M6 33 C20 16, 52 16, 66 33 C52 49, 20 49, 6 33 Z" fill="#F4F9FF" />

        {/* радужка */}
        <circle cx="37" cy="33" r="13" fill="url(#vIris)" />
        <circle cx="37" cy="33" r="5" fill="#0F243F" />
        <circle cx="32.5" cy="28.5" r="2.2" fill="#EAF3FF" />

        {/* жирная «бровь»-свуш поверх верхнего века */}
        <path d="M2 27 C18 6, 54 8, 70 24 C54 15, 22 16, 8 33 C6 31, 3 29, 2 27 Z" fill="url(#vNavy)" />
        {/* нижнее веко-акцент */}
        <path d="M9 35 C22 49, 52 49, 64 34" fill="none" stroke="url(#vNavy)" strokeWidth="3.4" strokeLinecap="round" />
      </svg>

      {/* Текстовая часть */}
      <span className="flex flex-col leading-none">
        {withTagline && (
          <span className="text-[9px] font-extrabold uppercase tracking-[0.26em]" style={{ color: sub }}>
            группа&nbsp;компаний
          </span>
        )}
        <span className="font-display text-[26px] font-black leading-none tracking-tight" style={{ color: text }}>
          ВИДЖИО
        </span>
        {withTagline && (
          <span className="mt-[3px] text-[7.5px] font-bold uppercase tracking-[0.13em]" style={{ color: sub }}>
            монтаж и обслуживание инженерных систем
          </span>
        )}
      </span>
    </span>
  )
}
