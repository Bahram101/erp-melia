import { CustomerAddressDetailedModel } from '../../../models/reference/RefModels'
import { CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from '@coreui/react-pro'

const CustomerAddressGridView = ({ addresses }: { addresses: CustomerAddressDetailedModel[] }) => {
  const renderAddress = (addr: CustomerAddressDetailedModel) => {
    let out = []
    if (addr) {
      if (addr.region && addr.region.id) {
        out.push(addr.region.displayName)
      }

      if (addr.district && addr.district.id) {
        out.push(addr.district.displayName)
      }

      if (addr.city && addr.city.id) {
        out.push('г. ' + addr.city.displayName)
      }

      if (addr.microDistrict) {
        out.push('мкр. ' + addr.microDistrict)
      }

      if (addr.village) {
        out.push('аул. ' + addr.village)
      }

      if (addr.street) {
        out.push('ул. ' + addr.street)
      }

      if (addr.flatNumber) {
        out.push('д. ' + addr.flatNumber)
      }

      if (addr.houseNumber) {
        out.push('кв. ' + addr.houseNumber)
      }
    }
    return out.join(', ')
  }

  return <CTable>
    <CTableBody>
      {addresses.map(ad => {
        return <CTableRow key={ad.id}>
          <CTableHeaderCell>
            {ad.name}
          </CTableHeaderCell>
          <CTableDataCell>
            {renderAddress(ad)}
          </CTableDataCell>
          <CTableDataCell>
          </CTableDataCell>
        </CTableRow>
      })}
    </CTableBody>
  </CTable>
}

export default CustomerAddressGridView
