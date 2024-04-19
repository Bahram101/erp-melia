import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CNav, CTabContent, CTabPane } from '@coreui/react-pro'
import { Link, useParams } from 'react-router-dom'
import { DocStatus, Doctype, DoctypeTitles } from '../../../models/CommonModels'
import { useBranchOptionsQuery } from '../../../hooks/reference/refOptionsQueries'
import { getCashDoctypeFromUriPath, getCashDocUriPathFromDoctype } from '../../../utils/UrlHelper'
import TabNavItem from '../../../components/TabNavItem'
import { useCashDocGridQuery } from '../../../hooks/finance/financeQueries'
import CashDocGrid from './components/CashDocGrid'
import { CashDocGridModel } from '../../../models/finance/FinModels'
import CashDocGridSearchPanel from './components/CashDocGridSearchPanel'

const CashDocGridPage = () => {
  let { cashdoctype } = useParams()
  const [errors, setErrors] = useState<any>({})
  const [activeTabKey, setActiveTabKey] = useState<DocStatus>(DocStatus.NEW)
  const [tabs, setTabs] = useState<{ key: DocStatus, label: string }[]>([])
  const [params, setParams] = useState<{
    doctype: Doctype | null,
    status: DocStatus | null,
    branchId: string | null,
  }>({
    doctype: null,
    status: null,
    branchId: null,
  })
  const [dataMap, setDataMap] = useState<{ [key in string]: CashDocGridModel[] }>({})

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
      setTabs(getTabs(doctype));
      [DocStatus.NEW, DocStatus.MOVING, DocStatus.CLOSED, DocStatus.CANCELLED]
        .map((status) => {
          const key = dataMapKey(doctype, status)
          if (!(key in dataMap)) {
            setDataMap({ ...dataMap, [key]: [] })
          }
        })

      if (doctype !== Doctype.CASH_DOC_MOVE_OUT && activeTabKey === DocStatus.MOVING) {
        setActiveTabKey(DocStatus.NEW)
      }
    } else {
      //ToDo show error
    }
  }, [cashdoctype])

  useEffect(() => {
    setParams((prev: any) => ({ ...prev, status: activeTabKey }))
  }, [activeTabKey])

  const dataMapKey = (doctype: Doctype | null, status: DocStatus) => {
    return `${doctype}_${status}`
  }
  const getTabs = (doctype: Doctype) => {
    if (Doctype.CASH_DOC_MOVE_OUT === doctype) {
      return [
        {
          key: DocStatus.NEW,
          label: 'Новые',
        },
        {
          key: DocStatus.MOVING,
          label: 'В пути',
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
    }

    return [
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
  }

  const loadData = () => {
    gridQuery.refetch().then(({ data }) => {
      setDataMap({ ...dataMap, [dataMapKey(params.doctype, activeTabKey)]: data || [] })
    })
  }

  const canAdd = () => {
    return params.doctype
      && params.doctype !== Doctype.CASH_DOC_SERVICE_PAYMENT
      && params.doctype !== Doctype.CASH_DOC_MOVE_IN
      && params.doctype !== Doctype.CASH_DOC_REWARD_OUT
  }

  return (
    <CCard style={{ maxWidth: '100%' }}>
      <CCardHeader>
        <h4 className="float-start">{params.doctype && DoctypeTitles[params.doctype]}</h4>
        <div className="float-end">
          {params.doctype && <Link to={`/finance/cash-docs/${getCashDocUriPathFromDoctype(params.doctype)}/create`}>
            {canAdd() && (
              <CButton color={'primary'} shape="square">
                Добавить
              </CButton>
            )}
          </Link>}
        </div>
      </CCardHeader>
      <CCardBody>
        <CashDocGridSearchPanel
          doctype={params.doctype || undefined}
          model={params}
          loadData={loadData}
          loading={gridQuery.isFetching}
          handleChange={handleChange}
          errors={errors}
          branchOptions={branchOptionsQuery.data || []}
          cashOptions={[]}
        />
        <hr style={{ margin: '35px 0' }} />
        <div>
          <CNav variant="tabs" role="tablist" className="mb-3">
            {tabs.map((item) => {
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
              <CTabPane visible={activeTabKey === DocStatus.NEW}>
                <CashDocGrid
                  data={dataMap[dataMapKey(params.doctype, DocStatus.NEW)]}
                  isLoading={gridQuery.isFetching}
                  doctype={params.doctype}
                />
              </CTabPane>
              <CTabPane visible={activeTabKey === DocStatus.MOVING}>
                <CashDocGrid
                  data={dataMap[dataMapKey(params.doctype, DocStatus.MOVING)]}
                  isLoading={gridQuery.isFetching}
                  doctype={params.doctype}
                />
              </CTabPane>
              <CTabPane visible={activeTabKey === DocStatus.CLOSED}>
                <CashDocGrid
                  data={dataMap[dataMapKey(params.doctype, DocStatus.CLOSED)]}
                  isLoading={gridQuery.isFetching}
                  doctype={params.doctype}
                />
              </CTabPane>
              <CTabPane visible={activeTabKey === DocStatus.CANCELLED}>
                <CashDocGrid
                  data={dataMap[dataMapKey(params.doctype, DocStatus.CANCELLED)]}
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
