import React, { useEffect, useMemo, useState } from 'react'
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
import TabPane from './components/EmployeeMainData'
import EmployeeMainData from './components/EmployeeMainData'
import EmployeeContacts from './components/EmployeeContacts'
import { request } from '../../../http'

const EmployeeDetailedPage = () => {
  const [activeKey, setActiveKey] = useState('MAIN_DATA')
  const params = useParams()
  const employeeDetailedQuery = useEmployeeDetailedQuery(params.id, true)
  const customerDataQuery = useCustomerAdressesQuery(employeeDetailedQuery?.data?.customerId, true)

  useEffect(() => {
    // Fetch customer data when employee data changes
    if (employeeDetailedQuery?.data?.customerId) {
      customerDataQuery.refetch() // Optionally refetch the data
    }
  }, [employeeDetailedQuery.data, customerDataQuery.refetch])

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

  // console.log('customerData', customerData)

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
            {/* <EmployeeContacts activeKey={activeKey} data={customerData} /> */}
            <CTabPane
              role="tabpanel"
              aria-labelledby="contact-tab-pane"
              visible={activeKey === 'POSITIONS'}
            >
              Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="disabled-tab-pane"
              visible={activeKey === 'BALANCE'}
            >
              Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="disabled-tab-pane"
              visible={activeKey === 'DEPOSIT'}
            >
              Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="disabled-tab-pane"
              visible={activeKey === 'UNPAID DEPOSITS'}
            >
              Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="disabled-tab-pane"
              visible={activeKey === 'USER BRANCHES'}
            >
              Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="disabled-tab-pane"
              visible={activeKey === 'HIERARCHY'}
            >
              Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's
            </CTabPane>
          </CTabContent>
        )}
      </CCardBody>
    </CCard>
  )
}

export default EmployeeDetailedPage
