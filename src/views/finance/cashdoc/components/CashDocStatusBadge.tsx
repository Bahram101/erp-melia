import React from 'react'
import { CBadge } from '@coreui/react-pro'
import { DocStatus } from '../../../../models/CommonModels'

interface Props {
  status: DocStatus | string
  statusName: string
}

const CashDocStatusBadge = ({ status, statusName }: Props) => {
  let color
  switch (status) {
    case DocStatus.NEW:
      color = 'primary'
      break

    case DocStatus.CLOSED:
      color = 'success'
      break

    case DocStatus.CANCELLED:
      color = 'danger'
      break

    default:
      color = 'dark'
      break
  }

  return <CBadge color={color}>{statusName}</CBadge>
}

export default CashDocStatusBadge
