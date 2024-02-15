import React from 'react'
import { CButton, CSmartTable } from '@coreui/react-pro'
import { FaEye, FaPen } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ContractStatusBadge from 'views/marketing/contract/components/ContractStatusBadge'
import { WhouseDocGridModel } from '../../../../models/whouse/whouseModels'

interface Props {
  data: WhouseDocGridModel[]
  isLoading: boolean
  doctype: string | undefined
}

const WhouseDocsGrid = ({ data, isLoading, doctype }: Props) => {
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
    doctype === 'supplies'
      ? [
          { key: 'toWhouseName', label: 'На склад' },
          { key: 'customerName', label: 'Поставщик' },
          { key: 'note', label: 'Примечание' },
        ]
      : [],
    doctype === 'shipments'
      ? [
          { key: 'fromWhouseName', label: 'Со склада' },
          { key: 'note', label: 'Род. документ' },
        ]
      : [],
    doctype === 'move-outs' || doctype === 'move-ins'
      ? [
          { key: 'fromWhouseName', label: 'Со склада' },
          { key: 'toWhouseName', label: 'На склад' },
          { key: 'note', label: 'Примечание' },
        ]
      : [],
    doctype === 'returns'
      ? [
          { key: 'toWhouseName', label: 'На склад' },
          { key: 'note', label: 'Род. док' },
          { key: 'note', label: 'Род. док. номер' },
        ]
      : [],
    doctype === 'writeoff-losts'
      ? [
          { key: 'fromWhouseName', label: 'Со склада' },
          { key: 'note', label: 'Примечание' },
        ]
      : [],
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
      columns={columns.flat()}
      items={data || []}
      itemsPerPage={30}
      pagination
      columnFilter
      loading={isLoading}
      scopedColumns={{
        statusName: (item: any) => (
          <td>
            <ContractStatusBadge status={item.status} statusName={item.statusName} />
          </td>
        ),
        actions: (item: any) => (
          <td>
            <Link to={`/whouse/docs/${doctype}/view/${item.id}`}>
              <CButton color={'primary'} variant="outline" shape="square" size="sm">
                <FaEye />
              </CButton>
              &nbsp;
            </Link>
            <Link to={`/whouse/docs/${doctype}/edit/${item.id}`}>
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

export default WhouseDocsGrid
