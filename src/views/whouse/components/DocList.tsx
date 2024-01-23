import React from 'react'
import { CButton, CSmartTable } from '@coreui/react-pro'
import { FaEye, FaPen } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ContractStatusBadge from 'views/marketing/contract/components/ContractStatusBadge'

interface Props {
  data: any
}

const ListOfGoods = ({ data }: Props) => {
  const columns = [
    {
      key: 'regNumber',
      label: 'Рег. номер',
      _style: { width: '130px' },
    },
    {
      key: 'docDate',
      label: 'Дата документа',
    },
    {
      key: 'statusName',
      label: 'Статус документа',
    },
    {
      key: 'toWhouseName',
      label: 'На склад',
    },
    {
      key: 'customerName',
      label: 'Примечание',
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
      items={data || []}
      // loading={listQuery.isLoading}
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
            <Link to={``}>
              <CButton color={'primary'} variant="outline" shape="square" size="sm">
                <FaEye />
              </CButton>
              &nbsp;
            </Link>
            <Link to={``}>
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
