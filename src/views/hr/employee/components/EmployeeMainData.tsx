import React from 'react'
import { CTabPane, CTable, CTableRow, CTableBody, CTableDataCell } from '@coreui/react-pro'

type TabPaneProps = {
  activeKey: string
  data: any
  isLoading?: Boolean
}

const EmployeeMainData = ({ activeKey, data }: TabPaneProps) => {
  return (
    <>
      <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 'MAIN_DATA'}>
        <CTable striped>
          <CTableBody>
            <CTableRow>
              <CTableDataCell className="col-4 fw-bold">Фамилия</CTableDataCell>
              <CTableDataCell>{data?.lastname}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="fw-bold">Имя</CTableDataCell>
              <CTableDataCell>{data?.firstname}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="fw-bold">Отчество</CTableDataCell>
              <CTableDataCell>{data?.middlename}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="fw-bold">ИИН</CTableDataCell>
              <CTableDataCell>{data?.iin}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="fw-bold">Дата рождения</CTableDataCell>
              <CTableDataCell>{data?.birthDate}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CTabPane>
    </>
  )
}

export default EmployeeMainData
