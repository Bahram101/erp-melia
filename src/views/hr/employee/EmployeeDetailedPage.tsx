import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
  CNav,
  CTabContent,
  CSpinner,
} from '@coreui/react-pro'
import { Link, useParams } from 'react-router-dom'
import {
  useEmployeeDetailedQuery,
  useCustomerAdressesQuery,
  useEmployeePositionsQuery,
} from 'hooks/hr/employeeQueries'
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
  const [activeKey, setActiveKey] = useState('MAIN_DATA') //
  const params = useParams()
  const employeeDetailedQuery = useEmployeeDetailedQuery(params.id, true)
  const customerAddressesQuery = useCustomerAdressesQuery(
    employeeDetailedQuery?.data?.customerId,
    false,
  )
  const employeePositionsQuery = useEmployeePositionsQuery(params.id, false)

  useEffect(() => {
    if (employeeDetailedQuery.data) {
      customerAddressesQuery.refetch()
      employeePositionsQuery.refetch()
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
      key: 'UNPAID_DEPOSITS',
      label: 'Не оплаченные депозиты',
    },
    {
      key: 'USER_BRANCHES',
      label: ' Филиалы пользователя',
    },
    {
      key: 'HIERARCHY',
      label: 'Иерархия',
    },
  ]

  console.log('employeePositionsQuery', employeePositionsQuery)

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
        <CNav variant="pills" role="tablist" className="mb-3">
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
            {activeKey === 'MAIN_DATA' && (
              <EmployeeMainData mainData={employeeDetailedQuery?.data} />
            )}
            {activeKey === 'CONTACTS' && (
              <EmployeeContacts addresses={customerAddressesQuery?.data} />
            )}
            {activeKey === 'POSITIONS' && (
              <EmployeePositions positions={employeePositionsQuery?.data} />
            )}
            {activeKey === 'BALANCE' && <EmployeeBalance balance={{}} />}
            {activeKey === 'DEPOSIT' && <EmployeeDeposit deposit={{}} />}
            {activeKey === 'UNPAID_DEPOSITS' && <EmployeeUnPaidDeposits unpaidDeposits={{}} />}
            {activeKey === 'USER_BRANCHES' && <EmployeeUserBranches userBranches={{}} />}
            {activeKey === 'HIERARCHY' && <EmployeeHierarchy hierarchy={{}} />}
          </CTabContent>
        )}
      </CCardBody>
    </CCard>
  )
}

export default EmployeeDetailedPage
