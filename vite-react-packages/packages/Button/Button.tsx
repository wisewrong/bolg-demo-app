import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

export type ButtonProps = {
  className?: string;
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ className, ...props }) => {
  return <button className={classNames('my-button', className)} {...props} />;
};

export default Button;
