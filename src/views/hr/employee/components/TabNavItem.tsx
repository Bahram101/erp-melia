import { CNavItem, CNavLink } from '@coreui/react-pro'
import React from 'react'

type TabNavItemProps = {
  label: string
  itemKey: string
  activeKey: string
  setActiveKey: (tabKey: string) => void
}

const TabNavItem = ({ label, itemKey, activeKey, setActiveKey }: TabNavItemProps) => {
  return (
    <CNavItem role="presentation">
      <CNavLink
        active={activeKey === itemKey}
        component="button"
        role="tab"
        aria-controls="home-tab-pane"
        aria-selected={activeKey === itemKey}
        onClick={() => setActiveKey(itemKey)}
      >
        {label}
      </CNavLink>
    </CNavItem>
  )
}

export default TabNavItem
