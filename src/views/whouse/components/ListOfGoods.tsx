import React from 'react'
import { CButton, CSmartTable } from '@coreui/react-pro'
import { FaEye, FaPen } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ContractStatusBadge from 'views/marketing/contract/components/ContractStatusBadge'

const ListOfGoods = () => {
  const columns = [
    {
      key: 'regNumber',
      label: 'Рег. номер',
    },
    {
      key: 'customerName',
      label: 'Дата документа',
    },
    {
      key: 'docDate',
      label: 'Статус документа',
    },
    {
      key: 'dealerName',
      label: 'Со склада',
    },
    {
      key: 'productCode',
      label: 'Род. документ',
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
      columns={columns}
      items={[]}
      //   loading={listQuery.isLoading}
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
  )
}

export default ListOfGoods
