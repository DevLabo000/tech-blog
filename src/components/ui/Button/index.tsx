/* eslint-disable */

import Link from 'next/link';

export type ButtonProps = {
  icon?: string;
  color?: string;
  children?: string;
  size?: 'smal' | 'lage';
  reverse?: boolean;
  textlink?: boolean;
  onClick: () => void;
  disabled?: boolean;
  notShadow?: boolean;
  href?: string;
  target?: '_blank';
  isSelected?: boolean;
};

export const Button: React.FC<ButtonProps> = (props) => {
  const { icon, color, children, size, reverse, textlink, onClick, disabled, notShadow, href, target, isSelected } =
    props;

  if (href) {
    return (
      <Link href={href}>
        <a>
          {children && <span>{children}</span>}
          {icon && <span>a</span>}
        </a>
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled}>
      {children && <span>{children}</span>}
      {icon && <span>icon</span>}
    </button>
  );
};
