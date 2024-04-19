import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import React, { useState } from 'react'
import { WhouseDocDetailedItemGridModel } from '../../../../models/whouse/whouseModels'
import { formatMoney } from '../../../../utils/UtilFuncs'
import ItemSerialNumberViewModal from './ItemSerialNumberViewModal'
import ActionButtonContent, { ActionButtonType } from '../../../../components/button/ActionButtonContent'

type Props = {
  items: WhouseDocDetailedItemGridModel[]
  showPriceColumn?: boolean
}
const WhouseDocDetailedItemsGrid = ({ items, showPriceColumn }: Props) => {
  const [visibleSerNumViewModal, setVisibleSerNumViewModal] = useState<boolean>(false)
  const [serNums, setSerNums] = useState<string[]>([])

  return <>
    <ItemSerialNumberViewModal
      visible={visibleSerNumViewModal}
      serialNumbers={serNums}
      onClose={() => {
        setVisibleSerNumViewModal(false)
        setSerNums([])
      }}
    />
    <CTable striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Наименование</CTableHeaderCell>
          {showPriceColumn && <CTableHeaderCell scope="col">Цена покупки</CTableHeaderCell>}
          <CTableHeaderCell scope="col">Количество</CTableHeaderCell>
          <CTableHeaderCell scope="col"></CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {items.map((item: WhouseDocDetailedItemGridModel, index: number) => (
          <CTableRow key={item.id}>
            <CTableDataCell>{index + 1}</CTableDataCell>
            <CTableDataCell>{item.goodsName}</CTableDataCell>
            {showPriceColumn && <CTableDataCell>{formatMoney(item.unitPrice)}</CTableDataCell>}
            <CTableDataCell>{item.quantity}</CTableDataCell>
            <CTableDataCell>{item.serialNumbers && item.serialNumbers.length > 0 &&
              <ActionButtonContent
                type={ActionButtonType.VIEW}
                onClick={() => {
                  setSerNums(item.serialNumbers)
                  setVisibleSerNumViewModal(true)
                }}
              />}
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  </>
}

export default WhouseDocDetailedItemsGrid