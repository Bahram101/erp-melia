import { CustomerPhoneDetailedModel } from '../../../models/reference/RefModels'
import { CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from '@coreui/react-pro'

const CustomerPhoneGridView = ({ phones }: { phones: CustomerPhoneDetailedModel[] }) => {

  return <CTable>
    <CTableBody>
      {phones.map(phone => {
        return <CTableRow key={phone.id}>
          <CTableHeaderCell>
            {phone.type}
          </CTableHeaderCell>
          <CTableDataCell>
            {phone.phoneNumber}
          </CTableDataCell>
        </CTableRow>
      })}
    </CTableBody>
  </CTable>
}

export default CustomerPhoneGridView
