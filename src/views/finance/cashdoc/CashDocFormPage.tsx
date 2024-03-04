import DocFormPageWrapper from '../../../components/doc/DocFormPageWrapper'
import CashDocForm from './components/CashDocForm'
import {
  CashDocFormModel,
  DefaultCashDocFormModel,
  DefaultCashDocItemFormModel,
} from '../../../models/finance/FinModels'
import { useEffect, useState } from 'react'
import {
  useBranchOptionsQuery,
  useCashOptionsQuery,
  useExpInItemOptionsQuery,
} from '../../../hooks/reference/refOptionsQueries'
import { useParams } from 'react-router-dom'
import { useCashDocFormQuery, useCashDocFormSaveMutation } from '../../../hooks/finance/financeQueries'
import { getCashDoctypeFromUriPath, getCashDocUriPathFromDoctype } from '../../../utils/UrlHelper'
import { parseResponseFormErrors } from '../../../utils/ErrorUtil'
import { DoctypeTitles } from '../../../models/CommonModels'
import { toast } from 'react-toastify'

const CashDocFormPage = () => {
  const { id, cashdoctype } = useParams()
  const [errors, setErrors] = useState<any>({})
  const [model, setModel] = useState<CashDocFormModel>(DefaultCashDocFormModel)

  const branchOptionsQuery = useBranchOptionsQuery(true)
  const cashOptionsQuery = useCashOptionsQuery({}, true)
  const expInItemOptionsQuery = useExpInItemOptionsQuery({ type: 'OUT' }, true)
  const formQuery = useCashDocFormQuery(id, false)
  const saveMutation = useCashDocFormSaveMutation(id)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  const handleItemChange = (e: any, index: number) => {
    const { name, value } = e.target
    if (name === 'itemId' && model.items.some((el) => el.itemId === value)) {
      toast.error('Статья уже выбрана!')
      return
    }
    setModel((prev) => ({
      ...prev,
      items: prev.items?.map((el, i) =>
        i === index
          ? {
            ...el,
            [name]: value,
          }
          : el,
      ),
    }))
  }

  const addItemRow = () => {
    setModel((prev) => ({
      ...prev,
      items: prev.items && [...prev.items, DefaultCashDocItemFormModel],
    }))
  }

  const deleteItemRow = (index: number) => {
    setModel((prev) => ({
      ...prev,
      items: prev.items?.filter((item, key) => key !== index),
    }))
  }

  const submitForm = () => {
    saveMutation
      .mutateAsync({ form: model })
      .then(({ data }) => {
        if (model.doctype) {
          if (id) {
            window.location.pathname = `/finance/cash-docs/${getCashDocUriPathFromDoctype(model.doctype)}/view/${id}`
          } else {
            window.location.pathname = `/finance/cash-docs/${getCashDocUriPathFromDoctype(model.doctype)}/view/${data.id}`
          }
        }
      })
      .catch((error) => {
        setErrors(parseResponseFormErrors(error))
      })
  }

  useEffect(() => {
    if (id) {
      formQuery.refetch()
        .then(({ data }) => setModel(data || DefaultCashDocFormModel))
    } else {
      setModel({ ...DefaultCashDocFormModel, doctype: getCashDoctypeFromUriPath(cashdoctype || '') })
    }
  }, [id, cashdoctype])

  return <DocFormPageWrapper
    title={`${id ? 'Редактирование' : 'Добавление'} документа "${model.doctype && DoctypeTitles[model.doctype]}"`}
    handleSubmit={submitForm}
    saving={saveMutation.isLoading}>
    <CashDocForm
      model={model}
      errors={errors}
      branchoptions={branchOptionsQuery.data || []}
      cashOptions={cashOptionsQuery.data || []}
      handleChange={handleChange}
      handleItemChange={handleItemChange}
      addItemRow={addItemRow}
      deleteItemRow={deleteItemRow}
      expenseItemOptions={expInItemOptionsQuery.data || []}
    />
  </DocFormPageWrapper>
}

export default CashDocFormPage