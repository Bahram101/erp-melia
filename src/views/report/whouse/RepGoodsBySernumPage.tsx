import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { useGoodsBySerialNumberQuery } from '../../../hooks/report/reportWhouseQueries'
import { RepGoodsBySerialNumberGridModel } from '../../../models/report/RepWhouseModels'
import InputField from '../../../components/fields/InputField'

const TAB_ALL = 'ALL'
const TAB_BY_SERIAL = 'BY_SERIAL'

const Tabs = [
  {
    key: TAB_ALL,
    label: 'Все товары',
  },
  {
    key: TAB_BY_SERIAL,
    label: 'По сер. номерам',
  },
]
const RepGoodsBySernumPage = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>(TAB_ALL)
  const [serialNumber, setSerialNumber] = useState<string | undefined>(undefined)
  const [errors, setErrors] = useState<any>({})
  const [items, setItems] = useState<RepGoodsBySerialNumberGridModel[]>([])
  const repQuery = useGoodsBySerialNumberQuery(serialNumber)

  const loadData = () => {
    if (!serialNumber) {
      setErrors({ ...errors, serialNumber: 'Введите значение' })
    }
    setErrors({})

    repQuery.refetch()
      .then(({ data }) => {
        setItems(data || [])
      })
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    if (name === 'serialNumber') {
      setSerialNumber(value)
    }
    setErrors({ ...errors, [name]: null })
  }

  return <CCard style={{ maxWidth: '100%' }}>
    <CCardHeader>
      <h4 className="float-start">
        Поиск товара по серииному номеру
      </h4>
    </CCardHeader>
    <CCardBody>
      <CRow className="mb-2">
        <CCol>
          <InputField
            placeholder={'Введите сер. номер'}
            fieldName={'serialNumber'}
            handleChange={handleChange}
            error={errors.serialNumber}
          />
        </CCol>
        <CCol>
          <CButton
            color={'secondary'}
            onClick={loadData}
            disabled={repQuery.isFetching}
          >
            {repQuery.isFetching ? 'Ждите...' : 'Загрузить'}
          </CButton>
        </CCol>
      </CRow>
      <div>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Товар</CTableHeaderCell>
              <CTableHeaderCell scope="col">Тип документа</CTableHeaderCell>
              <CTableHeaderCell scope="col">Дата</CTableHeaderCell>
              <CTableHeaderCell scope="col">Отправитель</CTableHeaderCell>
              <CTableHeaderCell scope="col">Получатель</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {items.map((item, index) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{item.goodsName}</CTableDataCell>
                <CTableDataCell>{item.doctypeName}</CTableDataCell>
                <CTableDataCell>{item.date}</CTableDataCell>
                <CTableDataCell>{item.sender}</CTableDataCell>
                <CTableDataCell>{item.receiver}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </CCardBody>
  </CCard>
}

export default RepGoodsBySernumPage