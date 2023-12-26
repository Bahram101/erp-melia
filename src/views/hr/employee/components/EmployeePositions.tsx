import React from 'react'
import { CTabPane, CSmartTable } from '@coreui/react-pro'

type TabPaneProps = {
  activeKey: string
  data: any
}

const EmployeePositions = ({ activeKey, data }: TabPaneProps) => {
  return (
    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 'POSITIONS'}>
      Должности
    </CTabPane>
  )
}

export default EmployeePositions
