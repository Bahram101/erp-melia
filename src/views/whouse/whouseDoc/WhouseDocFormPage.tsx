import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import DocFormPageWrapper from '../../../components/doc/DocFormPageWrapper'
import CustomSpinner from '../../../components/spinner/CustomSpinner'
import WhouseDocForm from './components/WhouseDocForm'
import {
  DefaultWhouseDocFormModel,
  DefaultWhouseDocItemFormModel,
  WhouseDocFormModel,
} from '../../../models/whouse/whouseModels'
import {
  useGoodsOptionsQuery,
  useSupplierOptionsQuery,
  useWhouseOptionsQuery,
} from '../../../hooks/reference/refOptionsQueries'
import {
  useWhouseDocFormQuery,
  useWhouseDocSaveMutation,
} from '../../../hooks/whouse/whouseQueries'
import { parseResponseFormErrors } from '../../../utils/ErrorUtil'
import {
  getWhouseDoctypeFromUriPath,
  getWhouseDocUriPathFromDoctype,
} from '../../../utils/UrlHelper'
import { DoctypeTitles } from '../../../models/CommonModels'

const WhouseDocFormPage = () => {
  const { whousedocpath, id } = useParams()
  const [model, setModel] = useState<WhouseDocFormModel>(DefaultWhouseDocFormModel)
  const [errors, setErrors] = useState<any>({})
  const [goodsIds, setGoodsIds] = useState<any>([])

  const whouseOptionsQuery = useWhouseOptionsQuery(true)
  const supplierOptionsQuery = useSupplierOptionsQuery(true)
  const goodsOptionsQuery = useGoodsOptionsQuery({}, true)
  const goodsHasSerialsQuery = useGoodsOptionsQuery({ hasSerial: true }, true)

  const whouseDocFormQuery = useWhouseDocFormQuery(id, false)
  const saveMutation = useWhouseDocSaveMutation(id)

  useEffect(() => {
    const doctype = getWhouseDoctypeFromUriPath(whousedocpath || '')
    if (doctype) {
      if (id) {
        whouseDocFormQuery
          .refetch()
          .then(({ data }) => setModel(data || { ...DefaultWhouseDocFormModel, doctype: doctype }))
      } else {
        setModel({ ...DefaultWhouseDocFormModel, doctype: doctype })
      }
    } else {
      //ToDo show error
    }
  }, [whousedocpath, id])

  useEffect(() => {
    const ids = goodsHasSerialsQuery.data?.map(({ id }: any) => id)
    setGoodsIds(ids)
  }, [goodsHasSerialsQuery.data])

  const handleSubmit = () => {
    saveMutation
      .mutateAsync({
        form: model,
      })
      .then(({ data }) => {
        location.pathname = `/whouse/docs/${getWhouseDocUriPathFromDoctype(model.doctype)}/view/${
          id || data.id
        }`
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
  const handleItemChange = (e: any, index: number) => {
    const { name, value } = e.target
    if (name === 'goodsId' && model.items.some((el) => el.goodsId === value)) {
      toast.error('Товар уже выбран!')
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
      items: prev.items && [...prev.items, DefaultWhouseDocItemFormModel],
    }))
  }

  const deleteItemRow = (index: number) => {
    setModel((prev) => ({
      ...prev,
      items: prev.items?.filter((item, key) => key !== index),
    }))
  }
  console.log('model', model)
  return (
    <DocFormPageWrapper
      saving={saveMutation.isLoading}
      handleSubmit={handleSubmit}
      cancelUrl={`/whouse/docs/${getWhouseDocUriPathFromDoctype(model.doctype)}`}
      title={`Добавление документа "${DoctypeTitles[model.doctype]}"`}
      children={
        whouseDocFormQuery.isLoading ? (
          <CustomSpinner />
        ) : (
          <WhouseDocForm
            model={model}
            errors={errors}
            whouseOptions={whouseOptionsQuery.data || []}
            supplierOptions={supplierOptionsQuery.data || []}
            goodsOptions={goodsOptionsQuery.data || []}
            goodsIds={goodsIds || []}
            addItemRow={addItemRow}
            deleteItemRow={deleteItemRow}
            handleItemChange={handleItemChange}
            handleChange={handleChange}
          />
        )
      }
    />
  )
}

export default WhouseDocFormPage
