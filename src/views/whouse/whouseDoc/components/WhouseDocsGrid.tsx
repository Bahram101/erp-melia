import React from 'react'
import { CButton, CSmartTable } from '@coreui/react-pro'
import { FaEye, FaPen } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { WhouseDocGridModel } from '../../../../models/whouse/whouseModels'
import { Doctype } from '../../../../models/CommonModels'
import { getWhouseDocUriPathFromDoctype } from '../../../../utils/UrlHelper'
import WhouseDocStatusBadge from './WhouseDocStatusBadge'

interface Props {
  data: WhouseDocGridModel[]
  isLoading: boolean
  doctype: Doctype | null
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
    doctype === Doctype.SUPPLY
      ? [
        { key: 'toWhouseName', label: 'На склад' },
        { key: 'customerName', label: 'Поставщик' },
        { key: 'note', label: 'Примечание' },
      ]
      : [],
    doctype === Doctype.SHIPMENT
      ? [
        { key: 'fromWhouseName', label: 'Со склада' },
        { key: 'note', label: 'Род. документ' },
      ]
      : [],
    doctype === Doctype.MOVE_OUT || doctype === Doctype.MOVE_IN
      ? [
        { key: 'fromWhouseName', label: 'Со склада' },
        { key: 'toWhouseName', label: 'На склад' },
        { key: 'note', label: 'Примечание' },
      ]
      : [],
    doctype === Doctype.RETURN
      ? [
        { key: 'toWhouseName', label: 'На склад' },
        { key: 'note', label: 'Род. док' },
        { key: 'note', label: 'Род. док. номер' },
      ]
      : [],
    doctype === Doctype.WRITEOFF_LOST
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
            <WhouseDocStatusBadge status={item.status} statusName={item.statusName} />
          </td>
        ),
        actions: (item: any) => (
          <td>
            {doctype && <>
              <Link to={`/whouse/docs/${getWhouseDocUriPathFromDoctype(doctype)}/view/${item.id}`}>
                <CButton color={'primary'} variant="outline" shape="square" size="sm">
                  <FaEye />
                </CButton>
                &nbsp;
              </Link>
              <Link to={`/whouse/docs/${getWhouseDocUriPathFromDoctype(doctype)}/edit/${item.id}`}>
                <CButton color={'primary'} variant="outline" shape="square" size="sm">
                  <FaPen />
                </CButton>
              </Link>
            </>}
          </td>
        ),
      }}
    />
  )
}

export default WhouseDocsGrid
