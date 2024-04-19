import React, { useState } from 'react'
import { useGoodsGroupGridQuery } from '../../../hooks/reference/refGoodsGroupQueries'
import { ActionButton, ActionButtonType } from '../../../components/button/ActionButtonContent'
import { GoodsGroupGridModel } from '../../../models/reference/RefModels'
import RefGoodsGroupFormModal from './components/RefGoodsGroupFormModal'
import GridDataWrapper from '../../../components/grid/GridDataWrapper'

const RefGoodsGroupGridPage = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false)

  const gridQuery = useGoodsGroupGridQuery(true)

  const columns = [
    {
      key: 'name',
      label: 'Название',
    },
    {
      key: 'description',
      label: 'Оипсание',
    },
    {
      key: 'createdAt',
      label: 'Дата-время создания',
    },
    {
      key: 'updatedAt',
      label: 'Дата-время редактирования',
    },
    {
      key: 'actions',
      label: '',
      filter: false,
      sorter: false,
      _style: { width: '5%' },
    },
  ]

  const actions: ActionButton[] = [
    {
      type: ActionButtonType.EDIT,
      handleClick: (item: GoodsGroupGridModel) => {
        setSelectedId(item.id)
        setFormModalVisible(true)
      },
    },
  ]

  return <>
    <RefGoodsGroupFormModal
      id={selectedId}
      visible={formModalVisible}
      close={() => setFormModalVisible(false)}
      handleAfterSubmit={() => {
        setFormModalVisible(false)
        setSelectedId(undefined)
        gridQuery.refetch()
      }}
    />
    <GridDataWrapper
      header={{
        title: 'Список груп товаров',
        createButtonClick: () => {
          setSelectedId(undefined)
          setFormModalVisible(true)
        },
      }}
      data={gridQuery.data || []}
      columns={columns}
      loading={gridQuery.isFetching}
      actions={actions}
    />
  </>
}

export default RefGoodsGroupGridPage