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
import { Link } from 'react-router-dom'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import TabNavItem from 'components/TabNavItem'
import ListOfGoods from './components/ListOfGoods'
import { useWhouseOptionsQuery } from 'hooks/reference/refOptionsQueries'
import { useReceiptOfGoodsQuery } from 'hooks/whouse/whouseQueries'

const ReceipOfGoodsGripPage = () => {
  const [errors, setErrors] = useState<any>({})
  const [activeKey, setActiveKey] = useState('NEW')
  const [params, setParams] = useState<any>({ doctype: 'SUPPLY', status: 'NEW' })
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
  const listQuery = useReceiptOfGoodsQuery(params)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setErrors({ ...errors, [name]: null })
    setParams({ ...params, [name]: value })
  }

  const getDocListByStatus = (status: string) => {
    if (activeKey === status) {
      setParams((prevParams: any) => ({ ...prevParams, status: status }))
    }
  }

  useEffect(() => {
    setDataByTab((prevData) => ({ ...prevData, [activeKey]: listQuery.data }))
  }, [listQuery.data])

  useEffect(() => {
    listQuery.refetch().then(() => {
      console.log('aaaa', listQuery.data)
    })
  }, [params])

  useEffect(() => {
    getDocListByStatus('NEW')
    getDocListByStatus('CLOSED')
    getDocListByStatus('CANCELLED')
  }, [activeKey])

  // const loadData = () => {
  //   listQuery.refetch()
  // }

  return (
    <CCard style={{ maxWidth: '100%' }}>
      <CCardHeader>
        <h4 className="float-start">Поступление товаров</h4>
        <div className="float-end">
          <Link to={'/marketing/contracts/create'}>
            <CButton color={'primary'} shape="square">
              Добавить
            </CButton>
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
              // onClick={loadData}
              // disabled={listQuery.isFetching}
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
            {listQuery.isFetching ? (
              <CSpinner color="primary" />
            ) : (
              <>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="new-tab-pane"
                  visible={activeKey === 'NEW'}
                >
                  <ListOfGoods data={dataByTab[activeKey]} />
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="closed-tab-pane"
                  visible={activeKey === 'CLOSED'}
                >
                  <ListOfGoods data={dataByTab[activeKey]} />
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="cancelled-tab-pane"
                  visible={activeKey === 'CANCELLED'}
                >
                  <ListOfGoods data={dataByTab[activeKey]} />
                </CTabPane>
              </>
            )}
          </CTabContent>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default ReceipOfGoodsGripPage
