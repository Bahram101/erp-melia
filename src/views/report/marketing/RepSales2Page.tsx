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
import React, { useEffect, useState } from 'react'
import { useSales2Query } from '../../../hooks/report/reportMarketingQueries'
import { RepSales2GridModel } from '../../../models/report/RepMarketingModels'
import { useBranchOptionsQuery, useGoodsOptionsQuery } from '../../../hooks/reference/refOptionsQueries'
import { RefOptionsModel } from '../../../models/CommonModels'
import { DatePickerField } from '../../../components/fields/DatePickerField'
import { RefOptionsField } from '../../../components/fields/RefOptionsField'

const RepSales2Page = () => {
  const [errors, setErrors] = useState<any>({})
  const [items, setItems] = useState<RepSales2GridModel[]>([])
  const [goodsOptions, setGoodsOptions] = useState<RefOptionsModel[]>([])
  const [searchModel, setSearchModel] = useState<{
    dateFrom: string
    dateTo: string
    branchId: string | null
  }>({
    dateFrom: '',
    dateTo: '',
    branchId: null,
  })
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setSearchModel({ ...searchModel, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  const repQuery = useSales2Query(searchModel)
  const goodsOptionsQuery = useGoodsOptionsQuery({ hasSerial: true }, false)
  const branchOptionsQuery = useBranchOptionsQuery(true)

  const loadData = () => {
    repQuery.refetch()
      .then(({ data }) => setItems(data || []))
  }

  useEffect(() => {
    goodsOptionsQuery.refetch()
      .then(({ data }) => {
        setGoodsOptions(data || [])
      })
  }, [])

  return <CCard style={{ maxWidth: '100%' }}>
    <CCardHeader>
      <h4 className="float-start">
        Отчет по продажам-2
      </h4>
    </CCardHeader>
    <CCardBody>
      <CRow className="mb-2">
        <CCol>
          <RefOptionsField
            label={'Филиал'}
            options={branchOptionsQuery.data || []}
            handleChange={handleChange}
            fieldName={'branchId'}
            value={searchModel.branchId}
          />
        </CCol>
        <CCol>
          <DatePickerField
            label={'Дата с'}
            placeholder={'Дата с'}
            fieldName={'dateFrom'}
            handleChange={handleChange}
            value={searchModel.dateFrom}
          />
        </CCol>
        <CCol>
          <DatePickerField
            label={'Дата по'}
            placeholder={'Дата по'}
            fieldName={'dateTo'}
            handleChange={handleChange}
            value={searchModel.dateTo}
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
              <CTableHeaderCell scope="col">ФИО</CTableHeaderCell>
              {goodsOptions.map((item) => <CTableHeaderCell scope="col">{item.label}</CTableHeaderCell>)}
              <CTableHeaderCell scope="col">Общ.</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {items.map((item, index) => (
              <CTableRow key={item.empId}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{item.fullName}</CTableDataCell>
                {goodsOptions.map((g) => <CTableHeaderCell
                  scope="col">{item.quantitiesMap[g.id || ''] || 0}</CTableHeaderCell>)}
                <CTableDataCell>{item.totalQty}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </CCardBody>
  </CCard>
}

export default RepSales2Page