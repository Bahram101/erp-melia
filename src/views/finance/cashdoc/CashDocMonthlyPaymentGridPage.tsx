import { useCashDocGridQuery, useMonthlyPaymentDocGridQuery } from '../../../hooks/finance/financeQueries'
import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CNav, CTabContent, CTabPane } from '@coreui/react-pro'
import { DocStatus, Doctype, DoctypeTitles } from '../../../models/CommonModels'
import CashDocGridSearchPanel from './components/CashDocGridSearchPanel'
import TabNavItem from '../../../components/TabNavItem'
import CashDocGrid from './components/CashDocGrid'
import { useBranchOptionsQuery, useCashOptionsQuery } from '../../../hooks/reference/refOptionsQueries'
import MonthlyPaymentFormGrid from './components/MonthlyPaymentFormGrid'
import { CashDocGridModel, MonthlyPaymentDocGridModel } from '../../../models/finance/FinModels'
import MonthlyPaymentPayModal from './components/actionmodals/MonthlyPaymentPayModal'
import { useCollectorsAsOptionsQuery } from '../../../hooks/hr/postQueries'

const Tabs = [
  {
    key: 'NEW',
    label: 'Новые',
  },
  {
    key: 'CLOSED',
    label: 'Закрытые',
  },
]
const CashDocMonthlyPaymentGridPage = () => {
  const [params, setParams] = useState<any>({
    doctype: Doctype.CASH_DOC_MONTHLY_PAYMENT,
    status: DocStatus.CLOSED,
  })
  const [errors, setErrors] = useState<any>({})
  const [activeTabKey, setActiveTabKey] = useState<string>('NEW')
  const [psItems, setPsItems] = useState<MonthlyPaymentDocGridModel[]>([])
  const [closedDocs, setClosedDocs] = useState<CashDocGridModel[]>([])
  const [payModalVisible, setPayModalVisible] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<MonthlyPaymentDocGridModel | undefined>(undefined)

  const psGridQuery = useMonthlyPaymentDocGridQuery(params, false)
  const cashDocGridQuery = useCashDocGridQuery(params, false)
  const branchOptionsQuery = useBranchOptionsQuery(true)
  const cashOptionsQuery = useCashOptionsQuery({}, true)
  const collectorOptionsQuery = useCollectorsAsOptionsQuery(true)

  const loadData = () => {
    if (activeTabKey === 'NEW') {
      psGridQuery.refetch()
        .then(({ data }) => {
          if (data) {
            data.forEach((item: MonthlyPaymentDocGridModel) => {
              if (item.overdue) {
                item._props = {
                  color: 'danger',
                }
              }
            })
            setPsItems(data || [])
          }
        })
    } else if (activeTabKey === 'CLOSED') {
      cashDocGridQuery.refetch()
        .then(({ data }) => setClosedDocs(data || []))
    }

  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setParams({ ...params, [name]: value })
  }

  return (
    <CCard style={{ maxWidth: '100%' }}>
      <CCardHeader>
        <h4 className="float-start">{DoctypeTitles[Doctype.CASH_DOC_MONTHLY_PAYMENT]}</h4>
      </CCardHeader>
      <CCardBody>
        <CashDocGridSearchPanel
          doctype={Doctype.CASH_DOC_MONTHLY_PAYMENT}
          model={params}
          loadData={loadData}
          loading={psGridQuery.isFetching || cashDocGridQuery.isFetching}
          handleChange={handleChange}
          errors={errors}
          branchOptions={branchOptionsQuery.data || []}
          cashOptions={[]}
          responsibleOptions={collectorOptionsQuery.data || []}
        />
        <MonthlyPaymentPayModal
          visible={payModalVisible}
          onClose={() => setPayModalVisible(false)}
          handleAfterSubmit={() => {
            loadData()
            setPayModalVisible(false)
            setSelectedItem(undefined)
          }}
          doc={selectedItem}
          cashOptions={cashOptionsQuery.data || []}
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
                  setActiveKey={setActiveTabKey}
                />
              )
            })}
          </CNav>
          <CTabContent>
            <>
              <CTabPane visible={activeTabKey === 'NEW'}>
                <MonthlyPaymentFormGrid
                  data={psItems}
                  isLoading={psGridQuery.isFetching}
                  onClickPay={(item) => {
                    setSelectedItem(item)
                    setPayModalVisible(true)
                  }}
                />
              </CTabPane>
              <CTabPane visible={activeTabKey === 'CLOSED'}>
                <CashDocGrid
                  data={closedDocs}
                  isLoading={cashDocGridQuery.isFetching}
                  doctype={Doctype.CASH_DOC_MONTHLY_PAYMENT}
                />
              </CTabPane>
            </>
          </CTabContent>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default CashDocMonthlyPaymentGridPage