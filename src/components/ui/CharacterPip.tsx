import { characters } from '../../content/characters';

interface CharacterPipProps {
  characterId: string;
  showName?: boolean;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

const sizeMap = {
  xs: { dot: 'w-1.5 h-1.5', text: 'text-[11px]', gap: 'gap-1' },
  sm: { dot: 'w-2 h-2', text: 'text-[12px]', gap: 'gap-1.5' },
  md: { dot: 'w-2.5 h-2.5', text: 'text-sm', gap: 'gap-2' },
};

export default function CharacterPip({
  characterId,
  showName = false,
  size = 'sm',
  className = '',
}: CharacterPipProps) {
  const char = characters.find((c) => c.id === characterId);
  if (!char) return null;

  const s = sizeMap[size];

  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <span
        className={`${s.dot} rounded-full flex-shrink-0`}
        style={{
          background: char.color,
          boxShadow: `0 0 6px ${char.color}80`,
        }}
      />
      {showName && (
        <span
          className={`font-ui ${s.text} font-semibold tracking-wide`}
          style={{ color: char.color }}
        >
          {char.name}
        </span>
      )}
    </span>
  );
}
