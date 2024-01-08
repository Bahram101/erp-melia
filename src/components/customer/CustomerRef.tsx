import { CustomerRefModel } from '../../models/CommonModels'

const CustomerRef = ({ customer }: { customer: CustomerRefModel | undefined }) => {
  if (!customer) {
    return null
  }

  return <>
    {customer.displayName}
  </>
}

export default CustomerRef
