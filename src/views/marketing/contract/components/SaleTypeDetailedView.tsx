import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { SaleTypeDetailedModel } from '../../../../models/marketing/MrkModels'
import { formatMoney } from '../../../../utils/UtilFuncs'

const SaleTypeDetailedView = ({ saleType }: { saleType: SaleTypeDetailedModel | undefined }) => {

  return <CCard>
    <CCardHeader>
      <h5>Вид продажи</h5>
    </CCardHeader>
    <CCardBody>
      {saleType && <CRow>
        <CCol md>
          <CTable className={'table table-striped item-detailed'}>
            <CTableBody>
              <CTableRow>
                <CTableDataCell style={{ textAlign: 'end' }}>
                  Название
                </CTableDataCell>
                <CTableHeaderCell>
                  {saleType.name}
                </CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell style={{ textAlign: 'end' }}>
                  Цена
                </CTableDataCell>
                <CTableHeaderCell>
                  {formatMoney(saleType.price)}
                </CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell style={{ textAlign: 'end' }}>
                  Первоначальный взнос
                </CTableDataCell>
                <CTableHeaderCell>
                  {formatMoney(saleType.firstPayment)}
                </CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell style={{ textAlign: 'end' }}>
                  Минимальный первоначальный взнос
                </CTableDataCell>
                <CTableHeaderCell>
                  {formatMoney(saleType.minFirstPayment)}
                </CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell style={{ textAlign: 'end' }}>
                  Минимальная сумма для премии
                </CTableDataCell>
                <CTableHeaderCell>
                  {formatMoney(saleType.minPaymentAmount)}
                </CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell style={{ textAlign: 'end' }}>
                  Минимальная сумма для премии дилера
                </CTableDataCell>
                <CTableHeaderCell>
                  {formatMoney(saleType.minDealerPaymentAmount)}
                </CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell style={{ textAlign: 'end' }}>
                  Количество месяцов
                </CTableDataCell>
                <CTableHeaderCell>
                  {saleType.monthCount}
                </CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell style={{ textAlign: 'end' }}>
                  Дата С
                </CTableDataCell>
                <CTableHeaderCell>
                  {saleType.fromDate}
                </CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell style={{ textAlign: 'end' }}>
                  Дата По
                </CTableDataCell>
                <CTableHeaderCell>
                  {saleType.toDate}
                </CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell style={{ textAlign: 'end' }}>
                  Касса для банка
                </CTableDataCell>
                <CTableHeaderCell>
                  //ToDo
                </CTableHeaderCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCol>
        <CCol md>
          <CTable className={'table table-striped item-detailed'}>
            <CTableBody>
              <CTableRow>
                <CTableDataCell colSpan={2}>
                  Премии
                </CTableDataCell>
              </CTableRow>
              {saleType.empPayments.map((payment) => <CTableRow key={payment.id}>
                <CTableDataCell style={{ textAlign: 'end' }}>
                  {payment.positionName}
                </CTableDataCell>
                <CTableHeaderCell>
                  {formatMoney(payment.amount)}
                </CTableHeaderCell>
              </CTableRow>)}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>}
    </CCardBody>
  </CCard>
}

export default SaleTypeDetailedView
