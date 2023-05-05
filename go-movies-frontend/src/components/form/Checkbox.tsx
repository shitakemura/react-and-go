import { ChangeEvent } from 'react'

type Props = {
  name: string
  value: string
  checked: boolean
  title: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function Checkbox(props: Props) {
  return (
    <div className='form-check'>
      <input
        id={props.name}
        className='form-check-input'
        type='checkbox'
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        checked={props.checked}
      />
      <label className='form-check-label' htmlFor={props.name}>
        {props.title}
      </label>
    </div>
  )
}

export default Checkbox
