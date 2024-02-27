import React, { useEffect, useState } from 'react'
import { useSaleBonusGridQuery } from '../../../hooks/marketing/marketingQueries'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CNav, CRow, CTabContent, CTabPane } from '@coreui/react-pro'
import ActionButtonContent, { ActionButtonType } from '../../../components/button/ActionButtonContent'
import TabNavItem from '../../../components/TabNavItem'
import { SaleBonusGridModel } from '../../../models/marketing/MrkModels'
import SaleBonusGrid from './components/SaleBonusGrid'

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
const SaleBonusGridPage = () => {
  const [activeTabId, setActiveTabId] = useState<string>('ACTIVE')
  const [dataMap, setDataMap] = useState<{[key: string]: SaleBonusGridModel[]}>({
    'NOT_ACTIVE': [],
    'ACTIVE': [],
  })

  const gridQuery = useSaleBonusGridQuery({
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
        Список бонусов
      </h4>
      <div className="float-end">
        <ActionButtonContent
          type={ActionButtonType.ADD_LINK}
          href={'/marketing/sale-bonuses/add'}
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
              <SaleBonusGrid items={dataMap['ACTIVE']} isLoading={gridQuery.isFetching} />
            </CTabPane>
            <CTabPane visible={activeTabId === 'NOT_ACTIVE'}>
              <SaleBonusGrid items={dataMap['NOT_ACTIVE']} isLoading={gridQuery.isFetching} />
            </CTabPane>
          </>
        </CTabContent>
      </div>
    </CCardBody>
  </CCard>
}

export default SaleBonusGridPage