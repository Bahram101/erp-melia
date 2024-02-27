import { CashDocGridByContextModel } from '../../../../models/finance/FinModels'
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import { formatMoney } from '../../../../utils/UtilFuncs'
import React from 'react'


const CashDocGridByContext = ({ docs }: { docs: CashDocGridByContextModel[] }) => {

  return <CTable striped>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Рег. номер</CTableHeaderCell>
        <CTableHeaderCell scope="col">Касса</CTableHeaderCell>
        <CTableHeaderCell scope="col">Статус</CTableHeaderCell>
        <CTableHeaderCell scope="col">Дата</CTableHeaderCell>
        <CTableHeaderCell scope="col">Сумма</CTableHeaderCell>
        <CTableHeaderCell scope="col">Дата-время создания</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      {docs.map((item: CashDocGridByContextModel, index: number) => (
        <CTableRow key={item.id}>
          <CTableDataCell>{index + 1}</CTableDataCell>
          <CTableDataCell>{item.regNumber}</CTableDataCell>
          <CTableDataCell>{item.toCash?.displayName}</CTableDataCell>
          <CTableDataCell>{item.status?.displayName}</CTableDataCell>
          <CTableDataCell>{item.docDate}</CTableDataCell>
          <CTableDataCell>{formatMoney(item.amount)}</CTableDataCell>
          <CTableDataCell>{item.createdAt}</CTableDataCell>
        </CTableRow>
      ))}
    </CTableBody>
  </CTable>
}

export default CashDocGridByContext
