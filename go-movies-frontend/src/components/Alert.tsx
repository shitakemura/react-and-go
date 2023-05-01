type Props = {
  className: string
  message: string
}

function Alert(props: Props) {
  return (
    <div className={'alert ' + props.className} role='alert'>
      {props.message}
    </div>
  )
}

export default Alert
