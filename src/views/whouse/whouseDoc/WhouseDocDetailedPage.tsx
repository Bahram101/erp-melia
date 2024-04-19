import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { DocAction, Doctype, DoctypeTitles } from '../../../models/CommonModels'
import { getCashDocUriPathFromDoctype, getWhouseDocUriPathFromDoctype } from '../../../utils/UrlHelper'
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import DocHeaderActionButtons from '../../../components/doc/DocHeaderActionButtons'
import MoveInRegisterFormModal from '../../finance/cashdoc/components/actionmodals/MoveInRegisterFormModal'
import CustomSpinner from '../../../components/spinner/CustomSpinner'
import { WhouseDocDetailedModel } from '../../../models/whouse/whouseModels'
import { useWhouseDocDetailedQuery, useWhouseDocHandleActionQuery } from '../../../hooks/whouse/whouseQueries'
import WhouseDocDetailedView from './components/WhouseDocDetailedView'
import WhouseDocMoveInRegisterFormModal from './components/actionmodals/WhouseDocMoveInRegisterFormModal'

const WhouseDocDetailedPage = () => {
  const { id } = useParams()
  const [model, setModel] = useState<WhouseDocDetailedModel | undefined>(undefined)
  const [moveInRegisterModalVisible, setMoveInRegisterModalVisible] = useState<boolean>(false)

  const detailedQuery = useWhouseDocDetailedQuery(id, false)
  const handleActionQuery = useWhouseDocHandleActionQuery()

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

    if (action === DocAction.CANCEL) {
      if (!window.confirm('Действительно хотите отменить документ?')) {
        return Promise.resolve()
      }
    }

    if (action === DocAction.UPDATE && model?.doctype) {
      window.location.pathname = `/whouse/docs/${getWhouseDocUriPathFromDoctype(model.doctype.name)}/edit/${id}`
      return Promise.resolve()
    }

    if (model?.doctype && model.doctype.name === Doctype.MOVE_IN && action === DocAction.REGISTER) {
      setMoveInRegisterModalVisible(true)
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
          {`${model?.doctype ? DoctypeTitles[model.doctype.name] : ''} №${model?.regNumber || ''}`}
        </h4>
      </CCardHeader>
      <CCardHeader>
        <DocHeaderActionButtons
          actionButtons={model?.actions || []}
          handleAction={handleAction}
        />
      </CCardHeader>
      <CCardBody>
        {id && <WhouseDocMoveInRegisterFormModal
          visible={moveInRegisterModalVisible}
          onClose={() => setMoveInRegisterModalVisible(false)}
          handleAfterSubmit={() => {
            setMoveInRegisterModalVisible(false)
            loadDoc()
          }}
          docId={id}
        />}
        {detailedQuery.isLoading ?
          <CustomSpinner />
          : (
            model && <WhouseDocDetailedView model={model} />
          )}
      </CCardBody>
    </CCard>
  )
}

export default WhouseDocDetailedPage