import classNames from 'classnames';
import React from 'react';

export type DividerProps = {
  className?: string;
};

const Divider: React.FC<DividerProps> = ({ className, ...props }) => {
  return <div className={classNames('my-divider', className)} {...props} />;
};

export default Divider;
