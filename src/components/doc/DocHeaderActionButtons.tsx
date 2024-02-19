import React, { useState } from 'react'
import { CButton } from '@coreui/react-pro'
import { DocAction, DocActionButton } from '../../models/CommonModels'
import { parseResponseError } from '../../utils/ErrorUtil'
import { toast } from 'react-toastify'

type Props = {
  actionButtons: DocActionButton[]
  handleAction: (action: DocAction) => Promise<any>
}
const DocHeaderActionButtons = ({ actionButtons, handleAction }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const preHandle = (actionName: DocAction) => {
    setLoading(true)
    handleAction(actionName)
      .catch((error) => {
        const errorMsg = parseResponseError(error)
        if (errorMsg) {
          toast.error(errorMsg)
        }
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="card-header-actions" style={{ float: 'right' }}>
      {actionButtons.map((action) => <CButton
        key={action.name}
        color={(action.name === DocAction.DELETE || action.name === DocAction.CANCEL) ? 'danger' : 'secondary'}
        disabled={loading}
        onClick={() => preHandle(action.name)}
        className={'btn btn-secondary active'} style={{ marginRight: '5px' }}>
        {loading ? 'Ждите...' : action.label}
      </CButton>)}
    </div>
  )
}

export default React.memo(DocHeaderActionButtons)
