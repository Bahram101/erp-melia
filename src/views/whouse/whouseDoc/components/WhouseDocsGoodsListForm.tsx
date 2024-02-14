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
import { RefOptionsField } from 'components/fields/RefOptionsField'
import InputField from 'components/fields/InputField'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { RefOptionsModel } from 'models/CommonModels'
import { WhouseDocFormModel } from 'models/whouse/whouseModels'

interface Props {
  goodList: RefOptionsModel[] | undefined
  model: WhouseDocFormModel
  handleChange: (e: any, index: any) => void
  addNewGoods: () => void
  deleteGoodsFromList: (e: any) => void
  // deleteGoodsFromList: (e: React.MouseEventHandler<HTMLButtonElement>) => void
  // deleteGoodsFromList: React.MouseEventHandler<HTMLButtonElement>
}

const WhouseDocsGoodsListForm = ({
  goodList,
  model,
  handleChange,
  addNewGoods,
  deleteGoodsFromList,
}: Props) => {
  return (
    <CCol md={8} className="goodListForm ">
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
          {model.items?.map((post: any, index: any) => (
            <CTableRow key={index}>
              <CTableDataCell>
                <div style={{ transform: 'translateY(7px)' }}>{index + 1}</div>
              </CTableDataCell>
              <CTableDataCell>
                <RefOptionsField
                  fieldName={'goodsId'}
                  error={''}
                  options={goodList || []}
                  value={model.items && model.items[index].goodsId}
                  handleChange={(e) => handleChange(e, index)}
                />
              </CTableDataCell>
              <CTableDataCell>
                <InputField
                  fieldName={'unitPrice'}
                  error={''}
                  readOnly={false}
                  value={model.items && model.items[index].unitPrice}
                  handleChange={(e: any) => handleChange(e, index)}
                />
              </CTableDataCell>
              <CTableDataCell>
                <InputField
                  fieldName={'quantity'}
                  error={''}
                  readOnly={false}
                  value={model.items && model.items[index].quantity}
                  handleChange={(e: any) => handleChange(e, index)}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  size="sm"
                  color="danger"
                  style={{ transform: 'translateY(7px)' }}
                  onClick={() => deleteGoodsFromList(index)}
                >
                  <FaTrash className="translateY-2 text-white " style={{ fontSize: '11px' }} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <CButton size="sm" color="success" className="text-white float-end" onClick={addNewGoods}>
        <FaPlus className="translateY-2 text-white me-2 " style={{ fontSize: '11px' }} />
        <span>Добавить товар</span>
      </CButton>
    </CCol>
  )
}

export default WhouseDocsGoodsListForm
