import { CustomerDetailedModel } from '../../../models/reference/RefModels'
import { CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react-pro'
import CustomerAddressGridView from './CustomerAddressGridView'
import CustomerPhoneGridView from './CustomerPhoneGridView'
import CustomerMainDataView from './CustomerMainDataView'
import CustomerDocGridView from './CustomerDocGridView'
import ActionButtonContent, { ActionButtonType } from '../../../components/button/ActionButtonContent'
import CustomerMainDataFormModal from '../customer/components/CustomerMainDataFormModal'
import { useState } from 'react'

const CustomerDetailedView = ({ customer, editable = false, reloadPage }: {
  customer: CustomerDetailedModel | undefined
  editable?: boolean
  reloadPage?: () => void
}) => {
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false)
  if (!customer) {
    return null
  }

  return <CContainer fluid>
    <CRow className="align-items-start">
      <CCol>
        <CCardHeader>
          <h5 style={{ float: 'left' }}>Основные данные</h5>
          {editable && <div style={{ float: 'right' }}>
            <ActionButtonContent
              type={ActionButtonType.EDIT}
              onClick={() => setFormModalVisible(true)}
            />
          </div>}
        </CCardHeader>
        <CCardBody>
          {editable && <CustomerMainDataFormModal
            id={customer.id}
            visible={formModalVisible}
            onClose={() => setFormModalVisible(false)}
            handleAfterSubmit={() => {
              if (reloadPage) {
                reloadPage()
              }
              setFormModalVisible(false)
            }}
          />}
          <CustomerMainDataView customer={customer} />
        </CCardBody>
      </CCol>
      <CCol>
        <CCardHeader>
          <h5>Адреса</h5>
        </CCardHeader>
        <CCardBody>
          <CustomerAddressGridView addresses={customer.addresses} />
        </CCardBody>
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <hr />
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <CCardHeader>
          <h5>Тел. номера</h5>
        </CCardHeader>
        <CCardBody>
          <CustomerPhoneGridView phones={customer.phones} />
        </CCardBody>
      </CCol>
      <CCol md>
        <CCardHeader>
          <h5>Связанные документы</h5>
        </CCardHeader>
        <CCardBody>
          <CustomerDocGridView docs={customer.docs} />
        </CCardBody>
      </CCol>
    </CRow>
  </CContainer>
}

export default CustomerDetailedView
