import React, { useEffect, useState } from 'react'
import DocFormPageWrapper from 'components/doc/DocFormPageWrapper'
import CustomSpinner from 'components/spinner/CustomSpinner'
import WhouseDocsInfoForm from './WhouseDocsInfoForm'
import { useParams } from 'react-router-dom'
import { CForm } from '@coreui/react-pro'
import {
  DefaultWhouseDocFormModel,
  DefaultWhouseDocGoodsFormModel,
  WhouseDocFormModel,
} from 'models/whouse/whouseModels'
import WhouseDocsGoodsListForm from './WhouseDocsGoodsListForm'
import {
  useGoodsOptionsQuery,
  useSupplierOptionsQuery,
  useWhouseOptionsQuery,
} from 'hooks/reference/refOptionsQueries'
import { Doctype } from 'models/CommonModels'

const WhouseDocFormPage = () => {
  let { doctype } = useParams()
  const [model, setModel] = useState<WhouseDocFormModel>({
    ...DefaultWhouseDocFormModel,
    items: [],
  })
  const [errors, setErrors] = useState<any>({})

  const whouseOptionsQuery = useWhouseOptionsQuery(true)
  const supplierOptionsQuery = useSupplierOptionsQuery(true)
  const goodsOptionsQuery = useGoodsOptionsQuery({ hasSerial: true }, true)

  useEffect(() => {
    if (doctype === 'supplies') {
      setModel({ ...DefaultWhouseDocFormModel, doctype: Doctype.SUPPLY })
    } else if (doctype === 'shipments') {
      setModel({ ...DefaultWhouseDocFormModel, doctype: Doctype.SHIPMENT })
    } else if (doctype === 'move-outs') {
      setModel({ ...DefaultWhouseDocFormModel, doctype: Doctype.MOVE_OUT })
    } else if (doctype === 'move-ins') {
      setModel({ ...DefaultWhouseDocFormModel, doctype: Doctype.MOVE_IN })
    } else if (doctype === 'returns') {
      setModel({ ...DefaultWhouseDocFormModel, doctype: Doctype.RETURN })
    } else if (doctype === 'writeoff-losts') {
      setModel({ ...DefaultWhouseDocFormModel, doctype: Doctype.WRITEOFF_LOST })
    }
  }, [doctype])

  const handleSubmit = () => {
    // saveMutation
    //   .mutateAsync({ form: model })
    //   .then(({ data }) => {
    //     if (id) {
    //       window.location.pathname = `/marketing/contracts/view/${id}`
    //     } else {
    //       window.location.pathname = `/marketing/contracts/view/${data.id}`
    //     }
    //   })
    //   .catch((error) => {
    //     setErrors(parseResponseFormErrors(error))
    //   })
  }

  const handleChange = (e: any, index: any) => {
    const { name, value } = e.target
    const goodsProps = ['goodsId', 'unitPrice', 'quantity', 'serialNumbers']

    if (goodsProps.includes(name)) {
      setModel((prev) => ({
        ...prev,
        items: prev.items?.map((el, i) =>
          i === index
            ? { ...el, [name]: name === 'unitPrice' || name === 'quantity' ? +value : value }
            : el,
        ),
      }))
    } else {
      setModel({ ...model, [name]: value })
    }
    setErrors({ ...errors, [name]: null })
  }

  const addNewGoods = () => {
    setModel((prev) => ({
      ...prev,
      items: prev.items && [...prev.items, DefaultWhouseDocGoodsFormModel],
    }))
  }

  const deleteGoodsFromList = (index: any) => {
    setModel((prev) => ({
      ...prev,
      items: prev.items?.filter((item, key) => key !== index),
    }))
  }

  console.log('model', model)

  return (
    <DocFormPageWrapper
      saving={false} //saveMutation.isLoading
      handleSubmit={handleSubmit}
      cancelUrl={'/whouse/docs/supplies'}
      title={'Добавление'}
      children={
        false ? (
          <CustomSpinner />
        ) : (
          <CForm className="row g-3 needs-validation">
            <WhouseDocsInfoForm
              doctype={doctype}
              model={model}
              whouseList={whouseOptionsQuery.data}
              supplierList={supplierOptionsQuery.data}
              handleChange={handleChange}
            />
            <WhouseDocsGoodsListForm
              goodList={goodsOptionsQuery.data}
              model={model}
              handleChange={handleChange}
              addNewGoods={addNewGoods}
              deleteGoodsFromList={deleteGoodsFromList}
            />
          </CForm>
        )
      }
    />
  )
}

export default WhouseDocFormPage
