import React from 'react'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm } from '@coreui/react-pro'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import { getMonthOptions, getYearOptions } from 'utils/Helpers'
import { StructureSearchParamModel } from 'models/hr/HrModels'
import { errorTypes } from '../CompanyStructurePage'

type Props = {
  searchParams: StructureSearchParamModel
  errors: errorTypes
  loadData: () => void
  handleChange: React.ChangeEventHandler<HTMLSelectElement>
  isLoading: boolean
}

const StructureSearchPanel = ({ searchParams, errors, loadData, handleChange, isLoading }: Props) => {
  return (
  <CCard>
    <CCardHeader>Панель поиска</CCardHeader>
    <CCardBody>
      <CForm className="row g-3 needs-validation">
        <CCol md={12}>
          <RefOptionsField
            label={'Год'}
            fieldName={'year'}
            options={getYearOptions()}
            handleChange={handleChange}
            value={searchParams.year}
            error={errors.year}
          />
        </CCol>
        <CCol md={12}>
          <RefOptionsField
            label={'Месяц'}
            fieldName={'month'}
            options={getMonthOptions()}
            handleChange={handleChange}
            value={searchParams.month}
            error={errors.month}
          />
        </CCol>
      </CForm>
    </CCardBody>
    <CCardFooter>
      <CButton
        disabled={isLoading}
        size="sm"
        style={{ marginTop: '10px' }}
        color={'primary'}
        onClick={loadData}
        className="float-end m-0"
      >
        {isLoading ? 'Ждите...' : 'Сформировать'}
      </CButton>
    </CCardFooter>
  </CCard>
  )
}

export default StructureSearchPanel
