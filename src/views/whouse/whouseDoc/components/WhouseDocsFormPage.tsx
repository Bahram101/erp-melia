import React, { useState } from 'react'
import DocFormPageWrapper from 'components/doc/DocFormPageWrapper'
import CustomSpinner from 'components/spinner/CustomSpinner'
import WhouseDocsInfoForm from './WhouseDocsInfoForm'
import { useParams } from 'react-router-dom'
import { CForm } from '@coreui/react-pro'
import { DefaultWhouseDocFormModel, WhouseDocFormModel } from 'models/whouse/whouseModels'
import WhouseDocsGoodListForm from './WhouseDocsGoodListForm'
import { useGoodsOptionsQuery, useWhouseOptionsQuery } from 'hooks/reference/refOptionsQueries'

const WhouseDocFormPage = () => {
  let { doctype } = useParams()
  const [model, setModel] = useState<WhouseDocFormModel>(DefaultWhouseDocFormModel)
  const [errors, setErrors] = useState<any>({})

  const whouseOptionsQuery = useWhouseOptionsQuery(true)
  const goodsOptionsQuery = useGoodsOptionsQuery({ hasSerial: true }, true)

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

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
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
              handleChange={handleChange}
            />
            <WhouseDocsGoodListForm
              goodList={goodsOptionsQuery.data}
              handleChange={handleChange}
              model={model}
            />
          </CForm>
        )
      }
    />
  )
}

export default WhouseDocFormPage
