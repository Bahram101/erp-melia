import { CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import { ApproveDocDetailedModel } from '../../../models/docflow/DocflowModels'
import CustomerRef from '../../../components/customer/CustomerRef'
import { Doctype } from '../../../models/CommonModels'
import ActionButtonContent, { ActionButtonType } from '../../../components/button/ActionButtonContent'

type Props = {
  model: ApproveDocDetailedModel
}
const ApproveDocDetailedView = ({ model }: Props) => {

  return (
    <CRow>
      <CCol md>
        <CTable className={'table table-striped item-detailed'}>
          <CTableBody>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Регистрационный номер
              </CTableDataCell>
              <CTableHeaderCell>
                {model.regNumber}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Тип документа
              </CTableDataCell>
              <CTableHeaderCell>
                {model.doctype.displayName}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Статус
              </CTableDataCell>
              <CTableHeaderCell>
                {model.status.displayName}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Автор документа
              </CTableDataCell>
              <CTableHeaderCell>{model.creator.empName}</CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Дата-время создания
              </CTableDataCell>
              <CTableHeaderCell>{model.createdAt}</CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Дата-время редактирования
              </CTableDataCell>
              <CTableHeaderCell>{model.updatedAt}</CTableHeaderCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCol>
      <CCol md>
        <CTable className={'table table-striped item-detailed'}>
          <CTableBody>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Рег. номер
              </CTableDataCell>
              <CTableHeaderCell>
                {model?.contextDoc?.regNumber}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Дата
              </CTableDataCell>
              <CTableHeaderCell>
                {model.contextDoc.docDate}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Клиент
              </CTableDataCell>
              <CTableHeaderCell>
                <CustomerRef customer={model.contextDoc.customer} />
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Филиал
              </CTableDataCell>
              <CTableHeaderCell>
                {model.contextDoc.branch?.displayName}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Дилер
              </CTableDataCell>
              <CTableHeaderCell>
                {model.contextDoc.responsible?.empName}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Ссылка на документ
              </CTableDataCell>
              <CTableHeaderCell>
                {model.contextDoc?.doctype && model.contextDoc?.doctype?.name === Doctype.CONTRACT
                  && <ActionButtonContent
                    type={ActionButtonType.VIEW_LINK}
                    href={`/marketing/contracts/view/${model.contextDoc.id}`}
                  />}
              </CTableHeaderCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCol>
    </CRow>
  )
}

export default ApproveDocDetailedView
