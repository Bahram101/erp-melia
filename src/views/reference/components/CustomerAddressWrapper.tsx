import React, { Fragment } from 'react'
import { CustomerAddressFormModel } from 'models/hr/HrModels'
import CustomerAddressForm from './CustomerAddressForm'
import { useRegionOptionsQuery } from 'hooks/reference/refOptionsQueries'

type Props = {
  errors: any
  addresses: CustomerAddressFormModel[]
  handleChange: (e: any) => void
}

const CustomerAddressWrapper = ({ handleChange, errors, addresses }: Props) => {
  const regionOptionsQuery = useRegionOptionsQuery(true)


  const handleAddressChange = (
    e: any,
    index: number,
  ) => {
    const { name, value } = e.target

    handleChange({
      target: {
        name: 'addresses',
        value: addresses.map((el: CustomerAddressFormModel, i: number) =>
          i === index ? { ...el, [name]: value } : el,
        ),
      },
    })
  }

  const getParseAddressErrors = (idx: number): any => {
    const out = {
      name: null,
      regionId: null,
    }
    if (errors[`addresses[${idx}].name`]) {
      out['name'] = errors[`addresses[${idx}].name`]
    }

    if (errors[`addresses[${idx}].regionId`]) {
      out['regionId'] = errors[`addresses[${idx}].regionId`]
    }

    return out
  }

  return <>
    {addresses.map((address: any, index: number) => (
      <Fragment key={index}>
        <CustomerAddressForm
          errors={getParseAddressErrors(index)}
          address={address}
          regionOptions={regionOptionsQuery.data || []}
          handleChange={(e: any) => handleAddressChange(e, index)}
        />
      </Fragment>
    ))}
  </>
}

export default CustomerAddressWrapper
