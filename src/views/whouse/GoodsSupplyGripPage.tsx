import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CNav,
  CRow,
  CSmartTable,
  CSpinner,
  CTabContent,
  CTabPane,
} from '@coreui/react-pro'
import { FaEye, FaPen } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import ContractStatusBadge from 'views/marketing/contract/components/ContractStatusBadge'
import TabNavItem from 'components/TabNavItem'
import ListOfGoods from './components/ListOfGoods'
// import { useContractsListQuery } from '../../../hooks/marketing/marketingQueries'
// import { useBranchOptionsQuery } from '../../../hooks/reference/refOptionsQueries'
// import { RefOptionsField } from '../../../components/fields/RefOptionsField'
// import ContractStatusBadge from './components/ContractStatusBadge'

const GoodsSupplyGripPage = () => {
  const [errors, setErrors] = useState<any>({})
  const [searchParams, setSearchParams] = useState<any>({ branchId: undefined })
  const [activeKey, setActiveKey] = useState('NEW')

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
      key: 'CANCELED',
      label: 'Отмененные',
    },
  ]

  //   const listQuery = useContractsListQuery(searchParams)
  //   const branchOptionsQuery = useBranchOptionsQuery(true)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setErrors({ ...errors, [name]: null })
    setSearchParams({ ...searchParams, [name]: value })
  }

  const loadData = () => {
    if (!searchParams.branchId) {
      setErrors({ ...errors, branchId: 'Выберите значение' })
      return
    }

    // listQuery.refetch()
  }

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
              optionLabel={'Склад'}
              fieldName={'branchId'}
              error={errors.branchId}
              options={[]}
              handleChange={handleChange}
            />
          </CCol>
          <CCol>
            <br />
            <CButton
              style={{ marginTop: '10px' }}
              color={'secondary'}
              onClick={loadData}
              //   disabled={listQuery.isFetching}
            >
              {/* {listQuery.isFetching ? 'Ждите...' : 'Загрузить'} */}Загрузить
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

          {false ? (
            <div
              className="d-flex align-items-center justify-content-center w-100 "
              style={{ height: 300 }}
            >
              <CSpinner color="primary" />
            </div>
          ) : (
            <CTabContent>
              <CTabPane
                role="tabpanel"
                aria-labelledby="main-tab-pane"
                visible={activeKey === 'NEW'}
              >
                <ListOfGoods />
              </CTabPane>

              <CTabPane
                role="tabpanel"
                aria-labelledby="contact-tab-pane"
                visible={activeKey === 'CLOSED'}
              >
                <ListOfGoods />
              </CTabPane>

              <CTabPane
                role="tabpanel"
                aria-labelledby="post-tab-pane"
                visible={activeKey === 'CANCELED'}
              >
                <ListOfGoods />
              </CTabPane>
            </CTabContent>
          )}
        </div>
      </CCardBody>
    </CCard>
  )
}

export default GoodsSupplyGripPage
