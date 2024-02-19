import FormModal from '../../../../../components/FormModal'
import { CCol, CRow } from '@coreui/react-pro'
import { useState } from 'react'
import { useContractHandleActionQuery } from '../../../../../hooks/marketing/marketingQueries'
import { DocAction } from '../../../../../models/CommonModels'
import { parseResponseError } from '../../../../../utils/ErrorUtil'
import { toast } from 'react-toastify'
import { RefOptionsField } from '../../../../../components/fields/RefOptionsField'
import { useCollectorsAsOptionsQuery } from '../../../../../hooks/hr/postQueries'

type Props = {
  visible: boolean
  onClose: () => void
  regCode: string
  contractId: string
  handleAfterSubmit: () => void
}
const ContractChangeCollectorModal = ({
                                        visible,
                                        onClose,
                                        regCode,
                                        contractId,
                                        handleAfterSubmit,
                                      }: Props) => {
  const [model, setModel] = useState<{ collectorId: string | null }>({ collectorId: null })

  const handleActionQuery = useContractHandleActionQuery()
  const collectorsOptionsQuery = useCollectorsAsOptionsQuery(true)
  const handleSubmit = () => {
    const form = {
      action: DocAction.UPDATE_COLLECTOR,
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
    title={`Изменить взносщика в договоре №${regCode}`}
    handleSubmit={handleSubmit}
    saving={handleActionQuery.isLoading}>
    <CRow className="mb-3">
      <CCol md={6}>
        <RefOptionsField
          label={'Выберите взносщика'}
          options={collectorsOptionsQuery.data || []}
          handleChange={handleChange}
          fieldName={'collectorId'}
          value={model.collectorId}
        />
      </CCol>
    </CRow>
  </FormModal>
}

export default ContractChangeCollectorModal
