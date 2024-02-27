import React from 'react'
import {
  CButton,
  CCol,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import InputField from 'components/fields/InputField'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { RefOptionsModel } from 'models/CommonModels'
import { WhouseDocFormModel, WhouseDocItemFormModel } from 'models/whouse/whouseModels'
import CurrencyField from 'components/fields/CurrencyField'

interface Props {
  goodsOptions: RefOptionsModel[]
  model: WhouseDocFormModel
  errors: any
  handleItemChange: (e: any, index: number) => void
  addItemRow: () => void
  deleteItemRow: (e: any) => void
  goodsIds: any
}

const WhouseDocItemForm = ({
  goodsOptions,
  model,
  errors,
  handleItemChange,
  addItemRow,
  deleteItemRow,
  goodsIds,
}: Props) => {
  console.log('goodsIds', goodsIds)
  return (
    <CCol md={8} className="goodsOptionsForm ">
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h5>Список товаров</h5>
        <CButton size="sm" color="success" className="text-white float-end" onClick={addItemRow}>
          <FaPlus className="translateY-2 text-white me-2 " style={{ fontSize: '11px' }} />
          <span>Добавить товар</span>
        </CButton>
      </div>
      <CTable>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>
              <div style={{ minWidth: '10px' }}>#</div>
            </CTableHeaderCell>
            <CTableHeaderCell className="col-sm-4">Наименование</CTableHeaderCell>
            <CTableHeaderCell className="col-sm-4">Цена</CTableHeaderCell>
            <CTableHeaderCell className="col-sm-4">Количество</CTableHeaderCell>
            <CTableHeaderCell className="col-sm-4">
              <div style={{ width: '45px' }}></div>
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {model.items?.map((item: WhouseDocItemFormModel, index: number) => (
            <CTableRow key={index}>
              <CTableDataCell>
                <div style={{ transform: 'translateY(7px)' }}>{index + 1}</div>
              </CTableDataCell>
              <CTableDataCell>
                <RefOptionsField
                  fieldName={'goodsId'}
                  error={errors[`items[${index}].goodsId`]}
                  options={goodsOptions || []}
                  value={model.items && model.items[index].goodsId}
                  handleChange={(e) => handleItemChange(e, index)}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CurrencyField
                  error={errors[`items[${index}].unitPrice`]}
                  fieldName={'unitPrice'}
                  handleChange={(e: any) => handleItemChange(e, index)}
                  value={model.items && model.items[index].unitPrice}
                />
              </CTableDataCell>
              <CTableDataCell>
                {goodsIds.includes(item.goodsId) ? (
                  <CFormInput type="file" id="formFile" label="" className="mt-1" />
                ) : (
                  <InputField
                    fieldName={'quantity'}
                    type="number"
                    error={errors[`items[${index}].quantity`]}
                    value={model.items && model.items[index].quantity}
                    handleChange={(e: any) => handleItemChange(e, index)}
                  />
                )}
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  size="sm"
                  color="danger"
                  style={{ transform: 'translate(5px, 7px)' }}
                  onClick={() => deleteItemRow(index)}
                >
                  <FaTrash className="translateY-2 text-white " style={{ fontSize: '11px' }} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCol>
  )
}

export default WhouseDocItemForm
