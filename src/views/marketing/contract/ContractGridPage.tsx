import React, { useState } from 'react'
import { CButton, CCol, CRow } from '@coreui/react-pro'
import { useContractsListQuery } from '../../../hooks/marketing/marketingQueries'
import { useBranchOptionsQuery } from '../../../hooks/reference/refOptionsQueries'
import GridDataWrapper from '../../../components/grid/GridDataWrapper'
import { ActionButton, ActionButtonType } from '../../../components/button/ActionButtonContent'
import { ContractGridModel } from '../../../models/marketing/MrkModels'
import { DocStatus } from '../../../models/CommonModels'
import { RefOptionsField } from '../../../components/fields/RefOptionsField'
import ContractStatusBadge from './components/ContractStatusBadge'

const ContractGridPage = () => {
  const [errors, setErrors] = useState<any>({})
  const [searchParams, setSearchParams] = useState<any>({ branchId: undefined })

  const columns = [
    {
      key: 'regNumber',
      label: 'SN',
    },
    {
      key: 'customerName',
      label: 'Клиент',
    },
    {
      key: 'docDate',
      label: 'Дата',
    },
    {
      key: 'dealerName',
      label: 'Дилер',
    },
    {
      key: 'productCode',
      label: 'Продукт',
    },
    {
      key: 'serialNumber',
      label: 'Сер. ном',
    },
    {
      key: 'status',
      label: 'Статус',
    },
    {
      key: 'address',
      label: 'Адрес',
    },
    {
      key: 'phoneNumbers',
      label: 'Тел.',
    },
    {
      key: 'recoRegCode',
      label: 'Реко',
    },
    {
      key: 'collectorName',
      label: 'Взносщик',
    },
    {
      key: 'demoSecName',
      label: 'Секретарь',
    },
    {
      key: 'serialNumber2',
      label: 'Сер. ном2',
    },
    {
      key: 'actions',
      label: '',
      filter: false,
      sorter: false,
      _style: { width: '10%' },
    },
  ]

  const listQuery = useContractsListQuery(searchParams)
  const branchOptionsQuery = useBranchOptionsQuery(true)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setErrors({ ...errors, [name]: null })
    setSearchParams({ ...searchParams, [name]: value })
  }

  const loadData = () => {
    if (!searchParams.branchId) {
      setErrors({ ...errors, branchId: 'Выберите значение' })
      return
    }

    listQuery.refetch()
  }

  const actions: ActionButton[] = [
    {
      type: ActionButtonType.VIEW_LINK,
      hrefPreparer: (item: ContractGridModel) => `/marketing/contracts/view/${item.id}`,
    },
    {
      type: ActionButtonType.EDIT_LINK,
      hrefPreparer: (item: ContractGridModel) => `/marketing/contracts/edit/${item.id}`,
      hideAction: (item: ContractGridModel) => item.status !== DocStatus.NEW,
    },
  ]

  const addScopedColumns = {
    phoneNumbers: (item: ContractGridModel) => (
      <td><p>{item.phoneNumbers && item.phoneNumbers.join(', ')}</p></td>
    ),
    status: (item: ContractGridModel) => (
      <td><ContractStatusBadge status={item.status} statusName={item.statusName} /></td>
    ),
  }

  const headerContent = <CRow>
    <CCol>
      <RefOptionsField
        optionLabel={'Филиал'}
        fieldName={'branchId'}
        options={branchOptionsQuery.data || []}
        handleChange={handleChange}
        value={searchParams.branchId}
      />
    </CCol>
    <CCol>
      <CButton color={'secondary'} onClick={loadData} disabled={listQuery.isFetching}>
        {listQuery.isFetching ? 'Ждите...' : 'Загрузить'}
      </CButton>
    </CCol>
  </CRow>

  return (
    <GridDataWrapper
      data={listQuery.data || []}
      columns={columns}
      loading={listQuery.isFetching}
      actions={actions}
      addScopedColumns={addScopedColumns}
      header={{
        title: 'Список договоров',
        content: headerContent,
        createUrl: '/marketing/contracts/create',
      }}
    />
  )
}

export default ContractGridPage
