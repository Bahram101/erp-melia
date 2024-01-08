import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CSpinner,
  CTabContent,
  CTabPane,
} from '@coreui/react-pro'
import { useParams } from 'react-router-dom'
import { useContractDetailedQuery } from '../../../hooks/marketing/marketingQueries'
import ContractDetailedView from './components/ContractDetailedView'
import ContractAddDataView from './components/ContractAddDataView'
import { useCustomerDetailedQuery } from '../../../hooks/reference/refCustomerQueries'
import CustomerDetailedView from '../../reference/components/CustomerDetailedView'
import ContractRewardsGrid from './components/ContractRewardsGrid'
import ContractPaymentsGrid from './components/ContractPaymentsGrid'

const TAB_MAIN_DATA = 'MAIN_DATA'
const TAB_ADD_DATA = 'ADD_DATA'
const TAB_CUSTOMER = 'CUSTOMER'
const TAB_REWARDS = 'REWARDS'
const TAB_SERVICES = 'SERVICES'
const TAB_PAYMENT_DOCS = 'PAYMENT_DOCS'

const Tabs = [
  {
    key: TAB_MAIN_DATA,
    label: 'Основные данные',
  },
  {
    key: TAB_ADD_DATA,
    label: 'Дополнительные данные',
  },
  {
    key: TAB_CUSTOMER,
    label: 'Контрагент',
  },
  {
    key: TAB_REWARDS,
    label: 'Вознаграждения',
  },
  {
    key: TAB_SERVICES,
    label: 'Сервисы',
  },
  {
    key: TAB_PAYMENT_DOCS,
    label: 'Документы оплаты',
  },
]

const ContractViewPage = () => {
  const { id } = useParams()
  const [activeKey, setActiveKey] = useState<string>(TAB_MAIN_DATA)

  const detailedQuery = useContractDetailedQuery(id, true)
  const customerDetailedQuery = useCustomerDetailedQuery(detailedQuery.data?.customer?.id, false);

  useEffect(() => {
    if(detailedQuery.data && detailedQuery.data.customer) {
      customerDetailedQuery.refetch();
    }
  }, [detailedQuery.data])

  const onChangeTab = (key: string) => {
    setActiveKey(key)
  }

  return (
    <CCard>
      <CCardHeader>
        <h4 className="float-start">{`Договор № `}</h4>
      </CCardHeader>
      {/*<CCardHeader>*/}
      {/*  <div className="float-end">*/}
      {/*    <Link to={'/hr/employees/add'}>*/}
      {/*      <CButton color={'primary'} shape="square">*/}
      {/*        Добавить*/}
      {/*      </CButton>*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*</CCardHeader>*/}
      <CCardBody>
        <CNav variant="tabs">
          {Tabs.map((tab) => <CNavItem key={tab.key}>
            <CNavLink
              active={activeKey === tab.key}
              onClick={() => onChangeTab(tab.key)}
              href={'#'}
            >
              {tab.label}
            </CNavLink>
          </CNavItem>)}
        </CNav>
        <CTabContent style={{paddingTop: '20px'}}>
          <CTabPane visible={activeKey === TAB_MAIN_DATA}>
            {
              detailedQuery.isFetching
                ? <CSpinner color="primary" />
                : <ContractDetailedView contract={detailedQuery.data} />
            }
          </CTabPane>
          <CTabPane visible={activeKey === TAB_ADD_DATA}>
            <ContractAddDataView saleTypeId={detailedQuery.data?.saleType?.id} contractId={id} />
          </CTabPane>
          <CTabPane visible={activeKey === TAB_CUSTOMER}>
            {
              customerDetailedQuery.isFetching
                ? <CSpinner color="primary" />
                : <CustomerDetailedView customer={customerDetailedQuery.data} />
            }
          </CTabPane>
          <CTabPane visible={activeKey === TAB_REWARDS}>
            <ContractRewardsGrid contractId={id} />
          </CTabPane>

          <CTabPane visible={activeKey === TAB_PAYMENT_DOCS}>
            <ContractPaymentsGrid contractId={id} />
          </CTabPane>
        </CTabContent>
      </CCardBody>
    </CCard>
  )
}

export default ContractViewPage
