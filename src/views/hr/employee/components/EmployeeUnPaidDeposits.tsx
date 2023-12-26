import React from 'react'
import { CTabPane, CSmartTable } from '@coreui/react-pro'

type TabPaneProps = {
  activeKey: string
  data: any
}

const EmployeeUnPaidDeposits = ({ activeKey, data }: TabPaneProps) => {
  return (
    <CTabPane
      role="tabpanel"
      aria-labelledby="home-tab-pane"
      visible={activeKey === 'UNPAID DEPOSITS'}
    >
      Не оплаченные депозиты
    </CTabPane>
  )
}

export default EmployeeUnPaidDeposits
