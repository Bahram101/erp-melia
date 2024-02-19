import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { ContractFormModel, DefaultContractFormModel } from '../../../models/marketing/MrkModels'
import {
  useContractFormQuery,
  useContractSaveMutation,
  useSaleTypeDetailedQuery,
  useSaleTypeDistributePaymentsQuery,
  useSaleTypeOptionsQuery,
} from '../../../hooks/marketing/marketingQueries'
import ContractForm from './components/ContractForm'
import {
  useBranchOptionsQuery,
  useGoodsOptionsQuery,
} from '../../../hooks/reference/refOptionsQueries'
import { useCustomerAdressesAsOptionsQuery } from '../../../hooks/reference/refCustomerQueries'
import DocFormPageWrapper from '../../../components/doc/DocFormPageWrapper'
import CustomSpinner from '../../../components/spinner/CustomSpinner'
import { parseResponseFormErrors } from '../../../utils/ErrorUtil'
import { addMonths, dateToStringDDMMYYYY, stringDDMMYYYYToMoment } from '../../../utils/DateHelper'

const ContractFormPage = () => {
  const { id } = useParams()

  const [model, setModel] = useState<ContractFormModel>(DefaultContractFormModel)
  const [errors, setErrors] = useState<any>({})
  const [title, setTitle] = useState<string>('')
  const [selectedSaleTypeId, setSelectedSaleTypeId] = useState<string | undefined>(undefined)

  const formQuery = useContractFormQuery(id, false)
  const branchOptionsQuery = useBranchOptionsQuery(true)
  const addressOptionsQuery = useCustomerAdressesAsOptionsQuery(model.customer?.id, false)
  const goodsOptionsQuery = useGoodsOptionsQuery({ hasSerial: true }, true)
  const saleTypeOptionsQuery = useSaleTypeOptionsQuery({ forDate: model?.docDate }, false)
  const saleTypeDetailedQuery = useSaleTypeDetailedQuery(selectedSaleTypeId || '', false)
  const saleTypeDistributePaymentsQuery = useSaleTypeDistributePaymentsQuery(
    model.saleTypeId,
    model.firstPayment,
    model.discountFromDealer,
    model.docDate,
  )
  const saveMutation = useContractSaveMutation(id)

  useEffect(() => {
    if (id && id.length > 0) {
      formQuery.refetch().then(({ data }) => {
        if (data) {
          setModel(data)
          setTitle('Редактирование договора')
        }
      })
      //ToDo - Catch
    } else {
      setModel(DefaultContractFormModel)
      setTitle('Добавление договора')
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
  }, [model.docDate])

  useEffect(() => {
    if (selectedSaleTypeId) {
      saleTypeDetailedQuery.refetch().then(({ data }) => {
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
    saleTypeDistributePaymentsQuery.refetch().then(({ data }) => {
      if (data) {
        setModel({ ...model, payments: data })
      } else {
        setModel({ ...model, payments: [] })
      }
    })
    //ToDo - Catch
  }

  const handleContractPaymentChange = (idx: number, e: any) => {
    const { name, value } = e.target
    let newState = model.payments.map((obj, index) => {
      if (idx === index) {
        if (name === 'amount') {
          return { ...obj, [name]: parseInt(value) }
        } else {
          return { ...obj, [name]: value }
        }
      }

      return obj
    })

    if (name === 'paymentDate' && value) {
      const date = stringDDMMYYYYToMoment(value)
      newState = newState.map((obj, index) => {
        if (index > idx) {
          const nextDate = addMonths(date, index - idx)
          return { ...obj, paymentDate: dateToStringDDMMYYYY(nextDate) }
        }
        return obj
      })
    }

    setModel({ ...model, payments: newState })
  }

  const handleSubmit = () => {
    saveMutation
      .mutateAsync({ form: model })
      .then(({ data }) => {
        if (id) {
          window.location.pathname = `/marketing/contracts/view/${id}`
        } else {
          window.location.pathname = `/marketing/contracts/view/${data.id}`
        }
      })
      .catch((error) => {
        setErrors(parseResponseFormErrors(error))
      })
  }

  console.log('ccc', model)

  return (
    <DocFormPageWrapper
      saving={saveMutation.isLoading}
      handleSubmit={handleSubmit}
      cancelUrl={'/marketing/contracts'}
      title={title}
      children={
        formQuery.isFetching ? (
          <CustomSpinner />
        ) : (
          <ContractForm
            model={model}
            handleChange={handleChange}
            errors={errors}
            branchOptions={branchOptionsQuery.data || []}
            addressOptions={addressOptionsQuery.data || []}
            goodsOptions={goodsOptionsQuery.data || []}
            saleTypeOptions={saleTypeOptionsQuery.data || []}
            distributePayments={distributePayments}
            distributing={saleTypeDistributePaymentsQuery.isFetching}
            handleContractPaymentChange={handleContractPaymentChange}
          />
        )
      }
    />
  )
}

export default ContractFormPage
