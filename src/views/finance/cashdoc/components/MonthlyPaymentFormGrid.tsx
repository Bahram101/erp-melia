import { CButton, CSmartTable } from '@coreui/react-pro'
import { MonthlyPaymentDocGridModel } from '../../../../models/finance/FinModels'
import { formatMoney } from '../../../../utils/UtilFuncs'
import React from 'react'

type Props = {
  data: MonthlyPaymentDocGridModel[]
  isLoading: boolean
  onClickPay: (item: MonthlyPaymentDocGridModel) => void
}

const MonthlyPaymentFormGrid = ({ data, isLoading, onClickPay }: Props) => {
  const columns = [
    {
      key: 'regCode',
      label: 'Дог. номер',
      _style: { width: '130px' },
    },
    {
      key: 'customerName',
      label: 'Клиент',
    },
    {
      key: 'dealerName',
      label: 'Дилер',
    },
    {
      key: 'paymentDate',
      label: 'Дата опл.',
    },
    {
      key: 'amount',
      label: 'Сумма',
    },
    {
      key: 'paidAmount',
      label: 'Оплатил',
    },
    {
      key: 'remainAmount',
      label: 'Должен',
    },
    {
      key: 'actions',
      label: '',
      filter: false,
      sorter: false,
      _style: { width: '10%' },
    },
  ]
  return (
    <CSmartTable
      columns={columns.flat()}
      items={data || []}
      itemsPerPage={30}
      pagination
      columnFilter
      loading={isLoading}
      scopedColumns={{
        amount: (item: MonthlyPaymentDocGridModel) => (
          <td>
            {formatMoney(item.amount)}
          </td>
        ),
        remainAmount: (item: MonthlyPaymentDocGridModel) => (
          <td>
            {formatMoney(item.remainAmount)}
          </td>
        ),
        paidAmount: (item: MonthlyPaymentDocGridModel) => (
          <td>
            {formatMoney(item.paidAmount)}
          </td>
        ),
        actions: (item: MonthlyPaymentDocGridModel) => (
          <td>
            <CButton
              color="secondary"
              onClick={() => onClickPay(item)}
            >
              Оплатить
            </CButton>
          </td>
        ),
      }}
    />
  )
}

export default MonthlyPaymentFormGrid