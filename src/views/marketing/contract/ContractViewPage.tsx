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
import { useContractDetailedQuery, useContractHandleActionQuery } from '../../../hooks/marketing/marketingQueries'
import ContractDetailedView from './components/ContractDetailedView'
import ContractAddDataView from './components/ContractAddDataView'
import { useCustomerDetailedQuery } from '../../../hooks/reference/refCustomerQueries'
import CustomerDetailedView from '../../reference/components/CustomerDetailedView'
import ContractRewardsGrid from './components/ContractRewardsGrid'
import ContractPaymentsGrid from './components/ContractPaymentsGrid'
import { ContractDetailedModel } from '../../../models/marketing/MrkModels'
import DocHeaderActionButtons from '../../../components/doc/DocHeaderActionButtons'
import { DocAction } from '../../../models/CommonModels'
import ContractCancelFormModal from './components/ContractCancelFormModal'
import ContractRestoreFormModal from './components/ContractRestoreFormModal'
import ContractChangeCollectorModal from './components/actionmodals/ContractChangeCollectorModal'
import ContractChangeRecoModal from './components/actionmodals/ContractChangeRecoModal'
import ContractGiftFormModal from './components/actionmodals/ContractGiftFormModal'
import ContractAddFirstPaymentModal from './components/actionmodals/ContractAddFirstPaymentModal'

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
  const [model, setModel] = useState<ContractDetailedModel | undefined>(undefined)
  const [cancelModalVisible, setCancelModalVisible] = useState<boolean>(false)
  const [restoreModalVisible, setRestoreModalVisible] = useState<boolean>(false)
  const [changeCollectorModalVisible, setChangeCollectorModalVisible] = useState<boolean>(false)
  const [changeRecoModalVisible, setChangeRecoModalVisible] = useState<boolean>(false)
  const [giftFormModalVisible, setGiftFormModalVisible] = useState<boolean>(false)
  const [firstPaymentModalVisible, setFirstPaymentModalVisible] = useState<boolean>(false)

  const detailedQuery = useContractDetailedQuery(id, false)
  const customerDetailedQuery = useCustomerDetailedQuery(model?.customer?.id, false)
  const handleActionQuery = useContractHandleActionQuery()

  useEffect(() => {
    if (id) {
      loadContract()
    } else {
      setModel(undefined)
    }
  }, [id])

  useEffect(() => {
    if (model && model.customer) {
      customerDetailedQuery.refetch()
    }
  }, [model])

  const loadContract = () => {
    detailedQuery.refetch()
      .then(({ data }) => setModel(data))
  }

  const onChangeTab = (key: string) => {
    setActiveKey(key)
  }

  const handleAction = (action: DocAction) => {
    const form = {
      docId: id,
      action: action,
    }

    if (action === DocAction.DELETE) {
      if (!window.confirm('Действительно хотите удалить договор?')) {
        return Promise.resolve(false)
      }
    }

    if (action === DocAction.SEND_TO_PROBLEM) {
      if (!window.confirm('Действительно хотите отметить договор как проблемный?')) {
        return Promise.resolve()
      }
    }

    if (action === DocAction.UPDATE) {
      window.location.pathname = `/marketing/contracts/edit/${id}`
      return Promise.resolve()
    } else if (action === DocAction.CANCEL) {
      setCancelModalVisible(true)
      return Promise.resolve()
    } else if (action === DocAction.RESTORE) {
      setRestoreModalVisible(true)
      return Promise.resolve()
    } else if (action === DocAction.UPDATE_COLLECTOR) {
      setChangeCollectorModalVisible(true)
      return Promise.resolve()
    } else if (action === DocAction.CONTRACT_RENEW) {
      window.location.pathname = `/marketing/contracts/renew/${id}`
      return Promise.resolve()
    } else if (action === DocAction.UPDATE_RECOMMENDER) {
      setChangeRecoModalVisible(true)
      return Promise.resolve()
    } else if (action === DocAction.ADD_GIFT) {
      setGiftFormModalVisible(true)
      return Promise.resolve()
    } else if (action === DocAction.ADDING_FIRST_PAYMENT) {
      setFirstPaymentModalVisible(true)
      return Promise.resolve()
    }

    return handleActionQuery.mutateAsync({ form: form })
      .then(() => {
        loadContract()
        return Promise.resolve()
      })
  }

  return (
    <CCard>
      <CCardHeader>
        <h4 className="float-start">{`Договор №${model?.regCode}`}</h4>
      </CCardHeader>
      <CCardHeader>
        <DocHeaderActionButtons
          actionButtons={model?.actions || []}
          handleAction={handleAction}
        />
      </CCardHeader>
      <CCardBody>
        <ContractGiftFormModal
          visible={giftFormModalVisible}
          close={() => setGiftFormModalVisible(false)}
          regCode={model?.regCode || ''}
          contractId={id || ''}
          handleAfterSubmit={() => {
            loadContract()
            setGiftFormModalVisible(false)
          }}
          existGifts={model?.gifts || []}
        />
        <ContractChangeRecoModal
          visible={changeRecoModalVisible}
          close={() => setChangeRecoModalVisible(false)}
          regCode={model?.regCode || ''}
          handleAfterSubmit={() => {
            loadContract()
            setChangeRecoModalVisible(false)
          }}
          contractId={id || ''}
        />
        <ContractCancelFormModal
          visible={cancelModalVisible}
          onClose={() => setCancelModalVisible(false)}
          regCode={model?.regCode || ''}
          handleAfterSubmit={() => {
            loadContract()
            setCancelModalVisible(false)
          }}
          contractId={id || ''}
        />
        <ContractChangeCollectorModal
          visible={changeCollectorModalVisible}
          onClose={() => setChangeCollectorModalVisible(false)}
          regCode={model?.regCode || ''}
          contractId={id || ''}
          handleAfterSubmit={() => {
            loadContract()
            setChangeCollectorModalVisible(false)
          }}
        />
        <ContractRestoreFormModal
          visible={restoreModalVisible}
          onClose={() => setRestoreModalVisible(false)}
          regCode={model?.regCode || ''}
          handleAfterSubmit={() => {
            loadContract()
            setRestoreModalVisible(false)
          }}
          contractId={id || ''}
        />
        <ContractAddFirstPaymentModal
          contract={model}
          visible={firstPaymentModalVisible}
          onClose={() => {
            setFirstPaymentModalVisible(false)
          }}
          handleAfterSubmit={() => {
            loadContract()
            setFirstPaymentModalVisible(false)
          }}
        />
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
        <CTabContent style={{ paddingTop: '20px' }}>
          <CTabPane visible={activeKey === TAB_MAIN_DATA}>
            {
              detailedQuery.isFetching
                ? <CSpinner color="primary" />
                : <ContractDetailedView contract={model} />
            }
          </CTabPane>
          <CTabPane visible={activeKey === TAB_ADD_DATA}>
            <ContractAddDataView saleTypeId={model?.saleType?.id} contractId={id} />
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
