import React from 'react';
import classNames from 'classnames';
import styles from './input.module.scss';

export type IInput = {} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input(props: IInput): JSX.Element {
  return <input className={classNames(styles['fs-input'])} {...props} />;
}

export default Input;
