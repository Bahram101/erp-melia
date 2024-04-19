import GridDataWrapper from '../../../components/grid/GridDataWrapper'
import React, { useEffect } from 'react'
import { ActionButton, ActionButtonType } from '../../../components/button/ActionButtonContent'
import { CustomerGridModel } from '../../../models/reference/RefModels'
import { useCustomerGridQuery } from '../../../hooks/reference/refCustomerQueries'

const RefCustomerGridPage = () => {

  const gridQuery = useCustomerGridQuery({})
  const columns = [
    {
      key: 'name',
      label: 'Название',
    },
    {
      key: 'lastname',
      label: 'Фамилия',
    },
    {
      key: 'firstname',
      label: 'Имя',
    },
    {
      key: 'middlename',
      label: 'Отчество',
    },
    {
      key: 'iin',
      label: 'ИИН',
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
      type: ActionButtonType.VIEW_LINK,
      hrefPreparer: (item: CustomerGridModel) => `/reference/customers/view/${item.id}`,
    },
  ]

  useEffect(() => {
    gridQuery.refetch()
  }, [])

  return <>
    <GridDataWrapper
      header={{
        title: 'Список контрагентов',
        createUrl: '/reference/customers/create',
      }}
      data={gridQuery.data || []}
      columns={columns}
      loading={gridQuery.isFetching}
      actions={actions}
    />
  </>
}

export default RefCustomerGridPage