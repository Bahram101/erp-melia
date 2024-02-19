import FormModal from '../../../../components/FormModal'
import { CCol, CRow } from '@coreui/react-pro'
import { DatePickerField } from '../../../../components/fields/DatePickerField'
import { CFormCheck } from '@coreui/react'
import CurrencyField from '../../../../components/fields/CurrencyField'
import { useState } from 'react'
import { useContractHandleActionQuery } from '../../../../hooks/marketing/marketingQueries'
import { DocAction } from '../../../../models/CommonModels'
import { parseResponseError } from '../../../../utils/ErrorUtil'
import { toast } from 'react-toastify'

type Props = {
  visible: boolean
  onClose: () => void
  regCode: string
  handleAfterSubmit: () => void
  contractId: string
}

const ContractCancelFormModal = ({ visible, onClose, regCode, handleAfterSubmit, contractId }: Props) => {
  const [model, setModel] = useState<{
    cancelDate: string
    noReturn: boolean
    returnAmount: number
  }>({ cancelDate: '', noReturn: false, returnAmount: 0 })

  const handleActionQuery = useContractHandleActionQuery()
  const handleSubmit = () => {
    const form = {
      action: DocAction.CANCEL,
      docId: contractId,
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
  }

  return <FormModal
    visibleFormModal={visible}
    onClose={onClose}
    title={`Отмена договора №${regCode}`}
    handleSubmit={handleSubmit}
    saving={handleActionQuery.isLoading}>
    <CRow className="mb-3">
      <CCol md={4}>
        <DatePickerField
          label={'Дата отмены'}
          placeholder="Дата отмены"
          fieldName={'cancelDate'}
          handleChange={handleChange}
          value={model.cancelDate}
        />
      </CCol>
      <CCol md={4}>
        <div style={{ marginTop: '35px' }}>
          <CFormCheck
            label="Не возвращаем"
            name={'noReturn'}
            checked={model.noReturn}
            onChange={() => {
            }}
            onClick={() => {
              setModel({ ...model, noReturn: !model.noReturn })
            }}
            id={'noReturnCheck'}
          />
        </div>
      </CCol>
      <CCol md={4}>
        {!model.noReturn && <CurrencyField
          label={'Сумма возврата (клиенту)'}
          fieldName={'returnAmount'}
          handleChange={handleChange}
          value={model.returnAmount}
        />}
      </CCol>
    </CRow>
  </FormModal>
}

export default ContractCancelFormModal
