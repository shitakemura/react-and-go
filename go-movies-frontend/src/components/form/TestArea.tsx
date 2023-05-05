import { ChangeEvent } from 'react'

type Props = {
  name: string
  title: string
  value: string
  rows: number
  errorDiv: string
  errorMsg: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

function TextArea(props: Props) {
  return (
    <div className='mb-3'>
      <label htmlFor={props.name} className='form-label'>
        {props.title}
      </label>
      <textarea
        className='form-control'
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        rows={props.rows}
      />
      <div className={props.errorDiv}>{props.errorMsg}</div>
    </div>
  )
}

export default TextArea
