import DocFormPageWrapper from '../../../components/doc/DocFormPageWrapper'
import SaleTypeForm from './components/SaleTypeForm'
import { useParams } from 'react-router-dom'
import { useSaleTypeFormQuery, useSaleTypeSaveMutation } from '../../../hooks/marketing/marketingQueries'
import { useEffect, useState } from 'react'
import { DefaultSaleTypeFormModel, SaleTypeFormModel } from '../../../models/marketing/MrkModels'
import {
  useBankOptionsQuery,
  useCashOptionsQuery,
  usePositionOptionsQuery,
} from '../../../hooks/reference/refOptionsQueries'
import { parseResponseFormErrors } from '../../../utils/ErrorUtil'

const SaleTypeFormPage = () => {
  const { id } = useParams()
  const [model, setModel] = useState<SaleTypeFormModel>(DefaultSaleTypeFormModel)
  const [errors, setErrors] = useState<any>({})

  const formQuery = useSaleTypeFormQuery(id, false)
  const bankOptionsQuery = useBankOptionsQuery(true)
  const positionOptionsQuery = usePositionOptionsQuery(true)
  const saveMutation = useSaleTypeSaveMutation(id)

  useEffect(() => {
    formQuery.refetch()
      .then(({ data }) => setModel(data || DefaultSaleTypeFormModel))
  }, [id])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  const addAwardRow = () => {
    let awards = [...model.awards]
    awards.push({
      positionId: null,
      amount: 0,
    })

    setModel({...model, awards: awards})
  }
  const handleAwardRowChange = (idx: number, e: any) => {
    const {name, value} = e.target;
    let positionExists = false;
    let newState = model.awards.map((obj, index) => {
      if (idx === index) {
        if (name === "amount") {
          return {...obj, [name]: parseInt(value)};
        } else if (name === "positionId") {
          if (value && value.length > 0) {
            positionExists = model.awards.find((award) => award.positionId === value) ? true : false;
            if (positionExists) {
              return obj;
            }
          }
        }

        return {...obj, [name]: value};
      }

      return obj;
    });

    if (positionExists) {
      alert("Должность уже выбрана!");
      return;
    }

    setModel({...model, awards: newState});
  }
  const deleteAwardRow = (idx: number) => {
    setModel({...model, awards: model.awards.filter((_award, index) => index !== idx)})
  }

  const submitForm = () => {
    saveMutation.mutateAsync({ form: model })
      .then(({ data }) => {
        if (id) {
          window.location.pathname = `/marketing/sale-types/edit/${id}`
        } else {
          window.location.pathname = `/marketing/sale-types/edit/${data.id}`
        }
      })
      .catch(error => {
        setErrors(parseResponseFormErrors(error))
      })
  }

  return <DocFormPageWrapper
    handleSubmit={submitForm}
    saving={saveMutation.isLoading}
    title={id ? 'Редактирование тип продажи' : 'Добавление тип продажи'}
    cancelUrl={'/marketing/sale-types'}
  >
    <SaleTypeForm
      model={model}
      handleChange={handleChange}
      errors={errors}
      bankOptions={bankOptionsQuery.data || []}
      positionOptions={positionOptionsQuery.data || []}
      handleAwardRowChange={handleAwardRowChange}
      addAwardRow={addAwardRow}
      deleteAwardRow={deleteAwardRow}
    />
  </DocFormPageWrapper>
}

export default SaleTypeFormPage