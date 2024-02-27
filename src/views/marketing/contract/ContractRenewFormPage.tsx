import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { ContractRenewFormModel, DefaultContractRenewFormModel } from '../../../models/marketing/MrkModels'
import {
  useContractRenewFormQuery,
  useContractRenewSaveMutation,
  useDistributeContractRenewPaymentsMutation,
  useSaleTypeDetailedQuery,
  useSaleTypeOptionsQuery,
} from '../../../hooks/marketing/marketingQueries'
import {
  useBranchOptionsQuery,
  useGoodsOptionsQuery,
  useWhouseOptionsQuery,
} from '../../../hooks/reference/refOptionsQueries'
import { useCustomerAdressesAsOptionsQuery } from '../../../hooks/reference/refCustomerQueries'
import DocFormPageWrapper from '../../../components/doc/DocFormPageWrapper'
import CustomSpinner from '../../../components/spinner/CustomSpinner'
import { parseResponseFormErrors } from '../../../utils/ErrorUtil'
import ContractRenewForm from './components/ContractRenewForm'

const ContractRenewFormPage = () => {
  const { id } = useParams()

  const [model, setModel] = useState<ContractRenewFormModel>(DefaultContractRenewFormModel)
  const [errors, setErrors] = useState<any>({})
  const [title, setTitle] = useState<string>('')
  const [selectedSaleTypeId, setSelectedSaleTypeId] = useState<string | undefined>(undefined)

  const formQuery = useContractRenewFormQuery(id, false)
  const branchOptionsQuery = useBranchOptionsQuery(true)
  const addressOptionsQuery = useCustomerAdressesAsOptionsQuery(model.customerId, false)
  const goodsOptionsQuery = useGoodsOptionsQuery({ hasSerial: true }, true)
  const saleTypeOptionsQuery = useSaleTypeOptionsQuery({ forDate: model?.docDate }, false)
  const saleTypeDetailedQuery = useSaleTypeDetailedQuery(selectedSaleTypeId || '', false)
  const distributePaymentsMutation = useDistributeContractRenewPaymentsMutation()
  const saveMutation = useContractRenewSaveMutation(id)
  const whouseOptionsQuery = useWhouseOptionsQuery(true)

  useEffect(() => {
    if (id && id.length > 0) {
      formQuery.refetch()
        .then(({ data }) => {
          if (data) {
            setModel({ ...data, payments: [] })
            setTitle('Переоформление договора')
          }
        })
      //ToDo - Catch
    } else {
      //ToDo show error
    }
  }, [id])

  useEffect(() => {
    if (model.customerId) {
      addressOptionsQuery.refetch()
    } else {
      setModel({ ...model, addressId: null })
    }
  }, [model.customerId])

  useEffect(() => {
    saleTypeOptionsQuery.refetch()
  }, [model.docDate])

  useEffect(() => {
    if (selectedSaleTypeId) {
      saleTypeDetailedQuery.refetch()
        .then(({ data }) => {
          if (data) {
            setModel({ ...model, price: data.price, firstPayment: data.firstPayment, payments: [] })
          }
        })
    } else {
      setModel({ ...model, price: 0, firstPayment: 0, payments: [] })
    }
  }, [selectedSaleTypeId])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    if (name === 'docDate') {
      setModel({ ...model, saleTypeId: null, [name]: value })
    } else if (name === 'saleTypeId') {
      setModel({ ...model, price: 0, firstPayment: 0, payments: [], [name]: value })
      setSelectedSaleTypeId(value)
    } else {
      setModel({ ...model, [name]: value })
    }

    setErrors({ ...errors, [name]: null })
  }

  const distributePayments = () => {
    distributePaymentsMutation.mutateAsync({
      form: {
        contractId: id || null,
        saleTypeId: model.saleTypeId,
        docDate: model.renewDate,
      },
    })
      .then(({ data }) => {
        if (data) {
          setModel({ ...model, payments: data })
        } else {
          setModel({ ...model, payments: [] })
        }
      })
      .catch(error => {
        setErrors(parseResponseFormErrors(error))
      })
  }

  const handleSubmit = () => {
    saveMutation.mutateAsync({ form: model })
      .then(({ data }) => {
        if (id) {
          window.location.pathname = `/marketing/contracts/view/${id}`
        } else {
          window.location.pathname = `/marketing/contracts/view/${data.id}`
        }
      })
      .catch(error => {
        setErrors(parseResponseFormErrors(error))
      })
  }

  return <DocFormPageWrapper
    saving={saveMutation.isLoading}
    handleSubmit={handleSubmit}
    cancelUrl={'/marketing/contracts'}
    title={title}
    children={formQuery.isFetching
      ? <CustomSpinner />
      : <ContractRenewForm
        whouseOptions={whouseOptionsQuery.data || []}
        model={model}
        handleChange={handleChange}
        errors={errors}
        branchOptions={branchOptionsQuery.data || []}
        addressOptions={addressOptionsQuery.data || []}
        goodsOptions={goodsOptionsQuery.data || []}
        saleTypeOptions={saleTypeOptionsQuery.data || []}
        distributePayments={distributePayments}
        distributing={distributePaymentsMutation.isLoading}
      />} />
}

export default ContractRenewFormPage
