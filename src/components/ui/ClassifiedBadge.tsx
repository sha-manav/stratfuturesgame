interface ClassifiedBadgeProps {
  level?: 'TOP SECRET' | 'SECRET' | 'CONFIDENTIAL';
  caveats?: string[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { text: 'text-[8px]', px: 'px-2 py-0.5', gap: 'gap-1.5' },
  md: { text: 'text-[10px]', px: 'px-3 py-1', gap: 'gap-2' },
  lg: { text: 'text-xs', px: 'px-4 py-1.5', gap: 'gap-3' },
};

export default function ClassifiedBadge({
  level = 'TOP SECRET',
  caveats = ['NOFORN', 'ORCON'],
  className = '',
  size = 'md',
}: ClassifiedBadgeProps) {
  const s = sizeMap[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      <span
        className={`classified-stamp ${s.text} ${s.px} border rounded-sm`}
        style={{
          borderColor: 'rgba(239,68,68,0.6)',
          background: 'rgba(239,68,68,0.08)',
          letterSpacing: '0.15em',
        }}
      >
        ★ {level}
      </span>
      {caveats.map((c) => (
        <span
          key={c}
          className={`font-mono ${s.text} font-semibold tracking-widest uppercase`}
          style={{ color: 'rgba(239,68,68,0.7)' }}
        >
          // {c}
        </span>
      ))}
      <span
        className={`classified-stamp ${s.text}`}
        style={{ color: 'rgba(239,68,68,0.7)' }}
      >
        ★
      </span>
    </div>
  );
}
