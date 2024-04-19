import CustomerAddressDetailedGridView from '../../../reference/components/CustomerAddressDetailedGridView'

type Props = {
  addresses: any
  reloadPage?: () => void
  customerId: string
}

const EmployeeContacts = ({ addresses, reloadPage, customerId }: Props) => {

  return <>
    <h6>Адреса</h6>
    <CustomerAddressDetailedGridView addresses={addresses} reloadPage={reloadPage} customerId={customerId} />
  </>
}

export default EmployeeContacts
