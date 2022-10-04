import cn from 'classnames'
import {
  Input as AntInput, //
  InputProps as AntInputProps,
} from 'antd'
import './input.scss'

export type IInput = AntInputProps

export function Input(props: IInput): JSX.Element {
  const {className, ...rest} = props

  return <AntInput className={cn('fs-input', className)} {...rest} />
}

export default Input
