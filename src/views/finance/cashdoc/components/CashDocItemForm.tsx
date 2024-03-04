import React from 'react'
import {
  CButton,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { RefOptionsModel } from '../../../../models/CommonModels'
import { CashDocItemFormModel } from '../../../../models/finance/FinModels'
import { FaPlus } from 'react-icons/fa'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'
import CurrencyField from '../../../../components/fields/CurrencyField'
import ActionButtonContent, { ActionButtonType } from '../../../../components/button/ActionButtonContent'

interface Props {
  expenseItemOptions: RefOptionsModel[]
  items: CashDocItemFormModel[]
  errors: any
  handleItemChange: (e: any, index: number) => void
  addItemRow: () => void
  deleteItemRow: (e: any) => void
}

const CashDocItemForm = ({
                           expenseItemOptions,
                           items,
                           errors,
                           handleItemChange,
                           addItemRow,
                           deleteItemRow,
                         }: Props) => {
  return (
    <CCol md={8}>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h5>Статьи</h5>
        <CButton size="sm" color="success" className="text-white float-end" onClick={addItemRow}>
          <FaPlus className="translateY-2 text-white me-2 " style={{ fontSize: '11px' }} />
          <span>Добавить</span>
        </CButton>
      </div>
      <CTable>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>
              <div style={{ minWidth: '10px' }}>#</div>
            </CTableHeaderCell>
            <CTableHeaderCell className="col-sm-4">Статья</CTableHeaderCell>
            <CTableHeaderCell className="col-sm-4">Сумма</CTableHeaderCell>
            <CTableHeaderCell className="col-sm-4">
              <div style={{ width: '45px' }}></div>
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {items.map((item: CashDocItemFormModel, index: number) => (
            <CTableRow key={index}>
              <CTableDataCell>
                <div style={{ transform: 'translateY(7px)' }}>{index + 1}</div>
              </CTableDataCell>
              <CTableDataCell>
                <RefOptionsField
                  fieldName={'itemId'}
                  error={errors[`items[${index}].itemId`]}
                  options={expenseItemOptions}
                  value={item.itemId}
                  handleChange={(e) => handleItemChange(e, index)}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CurrencyField
                  error={errors[`items[${index}].amount`]}
                  fieldName={'amount'}
                  handleChange={(e: any) => handleItemChange(e, index)}
                  value={item.amount}
                />
              </CTableDataCell>
              <CTableDataCell>
                <ActionButtonContent
                  type={ActionButtonType.DELETE}
                  onClick={() => deleteItemRow(index)}
                />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      {errors && errors.items && <div className={'invalid-feedback'} style={{ display: 'block' }}>
        {errors.items}
      </div>}
    </CCol>
  )
}

export default CashDocItemForm
