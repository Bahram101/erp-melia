import { CustomerDetailedModel } from '../../../models/reference/RefModels'
import { CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react-pro'
import CustomerAddressGridView from './CustomerAddressGridView'
import CustomerPhoneGridView from './CustomerPhoneGridView'
import CustomerMainDataView from './CustomerMainDataView'
import CustomerDocGridView from './CustomerDocGridView'

const CustomerDetailedView = ({ customer }: { customer: CustomerDetailedModel | undefined }) => {
  if (!customer) {
    return null
  }

  return <CContainer lg>
    <CRow className="align-items-start">
      <CCol>
        <CCardHeader>
          <h5>Основные данные</h5>
        </CCardHeader>
        <CCardBody>
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
