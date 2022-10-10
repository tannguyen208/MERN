import {forwardRef} from 'react'
import cn from 'classnames'
import {
  Input as AntInput, //
  InputProps as AntInputProps,
} from 'antd'
import './input.scss'

export type IInput = AntInputProps & {[key: string]: unknown}

export const Input = forwardRef((props: IInput, ref?: any): JSX.Element => {
  const {className, ...rest} = props

  return <AntInput className={cn('fs-input', className)} ref={ref} {...rest} />
})

export default Input
