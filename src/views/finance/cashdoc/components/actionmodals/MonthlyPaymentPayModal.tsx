import FormModal from '../../../../../components/FormModal'
import { CCol, CRow } from '@coreui/react-pro'
import { DatePickerField } from '../../../../../components/fields/DatePickerField'
import { useMonthlyPaymentDocFormCreateMutation } from '../../../../../hooks/finance/financeQueries'
import { useEffect, useState } from 'react'
import {
  DefaultMonthlyPaymentDocFormModel,
  MonthlyPaymentDocFormModel,
  MonthlyPaymentDocGridModel,
} from '../../../../../models/finance/FinModels'
import { RefOptionsModel } from '../../../../../models/CommonModels'
import { RefOptionsField } from '../../../../../components/fields/RefOptionsField'
import CurrencyField from '../../../../../components/fields/CurrencyField'
import { parseResponseError, parseResponseFormErrors } from '../../../../../utils/ErrorUtil'
import { toast } from 'react-toastify'

type Props = {
  visible: boolean
  onClose: () => void
  handleAfterSubmit: () => void
  doc: MonthlyPaymentDocGridModel | undefined
  cashOptions: RefOptionsModel[]
}
const MonthlyPaymentPayModal = ({ visible, onClose, handleAfterSubmit, doc, cashOptions }: Props) => {
  const [model, setModel] = useState<MonthlyPaymentDocFormModel>(DefaultMonthlyPaymentDocFormModel)
  const [errors, setErrors] = useState<any>({})

  useEffect(() => {
    if (doc) {
      setModel({ ...DefaultMonthlyPaymentDocFormModel, psId: doc.id })
    }

    return () => {
      setErrors({})
      setModel(DefaultMonthlyPaymentDocFormModel)
    }
  }, [doc])

  const createQuery = useMonthlyPaymentDocFormCreateMutation()
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
  }
  const handleSubmit = () => {
    createQuery.mutateAsync({ form: model })
      .then(() => {
        handleAfterSubmit()
      })
      .catch((error) => {
        const errorMsg = parseResponseError(error)
        if (errorMsg) {
          toast.error(errorMsg)
        }
        setErrors(parseResponseFormErrors(error))
      })
  }

  if (!doc) {
    return null
  }

  return <FormModal
    visibleFormModal={visible}
    onClose={onClose}
    title={`Оплата ежемес. взноса, договор ${doc.regCode}`}
    handleSubmit={handleSubmit}
    saving={createQuery.isLoading}>
    <CRow className="mb-3">
      <CCol md={4}>
        <DatePickerField
          label={'Дата оплаты'}
          placeholder="Дата оплаты"
          fieldName={'paymentDate'}
          handleChange={handleChange}
          value={model.paymentDate}
          error={errors.paymentDate}
        />
      </CCol>
      <CCol md={4}>
        <RefOptionsField
          label={'На кассу'}
          options={cashOptions}
          handleChange={handleChange}
          fieldName={'cashId'}
          value={model.cashId}
          error={errors.cashId}
        />
      </CCol>
      <CCol md={4}>
        <CurrencyField
          label={'Сумма'}
          fieldName={'amount'}
          handleChange={handleChange}
          value={model.amount}
          error={errors.amount}
        />
      </CCol>
    </CRow>
  </FormModal>
}

export default MonthlyPaymentPayModal