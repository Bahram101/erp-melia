import { ContractDetailedModel, SaleTypeDetailedModel } from '../../../../../models/marketing/MrkModels'
import FormModal from '../../../../../components/FormModal'
import { CCol, CRow } from '@coreui/react-pro'
import { RefOptionsField } from '../../../../../components/fields/RefOptionsField'
import { useContractHandleActionQuery, useSaleTypeDetailedQuery } from '../../../../../hooks/marketing/marketingQueries'
import { useCashOptionsQuery } from '../../../../../hooks/reference/refOptionsQueries'
import { useEffect, useState } from 'react'
import { DatePickerField } from '../../../../../components/fields/DatePickerField'
import CurrencyField from '../../../../../components/fields/CurrencyField'
import { DocAction } from '../../../../../models/CommonModels'
import { parseResponseError } from '../../../../../utils/ErrorUtil'
import { toast } from 'react-toastify'

type Props = {
  contract: ContractDetailedModel | undefined
  visible: boolean
  onClose: () => void
  handleAfterSubmit: () => void
}

interface FirstPaymentModel {
  amount: number
  cashId: string | null
  docDate: string
  cashAmount: number
  cashAmountCashId: string | null
}

const ContractAddFirstPaymentModal = ({ contract, visible, onClose, handleAfterSubmit }: Props) => {
  const [saleType, setSaleType] = useState<SaleTypeDetailedModel | undefined>(undefined)
  const [model, setModel] = useState<FirstPaymentModel>({
    amount: 0,
    cashAmount: 0,
    cashAmountCashId: null,
    cashId: null,
    docDate: '',
  })
  const [errors, setErrors] = useState<any>({})
  const handleActionQuery = useContractHandleActionQuery()
  const cashOptionsQuery = useCashOptionsQuery({}, true)
  const saleTypeDetailedQuery = useSaleTypeDetailedQuery(contract?.saleType?.id || '', false)
  const handleSubmit = () => {
    const form = {
      action: DocAction.ADDING_FIRST_PAYMENT,
      docId: contract?.id,
      addData: model,
    }
    handleActionQuery.mutateAsync({ form: form })
      .then(() => {
        handleAfterSubmit()
      })
      .catch((error) => {
        const errorMsg = parseResponseError(error)
        if (errorMsg) {
          toast.error(errorMsg)
        }
      })
  }
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  useEffect(() => {
    if (contract && contract.saleType && contract.saleType.id) {
      saleTypeDetailedQuery.refetch()
        .then(({ data }) => setSaleType(data))
    }
  }, [contract])

  useEffect(() => {
    if (saleType && saleType.saleViaBank) {
      setModel({
        ...model,
        amount: contract?.firstPayment || 0,
        cashAmount: contract?.cashFirstPayment || 0,
      })
    }
  }, [saleType])

  if (!contract) {
    return null
  }

  return <FormModal
    visibleFormModal={visible}
    onClose={onClose}
    title={`Добавление первоначального взноса, договор №${contract.regCode}`}
    handleSubmit={handleSubmit}
    saving={handleActionQuery.isLoading}>
    {saleType && <>
      <CRow className="mb-3">
        <CCol md={6}>
          <RefOptionsField
            label={'Касса'}
            options={cashOptionsQuery.data || []}
            handleChange={handleChange}
            fieldName={'cashId'}
            value={model.cashId}
            error={errors.cashId}
          />
        </CCol>
        <CCol md={5}>
          <RefOptionsField
            label={'Касса для наличных'}
            options={cashOptionsQuery.data || []}
            handleChange={handleChange}
            fieldName={'cashAmountCashId'}
            value={model.cashAmountCashId}
            error={errors.cashAmountCashId}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol md={6}>
          <DatePickerField
            label={'Дата оплаты'}
            fieldName={'docDate'}
            handleChange={handleChange}
            value={model.docDate}
            error={errors.docDate}
          />
        </CCol>
        <CCol md={5}>
          <CurrencyField
            label={'Сумма наличными'}
            value={model.cashAmount}
            error={errors.cashAmount}
            fieldName={'cashAmount'}
            handleChange={handleChange}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol md={6}>
          <CurrencyField
            label={'Сумма'}
            value={model.amount}
            error={errors.amount}
            fieldName={'amount'}
            handleChange={handleChange}
          />
        </CCol>
      </CRow>
    </>}
  </FormModal>
}

export default ContractAddFirstPaymentModal