import { ChangeEvent } from 'react'

type Option = {
  id: string
  value: string
}

type Props = {
  name: string
  title: string
  value: string
  placeHolder: string
  options: Option[]
  errorDiv: string
  errorMsg: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

function Select(props: Props) {
  return (
    <div className='mb-3'>
      <label htmlFor={props.name} className='form-label'>
        {props.title}
      </label>
      <select
        className='form-select'
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        <option>{props.placeHolder}</option>
        {props.options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.value}
            </option>
          )
        })}
      </select>
      <div className={props.errorDiv}>{props.errorMsg}</div>
    </div>
  )
}

export default Select
