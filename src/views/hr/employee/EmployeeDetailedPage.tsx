import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
  CNav,
  CTabContent,
  CTabPane,
  CSpinner,
} from '@coreui/react-pro'
import { Link, useParams } from 'react-router-dom'
import { useEmployeeDetailedQuery, useCustomerAdressesQuery } from 'hooks/hr/employeeQueries'
import { FaAngleLeft } from 'react-icons/fa6'
import TabNavItem from './components/TabNavItem'
import EmployeeMainData from './components/EmployeeMainData'
import EmployeeContacts from './components/EmployeeContacts'
import EmployeePositions from './components/EmployeePositions'
import EmployeeBalance from './components/EmployeeBalance'
import EmployeeDeposit from './components/EmployeeDeposit'
import EmployeeUnPaidDeposits from './components/EmployeeUnPaidDeposits'
import EmployeeUserBranches from './components/EmployeeUserBranches'
import EmployeeHierarchy from './components/EmployeeUserHierarchy'

const EmployeeDetailedPage = () => {
  const [activeKey, setActiveKey] = useState('MAIN_DATA')
  const params = useParams()
  const employeeDetailedQuery = useEmployeeDetailedQuery(params.id, true)
  const customerDataQuery = useCustomerAdressesQuery(employeeDetailedQuery?.data?.customerId, false)

  useEffect(() => {
    if (employeeDetailedQuery?.data?.customerId) {
      customerDataQuery.refetch()
    }
  }, [employeeDetailedQuery.data])

  const tabs = [
    {
      key: 'MAIN_DATA',
      label: 'Основные данные',
    },
    {
      key: 'CONTACTS',
      label: 'Контакты',
    },
    {
      key: 'POSITIONS',
      label: 'Должности',
    },
    {
      key: 'BALANCE',
      label: 'Баланс',
    },
    {
      key: 'DEPOSIT',
      label: 'Депозит',
    },
    {
      key: 'UNPAID DEPOSITS',
      label: 'Не оплаченные депозиты',
    },
    {
      key: 'USER BRANCHES',
      label: ' Филиалы пользователя',
    },
    {
      key: 'HIERARCHY',
      label: 'Иерархия',
    },
  ]

  return (
    <CCard>
      <CCardHeader>
        <h4 className="float-start">Карточка сотрудника</h4>
        <div className="float-end">
          <Link to={'/hr/employees'}>
            <CButton color={'secondary'} variant="outline">
              <FaAngleLeft className="me-1" style={{ transform: 'translate(0, -1px)' }} />
              Назад
            </CButton>
          </Link>
        </div>
      </CCardHeader>
      <CCardBody>
        <CNav variant="pills" role="tablist" className="mb-4">
          {tabs.map((item: { label: string; key: string }) => {
            return (
              <TabNavItem
                key={item.key}
                label={item.label}
                itemKey={item.key}
                activeKey={activeKey}
                setActiveKey={setActiveKey}
              />
            )
          })}
        </CNav>

        {employeeDetailedQuery.isFetching ? (
          <div
            className="d-flex align-items-center justify-content-center w-100 "
            style={{ height: 300 }}
          >
            <CSpinner color="primary" />
          </div>
        ) : (
          <CTabContent>
            <EmployeeMainData activeKey={activeKey} data={employeeDetailedQuery?.data} />
            <EmployeeContacts activeKey={activeKey} data={customerDataQuery} />
            <EmployeePositions activeKey={activeKey} data={{}} />
            <EmployeeBalance activeKey={activeKey} data={{}} />
            <EmployeeDeposit activeKey={activeKey} data={{}} />
            <EmployeeUnPaidDeposits activeKey={activeKey} data={{}} />
            <EmployeeUserBranches activeKey={activeKey} data={{}} />
            <EmployeeHierarchy activeKey={activeKey} data={{}} />
          </CTabContent>
        )}
      </CCardBody>
    </CCard>
  )
}

export default EmployeeDetailedPage
