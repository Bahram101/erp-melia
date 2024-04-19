import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CNav, CRow, CTabContent, CTabPane } from '@coreui/react-pro'
import { useParams } from 'react-router-dom'
import { DocStatus } from '../../../models/CommonModels'
import { RewardDocGridModel } from '../../../models/finance/FinModels'
import { useRewardDocGridQuery } from '../../../hooks/finance/financeQueries'
import TabNavItem from '../../../components/TabNavItem'
import RewardDocGrid from './components/RewardDocGrid'

const Tabs = [
  {
    key: 'NEW',
    label: 'Новые',
  },
  {
    key: 'ON_APPROVE',
    label: 'На утверждении',
  },
  {
    key: 'CLOSED',
    label: 'Закрытые',
  },
  {
    key: 'CANCELLED',
    label: 'Отмененные',
  },
]
const RewardDocGridPage = () => {
  let { cashdoctype } = useParams()
  const [errors, setErrors] = useState<any>({})
  const [activeTabKey, setActiveTabKey] = useState<string>('NEW')
  const [params, setParams] = useState<{
    status: DocStatus | null,
    branchId: string | null,
  }>({
    status: DocStatus.NEW,
    branchId: null,
  })
  const [dataMap, setDataMap] = useState<{ [key in string]: RewardDocGridModel[] }>({})

  const gridQuery = useRewardDocGridQuery(params, false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setErrors({ ...errors, [name]: null })
    setParams({ ...params, [name]: value })
  }


  const loadData = () => {
    gridQuery.refetch().then(({ data }) => {
      setDataMap({ ...dataMap, [activeTabKey]: data || [] })
    })
  }

  return (
    <CCard style={{ maxWidth: '100%' }}>
      <CCardHeader>
        <h4 className="float-start">
          Документы вознограждения
        </h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-2">
          <CCol>
            <br />
            <CButton
              style={{ marginTop: '10px' }}
              color={'secondary'}
              onClick={loadData}
              disabled={gridQuery.isFetching}
            >
              {gridQuery.isFetching ? 'Ждите...' : 'Загрузить'}
            </CButton>
          </CCol>
        </CRow>
        <hr style={{ margin: '35px 0' }} />
        <div>
          <CNav variant="tabs" role="tablist" className="mb-3">
            {Tabs.map((item) => {
              return (
                <TabNavItem
                  key={item.key}
                  label={item.label}
                  itemKey={item.key}
                  activeKey={activeTabKey}
                  setActiveKey={(key: string) => {
                    setActiveTabKey(key)
                    setParams({...params, status: key as DocStatus})
                  }}
                />
              )
            })}
          </CNav>
          <CTabContent>
            <>
              <CTabPane visible={activeTabKey === 'NEW'}>
                <RewardDocGrid
                  data={dataMap[activeTabKey]}
                  isLoading={gridQuery.isFetching}
                />
              </CTabPane>
              <CTabPane visible={activeTabKey === 'ON_APPROVE'}>
                <RewardDocGrid
                  data={dataMap[activeTabKey]}
                  isLoading={gridQuery.isFetching}
                />
              </CTabPane>
              <CTabPane visible={activeTabKey === 'CLOSED'}>
                <RewardDocGrid
                  data={dataMap[activeTabKey]}
                  isLoading={gridQuery.isFetching}
                />
              </CTabPane>
              <CTabPane visible={activeTabKey === 'CANCELLED'}>
                <RewardDocGrid
                  data={dataMap[activeTabKey]}
                  isLoading={gridQuery.isFetching}
                />
              </CTabPane>
            </>
          </CTabContent>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default RewardDocGridPage
