import { CNavItem, CNavLink } from '@coreui/react-pro'
import React from 'react'

type TabNavItemProps = {
  text: string
  number: number
  activeKey: number
  setActiveKey: (tabNumber: number) => void
}

const TabNavItem = ({ text, number, activeKey, setActiveKey }: TabNavItemProps) => {
  return (
    <CNavItem role="presentation">
      <CNavLink
        active={activeKey === number}
        component="button"
        role="tab"
        aria-controls="home-tab-pane"
        aria-selected={activeKey === number}
        onClick={() => setActiveKey(number)}
      >
        {text}
      </CNavLink>
    </CNavItem>
  )
}

export default TabNavItem
