import {
  useCustomerAddressFormQuery,
  useCustomerAddressSaveMutation,
} from '../../../hooks/reference/refCustomerQueries'
import { useEffect, useState } from 'react'
import { CustomerAddressFormModel, DefaultCustomerAddressFormModel } from '../../../models/hr/HrModels'
import FormModal from '../../../components/FormModal'
import CustomerAddressForm from './CustomerAddressForm'
import { useRegionOptionsQuery } from '../../../hooks/reference/refOptionsQueries'
import { parseResponseFormErrors } from '../../../utils/ErrorUtil'

type Props = {
  visible: boolean
  onClose: () => void
  addressId: string | undefined
  handleAfterSubmit: () => void
  customerId: string
}
const CustomerAddressFormModal = ({ visible, onClose, addressId, handleAfterSubmit, customerId }: Props) => {
  const [model, setModel] = useState<CustomerAddressFormModel>(DefaultCustomerAddressFormModel)
  const [errors, setErrors] = useState<any>({})
  const formQuery = useCustomerAddressFormQuery(addressId || '', false)

  const regionOptionsQuery = useRegionOptionsQuery(true)
  const saveMutation = useCustomerAddressSaveMutation(customerId, addressId)

  useEffect(() => {
    if (addressId) {
      formQuery.refetch()
        .then(({ data }) => setModel(data || DefaultCustomerAddressFormModel))
    } else {
      setModel(DefaultCustomerAddressFormModel)
    }
  }, [addressId])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  const handleSubmit = () => {
    saveMutation
      .mutateAsync({
        form: model,
      })
      .then(() => {
        handleAfterSubmit()
      })
      .catch((error) => {
        setErrors(parseResponseFormErrors(error))
      })
  }

  return <FormModal
    visibleFormModal={visible}
    onClose={onClose}
    title={addressId ? 'Редактирование адреса' : 'Добавление адреса'}
    handleSubmit={handleSubmit}
    saving={saveMutation.isLoading}
  >
    <CustomerAddressForm
      errors={errors}
      address={model}
      regionOptions={regionOptionsQuery.data || []}
      handleChange={handleChange}
    />
  </FormModal>
}

export default CustomerAddressFormModal