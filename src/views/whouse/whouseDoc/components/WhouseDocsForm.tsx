import { CCol, CForm } from '@coreui/react-pro'
import InputField from 'components/fields/InputField'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import React from 'react'

const WhouseDocsForm = () => {
  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={6}>
        <InputField
          label={'Тип документа'}
          fieldName={'regNumber'}
          handleChange={() => {}}
          value={0}
          //   error={errors.regNumber}
        />
      </CCol>

      <CCol md={6}>
        <RefOptionsField
          label={'Филиал'}
          options={[]}
          handleChange={() => {}}
          fieldName={'branchId'}
          value={''}
          //   error={rrors.branchId}
        />
      </CCol>
    </CForm>
  )
}

export default WhouseDocsForm
