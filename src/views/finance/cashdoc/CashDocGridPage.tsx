import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CNav, CRow, CTabContent, CTabPane } from '@coreui/react-pro'
import { Link, useParams } from 'react-router-dom'
import { DocStatus, Doctype, DoctypeTitles } from '../../../models/CommonModels'
import { useBranchOptionsQuery } from '../../../hooks/reference/refOptionsQueries'
import { getCashDoctypeFromUriPath, getWhouseDocUriPathFromDoctype } from '../../../utils/UrlHelper'
import { RefOptionsField } from '../../../components/fields/RefOptionsField'
import TabNavItem from '../../../components/TabNavItem'
import { useCashDocGridQuery } from '../../../hooks/finance/financeQueries'
import CashDocGrid from './components/CashDocGrid'
import { CashDocGridModel } from '../../../models/finance/FinModels'

const Tabs = [
  {
    key: DocStatus.NEW,
    label: 'Новые',
  },
  {
    key: DocStatus.CLOSED,
    label: 'Закрытые',
  },
  {
    key: DocStatus.CANCELLED,
    label: 'Отмененные',
  },
]

const CashDocGridPage = () => {
  let { cashdoctype } = useParams()
  const [errors, setErrors] = useState<any>({})
  const [activeTabKey, setActiveTabKey] = useState<DocStatus>(DocStatus.NEW)
  const [params, setParams] = useState<{
    doctype: Doctype | null,
    status: DocStatus | null,
    branchId: string | null,
  }>({
    doctype: null,
    status: null,
    branchId: null,
  })
  const [dataMap, setDataMap] = useState<{ [key in DocStatus]?: CashDocGridModel[] }>({
    [DocStatus.NEW]: [],
    [DocStatus.CLOSED]: [],
    [DocStatus.CANCELLED]: [],
  })

  const branchOptionsQuery = useBranchOptionsQuery(true)
  const gridQuery = useCashDocGridQuery(params, false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setErrors({ ...errors, [name]: null })
    setParams({ ...params, [name]: value })
  }

  useEffect(() => {
    const doctype = getCashDoctypeFromUriPath(cashdoctype || '')
    if (doctype) {
      setParams({ ...params, doctype: doctype })
    } else {
      //ToDo show error
    }
  }, [cashdoctype])

  useEffect(() => {
    setParams((prev: any) => ({ ...prev, status: activeTabKey }))
  }, [activeTabKey])

  const loadData = () => {
    gridQuery.refetch().then(({ data }) => {
      setDataMap({ ...dataMap, [activeTabKey]: data || [] })
    })
  }

  return (
    <CCard style={{ maxWidth: '100%' }}>
      <CCardHeader>
        <h4 className="float-start">{params.doctype && DoctypeTitles[params.doctype]}</h4>
        <div className="float-end">
          {params.doctype && <Link to={`/whouse/docs/${getWhouseDocUriPathFromDoctype(params.doctype)}/create`}>
            {params.doctype !== Doctype.CASH_DOC_SERVICE_PAYMENT && (
              <CButton color={'primary'} shape="square">
                Добавить
              </CButton>
            )}
          </Link>}
        </div>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-2">
          <CCol>
            <RefOptionsField
              label={'Филиал'}
              fieldName={'branchId'}
              error={errors.branchId}
              options={branchOptionsQuery.data || []}
              handleChange={handleChange}
              value={params.branchId}
            />
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
                  setActiveKey={(key: string) => setActiveTabKey(key as DocStatus)}
                />
              )
            })}
          </CNav>
          <CTabContent>
            <>
              <CTabPane
                role="tabpanel"
                aria-labelledby="new-tab-pane"
                visible={activeTabKey === DocStatus.NEW}
              >
                <CashDocGrid
                  data={dataMap[activeTabKey] || []}
                  isLoading={gridQuery.isFetching}
                  doctype={params.doctype}
                />
              </CTabPane>
              <CTabPane
                role="tabpanel"
                aria-labelledby="closed-tab-pane"
                visible={activeTabKey === DocStatus.CLOSED}
              >
                <CashDocGrid
                  data={dataMap[activeTabKey] || []}
                  isLoading={gridQuery.isFetching}
                  doctype={params.doctype}
                />
              </CTabPane>
              <CTabPane
                role="tabpanel"
                aria-labelledby="cancelled-tab-pane"
                visible={activeTabKey === DocStatus.CANCELLED}
              >
                <CashDocGrid
                  data={dataMap[activeTabKey] || []}
                  isLoading={gridQuery.isFetching}
                  doctype={params.doctype}
                />
              </CTabPane>
            </>
          </CTabContent>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default CashDocGridPage
