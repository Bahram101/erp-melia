import React, { ReactNode } from 'react'
import { CButton, CSmartTable } from '@coreui/react-pro'

import './style.scss'
import ActionButtonContent, { ActionButton } from '../button/ActionButtonContent'
import { ScopedColumns } from '@coreui/react-pro/dist/components/smart-table/types'

const ITEMS_PER_PAGE = 50

interface Props {
  data: any[];
  columns: any;
  actions?: ActionButton[];
  header?: {
    title?: string
    content?: ReactNode,
    createUrl?: string,
    createButtonClick?: () => void
  }
  loading: boolean;
  addButton?: ReactNode;
  addScopedColumns?: ScopedColumns;
}

const GridDataWrapper = ({
                           data,
                           columns,
                           actions,
                           header,
                           loading,
                           addScopedColumns,
                         }: Props) => {
  let scopedColumns = {
    actions: (item: any) => {
      return (
        <td>
          {actions &&
            actions.map((action, idx) => {
              if (action.hideAction && action.hideAction(item)) {
                return <div key={idx}></div>
              }

              return (
                <React.Fragment key={idx}>
                  <ActionButtonContent                    
                    type={action.type}
                    onClick={action.handleClick}
                    item={item}
                    href={
                      action.hrefPreparer
                        ? action.hrefPreparer(item)
                        : action.href
                    }
                  />
                  &nbsp;
                </React.Fragment>
              )
            })}
        </td>
      )
    },
  }

  if (addScopedColumns) {
    scopedColumns = { ...scopedColumns, ...addScopedColumns }
  }

  return (
    <div className="grid-wrapper">
      {header && <div className="header-flex">
        {header?.title && <h4>{header.title}</h4>}
        {header?.createUrl && <CButton
          className={'pull-right'}
          href={header.createUrl}
        >
          Добавить
        </CButton>}
        {header?.createButtonClick && <CButton
          className={'pull-right'}
          onClick={header.createButtonClick}
        >
          Добавить
        </CButton>}
      </div>}
      <hr />
      {header?.content && header.content}
      <div className={'grid-table-container'}>
        <CSmartTable
          activePage={1}
          columns={columns}
          columnFilter
          items={data}
          itemsPerPageSelect
          itemsPerPage={ITEMS_PER_PAGE}
          pagination
          noItemsLabel={'Нет данных...'}
          loading={loading}
          scopedColumns={scopedColumns}
          // selectable
          sorterValue={{ column: 'name', state: 'asc' }}
          columnSorter={true}
          tableProps={{
            striped: true,
            hover: true,
          }}
        />
      </div>
    </div>
  )
}

export default GridDataWrapper
