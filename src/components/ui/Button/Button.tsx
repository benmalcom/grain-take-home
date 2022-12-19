import './Button.scss';
import cx from 'classnames';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <button className={cx('ButtonDefault', className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
