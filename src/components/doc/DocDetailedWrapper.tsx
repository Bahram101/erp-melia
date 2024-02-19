import React, { ReactNode } from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import { DocAction, DocActionButton } from '../../models/CommonModels'
import DocHeaderActionButtons from './DocHeaderActionButtons'

interface Props {
  children: ReactNode,
  header: {
    title?: string,
    actionButtons?: DocActionButton[],
    handleAction?: (action: DocAction) => Promise<any>
  },
  reloadPage?: () => void;
}

const DocDetailedWrapper = ({ children, header, reloadPage }: Props) => {

  const actionHandleWrapper = (action: DocAction) => {
    if (header.handleAction) {
      return header.handleAction(action)
        .then(() => {
          if (reloadPage) {
            reloadPage()
          } else {
            //window.location.reload();
          }
          return Promise.resolve()
        })
        .catch((error) => {
          //ToDo -
          return Promise.resolve()
        })
    } else {
      return Promise.resolve()
    }
  }

  return (
    <CCard>
      {header && header.title && <CCardHeader>
        <h4>{header.title}</h4>
      </CCardHeader>}
      <CCardHeader>
        {header && header.actionButtons && <DocHeaderActionButtons
          actionButtons={header.actionButtons}
          handleAction={actionHandleWrapper}
        />}
      </CCardHeader>
      <CCardBody>
        {children}
      </CCardBody>
    </CCard>
  )
}

export default DocDetailedWrapper
