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
  handleChange: (e: any) => void
  model: WhouseDocFormModel
}

const WhouseDocsGoodListForm = ({ goodList, handleChange }: Props) => {
  return (
    <CCol md={8} className="goodListForm ">
      <CTable>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="col-sm-4">Наименование</CTableHeaderCell>
            <CTableHeaderCell className="col-sm-4">Цена</CTableHeaderCell>
            <CTableHeaderCell className="col-sm-4">Количество</CTableHeaderCell>
            <CTableHeaderCell className="col-sm-4"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {[{}, {}]?.map((post: any, index) => (
            <CTableRow key={index}>
              <CTableDataCell>
                <RefOptionsField
                  fieldName={'branchId'}
                  error={''}
                  options={goodList || []}
                  value={''}
                  handleChange={handleChange}
                />
              </CTableDataCell>
              <CTableDataCell>
                <InputField
                  fieldName={'doctype'}
                  error={''}
                  readOnly={false}
                  value={''}
                  handleChange={() => {}}
                />
              </CTableDataCell>
              <CTableDataCell>
                <InputField
                  fieldName={'doctype'}
                  error={''}
                  readOnly={false}
                  value={''}
                  handleChange={() => {}}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  size="sm"
                  color="danger"
                  style={{ transform: 'translateY(7px)' }}
                  //   onClick={() => deleteNode(rowInfo.node.id)}
                >
                  <FaTrash className="translateY-2 text-white " style={{ fontSize: '11px' }} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <CButton size="sm" color="success" className="text-white float-end">
        <FaPlus className="translateY-2 text-white me-2 " style={{ fontSize: '11px' }} />
        <span>Добавить товар</span>
      </CButton>
    </CCol>
  )
}

export default WhouseDocsGoodListForm
