import FormModal from '../../../../../components/FormModal'
import { CCol, CRow } from '@coreui/react-pro'
import { useState } from 'react'
import { ContractRefModel, DefaultContractRefModel, DocAction } from '../../../../../models/CommonModels'
import RefContractField from '../../../../../components/fields/RefContractField'
import { useBranchOptionsQuery } from '../../../../../hooks/reference/refOptionsQueries'
import InputField from '../../../../../components/fields/InputField'
import { useContractHandleActionQuery } from '../../../../../hooks/marketing/marketingQueries'
import { parseResponseError } from '../../../../../utils/ErrorUtil'
import { toast } from 'react-toastify'

type Props = {
  visible: boolean
  close: () => void
  regCode: string
  contractId: string
  handleAfterSubmit: () => void
}
const ContractChangeRecoModal = ({ visible, close, regCode, contractId, handleAfterSubmit }: Props) => {

  const [model, setModel] = useState<ContractRefModel>(DefaultContractRefModel)

  const branchOptionsQuery = useBranchOptionsQuery(true)
  const handleActionQuery = useContractHandleActionQuery()

  const handleChange = (e: any) => {
    const { value } = e.target
    setModel(value)
  }

  const handleSubmit = () => {
    const form = {
      action: DocAction.UPDATE_RECOMMENDER,
      docId: contractId,
      addData: {
        recommenderContractId: model.id
      },
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

  return <FormModal
    visibleFormModal={visible}
    onClose={close}
    title={`Изменить рекомендателя договора №${regCode}`}
    handleSubmit={handleSubmit}
    saving={handleActionQuery.isLoading}>
    <CRow className="mb-3">
      <CCol md={6}>
        <RefContractField
          branchOptions={branchOptionsQuery.data || []}
          value={model}
          fieldName={'reco'}
          handleChange={handleChange}
        />
      </CCol>
      <CCol md={6}>
        <InputField
          disabled={true}
          fieldName={''}
          handleChange={() => {
          }}
          value={`${model.customerName} - ${model.regNumber}`}
        />
      </CCol>
    </CRow>
  </FormModal>
}

export default ContractChangeRecoModal
