import { CButton, CCard, CCardBody, CCardHeader, CCol, CNav, CRow, CTabContent, CTabPane } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import ActionButtonContent, { ActionButtonType } from '../../../components/button/ActionButtonContent'
import TabNavItem from '../../../components/TabNavItem'
import { useSaleTypeGridQuery } from '../../../hooks/marketing/marketingQueries'
import SaleTypeGrid from './components/SaleTypeGrid'


const Tabs = [
  {
    id: 'ACTIVE',
    label: 'Активные',
  },
  {
    id: 'NOT_ACTIVE',
    label: 'Неактивные',
  },
]
const SaleTypeGridPage = () => {
  const [activeTabId, setActiveTabId] = useState<string>('ACTIVE')
  const [dataMap, setDataMap] = useState<any>({
    'NOT_ACTIVE': [],
    'ACTIVE': [],
  })

  const gridQuery = useSaleTypeGridQuery({
    isActive: activeTabId === 'ACTIVE',
  }, false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    gridQuery.refetch()
      .then(({ data }) => {
        setDataMap({ ...dataMap, [activeTabId]: data || [] })
      })
  }


  return <CCard style={{ maxWidth: '100%' }}>
    <CCardHeader>
      <h4 className="float-start">
        Список типов продаж
      </h4>
      <div className="float-end">
        <ActionButtonContent
          type={ActionButtonType.ADD_LINK}
          href={'/marketing/sale-types/add'}
        />
      </div>
    </CCardHeader>
    <CCardBody>
      <CRow className="mb-2">
        <CCol>
        </CCol>
        <CCol>
          <br />
          <CButton
            style={{ marginTop: '10px' }}
            color={'secondary'}
            onClick={loadData}
            disabled={gridQuery.isFetching}
          >
            Загрузить
          </CButton>
        </CCol>
      </CRow>
      <div>
        <CNav variant="tabs" role="tablist" className="mb-3">
          {Tabs.map((item) => {
            return (
              <TabNavItem
                key={item.id}
                label={item.label}
                itemKey={item.id}
                activeKey={activeTabId}
                setActiveKey={setActiveTabId}
              />
            )
          })}
        </CNav>
        <CTabContent>
          <>
            <CTabPane visible={activeTabId === 'ACTIVE'}>
              <SaleTypeGrid items={dataMap['ACTIVE']} isLoading={gridQuery.isFetching} />
            </CTabPane>
            <CTabPane visible={activeTabId === 'NOT_ACTIVE'}>
              <SaleTypeGrid items={dataMap['NOT_ACTIVE']} isLoading={gridQuery.isFetching} />
            </CTabPane>
          </>
        </CTabContent>
      </div>
    </CCardBody>
  </CCard>
}

export default SaleTypeGridPage