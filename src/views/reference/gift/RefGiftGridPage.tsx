import GridDataWrapper from '../../../components/grid/GridDataWrapper'
import { useGiftGridQuery } from '../../../hooks/reference/refGiftQueries'
import { ActionButton, ActionButtonType } from '../../../components/button/ActionButtonContent'
import React, { useState } from 'react'
import { GiftGridModel } from '../../../models/reference/RefModels'
import { formatMoney } from '../../../utils/UtilFuncs'
import RefGiftFormModal from './components/RefGiftFormModal'

const RefGiftGridPage = () => {

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false)

  const gridQuery = useGiftGridQuery(true)

  const columns = [
    {
      key: 'name',
      label: 'Название',
    },
    {
      key: 'goodsName',
      label: 'Товар',
    },
    {
      key: 'price',
      label: 'Цена',
    },
    {
      key: 'createdAt',
      label: 'Дата создания',
    },
    {
      key: 'updatedAt',
      label: 'Дата редактирования',
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
    price: (item: GiftGridModel) => (
      <td><p>{formatMoney(item.price)}</p></td>
    ),
  }

  return <>
    <RefGiftFormModal
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
        title: 'Список подарков',
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

export default RefGiftGridPage