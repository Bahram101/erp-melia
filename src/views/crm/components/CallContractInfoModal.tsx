import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalBody,
  CModalHeader,
  CNav,
  CNavItem,
  CNavLink,
  CSpinner,
  CTabContent,
  CTabPane,
} from '@coreui/react-pro'
import ContractDetailedView from '../../marketing/contract/components/ContractDetailedView'
import ContractPaymentScheduleGrid from '../../marketing/contract/components/ContractPaymentScheduleGrid'
import { useCallContractInfoQuery } from '../../../hooks/crm/callQueries'
import { CallContractInfoModel } from '../../../models/crm/CallModels'
import CallMiniGridTable from './CallMiniGridTable'
import CallFormModal from './CallFormModal'

const Tabs = [
  {
    key: 'CONTRACT',
    label: 'Договор',
  },
  {
    key: 'PAYMENTS',
    label: 'График платежей',
  },
  {
    key: 'CALLS',
    label: 'Звонки',
  },
  {
    key: 'SERVICES',
    label: 'Сервисы',
  },
]
type Props = {
  callId: string | undefined
  visible: boolean
  onClose: () => void
  reloadGrid: () => void
}
const CallContractInfoModal = ({ callId, visible, onClose, reloadGrid }: Props) => {
  const [model, setModel] = useState<CallContractInfoModel | undefined>(undefined)
  const [activeTabKey, setActiveTabKey] = useState<string>('CONTRACT')
  const [selectedCallId, setSelectedCallId] = useState<string | undefined>(undefined)
  const [formModalVisible, setFormMovalVisible] = useState<boolean>(false)
  const contractInfoQuery = useCallContractInfoQuery(callId, false)


  useEffect(() => {
    if (callId) {
      loadData()
    } else {
      setModel(undefined)
    }

    return () => {
      setActiveTabKey('CONTRACT')
    }
  }, [callId])

  const loadData = () => {
    contractInfoQuery.refetch()
      .then(({ data }) => {
        setModel(data)
      })
  }

  const onChangeTab = (selectedKey: string) => {
    setActiveTabKey(selectedKey)
  }

  const handleClick = (id: string) => {
    setSelectedCallId(id)
    setFormMovalVisible(true)
  }

  return <CModal alignment="center" size={'xl'} visible={visible} onClose={onClose} backdrop={'static'}>
    <CModalHeader>
      {`Договор №${model?.contract?.regCode}`}
    </CModalHeader>
    <CModalBody>
      <CallFormModal
        handleAfterSubmit={() => {
          setSelectedCallId(undefined)
          setFormMovalVisible(false)
          //reloadGrid()
          loadData()
        }}
        callId={selectedCallId}
        visible={formModalVisible}
        onClose={() => {
          setFormMovalVisible(false)
          setSelectedCallId(undefined)
        }}
      />
      <CNav variant="tabs">
        {Tabs.map((tab) => <CNavItem key={tab.key}>
          <CNavLink
            active={activeTabKey === tab.key}
            onClick={() => onChangeTab(tab.key)}
            href={'#'}
          >
            {tab.label}
          </CNavLink>
        </CNavItem>)}
      </CNav>
      <CTabContent style={{ paddingTop: '20px' }}>
        <CTabPane visible={activeTabKey === 'CONTRACT'}>
          {
            contractInfoQuery.isFetching
              ? <CSpinner color="primary" />
              : <ContractDetailedView contract={model?.contract} />
          }
        </CTabPane>
        <CTabPane visible={activeTabKey === 'PAYMENTS'}>
          <ContractPaymentScheduleGrid items={model?.paymentSchedules || []} />
        </CTabPane>
        <CTabPane visible={activeTabKey === 'CALLS'}>
          <CallMiniGridTable handleClick={handleClick} items={model?.calls || []} />
        </CTabPane>
        <CTabPane visible={activeTabKey === 'SERVICES'}>
          {/*<ContractRewardsGrid contractId={id} />*/}
        </CTabPane>
        {/*<CTabPane visible={activeKey === TAB_PAYMENT_DOCS}>*/}

        {/*</CTabPane>*/}
      </CTabContent>
    </CModalBody>
  </CModal>
}

export default CallContractInfoModal