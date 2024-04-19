import { useEffect, useState } from 'react'
import { CashFormModel } from '../../../../models/reference/RefModels'
import FormModal from '../../../../components/FormModal'
import RefCashForm from './RefCashForm'
import { useBankOptionsQuery, useBranchOptionsQuery } from '../../../../hooks/reference/refOptionsQueries'
import { parseResponseFormErrors } from '../../../../utils/ErrorUtil'
import CustomSpinner from '../../../../components/spinner/CustomSpinner'
import { useCashFormQuery, useCashSaveMutation } from '../../../../hooks/reference/refCashQueries'
import { toast } from 'react-toastify'

const DefaultModel: CashFormModel = {
  bankId: null,
  branchIds: [],
  currency: null,
  name: '',
  type: null,
}

type Props = {
  id: string | undefined
  visible: boolean
  close: () => void
  handleAfterSubmit: () => void
}
const RefCashFormModal = ({ id, visible, close, handleAfterSubmit }: Props) => {
  const [model, setModel] = useState<CashFormModel>(DefaultModel)
  const [errors, setErrors] = useState<any>({})

  const formQuery = useCashFormQuery(id, false)
  const saveMutation = useCashSaveMutation(id)

  const branchOptionsQuery = useBranchOptionsQuery(true)
  const bankOptionsQuery = useBankOptionsQuery(true)

  useEffect(() => {
    if (id) {
      formQuery.refetch()
        .then(({ data }) => setModel(data || DefaultModel))
    } else {
      setModel(DefaultModel)
    }

    return () => {
      setErrors({})
    }
  }, [id])

  const submitForm = () => {
    saveMutation
      .mutateAsync({
        form: model,
      })
      .then(({ data }) => {
        handleAfterSubmit()
      })
      .catch((error) => {
        setErrors(parseResponseFormErrors(error))
      })
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  const addBranchIdsRow = () => {
    const brIds = [...model.branchIds]
    brIds.push(null)
    setModel({ ...model, branchIds: brIds })
  }
  const removeBranchIdsRow = (idx: number) => {
    setModel((prev) => ({
      ...prev,
      branchIds: prev.branchIds?.filter((brId, key) => key !== idx),
    }))
  }
  const handleBranchIdsChange = (idx: number, value: string | null) => {
    if (model.branchIds.some((el) => el === value)) {
      toast.error('Филиал уже выбран!')
      return
    }
    setModel((prev) => ({
      ...prev,
      branchIds: prev.branchIds?.map((el, i) =>
        i === idx ? value : el,
      ),
    }))
  }

  return <FormModal
    visibleFormModal={visible}
    onClose={close}
    title={id ? 'Редактирование кассы' : 'Добавление кассы'}
    handleSubmit={submitForm}
    saving={saveMutation.isLoading}>
    {formQuery.isLoading
      ? <CustomSpinner />
      : <RefCashForm
        model={model}
        branchOptions={branchOptionsQuery.data || []}
        bankOptions={bankOptionsQuery.data || []}
        handleChange={handleChange}
        errors={errors}
        handleBranchIdsChange={handleBranchIdsChange}
        addBranchIdsRow={addBranchIdsRow}
        removeBranchIdsRow={removeBranchIdsRow}
      />}
  </FormModal>
}

export default RefCashFormModal