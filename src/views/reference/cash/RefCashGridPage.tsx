import GridDataWrapper from '../../../components/grid/GridDataWrapper'
import { ActionButton, ActionButtonType } from '../../../components/button/ActionButtonContent'
import React, { useState } from 'react'
import { CashGridModel, GiftGridModel } from '../../../models/reference/RefModels'
import RefCashFormModal from './components/RefCashFormModal'
import { useCashGridQuery } from '../../../hooks/reference/refCashQueries'

const RefCashGridPage = () => {

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false)

  const gridQuery = useCashGridQuery(true)

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
      key: 'currency',
      label: 'Валюта',
    },
    {
      key: 'bankName',
      label: 'Банк',
    },
    {
      key: 'branchesNames',
      label: 'Филиалы',
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
    system: (item: CashGridModel) => (
      <td><p>{item.system ? 'ДА' : 'НЕТ'}</p></td>
    ),
    branchesNames: (item: CashGridModel) => (
      <td><p>{item.branchesNames.join(', ')}</p></td>
    ),
  }

  return <>
    <RefCashFormModal
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
        title: 'Список касс',
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

export default RefCashGridPage