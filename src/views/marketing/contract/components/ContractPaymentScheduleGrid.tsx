import { PaymentScheduleDetailedGridModel } from '../../../../models/marketing/MrkModels'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { formatMoney } from '../../../../utils/UtilFuncs'

const ContractPaymentScheduleGrid = ({ items }: { items: PaymentScheduleDetailedGridModel[] }) => {

  return <CCard>
    <CCardHeader>
      <h5>График платежей</h5>
    </CCardHeader>
    <CCardBody>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Дата оплаты</CTableHeaderCell>
            <CTableHeaderCell scope="col">Сумма оплаты</CTableHeaderCell>
            <CTableHeaderCell scope="col">Оплатил</CTableHeaderCell>
            <CTableHeaderCell scope="col">Деталь</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {items.map((item, index) => (
            <CTableRow key={item.id}>
              <CTableDataCell>{index + 1}</CTableDataCell>
              <CTableDataCell>{item.paymentDate}</CTableDataCell>
              <CTableDataCell>{formatMoney(item.amount)}</CTableDataCell>
              <CTableDataCell>{formatMoney(item.paidAmount)}</CTableDataCell>
              <CTableDataCell>
                {item.details?.map((detail, index2) => {
                  let style = {}
                  if (detail.status === 'CANCELLED') {
                    style = { color: 'red', textDecoration: 'line-through' }
                  }
                  return <p key={index2} style={style}>
                    {detail.doctypeName ? detail.doctypeName + ': ' : ''}
                    {detail.docDate ? detail.docDate + '; ' : ''}
                    {formatMoney(detail.amount) + '; '}
                    {detail.note}
                  </p>
                })}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>
}

export default ContractPaymentScheduleGrid
