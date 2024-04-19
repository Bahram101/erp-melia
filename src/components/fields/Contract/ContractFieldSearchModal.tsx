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
import { toast } from 'react-toastify'
import { ContractSearchResultGridModel } from '../../../models/marketing/MrkModels'
import { useContractSearchQuery } from '../../../hooks/marketing/marketingQueries'
import { useBranchOptionsQuery } from '../../../hooks/reference/refOptionsQueries'
import { parseResponseError } from '../../../utils/ErrorUtil'
import { RefOptionsField } from '../RefOptionsField'
import InputField from '../InputField'
import { ContextDocRefModel, Doctype } from '../../../models/CommonModels'


interface Props {
  visible: boolean;
  onOk: (selected: ContextDocRefModel | null) => void;
  onCancel: () => void;
  onAdd: () => void;
}

const ContractFieldSearchModal = ({ visible, onOk, onCancel, onAdd }: Props) => {

  const [searchParams, setSearchParams] = useState<any>({
    branchId: null,
    regNumber: '',
  })
  const [items, setItems] = useState<ContractSearchResultGridModel[]>([])
  const [selected, setSelected] = useState<ContextDocRefModel | null>(null)

  const searchQuery = useContractSearchQuery(searchParams, false)
  const branchOptionsQuery = useBranchOptionsQuery(true)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setSearchParams({ ...searchParams, [name]: value })
  }

  const onItemSelect = (selectedItemAny: any) => {
    const selectedItem = selectedItemAny as ContractSearchResultGridModel
    let displayName = `Договор №${selectedItem.regCode} (${selectedItem.customerName})`

    setSelected({
      id: selectedItem.id,
      doctype: {
        name: Doctype.CONTRACT,
        displayName: 'Договор',
      },

      regNumber: selectedItem.regCode,
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
    setSelected(null)
    if (items.length > 0) {
      setItems(searchQuery.data || [])
    }
  }

  const loadItems = () => {
    searchQuery
      .refetch()
      .then(({ data }) => setItems(data || []))
      .catch((error) => {
        const errorMsg = parseResponseError(error)
        if (errorMsg) {
          toast.error(errorMsg)
        }
      })
  }

  const columns = [
    {
      key: 'regCode',
      label: 'Рег. ном',
      _props: { className: 'fw-semibold' },
    },
    {
      key: 'docDate',
      label: 'Дата',
      _props: { className: 'fw-semibold' },
    },
    {
      key: 'statusName',
      label: 'Статус',
      _props: { className: 'fw-semibold' },
    },
    {
      key: 'customerName',
      label: 'Клиент',
      _props: { className: 'fw-semibold' },
    },
    {
      key: 'dealerName',
      label: 'Дилер',
      _props: { className: 'fw-semibold' },
    },
    {
      key: 'serialNumber',
      label: 'Сер. номер',
      _props: { className: 'fw-semibold' },
    },
  ]

  return (
    <CModal size="xl" visible={visible}>
      <CModalHeader>
        <CModalTitle>Поиск договора</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol lg>
            <RefOptionsField
              label={'Филиал'}
              options={branchOptionsQuery.data || []}
              handleChange={handleChange}
              fieldName={'branchId'}
              value={searchParams.branchId}
            />
          </CCol>
          <CCol lg>
            <InputField
              label={'Рег. номер'}
              fieldName={'regNumber'}
              handleChange={handleChange}
              placeholder={'Рег. номер'}
              value={searchParams.regNumber}
            />
          </CCol>
          <CCol style={{ alignSelf: 'flex-end' }} lg>
            <CButton
              disabled={searchQuery.isFetching}
              color="secondary"
              onClick={loadItems}
            >
              {searchQuery.isFetching ? 'Ждите...' : 'Поиск'}
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

export default ContractFieldSearchModal
