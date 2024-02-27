import DocFormPageWrapper from '../../../components/doc/DocFormPageWrapper'
import { useParams } from 'react-router-dom'
import { useSaleBonusFormQuery, useSaleBonusSaveMutation } from '../../../hooks/marketing/marketingQueries'
import { useEffect, useState } from 'react'
import { DefaultSaleBonusFormModel, SaleBonusFormModel } from '../../../models/marketing/MrkModels'
import {
  useBranchOptionsQuery,
  useGoodsOptionsQuery,
  usePositionOptionsQuery,
} from '../../../hooks/reference/refOptionsQueries'
import { parseResponseFormErrors } from '../../../utils/ErrorUtil'
import SaleBonusForm from './components/SaleBonusForm'

const SaleBonusFormPage = () => {
  const { id } = useParams()
  const [model, setModel] = useState<SaleBonusFormModel>(DefaultSaleBonusFormModel)
  const [errors, setErrors] = useState<any>({})

  const formQuery = useSaleBonusFormQuery(id, false)
  const branchOptionsQuery = useBranchOptionsQuery(true)
  const positionOptionsQuery = usePositionOptionsQuery(true)
  const productOptionsQuery = useGoodsOptionsQuery({ hasSerial: true }, true)
  const saveMutation = useSaleBonusSaveMutation(id)

  useEffect(() => {
    formQuery.refetch()
      .then(({ data }) => setModel(data || DefaultSaleBonusFormModel))
  }, [id])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  const addConfigRow = () => {
    let configs = [...model.configs]
    configs.push({
      fromCount: null,
      toCount: null,
      amount: 0,
    })

    setModel({ ...model, configs: configs })
    setErrors({ ...errors, configs: null })
  }
  const handleConfigRowChange = (idx: number, e: any) => {
    const { name, value } = e.target
    let newState = model.configs.map((obj, index) => {
      if (idx === index) {
        if (name === 'amount') {
          return { ...obj, [name]: parseInt(value) }
        }

        return { ...obj, [name]: value }
      }

      return obj
    })

    setModel({ ...model, configs: newState })
  }
  const deleteConfigRow = (idx: number) => {
    setModel({ ...model, configs: model.configs.filter((_config, index) => index !== idx) })
  }

  const submitForm = () => {
    saveMutation.mutateAsync({ form: model })
      .then(({ data }) => {
        if (id) {
          window.location.pathname = `/marketing/sale-bonuses/edit/${id}`
        } else {
          window.location.pathname = `/marketing/sale-bonuses/edit/${data.id}`
        }
      })
      .catch(error => {
        setErrors(parseResponseFormErrors(error))
      })
  }

  return <DocFormPageWrapper
    handleSubmit={submitForm}
    saving={saveMutation.isLoading}
    title={id ? 'Редактирование бонуса продажи' : 'Добавление бонуса продажи'}
    cancelUrl={'/marketing/sale-bonuses'}
  >
    <SaleBonusForm
      model={model}
      handleChange={handleChange}
      errors={errors}
      positionOptions={positionOptionsQuery.data || []}
      handleConfigRowChange={handleConfigRowChange}
      addConfigRow={addConfigRow}
      deleteConfigRow={deleteConfigRow}
      branchOptions={branchOptionsQuery.data || []}
      productOptions={productOptionsQuery.data || []}
    />
  </DocFormPageWrapper>
}

export default SaleBonusFormPage