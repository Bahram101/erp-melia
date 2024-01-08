import { CustomerDocModel } from '../../../models/reference/RefModels'
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import { FaEye } from 'react-icons/fa'
import React from 'react'

const CustomerDocGridView = ({ docs }: { docs: CustomerDocModel[] }) => {

  return <CTable striped>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">Тип документа</CTableHeaderCell>
        <CTableHeaderCell scope="col">Рег. Номер</CTableHeaderCell>
        <CTableHeaderCell scope="col">Статус</CTableHeaderCell>
        <CTableHeaderCell scope="col">Дата</CTableHeaderCell>
        <CTableHeaderCell scope="col"></CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      {docs?.map((doc) => (
        <CTableRow key={doc.id}>
          <CTableDataCell>{doc.doctype?.displayName}</CTableDataCell>
          <CTableDataCell>{(doc.regCode && doc.regCode.length > 0 ? doc.regCode : doc.regNumber)}</CTableDataCell>
          <CTableDataCell>{doc.status?.displayName}</CTableDataCell>
          <CTableDataCell>{doc.docDate}</CTableDataCell>
          <CTableDataCell>
            <CButton
              color={'primary'}
              variant="outline"
              shape="square"
              size="sm"
              href={``}
            >
              <FaEye />
            </CButton>
          </CTableDataCell>
        </CTableRow>
      ))}
    </CTableBody>
  </CTable>
}

export default CustomerDocGridView
