import { useState } from 'react'
import { useCashDocHandleActionQuery } from '../../../../../hooks/finance/financeQueries'
import { DocAction } from '../../../../../models/CommonModels'
import { parseResponseError } from '../../../../../utils/ErrorUtil'
import { toast } from 'react-toastify'
import FormModal from '../../../../../components/FormModal'
import { CCol, CRow } from '@coreui/react-pro'
import { DatePickerField } from '../../../../../components/fields/DatePickerField'

type Props = {
  visible: boolean
  onClose: () => void
  handleAfterSubmit: () => void
  docId: string
}

const MoveInRegisterFormModal = ({ visible, onClose, handleAfterSubmit, docId }: Props) => {
  const [model, setModel] = useState<{
    docDate: string
  }>({ docDate: '' })

  const handleActionQuery = useCashDocHandleActionQuery()
  const handleSubmit = () => {
    const form = {
      action: DocAction.REGISTER,
      docId: docId,
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
    title={'Регистрация приема денег'}
    handleSubmit={handleSubmit}
    saving={handleActionQuery.isLoading}>
    <CRow className="mb-3">
      <CCol md={4}>
        <DatePickerField
          label={'Дата приема'}
          placeholder="Дата приема"
          fieldName={'docDate'}
          handleChange={handleChange}
          value={model.docDate}
        />
      </CCol>
    </CRow>
  </FormModal>
}

export default MoveInRegisterFormModal