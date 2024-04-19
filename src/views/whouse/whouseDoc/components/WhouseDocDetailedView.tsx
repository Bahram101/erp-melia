import { CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import { WhouseDocDetailedModel } from '../../../../models/whouse/whouseModels'
import WhouseDocStatusBadge from './WhouseDocStatusBadge'
import { Doctype } from '../../../../models/CommonModels'
import CustomerRef from '../../../../components/customer/CustomerRef'
import { getInWhouseDoctypes, getOutWhouseDoctypes } from '../../../../utils/WhouseUtils'
import WhouseDocDetailedItemsGrid from './WhouseDocDetailedItemsGrid'
import RelatedDocGrid from '../../../../components/doc/RelatedDocGrid'
import { formatMoney } from '../../../../utils/UtilFuncs'

type Props = {
  model: WhouseDocDetailedModel
}
const WhouseDocDetailedView = ({ model }: Props) => {
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
                <WhouseDocStatusBadge status={model.status.status} statusName={model.status.displayName} />
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
            {model.doctype?.name === Doctype.RETURN && <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Род. документ
              </CTableDataCell>
              <CTableHeaderCell>
                {model.contextDoc?.displayName}
              </CTableHeaderCell>
            </CTableRow>}
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
            {model.doctype.name === Doctype.SUPPLY && <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Поставщик
              </CTableDataCell>
              <CTableHeaderCell>
                <CustomerRef customer={model.customer} />
              </CTableHeaderCell>
            </CTableRow>}
            {(getOutWhouseDoctypes().includes(model.doctype.name) || model.doctype.name === Doctype.MOVE_IN) &&
              <CTableRow>
                <CTableDataCell style={{ textAlign: 'end' }}>
                  Со склада
                </CTableDataCell>
                <CTableHeaderCell>
                  {model.fromWhouse?.displayName}
                </CTableHeaderCell>
              </CTableRow>}

            {(model.doctype && getInWhouseDoctypes().includes(model.doctype.name) || model.doctype.name === Doctype.MOVE_OUT) &&
              <CTableRow>
                <CTableDataCell style={{ textAlign: 'end' }}>
                  На склад
                </CTableDataCell>
                <CTableHeaderCell>
                  {model.toWhouse?.displayName}
                </CTableHeaderCell>
              </CTableRow>}
            {model.doctype?.name === Doctype.SUPPLY && <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Сумма
              </CTableDataCell>
              <CTableHeaderCell>
                {formatMoney(model.amount)}
              </CTableHeaderCell>
            </CTableRow>}
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
        <h6>Список товаров</h6>
        <WhouseDocDetailedItemsGrid items={model.items} />
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

export default WhouseDocDetailedView