// Логотип ВИДЖИО — оригинальный фирменный файл (public/media/logo-vidzhio.jpg).
// Лого свёрстано на белом фоне, поэтому на тёмной шапке показываем его на белой «плашке».
export default function Logo({ className = '', badge = true }) {
  return (
    <span
      className={`inline-flex items-center ${badge ? 'rounded-lg bg-white px-3 py-1.5 shadow-sm ring-1 ring-ink/5' : ''} ${className}`}
    >
      <img
        src={`${import.meta.env.BASE_URL}media/logo-vidzhio.jpg`}
        alt="ВИДЖИО — группа компаний. Монтаж и обслуживание инженерных систем"
        className="block h-7 w-auto sm:h-8"
        width="772"
        height="194"
      />
    </span>
  )
}
