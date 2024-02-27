import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DocDetailedWrapper from '../../components/doc/DocDetailedWrapper'
import { ApproveDocDetailedModel } from '../../models/docflow/DocflowModels'
import ApproveDocDetailedView from './components/ApproveDocDetailedView'
import { useDocApproveDetailedQuery, useDocApproveHandleActionQuery } from '../../hooks/docflow/docflowQueries'
import { DocAction } from '../../models/CommonModels'

const ApproveDocDetailedPage = () => {
  const { id } = useParams()
  const [model, setModel] = useState<ApproveDocDetailedModel | undefined>(undefined)

  const detailedQuery = useDocApproveDetailedQuery(id || '', false)
  const handleActionQuery = useDocApproveHandleActionQuery()

  useEffect(() => {
    if (id) {
      detailedQuery.refetch()
        .then(({ data }) => setModel(data))
    }
  }, [id])

  const handleAction = (action: DocAction) => {
    const form = {
      docId: id || '',
      action: action,
    }

    if (action === DocAction.APPROVE) {
      if (!window.confirm('Действительно хотите утвердить документ?')) {
        return Promise.resolve(false)
      }
    } else if (action === DocAction.REJECT) {
      if (!window.confirm('Действительно хотите отклонить документ?')) {
        return Promise.resolve(false)
      }
    }

    return handleActionQuery.mutateAsync({ form: form })
      .then(() => {
        detailedQuery.refetch()
          .then(({ data }) => setModel(data))
        return Promise.resolve()
      })
  }

  return <DocDetailedWrapper header={{
    title: 'Просмотр документа "Утверждение"',
    actionButtons: model?.actions || [],
    handleAction: handleAction
  }}>
    {model && <ApproveDocDetailedView model={model} />}
  </DocDetailedWrapper>
}

export default ApproveDocDetailedPage