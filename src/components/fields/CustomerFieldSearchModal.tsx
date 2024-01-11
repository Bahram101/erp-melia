import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSmartTable,
} from '@coreui/react-pro'
import InputField from './InputField'
import {
  CustomerSearchParams,
  useCustomerSearchQuery,
} from '../../hooks/reference/refCustomerQueries'
import { CustomerGridModel } from '../../models/reference/RefModels'
import { CustomerRefModel } from '../../models/CommonModels'

interface Props {
  visible: boolean
  onOk: (selected: CustomerRefModel | null) => void
  onCancel: () => void
  onAdd: () => void
}

const CustomerFieldSearchModal = ({ visible, onOk, onCancel, onAdd }: Props) => {
  const [searchParams, setSearchParams] = useState<CustomerSearchParams>({
    lastname: undefined,
    firstname: undefined,
    iin: undefined,
  })
  const [items, setItems] = useState<CustomerGridModel[]>([])
  const [selected, setSelected] = useState<CustomerRefModel | null>(null)

  const searchQuery = useCustomerSearchQuery(searchParams)
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setSearchParams({ ...searchParams, [name]: value })
  }

  const onItemSelect = (selectedItem: any) => {
    let displayName = `${selectedItem.lastname} ${selectedItem.firstname}`
    setSelected({
      id: selectedItem.id,
      displayName: displayName,
    })

    const updatedItems = items.map((x: any) =>
      x?.id === selectedItem.id
        ? { ...x, _props: { color: 'success', align: 'middle' } }
        : { ...x, _props: {} },
    )
    setItems(updatedItems)
  }

  const removeSelectedItem = () => {
    setSelected({ id: '', displayName: '' })
    if (items.length > 0) {
      setItems(searchQuery.data || [])
    }
  }

  const loadItems = () => {
    searchQuery
      .refetch()
      .then(({ data }) => setItems(data || []))
      .catch((error) => console.error('err', error))
  }

  const columns = [
    {
      key: 'lastname',
      label: 'Фамилия',
      _props: { className: 'fw-semibold' },
    },
    {
      key: 'firstname',
      label: 'Имя',
      _props: { className: 'fw-semibold' },
    },
    {
      key: 'middlename',
      label: 'Отчество',
      _props: { className: 'fw-semibold' },
    },
    {
      key: 'iin',
      label: 'ИИН',
      _props: { className: 'fw-semibold' },
    },
  ]

  return (
    <CModal alignment="center" size="xl" visible={visible} onClose={onCancel}>
      <CModalHeader>
        <CModalTitle>Поиск клиента</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol lg>
            <InputField label={'Фамилия'} fieldName={'lastname'} handleChange={handleChange} />
          </CCol>
          <CCol lg>
            <InputField label={'Имя'} fieldName={'lastname'} handleChange={handleChange} />
          </CCol>
          <CCol lg>
            <InputField label={'ИИН/БИН'} fieldName={'iin'} handleChange={handleChange} />
          </CCol>
          <CCol style={{ alignSelf: 'flex-end' }} lg>
            <CButton disabled={searchQuery.isFetching} color="secondary" onClick={loadItems}>
              {searchQuery.isFetching ? 'Ждите...' : 'Поиск'}
            </CButton>
          </CCol>
          <CCol style={{ alignSelf: 'flex-end' }} lg>
            <CButton color="primary" onClick={onAdd}>
              Добавить
            </CButton>
          </CCol>
        </CRow>
        <hr />

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

export default CustomerFieldSearchModal
