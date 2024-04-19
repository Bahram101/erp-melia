import { CCard, CCardBody, CCardHeader, CNav, CTabContent, CTabPane } from '@coreui/react-pro'
import TabNavItem from '../../components/TabNavItem'
import React, { useState } from 'react'
import { CallGridModel, CallType } from '../../models/crm/CallModels'
import CallGridSearchPanel from './components/CallGridSearchPanel'
import { useBranchOptionsQuery } from '../../hooks/reference/refOptionsQueries'
import { useCallGridQuery } from '../../hooks/crm/callQueries'
import CallGrid from './components/CallGrid'
import CallContractInfoModal from './components/CallContractInfoModal'

const TAB_SCHEDULED = 'SCHEDULED'
const TAB_CLOSED = 'CLOSED'

const Tabs = [
  {
    key: TAB_SCHEDULED,
    label: 'Запланированные',
  },
  {
    key: TAB_CLOSED,
    label: 'Завершенные',
  },
]

const CallGridPage = () => {
  const [scheduledItems, setScheduledItems] = useState<CallGridModel[]>([])
  const [closedItems, setClosedItems] = useState<CallGridModel[]>([])
  const [activeTabKey, setActiveTabKey] = useState<string>(TAB_SCHEDULED)
  const [searchModel, setSearchModel] = useState<any>({
    type: CallType.AFTER_SALE,
    branchId: null,
    status: 'SCHEDULED',
  })
  const [errors, setErrors] = useState<any>({})
  const [selectedCallId, setSelectedCallId] = useState<string | undefined>(undefined)
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false)

  const branchOptionsQuery = useBranchOptionsQuery(true)

  const gridQuery = useCallGridQuery(searchModel, false)


  const loadData = () => {
    gridQuery.refetch()
      .then(({ data }) => {
        if (data) {
          if (activeTabKey === TAB_SCHEDULED) {
            setScheduledItems(data)
          } else if (activeTabKey === TAB_CLOSED) {
            setClosedItems(data)
          }
        }
      })
  }
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setSearchModel({ ...searchModel, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  const onChangeTabKey = (key: string) => {
    setActiveTabKey(key)
    if (key === TAB_CLOSED) {
      setSearchModel({ ...searchModel, status: 'COMPLETED' })
    } else if (key === TAB_SCHEDULED) {
      setSearchModel({ ...searchModel, status: 'SCHEDULED' })
    }
  }

  return (
    <CCard style={{ maxWidth: '100%' }}>
      <CCardHeader>
        <h4 className="float-start">Звонки после продажи</h4>
      </CCardHeader>
      <CCardBody>
        <CallContractInfoModal
          onClose={() => {
            setSelectedCallId(undefined)
            setInfoModalVisible(false)
          }}
          callId={selectedCallId}
          visible={infoModalVisible}
          reloadGrid={loadData}
        />
        <CallGridSearchPanel
          branchOptions={branchOptionsQuery.data || []}
          errors={errors}
          handleChange={handleChange}
          loading={gridQuery.isFetching}
          loadData={loadData}
          searchModel={searchModel}
        />
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
                  setActiveKey={onChangeTabKey}
                />
              )
            })}
          </CNav>
          <CTabContent>
            <>
              <CTabPane visible={activeTabKey === TAB_SCHEDULED}>
                <CallGrid
                  data={scheduledItems}
                  isLoading={gridQuery.isFetching}
                  onClickInfo={(callId) => {
                    setSelectedCallId(callId)
                    setInfoModalVisible(true)
                  }}
                />
              </CTabPane>
              <CTabPane visible={activeTabKey === TAB_CLOSED}>
                <CallGrid
                  data={closedItems}
                  isLoading={gridQuery.isFetching}
                  onClickInfo={(callId) => {
                    setSelectedCallId(callId)
                    setInfoModalVisible(true)
                  }}
                />
              </CTabPane>
            </>
          </CTabContent>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default CallGridPage