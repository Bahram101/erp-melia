import { PaymentScheduleFormModel } from '../../../../models/marketing/MrkModels'
import {
  CButton,
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
import { DatePickerField } from '../../../../components/fields/DatePickerField'
import CurrencyField from '../../../../components/fields/CurrencyField'

type Props = {
  items: PaymentScheduleFormModel[];
  handleContractPaymentChange: (idx: number, e: any) => void;
  distributePayments: () => void;
  distributing: boolean;
}
const PaymentScheduleForm = ({ items, handleContractPaymentChange, distributePayments, distributing }: Props) => {

  return (
    <>
      <CCard>
        <CCardHeader>
          <h6 style={{ float: 'left' }}>График платежей</h6>
          <div style={{ float: 'right' }}>
            <CButton onClick={distributePayments}>{distributing ? 'Ждите...' : 'Распределить'}</CButton>
          </div>
        </CCardHeader>

        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Дата оплаты</CTableHeaderCell>
                <CTableHeaderCell scope="col">Сумма</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {items.map((item, i) => {
                return (
                  <CTableRow key={i}>
                    <CTableHeaderCell>{i + 1}</CTableHeaderCell>
                    <CTableDataCell>
                      {i === 0 ? <DatePickerField
                        fieldName={'paymentDate'}
                        handleChange={(e: any) => handleContractPaymentChange(i, e)}
                        value={item.paymentDate}
                      /> : <p>{item.paymentDate}</p>}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CurrencyField
                        fieldName={'amount'}
                        handleChange={(e: any) => handleContractPaymentChange(i, e)}
                        value={item.amount}
                      />
                    </CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default PaymentScheduleForm
