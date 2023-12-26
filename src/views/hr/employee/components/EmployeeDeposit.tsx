import React from 'react'
import { CTabPane, CSmartTable } from '@coreui/react-pro'

type TabPaneProps = {
  activeKey: string
  data: any
}

const EmployeeDeposit = ({ activeKey, data }: TabPaneProps) => {
  return (
    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 'DEPOSIT'}>
      Депозит
    </CTabPane>
  )
}

export default EmployeeDeposit
