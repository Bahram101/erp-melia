import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import { useParams } from 'react-router-dom'
import { RewardDocDetailedModel } from '../../../models/finance/FinModels'
import { useRewardDocDetailedQuery, useRewardDocHandleActionQuery } from '../../../hooks/finance/financeQueries'
import { DocAction } from '../../../models/CommonModels'
import DocHeaderActionButtons from '../../../components/doc/DocHeaderActionButtons'
import RewardDocDetailedView from './components/RewardDocDetailedView'
import CustomSpinner from '../../../components/spinner/CustomSpinner'
import RewardWriteoffFormModal from './components/RewardWriteoffFormModal'
import { useCashOptionsQuery } from '../../../hooks/reference/refOptionsQueries'

const RewardDocViewPage = () => {
  const { id } = useParams()
  const [model, setModel] = useState<RewardDocDetailedModel | undefined>(undefined)
  const [writeoffModalVisible, setWriteoffModalVisible] = useState<boolean>(false)

  const detailedQuery = useRewardDocDetailedQuery(id, false)
  const handleActionQuery = useRewardDocHandleActionQuery()
  const cashOptionsQuery = useCashOptionsQuery({}, true)

  useEffect(() => {
    if (id) {
      loadDoc()
    } else {
      setModel(undefined)
    }
  }, [id])

  const loadDoc = () => {
    detailedQuery.refetch()
      .then(({ data }) => setModel(data))
  }

  const handleAction = (action: DocAction) => {
    const form = {
      docId: id || '',
      action: action,
    }

    if (action === DocAction.DELETE) {
      if (!window.confirm('Действительно хотите удалить документ?')) {
        return Promise.resolve(false)
      }
    }

    if (action === DocAction.REJECT) {
      if (!window.confirm('Действительно хотите отклонить документ?')) {
        return Promise.resolve()
      }
    }

    if (action === DocAction.WRITEOFF) {
      setWriteoffModalVisible(true)
      return Promise.resolve()
    }

    return handleActionQuery.mutateAsync({ form: form })
      .then(() => {
        loadDoc()
        return Promise.resolve()
      })
  }

  return (
    <CCard>
      <CCardHeader>
        <h4 className="float-start">
          Документ вознаграждения
        </h4>
      </CCardHeader>
      <CCardHeader>
        <DocHeaderActionButtons
          actionButtons={model?.actions || []}
          handleAction={handleAction}
        />
      </CCardHeader>
      <CCardBody>
        {id && <RewardWriteoffFormModal
          visible={writeoffModalVisible}
          onClose={() => setWriteoffModalVisible(false)}
          handleAfterSubmit={() => {
            setWriteoffModalVisible(false)
            loadDoc()
          }}
          docId={id}
          cashOptions={cashOptionsQuery.data || []}
        />}
        {detailedQuery.isLoading ?
          <CustomSpinner />
          : (
            model && <RewardDocDetailedView model={model} />
          )}
      </CCardBody>
    </CCard>
  )
}

export default RewardDocViewPage
