import { CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import { formatMoney } from '../../../../utils/UtilFuncs'
import { CashDocDetailedModel } from '../../../../models/finance/FinModels'

type Props = {
  model: CashDocDetailedModel
}
const CashDocDetailedView = ({ model }: Props) => {
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
              <CTableHeaderCell>{model.status.displayName}</CTableHeaderCell>
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
                Дата документа
              </CTableDataCell>
              <CTableHeaderCell>
                {model.docDate}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Филиал
              </CTableDataCell>
              <CTableHeaderCell>
                {model.branch?.displayName}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                На кассу
              </CTableDataCell>
              <CTableHeaderCell>
                {model.toCash?.displayName}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Мастер
              </CTableDataCell>
              <CTableHeaderCell>{model.responsible?.empName}</CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Сумма
              </CTableDataCell>
              <CTableHeaderCell>
                {formatMoney(model.amount)}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Примечание
              </CTableDataCell>
              <CTableHeaderCell>
                {model.note}
              </CTableHeaderCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCol>
    </CRow>
  )
}

export default CashDocDetailedView