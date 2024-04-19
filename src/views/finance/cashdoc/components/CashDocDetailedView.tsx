import { CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import { formatMoney } from '../../../../utils/UtilFuncs'
import { CashDocDetailedModel } from '../../../../models/finance/FinModels'
import { Doctype } from '../../../../models/CommonModels'
import { getOutCashDoctypes } from '../../../../utils/FinUtils'
import CashDocStatusBadge from './CashDocStatusBadge'
import RelatedDocGrid from '../../../../components/doc/RelatedDocGrid'

type Props = {
  model: CashDocDetailedModel
}
const CashDocDetailedView = ({ model }: Props) => {
  return <>
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
                <CashDocStatusBadge status={model.status.status} statusName={model.status.displayName} />
              </CTableHeaderCell>
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
            {(getOutCashDoctypes().includes(model.doctype.name) || model.doctype.name === Doctype.CASH_DOC_MOVE_IN) && <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Из кассы
              </CTableDataCell>
              <CTableHeaderCell>
                {model.fromCash?.displayName}
              </CTableHeaderCell>
            </CTableRow>}

            {(model.doctype.name === Doctype.CASH_DOC_PREPAYMENT_OUT || model.doctype.name === Doctype.CASH_DOC_SALARY_OUT) && <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Сотрудник
              </CTableDataCell>
              <CTableHeaderCell>
                {model.responsible?.empName}
              </CTableHeaderCell>
            </CTableRow>}

            {model.doctype && !getOutCashDoctypes().includes(model.doctype.name) && <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                На кассу
              </CTableDataCell>
              <CTableHeaderCell>
                {model.toCash?.displayName}
              </CTableHeaderCell>
            </CTableRow>}


            {model.doctype.name === Doctype.CASH_DOC_SERVICE_PAYMENT && <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Мастер
              </CTableDataCell>
              <CTableHeaderCell>{model.responsible?.empName}</CTableHeaderCell>
            </CTableRow>}
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
    <CRow>
      <CCol>
        <hr />
        <h6>Связанные документы</h6>
        <RelatedDocGrid docs={model.relatedDocs || []} />
      </CCol>
    </CRow>
  </>
}

export default CashDocDetailedView