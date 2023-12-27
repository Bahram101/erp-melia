import React from 'react'
import { CTabPane, CSmartTable } from '@coreui/react-pro'

type Props = {
  positions: any
}

const EmployeePositions = ({ positions }: Props) => {
  return (
    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={true}>
      Должности
    </CTabPane>
  )
}

export default EmployeePositions
