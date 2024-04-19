import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CNav, CTabContent, CTabPane } from '@coreui/react-pro'
import { Link, useParams } from 'react-router-dom'
import TabNavItem from 'components/TabNavItem'
import WhouseDocsGrid from './components/WhouseDocsGrid'
import { useWhouseOptionsQuery } from 'hooks/reference/refOptionsQueries'
import { useWhouseDocsListQuery } from 'hooks/whouse/whouseQueries'
import { DocStatus, Doctype, DoctypeTitles } from 'models/CommonModels'
import { getWhouseDoctypeFromUriPath, getWhouseDocUriPathFromDoctype } from '../../../utils/UrlHelper'
import WhouseDocGridSearchPanel from './components/WhouseDocGridSearchPanel'

const WhouseDocsGridPage = () => {
  let { whousedocpath } = useParams()
  const [errors, setErrors] = useState<any>({})
  const [activeKey, setActiveKey] = useState('NEW')
  const [params, setParams] = useState<{
    doctype: Doctype | null,
    status: DocStatus | null,
    fromWhouseId: string | null
  }>({
    doctype: null,
    status: null,
    fromWhouseId: null,
  })
  const [dataByTab, setDataByTab] = useState<{ [key: string]: any }>({
    NEW: null,
    CLOSED: null,
    CANCELLED: null,
  })

  const tabs = [
    {
      key: 'NEW',
      label: 'Новые',
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

  const whouseOptionsQuery = useWhouseOptionsQuery(true)
  const listQuery = useWhouseDocsListQuery(params)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setErrors({ ...errors, [name]: null })
    setParams({ ...params, [name]: value })
  }

  useEffect(() => {
    setDataByTab({ ...dataByTab, [activeKey]: [] })
    const doctype = getWhouseDoctypeFromUriPath(whousedocpath || '')
    if (doctype) {
      setParams({ ...params, doctype: doctype })
    } else {
      //ToDo show error
    }
  }, [whousedocpath])

  useEffect(() => {
    setParams((prev: any) => ({ ...prev, status: activeKey }))
  }, [activeKey])

  const loadData = () => {
    listQuery.refetch().then(({ data }) => {
      setDataByTab({ ...dataByTab, [activeKey]: data || [] })
    })
  }

  return (
    <CCard style={{ maxWidth: '100%' }}>
      <CCardHeader>
        <h4 className="float-start">{params.doctype && DoctypeTitles[params.doctype]}</h4>
        <div className="float-end">
          {params.doctype && <Link to={`/whouse/docs/${getWhouseDocUriPathFromDoctype(params.doctype)}/create`}>
            {params.doctype !== Doctype.SHIPMENT && (
              <CButton color={'primary'} shape="square">
                Добавить
              </CButton>
            )}
          </Link>}
        </div>
      </CCardHeader>
      <CCardBody>
        <WhouseDocGridSearchPanel
          doctype={params.doctype}
          searchModel={params}
          handleChange={handleChange}
          loadData={loadData}
          loading={listQuery.isFetching}
        />
        <hr style={{ margin: '35px 0' }} />
        <div>
          <CNav variant="tabs" role="tablist" className="mb-3">
            {tabs.map((item: { label: string; key: string }) => {
              return (
                <TabNavItem
                  key={item.key}
                  label={item.label}
                  itemKey={item.key}
                  activeKey={activeKey}
                  setActiveKey={setActiveKey}
                />
              )
            })}
          </CNav>
          <CTabContent>
            <>
              <CTabPane
                role="tabpanel"
                aria-labelledby="new-tab-pane"
                visible={activeKey === 'NEW'}
              >
                <WhouseDocsGrid
                  data={dataByTab[activeKey]}
                  isLoading={listQuery.isFetching}
                  doctype={params.doctype}
                />
              </CTabPane>
              <CTabPane
                role="tabpanel"
                aria-labelledby="closed-tab-pane"
                visible={activeKey === 'CLOSED'}
              >
                <WhouseDocsGrid
                  data={dataByTab[activeKey]}
                  isLoading={listQuery.isFetching}
                  doctype={params.doctype}
                />
              </CTabPane>
              <CTabPane
                role="tabpanel"
                aria-labelledby="cancelled-tab-pane"
                visible={activeKey === 'CANCELLED'}
              >
                <WhouseDocsGrid
                  data={dataByTab[activeKey]}
                  isLoading={listQuery.isFetching}
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

export default WhouseDocsGridPage
