import React from 'react'
import { CashDocGridModel, RewardDocGridModel } from '../../../../models/finance/FinModels'
import { formatMoney } from '../../../../utils/UtilFuncs'
import { CSmartTable } from '@coreui/react-pro'
import ActionButtonContent, { ActionButtonType } from '../../../../components/button/ActionButtonContent'

interface Props {
  data: RewardDocGridModel[]
  isLoading: boolean
}

const RewardDocGrid = ({ data, isLoading }: Props) => {
  const columns = [
    {
      key: 'branchName',
      label: 'Филиал',
    },
    {
      key: 'contractRegCode',
      label: 'Рекомендатель',
    },
    {
      key: 'targetContractRegCode',
      label: 'Рекомендованный',
    },
    {
      key: 'amount',
      label: 'Сумма',
    },
    {
      key: 'doctypeName',
      label: 'Тип документа',
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
        amount: (item: RewardDocGridModel) => (
          <td>
            {formatMoney(item.amount)}
          </td>
        ),
        actions: (item: RewardDocGridModel) => (
          <td>
            <ActionButtonContent
              type={ActionButtonType.VIEW_LINK}
              href={`/finance/reward-docs/view/${item.id}`}
            />
          </td>
        ),
      }}
    />
  )
}

export default RewardDocGrid
