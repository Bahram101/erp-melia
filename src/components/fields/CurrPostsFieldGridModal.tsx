import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSmartTable,
} from '@coreui/react-pro'
import {
  useBranchOptionsQuery,
  usePositionOptionsQuery,
} from '../../hooks/reference/refOptionsQueries'
import { useCurrentEmployeesQuery } from '../../hooks/hr/employeeQueries'
import { RefOptionsField } from './RefOptionsField'
import { DefaultPostRefModel, PostRefModel } from '../../models/CommonModels'

interface Props {
  visible: boolean
  onOk: (selected: PostRefModel) => void
  onCancel: () => void
}

const CurrPostsFieldGridModal = ({ visible, onOk, onCancel }: Props) => {
  const [postParams, setPostParams] = useState<any>({
    branchId: null,
    positionId: null,
  })
  const [items, setItems] = useState<any>([])
  const [selected, setSelected] = useState<PostRefModel>(DefaultPostRefModel)

  const branchOptionsQuery = useBranchOptionsQuery(true)
  const positionsOptionsQuery = usePositionOptionsQuery(true)
  const currEmpsQuery = useCurrentEmployeesQuery(postParams, false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setPostParams({ ...postParams, [name]: value })
  }

  const { isFetching } = currEmpsQuery

  const loadItems = () => {
    currEmpsQuery
      .refetch()
      .then(({ data }) => setItems(data))
      .catch((error) => console.error('err', error))
  }

  const onItemSelect = (selected: any) => {
    setSelected({
      id: selected.id,
      empId: selected.employeeId,
      empName: selected.fullname,
      positionName: selected.positionName,
    })

    const updatedItems = items.map((x: any) =>
      x?.id === selected.id
        ? { ...x, _props: { color: 'success', align: 'middle' } }
        : { ...x, _props: {} },
    )
    setItems(updatedItems)
  }

  const removeSelectedItem = () => {
    setSelected(DefaultPostRefModel)
    if (items.length > 0) {
      setItems(currEmpsQuery.data)
    }
  }

  const columns = [
    {
      key: 'fullname',
      label: 'ФИО',
      _props: { className: 'fw-semibold' },
    },
    {
      key: 'branchName',
      label: 'Филиал',
      _props: { className: 'fw-semibold' },
    },
    {
      key: 'positionName',
      label: 'Должность',
      _props: { className: 'fw-semibold' },
    },
  ]

  return (
    <CModal alignment="center" size="xl" visible={visible} onClose={onCancel}>
      <CModalHeader>
        <CModalTitle>Список должности</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol lg>
            <CFormLabel htmlFor="basic-url">Филиал</CFormLabel>
            <RefOptionsField
              fieldName={'branchId'}
              options={branchOptionsQuery.data || []}
              handleChange={handleChange}
              value={postParams.branchId}
            />
          </CCol>
          <CCol lg>
            <CFormLabel htmlFor="basic-url">Должность</CFormLabel>
            <RefOptionsField
              fieldName={'positionId'}
              options={positionsOptionsQuery.data || []}
              handleChange={handleChange}
              value={postParams.positionId}
            />
          </CCol>
          <CCol style={{ alignSelf: 'flex-end' }} lg>
            <CButton disabled={isFetching} color="secondary" onClick={loadItems}>
              {isFetching ? 'Ждите...' : 'Поиск'}
            </CButton>
          </CCol>
        </CRow>

        <CRow>
          <CSmartTable
            items={items}
            columns={columns}
            columnSorter
            columnFilter
            clickableRows={true}
            pagination
            tableProps={{
              hover: true,
            }}
            onRowClick={(item) => onItemSelect(item)}
          />
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          onClick={() => {
            removeSelectedItem()
            onCancel()
          }}
        >
          Отмена
        </CButton>
        <CButton
          onClick={() => {
            onOk(selected)
            removeSelectedItem()
          }}
          color="primary"
        >
          Выбрать
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default CurrPostsFieldGridModal
