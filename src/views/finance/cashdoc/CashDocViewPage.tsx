import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import { useParams } from 'react-router-dom'
import DocHeaderActionButtons from '../../../components/doc/DocHeaderActionButtons'
import { DocAction } from '../../../models/CommonModels'
import { useCashDocDetailedQuery, useCashDocHandleActionQuery } from '../../../hooks/finance/financeQueries'
import { CashDocDetailedModel } from '../../../models/finance/FinModels'
import { getCashDocUriPathFromDoctype } from '../../../utils/UrlHelper'
import CashDocDetailedView from './components/CashDocDetailedView'
import CustomSpinner from '../../../components/spinner/CustomSpinner'

const CashDocViewPage = () => {
  const { id } = useParams()
  const [model, setModel] = useState<CashDocDetailedModel | undefined>(undefined)

  const detailedQuery = useCashDocDetailedQuery(id, false)
  const handleActionQuery = useCashDocHandleActionQuery()

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

    if (action === DocAction.UPDATE && model?.doctype) {
      window.location.pathname = `/finance/cash-docs/${getCashDocUriPathFromDoctype(model.doctype.name)}/edit/${id}`
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
        <h4 className="float-start">{`Кассовый документ №${model?.regNumber}`}</h4>
      </CCardHeader>
      <CCardHeader>
        <DocHeaderActionButtons
          actionButtons={model?.actions || []}
          handleAction={handleAction}
        />
      </CCardHeader>
      <CCardBody>
        {detailedQuery.isLoading ?
          <CustomSpinner />
          : (
            model && <CashDocDetailedView model={model} />
          )}
      </CCardBody>
    </CCard>
  )
}

export default CashDocViewPage
