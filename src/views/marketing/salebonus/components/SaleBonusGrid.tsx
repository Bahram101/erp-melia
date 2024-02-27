import React from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { SaleBonusGridModel } from '../../../../models/marketing/MrkModels'
import { formatMoney } from '../../../../utils/UtilFuncs'
import ActionButtonContent, { ActionButtonType } from '../../../../components/button/ActionButtonContent'

interface Props {
  items: SaleBonusGridModel[]
  isLoading: boolean
}

const SaleBonusGrid = ({ items, isLoading }: Props) => {
  const columns = [
    {
      key: 'branchName',
      label: 'Филиал',
    },
    {
      key: 'productName',
      label: 'Продукт',
    },
    {
      key: 'positionName',
      label: 'Должность',
    },
    {
      key: 'year',
      label: 'Год',
    },
    {
      key: 'month',
      label: 'Месяц',
    },
    {
      key: 'configs',
      label: 'Условия',
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
        branchName: (item: SaleBonusGridModel) => (
          <td>
            {item.branchName || 'Все филиалы'}
          </td>
        ),
        productName: (item: SaleBonusGridModel) => (
          <td>
            {item.productName || 'Все продукты'}
          </td>
        ),
        positionName: (item: SaleBonusGridModel) => (
          <td>
            {item.positionName || 'Все должности'}
          </td>
        ),
        configs: (item: SaleBonusGridModel) => (
          <td>
            {item.configs.map((config, idx) => <p key={idx}>
              {`${config.fromCount}-${config.toCount || '~'} -> ${formatMoney(config.amount)}`}
            </p>)}
          </td>
        ),
        actions: (item: any) => (
          <td>
            <ActionButtonContent
              type={ActionButtonType.EDIT_LINK}
              href={`/marketing/sale-bonuses/edit/${item.id}`}
            />
          </td>
        ),
      }}
    />
  )
}

export default SaleBonusGrid
