import { RepGoodsInWhouseGridModel } from '../../../../models/report/RepWhouseModels'
import { CBadge, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import React from 'react'

type Props = {
  items: RepGoodsInWhouseGridModel[]
}
const RepGoodsInWhouseGrid = ({ items }: Props) => {

  return <CTable striped>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Товар</CTableHeaderCell>
        <CTableHeaderCell scope="col">Количество</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      {items.map((item, index) => (
        <CTableRow key={item.goodsId}>
          <CTableDataCell>{index + 1}</CTableDataCell>
          <CTableDataCell>{item.goodsName}</CTableDataCell>
          <CTableDataCell>
            <CBadge color={'info'}>{item.qty}</CBadge>
          </CTableDataCell>
        </CTableRow>
      ))}
    </CTableBody>
  </CTable>
}

export default RepGoodsInWhouseGrid