import { ContextDocGridModel } from '../../models/CommonModels'
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import React from 'react'
import ActionButtonContent, { ActionButtonType } from '../button/ActionButtonContent'
import { getCashDocUriPathFromDoctype } from '../../utils/UrlHelper'
import { doctypeIsCashDoc } from '../../utils/DocUtils'

const RelatedDocGrid = ({ docs }: { docs: ContextDocGridModel[] }) => {
  return <CTable striped>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Тип документа</CTableHeaderCell>
        <CTableHeaderCell scope="col">Статус</CTableHeaderCell>
        <CTableHeaderCell scope="col">Дата</CTableHeaderCell>
        <CTableHeaderCell scope="col"></CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      {docs.map((item: ContextDocGridModel, index: number) => (
        <CTableRow key={item.id}>
          <CTableDataCell>{index + 1}</CTableDataCell>
          <CTableDataCell>{item.doctypeName}</CTableDataCell>
          <CTableDataCell>{item.statusName}</CTableDataCell>
          <CTableDataCell>{item.docDate}</CTableDataCell>
          <CTableDataCell>
            {doctypeIsCashDoc(item.doctype) && <ActionButtonContent
              type={ActionButtonType.VIEW_LINK}
              href={`/finance/cash-docs/${getCashDocUriPathFromDoctype(item.doctype)}/view/${item.id}`}
            />}
          </CTableDataCell>
        </CTableRow>
      ))}
    </CTableBody>
  </CTable>
}

export default RelatedDocGrid