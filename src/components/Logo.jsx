// Логотип ВИДЖИО — воссоздан по фирменному знаку (глаз + воркмарк + дескрипторы).
// `light = true` — белый воркмарк для тёмного фона; иконка-глаз всегда в фирменном синем.
export default function Logo({ light = true, withTagline = true, className = '' }) {
  const text = light ? '#FFFFFF' : '#15315F'
  const sub = light ? 'rgba(255,255,255,0.7)' : 'rgba(21,49,95,0.7)'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="ВИДЖИО — группа компаний">
      {/* Иконка-глаз */}
      <svg width="46" height="46" viewBox="0 0 64 64" className="shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="vIris" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3D8BE0" />
            <stop offset="55%" stopColor="#2E6FBF" />
            <stop offset="100%" stopColor="#1BA9AC" />
          </linearGradient>
          <linearGradient id="vBase" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#23508C" />
            <stop offset="100%" stopColor="#15315F" />
          </linearGradient>
        </defs>
        {/* верхнее «веко»-свуш */}
        <path
          d="M6 30 C20 12, 50 14, 60 27 C46 22, 22 23, 9 33 Z"
          fill="url(#vBase)"
        />
        {/* нижняя дуга глаза */}
        <path
          d="M9 33 C20 47, 46 47, 59 33"
          fill="none"
          stroke="url(#vBase)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* радужка */}
        <circle cx="32" cy="33" r="11" fill="url(#vIris)" />
        <circle cx="32" cy="33" r="5.2" fill="#10243F" />
        <circle cx="29" cy="30" r="2.1" fill="#EAF3FF" />
      </svg>

      {/* Текстовая часть */}
      <span className="flex flex-col leading-none">
        {withTagline && (
          <span className="text-[8.5px] font-bold uppercase tracking-[0.24em]" style={{ color: sub }}>
            группа компаний
          </span>
        )}
        <span className="font-display text-[23px] font-extrabold tracking-tight" style={{ color: text }}>
          ВИДЖИО
        </span>
        {withTagline && (
          <span className="text-[7.5px] font-semibold uppercase tracking-[0.12em]" style={{ color: sub }}>
            монтаж и обслуживание инженерных систем
          </span>
        )}
      </span>
    </span>
  )
}
