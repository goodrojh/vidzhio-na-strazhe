// Reconstructed ВИДЖИО logo (eye mark + wordmark + taglines).
// `light` = true renders white text for dark backgrounds.
export default function Logo({ light = true, withTagline = true, className = '' }) {
  const text = light ? '#FFFFFF' : '#161C3A'
  const eyeStroke = light ? '#FFFFFF' : '#161C3A'
  const sub = light ? 'rgba(255,255,255,0.65)' : 'rgba(22,28,58,0.65)'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="ВИДЖИО">
      <svg width="42" height="42" viewBox="0 0 64 64" className="shrink-0" aria-hidden="true">
        <path
          d="M8 33 C19 20, 45 20, 56 33 C45 46, 19 46, 8 33 Z"
          fill="none"
          stroke={eyeStroke}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="33" r="8.6" fill="#1BA9AC" />
        <circle cx="32" cy="33" r="3.3" fill="#0E1226" />
        <circle cx="29.4" cy="30.4" r="1.5" fill="#ffffff" />
        <path
          d="M15 19 C25 13.5, 39 13.5, 48 19"
          fill="none"
          stroke="#F26A21"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        {withTagline && (
          <span
            className="text-[9px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: sub }}
          >
            группа компаний
          </span>
        )}
        <span
          className="font-display text-[22px] font-extrabold tracking-tight"
          style={{ color: text }}
        >
          ВИД<span style={{ color: '#1BA9AC' }}>Ж</span>ИО
        </span>
        {withTagline && (
          <span
            className="text-[9px] font-medium tracking-[0.08em]"
            style={{ color: sub }}
          >
            всё сработает вовремя
          </span>
        )}
      </span>
    </span>
  )
}
