import { compose } from '../../utils/index.ts';
import type { BaseAtomProps } from '../types.tsx';

interface TagProps extends BaseAtomProps {
  children: string;
  color?: string;
  size?: 's' | 'm';
}

const classesBySize = {
  s: 'px-2 py-1 mr-2 mb-1 text-xs',
  m: 'px-3 py-1 mr-2 mb-2 text-sm',
};

export const Tag = ({ children, size, className }: TagProps) => {
  return (
    <span
      className={compose(
        'inline-block font-semibold text-gray-500 bg-gray-200 rounded-full',
        classesBySize[size ?? 'm'],
        className ?? '',
      )}
    >
      {children}
    </span>
  );
};
