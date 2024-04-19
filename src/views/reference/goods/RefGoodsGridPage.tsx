import React, { useState } from 'react'
import { useGoodsGridQuery } from '../../../hooks/reference/refGoodsQueries'
import { ActionButton, ActionButtonType } from '../../../components/button/ActionButtonContent'
import { GoodsGridModel } from '../../../models/reference/RefModels'
import RefGoodsFormModal from './components/RefGoodsFormModal'
import GridDataWrapper from '../../../components/grid/GridDataWrapper'

const RefGoodsGridPage = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false)

  const gridQuery = useGoodsGridQuery(true)

  const columns = [
    {
      key: 'name',
      label: 'Название',
    },
    {
      key: 'code',
      label: 'Код',
    },
    {
      key: 'measure',
      label: 'Ед. измерения',
    },
    {
      key: 'hasSerialNumber',
      label: 'Имеет сер. номер',
    },
    {
      key: 'groupName',
      label: 'Группа',
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
      handleClick: (item: GoodsGridModel) => {
        setSelectedId(item.id)
        setFormModalVisible(true)
      },
    },
  ]

  const addScopedColumns = {
    hasSerialNumber: (item: GoodsGridModel) => (
      <td><p>{item.hasSerialNumber ? 'ДА' : 'НЕТ'}</p></td>
    ),
  }

  return <>
    <RefGoodsFormModal
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
        title: 'Список товаров',
        createButtonClick: () => {
          setSelectedId(undefined)
          setFormModalVisible(true)
        },
      }}
      data={gridQuery.data || []}
      columns={columns}
      loading={gridQuery.isFetching}
      actions={actions}
      addScopedColumns={addScopedColumns}
    />
  </>
}

export default RefGoodsGridPage