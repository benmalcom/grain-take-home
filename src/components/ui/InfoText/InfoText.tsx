import './InfoText.scss';
import cx from 'classnames';
import React from 'react';

interface InfoTextProps {
  children: React.ReactNode;
  className?: string;
}
const InfoText: React.FC<InfoTextProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={cx('InfoText', className)} {...props}>
      {children}
    </p>
  );
};

export default InfoText;
