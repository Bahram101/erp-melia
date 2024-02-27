import React from 'react'
import { CSmartTable } from '@coreui/react-pro'
import { CashDocGridModel } from '../../../../models/finance/FinModels'
import { Doctype } from '../../../../models/CommonModels'
import CashDocStatusBadge from './CashDocStatusBadge'
import { getCashDocUriPathFromDoctype } from '../../../../utils/UrlHelper'
import ActionButtonContent, { ActionButtonType } from '../../../../components/button/ActionButtonContent'
import { formatMoney } from '../../../../utils/UtilFuncs'

interface Props {
  data: CashDocGridModel[]
  isLoading: boolean
  doctype: Doctype | null
}

const CashDocGrid = ({ data, isLoading, doctype }: Props) => {
  const columns = [
    {
      key: 'regNumber',
      label: 'Рег. номер',
      _style: { width: '130px' },
    },
    {
      key: 'branchName',
      label: 'Филиал',
    },
    {
      key: 'responsibleName',
      label: 'Мастер',
    },
    {
      key: 'amount',
      label: 'Сумма',
    },
    doctype === Doctype.CASH_DOC_SERVICE_PAYMENT
      ? [
        { key: 'toCashName', label: 'На кассу' },
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
      key: 'docDate',
      label: 'Дата',
    },
    {
      key: 'status',
      label: 'Статус',
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
      columns={columns.flat()}
      items={data || []}
      itemsPerPage={30}
      pagination
      columnFilter
      loading={isLoading}
      scopedColumns={{
        status: (item: CashDocGridModel) => (
          <td>
            <CashDocStatusBadge status={item.status} statusName={item.statusName} />
          </td>
        ),
        amount: (item: CashDocGridModel) => (
          <td>
            {formatMoney(item.amount)}
          </td>
        ),
        actions: (item: CashDocGridModel) => (
          <td>
            {doctype && <>
              <ActionButtonContent
                type={ActionButtonType.VIEW_LINK}
                href={`/finance/cash-docs/${getCashDocUriPathFromDoctype(doctype)}/view/${item.id}`}
              />
              {/*<Link to={`/finance/cash-docs/${getCashDocUriPathFromDoctype(doctype)}/edit/${item.id}`}>*/}
              {/*  <CButton color={'primary'} variant="outline" shape="square" size="sm">*/}
              {/*    <FaPen />*/}
              {/*  </CButton>*/}
              {/*</Link>*/}
            </>}
          </td>
        ),
      }}
    />
  )
}

export default CashDocGrid