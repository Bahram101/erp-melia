import React from 'react'
import { CTabPane, CSmartTable } from '@coreui/react-pro'

type TabPaneProps = {
  activeKey: string
  data: any
}

const EmployeeBalance = ({ activeKey, data }: TabPaneProps) => {
  return (
    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 'BALANCE'}>
      Баланс
    </CTabPane>
  )
}

export default EmployeeBalance
