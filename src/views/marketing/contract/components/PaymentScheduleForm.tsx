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
import { formatMoney } from '../../../../utils/UtilFuncs'

type Props = {
  items: PaymentScheduleFormModel[];
  handleContractPaymentChange: (idx: number, e: any) => void;
  distributePayments: () => void;
  distributing: boolean;
  editMode?: boolean
}
const PaymentScheduleForm = ({
                               items,
                               handleContractPaymentChange,
                               distributePayments,
                               distributing,
                               editMode = true,
                             }: Props) => {

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
                      {i === 0 && editMode ? <DatePickerField
                        fieldName={'paymentDate'}
                        handleChange={(e: any) => handleContractPaymentChange(i, e)}
                        value={item.paymentDate}
                      /> : <p>{item.paymentDate}</p>}
                    </CTableDataCell>
                    <CTableDataCell>
                      {editMode ? <CurrencyField
                        fieldName={'amount'}
                        handleChange={(e: any) => handleContractPaymentChange(i, e)}
                        value={item.amount}
                      /> : <p>{formatMoney(item.amount)}</p>}
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
