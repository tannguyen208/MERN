import React from 'react';
import classNames from 'classnames';
import styles from './button.module.scss';

export type IButton = {
  title: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button(props: IButton): JSX.Element {
  return (
    <button className={classNames(styles['fs-btn'], 'box-shadow')} {...props}>
      {props.title}
    </button>
  );
}

export default Button;
