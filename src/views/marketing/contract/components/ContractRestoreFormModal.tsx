import FormModal from '../../../../components/FormModal'
import { CCol, CRow } from '@coreui/react-pro'
import { DatePickerField } from '../../../../components/fields/DatePickerField'
import { useState } from 'react'
import { useContractHandleActionQuery } from '../../../../hooks/marketing/marketingQueries'
import { DocAction } from '../../../../models/CommonModels'
import { parseResponseError } from '../../../../utils/ErrorUtil'
import { toast } from 'react-toastify'
import InputField from '../../../../components/fields/InputField'

type Props = {
  visible: boolean
  onClose: () => void
  regCode: string
  handleAfterSubmit: () => void
  contractId: string
}

const ContractRestoreFormModal = ({ visible, onClose, regCode, handleAfterSubmit, contractId }: Props) => {
  const [model, setModel] = useState<{
    restoreDate: string
    serialNumber: string
  }>({ restoreDate: '', serialNumber: '' })

  const handleActionQuery = useContractHandleActionQuery()
  const handleSubmit = () => {
    const form = {
      action: DocAction.RESTORE,
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
    title={`Восстановление договора №${regCode}`}
    handleSubmit={handleSubmit}
    saving={handleActionQuery.isLoading}>
    <CRow className="mb-3">
      <CCol md={5}>
        <DatePickerField
          label={'Дата восстановления'}
          placeholder="Дата восстановления"
          fieldName={'restoreDate'}
          handleChange={handleChange}
          value={model.restoreDate}
        />
      </CCol>
      <CCol md={5}>
        <InputField
          label={'Серииный номер продукта'}
          fieldName={'serialNumber'}
          handleChange={handleChange}
        />
      </CCol>
    </CRow>
  </FormModal>
}

export default ContractRestoreFormModal
