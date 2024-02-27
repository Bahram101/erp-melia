import React from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { ApproveDocGridModel } from '../../../models/docflow/DocflowModels'
import ActionButtonContent, { ActionButtonType } from '../../../components/button/ActionButtonContent'

interface Props {
  items: ApproveDocGridModel[]
  isLoading: boolean
}

const ApproveDocGrid = ({ items, isLoading }: Props) => {
  const columns = [
    {
      key: 'regNumber',
      label: 'Рег. номер',
      _style: { width: '130px' },
    },
    {
      key: 'contextDocRegNumber',
      label: 'SN',
    },
    {
      key: 'creatorName',
      label: 'Автор',
    },
    {
      key: 'contextActionName',
      label: 'Действие',
    },
    {
      key: 'createdAt',
      label: 'Дата',
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
      items={items || []}
      itemsPerPage={30}
      pagination
      columnFilter
      loading={isLoading}
      scopedColumns={{
        actions: (item: ApproveDocGridModel) => (
          <td>
            <ActionButtonContent
              type={ActionButtonType.VIEW_LINK}
              href={`/marketing/docflow/approve-docs/view/${item.id}`}
            />
          </td>
        ),
      }}
    />
  )
}

export default ApproveDocGrid
