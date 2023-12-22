import React, { useEffect, useMemo, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTable,
  CRow,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import { useParams } from 'react-router-dom'
import { useEmployeeCard } from 'hooks/hr/employeeCard'
import { FaAngleLeft } from 'react-icons/fa6'
import TabNavItem from './components/TabNavItem'

const EmployeeCardPage = () => {
  const [activeKey, setActiveKey] = useState(1)
  const params = useParams()
  const employeeCard = useEmployeeCard(params.id)
  if (employeeCard.data) {
    var { iin, lastname, middlename, firstname, birthDate, addresses } = employeeCard?.data
  }
  const tabs = [
    {
      number: 1,
      text: 'Основные данные',
    },
    {
      number: 2,
      text: 'Контакты',
    },
    {
      number: 3,
      text: 'Должности',
    },
    {
      number: 4,
      text: 'Баланс',
    },
    {
      number: 5,
      text: 'Депозит',
    },
    {
      number: 6,
      text: 'Не оплаченные депозиты',
    },
    {
      number: 7,
      text: 'Филиалы пользователя',
    },
    {
      number: 8,
      text: 'Иерархия',
    },
  ]

  return (
    <CCard>
      <CCardHeader>
        <h4 className="float-start">Карточка сотрудника</h4>
        <div className="float-end">
          <CButton color={'secondary'} variant="outline" href={'/hr/employees'}>
            <FaAngleLeft className="me-1" style={{ transform: 'translate(0, -1px)' }} />
            Назад
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        <CNav variant="pills" role="tablist" className="mb-3">
          {tabs.map((item: { text: string; number: number }) => {
            return (
              <TabNavItem
                key={item.number}
                text={item.text}
                number={item.number}
                activeKey={activeKey}
                setActiveKey={setActiveKey}
              />
            )
          })}
        </CNav>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
            <CTable striped>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell className="col-4 font-weight-bold">Фамилия</CTableDataCell>
                  <CTableDataCell>{lastname}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Имя</CTableDataCell>
                  <CTableDataCell>{firstname}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Отчество</CTableDataCell>
                  <CTableDataCell>{middlename}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>ИИН</CTableDataCell>
                  <CTableDataCell>{iin}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Дата рождения</CTableDataCell>
                  <CTableDataCell>{birthDate}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2}>
            Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid.
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 3}>
            Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="disabled-tab-pane" visible={activeKey === 4}>
            Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="disabled-tab-pane" visible={activeKey === 5}>
            Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="disabled-tab-pane" visible={activeKey === 6}>
            Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="disabled-tab-pane" visible={activeKey === 7}>
            Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="disabled-tab-pane" visible={activeKey === 8}>
            Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's
          </CTabPane>
        </CTabContent>
      </CCardBody>
    </CCard>
  )
}

export default EmployeeCardPage
