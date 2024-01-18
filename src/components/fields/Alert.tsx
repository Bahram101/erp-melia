import { cilCheckCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAlert, CAlertLink } from '@coreui/react-pro'
import { FC } from 'react'

interface Props {
  message: string
  color: string
}

const Alert: FC<Props> = ({ message, color }) => {
  return (
    <CAlert dismissible color={color} className="d-flex align-items-center">
      <CIcon icon={cilCheckCircle} className="flex-shrink-0 me-2" width={24} height={24} />
      <div>{message}</div>
    </CAlert>
  )
}

export default Alert
