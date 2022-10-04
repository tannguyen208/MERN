import cn from 'classnames'
import {
  Button as AntButton, //
  ButtonProps as AntButtonProps,
} from 'antd'

// custom stylesheet
import './button.scss'

export type IButton = AntButtonProps & React.RefAttributes<HTMLElement>

export function Button(props: IButton): JSX.Element {
  const {className, ...rest} = props

  return <AntButton className={cn('fs-btn', className)} {...rest} />
}

export default Button
