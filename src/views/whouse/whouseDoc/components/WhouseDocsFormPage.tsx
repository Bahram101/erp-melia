import DocFormPageWrapper from 'components/doc/DocFormPageWrapper'
import CustomSpinner from 'components/spinner/CustomSpinner'
import React from 'react'
import WhouseDocsForm from './WhouseDocsForm'
import { CContainer } from '@coreui/react-pro'

const WhouseDocFormPage = () => {
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

  return (
    <DocFormPageWrapper
      saving={false} //saveMutation.isLoading
      handleSubmit={handleSubmit}
      cancelUrl={'/whouse/docs/supplies'}
      title={'Добавление'}
      children={false ? <CustomSpinner /> : <WhouseDocsForm />}
    />
  )
}

export default WhouseDocFormPage
