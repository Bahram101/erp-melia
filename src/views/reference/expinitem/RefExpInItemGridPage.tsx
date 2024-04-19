import GridDataWrapper from '../../../components/grid/GridDataWrapper'
import React, { useState } from 'react'
import { ActionButton, ActionButtonType } from '../../../components/button/ActionButtonContent'
import { ExpInItemGridModel, GiftGridModel } from '../../../models/reference/RefModels'
import { useExpInItemGridQuery } from '../../../hooks/reference/refExpInItemQueries'
import RefExpInItemFormModal from './components/RefExpInItemFormModal'

const RefExpInItemGridPage = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false)

  const gridQuery = useExpInItemGridQuery(true)

  const columns = [
    {
      key: 'name',
      label: 'Название',
    },
    {
      key: 'typeName',
      label: 'Тип',
    },
    {
      key: 'system',
      label: 'Системное',
    },
    {
      key: 'viewOnlyAdmin',
      label: 'Доступ',
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
      handleClick: (item: GiftGridModel) => {
        setSelectedId(item.id)
        setFormModalVisible(true)
      },
    },
  ]

  const addScopedColumns = {
    system: (item: ExpInItemGridModel) => (
      <td><p>{item.system ? 'ДА' : 'НЕТ'}</p></td>
    ),
    viewOnlyAdmin: (item: ExpInItemGridModel) => (
      <td><p>{item.viewOnlyAdmin ? 'Только Админ' : 'Всем'}</p></td>
    ),
  }

  return <>
    <RefExpInItemFormModal
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
        title: 'Список статьи',
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

export default RefExpInItemGridPage