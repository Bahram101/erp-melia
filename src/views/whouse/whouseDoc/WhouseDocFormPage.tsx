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
import { useWhouseDocFormQuery, useWhouseDocSaveMutation } from '../../../hooks/whouse/whouseQueries'
import { parseResponseFormErrors } from '../../../utils/ErrorUtil'
import { getWhouseDoctypeFromUriPath, getWhouseDocUriPathFromDoctype } from '../../../utils/UrlHelper'
import { DoctypeTitles, RefOptionsModel } from '../../../models/CommonModels'
import ItemSerialNumberFormModal from './components/ItemSerialNumberFormModal'

const WhouseDocFormPage = () => {
  const { whousedocpath, id } = useParams()
  const [serialNumberFormModalVisible, setSerialNumberFormModalVisible] = useState<boolean>(false)
  const [snFormModel, setSnFormModel] = useState<{ index: number, serialNumbers: string[] }>({
    index: 0,
    serialNumbers: [],
  })

  const [model, setModel] = useState<WhouseDocFormModel>(DefaultWhouseDocFormModel)
  const [errors, setErrors] = useState<any>({})
  const [hasSerialGoodsIds, setHasSerialGoodsIds] = useState<string[]>([])

  const whouseOptionsQuery = useWhouseOptionsQuery(true)
  const supplierOptionsQuery = useSupplierOptionsQuery(true)
  const goodsOptionsQuery = useGoodsOptionsQuery({}, true)

  const goodsHasSerialsQuery = useGoodsOptionsQuery({ hasSerial: true }, false)

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
    goodsHasSerialsQuery.refetch()
      .then(({ data }) => {
        setHasSerialGoodsIds(data ? data.map((item: RefOptionsModel) => item.id || '') : [])
      })

  }, [])

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
        i === index ? (name === 'serialNumbers' ? { ...el, [name]: value, quantity: value.length } : {
          ...el,
          [name]: value,
        }) : el,
      ),
    }))
  }

  const showSnFormModal = (index: number, serialNumbers: string[]) => {
    setSnFormModel({ index: index, serialNumbers: serialNumbers })
    setSerialNumberFormModalVisible(true)
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

  return (
    <>
      <ItemSerialNumberFormModal
        visible={serialNumberFormModalVisible}
        onClose={() => setSerialNumberFormModalVisible(false)}
        serialNumbers={snFormModel.serialNumbers}
        index={snFormModel.index}
        handleItemChange={handleItemChange}
      />
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
              showSnFormModal={showSnFormModal}
              model={model}
              errors={errors}
              whouseOptions={whouseOptionsQuery.data || []}
              supplierOptions={supplierOptionsQuery.data || []}
              goodsOptions={goodsOptionsQuery.data || []}
              hasSerialGoodsIds={hasSerialGoodsIds || []}
              addItemRow={addItemRow}
              deleteItemRow={deleteItemRow}
              handleItemChange={handleItemChange}
              handleChange={handleChange}
            />
          )
        }
      />
    </>
  )
}

export default WhouseDocFormPage
