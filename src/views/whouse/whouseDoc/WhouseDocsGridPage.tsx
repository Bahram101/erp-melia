import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CNav,
  CRow,
  CSpinner,
  CTabContent,
  CTabPane,
} from '@coreui/react-pro'
import { Link, useParams } from 'react-router-dom'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import TabNavItem from 'components/TabNavItem'
import WhouseDocsGrid from './components/WhouseDocsGrid'
import { useWhouseOptionsQuery } from 'hooks/reference/refOptionsQueries'
import { useWhouseDocsListQuery } from 'hooks/whouse/whouseQueries'
import { Doctype } from 'models/CommonModels'
import { DoctypesTitles } from '../../../utils/Helpers'

const WhouseDocsGridPage = () => {
  let { doctype } = useParams()
  const [errors, setErrors] = useState<any>({})
  const [activeKey, setActiveKey] = useState('NEW')
  const [params, setParams] = useState<any>({ doctype: Doctype.SUPPLY, status: 'NEW' })
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
    if (doctype === 'supplies') {
      setParams((prev: any) => ({ ...prev, doctype: Doctype.SUPPLY }))
    } else if (doctype === 'shipments') {
      setParams((prev: any) => ({ ...prev, doctype: Doctype.SHIPMENT }))
    } else if (doctype === 'move-outs') {
      setParams((prev: any) => ({ ...prev, doctype: Doctype.MOVE_OUT }))
    } else if (doctype === 'move-ins') {
      setParams((prev: any) => ({ ...prev, doctype: Doctype.MOVE_IN }))
    } else if (doctype === 'returns') {
      setParams((prev: any) => ({ ...prev, doctype: Doctype.RETURN }))
    } else if (doctype === 'writeoff-losts') {
      setParams((prev: any) => ({ ...prev, doctype: Doctype.WRITEOFF_LOST }))
    }
  }, [doctype])

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
        <h4 className="float-start">{doctype !== undefined && DoctypesTitles[doctype]}</h4>
        <div className="float-end">
          <Link to={`/whouse/docs/${doctype}/create`}>
            {doctype !== 'shipments' && (
              <CButton color={'primary'} shape="square">
                Добавить
              </CButton>
            )}
          </Link>
        </div>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-2">
          <CCol>
            <RefOptionsField
              label={'Склад'}
              fieldName={'whouse'}
              error={errors.whouse}
              options={whouseOptionsQuery.data || []}
              handleChange={handleChange}
              value={params.whouse}
            />
          </CCol>
          <CCol>
            <br />
            <CButton
              style={{ marginTop: '10px' }}
              color={'secondary'}
              onClick={loadData}
              disabled={listQuery.isFetching}
            >
              Загрузить
            </CButton>
          </CCol>
        </CRow>
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
            {/* {listQuery.isFetching ? (
              <CSpinner color="primary" />
            ) : ( */}
            <>
              <CTabPane
                role="tabpanel"
                aria-labelledby="new-tab-pane"
                visible={activeKey === 'NEW'}
              >
                <WhouseDocsGrid
                  data={dataByTab[activeKey]}
                  isLoading={listQuery.isFetching}
                  doctype={doctype}
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
                  doctype={doctype}
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
                  doctype={doctype}
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

export default WhouseDocsGridPage
