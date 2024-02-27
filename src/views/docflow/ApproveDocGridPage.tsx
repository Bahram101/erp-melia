import { DocStatus } from '../../models/CommonModels'
import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CNav, CRow, CTabContent, CTabPane } from '@coreui/react-pro'
import TabNavItem from '../../components/TabNavItem'
import { useDocApproveGridQuery } from '../../hooks/docflow/docflowQueries'
import { ApproveDocGridModel } from '../../models/docflow/DocflowModels'
import ApproveDocGrid from './components/ApproveDocGrid'


const TAB_NEW = DocStatus.NEW
const TAB_APPROVED = DocStatus.APPROVED
const TAB_REJECTED = DocStatus.REJECTED

const Tabs = [
  {
    id: TAB_NEW,
    label: 'Новые',
  },
  {
    id: TAB_APPROVED,
    label: 'Утвержденные',
  },
  {
    id: TAB_REJECTED,
    label: 'Отклоненные',
  },
]
const ApproveDocGridPage = () => {
  const [activeTabId, setActiveTabId] = useState<DocStatus>(TAB_NEW)
  const [dataMap, setDataMap] = useState<{ [key in DocStatus]?: ApproveDocGridModel[] }>({
    [TAB_NEW]: [],
    [TAB_APPROVED]: [],
    [TAB_REJECTED]: [],
  })

  const gridQuery = useDocApproveGridQuery({ status: activeTabId }, false)
  const loadData = () => {
    gridQuery.refetch()
      .then(({ data }) => setDataMap({ ...dataMap, [activeTabId]: data || [] }))
  }

  return (
    <CCard style={{ maxWidth: '100%' }}>
      <CCardHeader>
        <h4 className="float-start">Документы на утверждении</h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-2">
          <CCol></CCol>
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
        <hr style={{ margin: '35px 0' }} />
        <div>
          <CNav variant="tabs" role="tablist" className="mb-3">
            {Tabs.map((item) => {
              return (
                <TabNavItem
                  key={item.id}
                  label={item.label}
                  itemKey={item.id}
                  activeKey={activeTabId}
                  setActiveKey={(key: string) => setActiveTabId(key as DocStatus)}
                />
              )
            })}
          </CNav>
          <CTabContent>
            <>
              <CTabPane visible={activeTabId === TAB_NEW}>
                <ApproveDocGrid
                  items={dataMap[TAB_NEW] || []}
                  isLoading={gridQuery.isFetching}
                />
              </CTabPane>
              <CTabPane visible={activeTabId == TAB_APPROVED}>
                <ApproveDocGrid
                  items={dataMap[TAB_APPROVED] || []}
                  isLoading={gridQuery.isFetching}
                />
              </CTabPane>
              <CTabPane visible={activeTabId === TAB_REJECTED}>
                <ApproveDocGrid
                  items={dataMap[TAB_REJECTED] || []}
                  isLoading={gridQuery.isFetching}
                />
              </CTabPane>
            </>
            {/* )} */}
          </CTabContent>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default ApproveDocGridPage