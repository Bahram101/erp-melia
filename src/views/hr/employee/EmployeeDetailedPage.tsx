import React, { useEffect, useMemo, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
  CNav,
  CTabContent,
  CTabPane,
  CTable,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CSpinner,
} from '@coreui/react-pro'
import { Link, useParams } from 'react-router-dom'
import { useEmployeeDetailedQuery } from 'hooks/hr/employeeQueries'
import { FaAngleLeft } from 'react-icons/fa6'
import TabNavItem from './components/TabNavItem'

const EmployeeDetailedPage = () => {
  const [activeKey, setActiveKey] = useState('MAIN_DATA')
  const params = useParams()
  const employeeDetailedQuery = useEmployeeDetailedQuery(params.id, true)
  if (employeeDetailedQuery.data) {
    var { iin, lastname, middlename, firstname, birthDate, addresses } = employeeDetailedQuery?.data
  }

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
            <CTabPane
              role="tabpanel"
              aria-labelledby="home-tab-pane"
              visible={activeKey === 'MAIN_DATA'}
            >
              <CTable striped>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell className="col-4 fw-bold">Фамилия</CTableDataCell>
                    <CTableDataCell>{lastname}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell className="fw-bold">Имя</CTableDataCell>
                    <CTableDataCell>{firstname}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell className="fw-bold">Отчество</CTableDataCell>
                    <CTableDataCell>{middlename}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell className="fw-bold">ИИН</CTableDataCell>
                    <CTableDataCell>{iin}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell className="fw-bold">Дата рождения</CTableDataCell>
                    <CTableDataCell>{birthDate}</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="profile-tab-pane"
              visible={activeKey === 'CONTACTS'}
            >
              Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee
              squid.
            </CTabPane>
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
