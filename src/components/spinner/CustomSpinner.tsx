import { CSpinner } from '@coreui/react-pro'

function CustomSpinner() {
  return (
    <CSpinner
      style={{
        top: '50%',
        left: '40%',
        height: 30,
        width: 30,
        position: 'absolute',
      }}
    />
  )
}

export default CustomSpinner
