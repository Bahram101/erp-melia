import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
  CNav,
  CTabContent,
  CSpinner,
  CTabPane,
} from '@coreui/react-pro'
import { Link, useParams } from 'react-router-dom'
import { FaAngleLeft } from 'react-icons/fa6'
import TabNavItem from '../../../components/TabNavItem'
import EmployeeMainData from './components/EmployeeMainData'
import EmployeeContacts from './components/EmployeeContacts'
import EmployeeBalance from './components/EmployeeBalance'
import EmployeeDeposit from './components/EmployeeDeposit'
import EmployeeUnPaidDeposits from './components/EmployeeUnPaidDeposits'
import EmployeeUserBranches from './components/EmployeeUserBranches'
import EmployeeHierarchy from './components/EmployeeUserHierarchy'
import { useCustomerAdressesQuery } from '../../../hooks/reference/refCustomerQueries'
import { useEmployeeDetailedQuery, useEmployeePostsQuery } from 'hooks/hr/employeeQueries'
import EmployeePosts from './components/EmployeePosts'
import { useCustomerBalanceQuery } from 'hooks/report/reportQueries'

const EmployeeDetailedPage = () => {
  const [activeKey, setActiveKey] = useState('MAIN_DATA')
  const [employeeInfo, setEmployeeInfo] = useState<{ firstname: string; lastname: string }>({
    firstname: '',
    lastname: '',
  })
  const params = useParams()
  const employeeDetailedQuery = useEmployeeDetailedQuery(params.id, true)
  const customerAddressesQuery = useCustomerAdressesQuery(
    employeeDetailedQuery?.data?.customerId,
    false,
  )

  useEffect(() => {
    if (employeeDetailedQuery.data) {
      customerAddressesQuery.refetch()
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

  return (
    <CCard>
      <CCardHeader>
        <h4 className="float-start">
          Карточка сотрудника {employeeInfo.lastname} {employeeInfo?.firstname}
        </h4>
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
        <CNav variant="tabs" role="tablist" className="mb-3">
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
            <CTabPane
              role="tabpanel"
              aria-labelledby="main-tab-pane"
              visible={activeKey === 'MAIN_DATA'}
            >
              <EmployeeMainData mainData={employeeDetailedQuery?.data} />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="contact-tab-pane"
              visible={activeKey === 'CONTACTS'}
            >
              <EmployeeContacts addresses={customerAddressesQuery?.data || []} />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="post-tab-pane"
              visible={activeKey === 'POSITIONS'}
            >
              <EmployeePosts employeeId={params.id || ''} />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="balance-tab-pane"
              visible={activeKey === 'BALANCE'}
            >
              <EmployeeBalance
                customerId={employeeDetailedQuery?.data?.customerId}
                employeeInfo={employeeInfo}
              />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="deposit-tab-pane"
              visible={activeKey === 'DEPOSIT'}
            >
              <EmployeeDeposit deposit={{}} />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="unpaid-dep-tab-pane"
              visible={activeKey === 'UNPAID_DEPOSITS'}
            >
              <EmployeeUnPaidDeposits unpaidDeposits={{}} />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="user-branches-tab-pane"
              visible={activeKey === 'USER_BRANCHES'}
            >
              <EmployeeUserBranches userBranches={{}} />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="hierarchy-tab-pane"
              visible={activeKey === 'HIERARCHY'}
            >
              <EmployeeHierarchy hierarchy={{}} />
            </CTabPane>
          </CTabContent>
        )}
      </CCardBody>
    </CCard>
  )
}

export default EmployeeDetailedPage
