import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSmartTable } from '@coreui/react-pro'
import { FaEye, FaPen } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useContractsListQuery } from '../../../hooks/marketing/marketingQueries'
import { useBranchOptionsQuery } from '../../../hooks/reference/refOptionsQueries'
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
      key: 'statusName',
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

  return (
    <CCard style={{ maxWidth: '100%' }}>
      <CCardHeader>
        <h4 className="float-start">Список договоров</h4>
        <div className="float-end">
          <Link to={'/hr/employees/add'}>
            <CButton color={'primary'} shape="square">
              Добавить
            </CButton>
          </Link>
        </div>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol>
            <RefOptionsField
              optionLabel={'Филиал'}
              label={'Филиал'}
              fieldName={'branchId'}
              error={errors.branchId}
              options={branchOptionsQuery.data || []}
              handleChange={handleChange}
            />
          </CCol>
          <CCol>
            <br />
            <CButton
              style={{ marginTop: '10px' }}
              color={'secondary'}
              onClick={loadData}
              disabled={listQuery.isFetching}
            >
              {listQuery.isFetching ? 'Ждите...' : 'Загрузить'}
            </CButton>
          </CCol>
        </CRow>
        <CSmartTable
          columns={columns}
          items={listQuery.data || []}
          loading={listQuery.isLoading}
          itemsPerPage={30}
          pagination
          columnFilter
          scopedColumns={{
            statusName: (item: any) => (
              <td>
                <ContractStatusBadge status={item.status} statusName={item.statusName} />
              </td>
            ),
            actions: (item: any) => (
              <td>
                <Link to={`/marketing/contracts/view/${item.id}`}>
                  <CButton color={'primary'} variant="outline" shape="square" size="sm">
                    <FaEye />
                  </CButton>
                  &nbsp;
                </Link>
                <Link to={`/marketing/contracts/edit/${item.id}`}>
                  <CButton color={'primary'} variant="outline" shape="square" size="sm">
                    <FaPen />
                  </CButton>
                </Link>
              </td>
            ),
          }}
        />
      </CCardBody>
    </CCard>
  )
}

export default ContractGridPage
