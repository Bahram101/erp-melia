import React from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { CallGridModel } from '../../../models/crm/CallModels'
import ActionButtonContent, { ActionButtonType } from '../../../components/button/ActionButtonContent'

interface Props {
  data: CallGridModel[]
  isLoading: boolean
  onClickInfo: (regCode: string) => void
}

const CallGrid = ({ data, isLoading, onClickInfo }: Props) => {
  const columns = [
    {
      key: 'contractRegCode',
      label: 'Номер договора',
      _style: { width: '130px' },
    },
    {
      key: 'customerName',
      label: 'Клиент',
    },
    {
      key: 'scheduleTime',
      label: 'Дата запл. звонка',
    },
    {
      key: 'typeName',
      label: 'Тип звонка',
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
        actions: (item: CallGridModel) => (
          <td>
            <ActionButtonContent
              item={item}
              type={ActionButtonType.INFO}
              onClick={(givenItem) => onClickInfo(givenItem.id)}
            />
          </td>
        ),
      }}
    />
  )
}

export default CallGrid
