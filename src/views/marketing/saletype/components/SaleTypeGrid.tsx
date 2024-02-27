import React from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { SaleTypeGridModel } from '../../../../models/marketing/MrkModels'
import { formatMoney } from '../../../../utils/UtilFuncs'
import ActionButtonContent, { ActionButtonType } from '../../../../components/button/ActionButtonContent'

interface Props {
  items: SaleTypeGridModel[]
  isLoading: boolean
}

const SaleTypeGrid = ({ items, isLoading }: Props) => {
  const columns = [
    {
      key: 'name',
      label: 'Название',
    },
    {
      key: 'price',
      label: 'Цена',
    },
    {
      key: 'firstPayment',
      label: 'Перв. оплата',
    },
    {
      key: 'minFirstPayment',
      label: 'Мин. перв. оплата',
    },
    {
      key: 'monthCount',
      label: 'Кол. месяцев',
    },
    {
      key: 'fromDate',
      label: 'Дата С',
    },
    {
      key: 'toDate',
      label: 'Дата По',
    },
    {
      key: 'saleViaBank',
      label: 'Через банк',
    },
    {
      key: 'bankName',
      label: 'Банк',
    },
    {
      key: 'note',
      label: 'Примечание',
    },
    {
      key: 'actions',
      label: '',
      filter: false,
      sorter: false,
      _style: { width: '5%' },
    },
  ]

  return (
    <CSmartTable
      columns={columns.flat()}
      items={items || []}
      itemsPerPage={30}
      pagination
      columnFilter
      loading={isLoading}
      scopedColumns={{
        price: (item: SaleTypeGridModel) => (
          <td>
            {formatMoney(item.price)}
          </td>
        ),
        firstPayment: (item: SaleTypeGridModel) => (
          <td>
            {formatMoney(item.firstPayment)}
          </td>
        ),
        minFirstPayment: (item: SaleTypeGridModel) => (
          <td>
            {formatMoney(item.minFirstPayment)}
          </td>
        ),
        saleViaBank: (item: SaleTypeGridModel) => (
          <td>
            {item.saleViaBank ? 'ДА' : 'НЕТ'}
          </td>
        ),
        actions: (item: any) => (
          <td>
            <ActionButtonContent
              type={ActionButtonType.EDIT_LINK}
              href={`/marketing/sale-types/edit/${item.id}`}
            />
          </td>
        ),
      }}
    />
  )
}

export default SaleTypeGrid
