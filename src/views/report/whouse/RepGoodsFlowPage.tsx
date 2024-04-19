import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useGoodsFlowQuery } from '../../../hooks/report/reportWhouseQueries'
import { RepGoodsFlowGridModel } from '../../../models/report/RepWhouseModels'
import { RefOptionsField } from '../../../components/fields/RefOptionsField'
import { useGoodsOptionsQuery, useWhouseOptionsQuery } from '../../../hooks/reference/refOptionsQueries'
import { formatMoney } from '../../../utils/UtilFuncs'

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
const RepGoodsFlowPage = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>(TAB_ALL)
  const [searchModel, setSearchModel] = useState<{
    whouseId: string | null
    goodsId: string | null
  }>({
    whouseId: null,
    goodsId: null,
  })
  const [errors, setErrors] = useState<any>({})
  //ToDo - change type to Map
  const [itemsMap, setItemsMap] = useState<any>({})

  const repQuery = useGoodsFlowQuery(searchModel)
  const whouseOptionsQuery = useWhouseOptionsQuery(true)
  const goodsOptionsQuery = useGoodsOptionsQuery({}, true)

  // useEffect(() => {
  //   for(let [k,v] of itemsMap) {
  //     console.log(k, v)
  //   }
  // }, [itemsMap])

  const loadData = () => {
    if (!searchModel.whouseId) {
      setErrors({ ...errors, serialNumber: 'Выберите значение' })
    }

    if (!searchModel.goodsId) {
      setErrors({ ...errors, goodsId: 'Выберите значение' })
    }

    setErrors({})

    repQuery.refetch()
      .then(({ data }) => {
        console.log('data', data)
        setItemsMap(data || new Map())
      })
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setSearchModel({ ...searchModel, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  const renderRow = (key: string, items: RepGoodsFlowGridModel[]) => {
    console.log(key, items)
    return <>
      <tr key={key}>
        <th rowSpan={items.length + 1} style={{ verticalAlign: 'middle' }}>
          {key === '01.01.2099' ? 'TOTAL' : key}
        </th>
      </tr>
      {items.map(item => {
        const tempClassName = item.outQty > 0 ? 'table-danger' : ''
        return <tr key={item.id + item.docDate} className={tempClassName}>
          <td>{item.doctypeName}</td>
          <td>
            {formatMoney(item.inQty)}
          </td>
          <td>
            {formatMoney(item.outQty)}
          </td>
          <td>
            {formatMoney(item.remainQty)}
          </td>
          <td>
            {item.notes && item.notes.map((note, idx) => <p key={idx}>{note}</p>)}
          </td>
        </tr>
      })}
    </>
  }

  return <CCard style={{ maxWidth: '100%' }}>
    <CCardHeader>
      <h4 className="float-start">
        Движение товаров
      </h4>
    </CCardHeader>
    <CCardBody>
      <CRow className="mb-2">
        <CCol>
          <RefOptionsField
            options={whouseOptionsQuery.data || []}
            handleChange={handleChange}
            fieldName={'whouseId'}
            error={errors.whouseId}
            value={searchModel.whouseId}
          />
        </CCol>
        <CCol>
          <RefOptionsField
            options={goodsOptionsQuery.data || []}
            handleChange={handleChange}
            fieldName={'goodsId'}
            error={errors.goodsId}
            value={searchModel.goodsId}
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
              <CTableHeaderCell scope="col">Дата</CTableHeaderCell>
              <CTableHeaderCell scope="col">Тип документа</CTableHeaderCell>
              <CTableHeaderCell scope="col">Приход</CTableHeaderCell>
              <CTableHeaderCell scope="col">Расход</CTableHeaderCell>
              <CTableHeaderCell scope="col">Остаток</CTableHeaderCell>
              <CTableHeaderCell scope="col">Детали</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {Object.keys(itemsMap).map((key) => {
              return renderRow(key, itemsMap[key])
            })}
          </CTableBody>
        </CTable>
      </div>
    </CCardBody>
  </CCard>
}

export default RepGoodsFlowPage