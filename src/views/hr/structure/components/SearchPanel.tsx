import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm } from '@coreui/react-pro'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import { years, months } from 'utils/Helpers'
import { FormData } from 'models/CommonModels'

type Props = {
  searchParams: FormData
  errors: FormData
  loadData: () => void
  handleChange: React.ChangeEventHandler<HTMLSelectElement>
}

const SearchPanel = ({ searchParams, errors, loadData, handleChange }: Props) => {
  return (
    <CCol md={3} >
      <CCard>
        <CCardHeader>Панель поиска</CCardHeader>
        <CCardBody>
          <CForm className="row g-3 needs-validation">
            <CCol md={12}>
              <RefOptionsField
                label={'Год'}
                fieldName={'year'}
                options={years}
                handleChange={handleChange}
                value={searchParams.year}
                error={errors.year}
              />
            </CCol>
            <CCol md={12}>
              <RefOptionsField
                label={'Месяц'}
                fieldName={'month'}
                options={months}
                handleChange={handleChange}
                value={searchParams.month}
                error={errors.month}
              />
            </CCol>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton
            size="sm"
            style={{ marginTop: '10px' }}
            color={'primary'}
            onClick={loadData}
            className="float-end m-0"
          >
            Оформить
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  )
}

export default SearchPanel
