import { CButton, CCard, CCardBody, CCardHeader, CCol, CNav, CRow, CTabContent, CTabPane } from '@coreui/react-pro'
import TabNavItem from '../../../components/TabNavItem'
import React, { useState } from 'react'
import { useWhouseOptionsQuery } from '../../../hooks/reference/refOptionsQueries'
import { RefOptionsField } from '../../../components/fields/RefOptionsField'
import { DatePickerField } from '../../../components/fields/DatePickerField'
import { useGoodsInWhouseQuery, useGoodsInWhouseWithSerialNumberQuery } from '../../../hooks/report/reportWhouseQueries'
import { RepGoodsInWhouseGridModel } from '../../../models/report/RepWhouseModels'
import RepGoodsInWhouseGrid from './components/RepGoodsInWhouseGrid'
import RepGoodsInWhouseWithSnGrid from './components/RepGoodsInWhouseWithSnGrid'

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
const RepGoodsInWhousePage = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>(TAB_ALL)
  const [searchModel, setSearchModel] = useState<{ whouseId: string | null, toDate: string | '' }>({
    whouseId: null,
    toDate: '',
  })
  const [errors, setErrors] = useState<any>({})
  const [goodsInWhouses, setGoodsInWhouses] = useState<RepGoodsInWhouseGridModel[]>([])

  const whouseOptionsQuery = useWhouseOptionsQuery(true)
  const goodsInWhouseQuery = useGoodsInWhouseQuery(searchModel)
  const withSnGoodsQuery = useGoodsInWhouseWithSerialNumberQuery(searchModel)

  const loadData = () => {
    if (!searchModel.whouseId) {
      setErrors({ ...errors, whouseId: 'Выберите значение' })
    }
    setErrors({})

    if (activeTabKey === TAB_ALL) {
      goodsInWhouseQuery.refetch()
        .then(({ data }) => {
          setGoodsInWhouses(data || [])
        })
    } else {
      withSnGoodsQuery.refetch()
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setSearchModel({ ...searchModel, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  return <CCard style={{ maxWidth: '100%' }}>
    <CCardHeader>
      <h4 className="float-start">
        Остатки на складах
      </h4>
    </CCardHeader>
    <CCardBody>
      <CRow className="mb-2">
        <CCol>
          <RefOptionsField
            options={whouseOptionsQuery.data || []}
            handleChange={handleChange}
            fieldName={'whouseId'}
            value={searchModel.whouseId}
            error={errors.whouseId}
          />
        </CCol>
        <CCol>
          <DatePickerField
            fieldName={'toDate'}
            handleChange={handleChange}
            placeholder={'На дату'}
            value={searchModel.toDate}
          />
        </CCol>
        <CCol>
          <CButton
            color={'secondary'}
            onClick={loadData}
            disabled={withSnGoodsQuery.isFetching || goodsInWhouseQuery.isFetching}
          >
            {(withSnGoodsQuery.isFetching || goodsInWhouseQuery.isFetching) ? 'Ждите...' : 'Загрузить'}
          </CButton>
        </CCol>
      </CRow>
      <div>
        <CNav variant="tabs" role="tablist" className="mb-3">
          {Tabs.map((item) => {
            return (
              <TabNavItem
                key={item.key}
                label={item.label}
                itemKey={item.key}
                activeKey={activeTabKey}
                setActiveKey={setActiveTabKey}
              />
            )
          })}
        </CNav>
        <CTabContent>
          <>
            <CTabPane visible={activeTabKey === TAB_ALL}>
              <RepGoodsInWhouseGrid items={goodsInWhouses} />
            </CTabPane>
            <CTabPane visible={activeTabKey === TAB_BY_SERIAL}>
              <RepGoodsInWhouseWithSnGrid isLoading={withSnGoodsQuery.isLoading} items={withSnGoodsQuery.data || []} />
            </CTabPane>
          </>
        </CTabContent>
      </div>
    </CCardBody>
  </CCard>
}

export default RepGoodsInWhousePage