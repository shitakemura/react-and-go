import { forwardRef, Ref, ChangeEvent } from 'react'

type Props = {
  name: string
  title: string
  type: string
  className: string
  placeholder?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  autoComplete: string
  value?: string
  errorDiv?: string
  errorMsg?: string
}

const Input = forwardRef((props: Props, ref: Ref<HTMLInputElement>) => {
  return (
    <div className='mb-3'>
      <label htmlFor={props.name} className='from-label'>
        {props.title}
      </label>
      <input
        type={props.type}
        className={props.className}
        id={props.name}
        ref={ref}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        autoComplete={props.autoComplete}
        value={props.value}
      />
      <div className={props.errorDiv}>{props.errorMsg}</div>
    </div>
  )
})

export default Input
