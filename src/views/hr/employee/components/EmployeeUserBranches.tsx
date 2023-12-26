import React from 'react'
import { CTabPane, CSmartTable } from '@coreui/react-pro'

type TabPaneProps = {
  activeKey: string
  data: any
}

const EmployeeUserBranches = ({ activeKey, data }: TabPaneProps) => {
  return (
    <CTabPane
      role="tabpanel"
      aria-labelledby="home-tab-pane"
      visible={activeKey === 'USER BRANCHES'}
    >
      Филиалы пользователя
    </CTabPane>
  )
}

export default EmployeeUserBranches
