import { RepGoodsWithSerialNumberGridModel } from '../../../../models/report/RepWhouseModels'
import { CSmartTable } from '@coreui/react-pro'
import React from 'react'

type Props = {
  items: RepGoodsWithSerialNumberGridModel[]
  isLoading: boolean
}
const RepGoodsInWhouseWithSnGrid = ({ items, isLoading }: Props) => {
  const columns = [
    {
      key: 'goodsName',
      label: 'Продукт',
    },
    {
      key: 'serialNumber',
      label: 'Серииный номер',
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
      itemsPerPage={50}
      pagination
      columnFilter
      loading={isLoading}
    />
  )
}

export default RepGoodsInWhouseWithSnGrid