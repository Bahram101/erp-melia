import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import React from 'react'
import { CallGridModel } from '../../../models/crm/CallModels'

type Props = {
  items: CallGridModel[]
  handleClick: (id: string) => void
}
const CallMiniGridTable = ({ items, handleClick }: Props) => {
  return <CTable striped>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Дата-время звонка</CTableHeaderCell>
        <CTableHeaderCell scope="col">Дата-время запл.</CTableHeaderCell>
        <CTableHeaderCell scope="col">Тип звонка</CTableHeaderCell>
        <CTableHeaderCell scope="col">Результат</CTableHeaderCell>
        <CTableHeaderCell scope="col">Номер</CTableHeaderCell>
        <CTableHeaderCell scope="col">Звонил(a)</CTableHeaderCell>
        <CTableHeaderCell scope="col">Прим.</CTableHeaderCell>
        <CTableHeaderCell scope="col"></CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      {items.map((item, index) => (
        <CTableRow key={item.id}>
          <CTableDataCell>{index + 1}</CTableDataCell>
          <CTableDataCell>{item.callTime}</CTableDataCell>
          <CTableDataCell>{item.scheduleTime}</CTableDataCell>
          <CTableDataCell>{item.typeName}</CTableDataCell>
          <CTableDataCell>{item.resultName}</CTableDataCell>
          <CTableDataCell>{item.phoneNumber}</CTableDataCell>
          <CTableDataCell>-</CTableDataCell>
          <CTableDataCell>{item.note}</CTableDataCell>
          <CTableDataCell>
            {!item.resultName && item.scheduleTime && <CButton type={'button'} onClick={() => handleClick(item.id)}>
              Совершить
            </CButton>}
          </CTableDataCell>
        </CTableRow>
      ))}
    </CTableBody>
  </CTable>
}

export default CallMiniGridTable