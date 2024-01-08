import { CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import { CustomerDetailedModel } from '../../../models/reference/RefModels'

const CustomerMainDataView = ({ customer }: { customer: CustomerDetailedModel }) => {

  return <CTable className={'table table-striped item-detailed'}>
    <CTableBody>
      <CTableRow>
        <CTableDataCell style={{ textAlign: 'end' }}>
          ФИО/Название
        </CTableDataCell>
        <CTableHeaderCell>
          {customer.type == 'LEGAL' ? customer.name : (customer.lastname + ' ' + customer.firstname)}
        </CTableHeaderCell>
      </CTableRow>
      <CTableRow>
        <CTableDataCell style={{ textAlign: 'end' }}>
          ИИН/БИН
        </CTableDataCell>
        <CTableHeaderCell>
          {customer.iin}
        </CTableHeaderCell>
      </CTableRow>
      <CTableRow>
        <CTableDataCell style={{ textAlign: 'end' }}>
          Дата рождения
        </CTableDataCell>
        <CTableHeaderCell>
          {customer.birthDate}
        </CTableHeaderCell>
      </CTableRow>
    </CTableBody>
  </CTable>
}

export default CustomerMainDataView
