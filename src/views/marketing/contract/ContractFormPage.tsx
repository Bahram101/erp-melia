import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ContractFormModel, DefaultContractFormModel } from '../../../models/marketing/MrkModels'
import {
  useContractFormQuery,
  useSaleTypeDetailedQuery,
  useSaleTypeOptionsQuery,
} from '../../../hooks/marketing/marketingQueries'
import { CCard, CCardBody } from '@coreui/react-pro'
import ContractForm from './components/ContractForm'
import { useBranchOptionsQuery, useGoodsOptionsQuery } from '../../../hooks/reference/refOptionsQueries'
import { useCustomerAdressesAsOptionsQuery } from '../../../hooks/reference/refCustomerQueries'

const ContractFormPage = () => {
  const { id } = useParams()

  const [model, setModel] = useState<ContractFormModel>(DefaultContractFormModel)
  const [errors, setErrors] = useState<any>({})

  const formQuery = useContractFormQuery(id, false)
  const branchOptionsQuery = useBranchOptionsQuery(true)
  const addressOptionsQuery = useCustomerAdressesAsOptionsQuery(model.customer?.id, false)
  const goodsOptionsQuery = useGoodsOptionsQuery({ hasSerial: true }, true)
  const saleTypeOptionsQuery = useSaleTypeOptionsQuery({ forDate: model?.docDate }, false)
  const saleTypeDetailedQuery = useSaleTypeDetailedQuery(model.saleTypeId || '', false)

  useEffect(() => {
    if (id && id.length > 0) {
      formQuery.refetch()
        .then(({ data }) => {
          if (data) {
            setModel(data)
          }
        })
      //ToDo - Catch
    } else {
      setModel(DefaultContractFormModel)
    }
  }, [id])

  useEffect(() => {
    if (model.customer && model.customer.id) {
      addressOptionsQuery.refetch()
    } else {
      setModel({ ...model, addressId: null })
    }
  }, [model.customer])

  useEffect(() => {
    saleTypeOptionsQuery.refetch()
    setModel({ ...model, saleTypeId: null })
  }, [model.docDate])

  useEffect(() => {
    if (model.saleTypeId) {
      saleTypeDetailedQuery.refetch()
        .then(({ data }) => {
          if (data) {
            setModel({ ...model, price: data.price, firstPayment: data.firstPayment })
          }
        })
    } else {
      setModel({ ...model, price: 0, firstPayment: 0 })
    }
  }, [model.saleTypeId])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
  }

  return <CCard>
    <CCardBody>
      <ContractForm
        model={model}
        handleChange={handleChange}
        errors={errors}
        branchOptions={branchOptionsQuery.data || []}
        addressOptions={addressOptionsQuery.data || []}
        goodsOptions={goodsOptionsQuery.data || []}
        saleTypeOptions={saleTypeOptionsQuery.data || []}
      />
    </CCardBody>
  </CCard>
}

export default ContractFormPage
