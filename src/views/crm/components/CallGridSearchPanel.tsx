import React from 'react'
import { RefOptionsModel } from '../../../models/CommonModels'
import { CButton, CCol, CRow } from '@coreui/react-pro'
import { RefOptionsField } from '../../../components/fields/RefOptionsField'

type Props = {
  branchOptions: RefOptionsModel[]
  errors: any
  handleChange: (e: any) => void
  loading: boolean
  loadData: () => void
  searchModel: any
}
const CallGridSearchPanel = ({
                               branchOptions,
                               errors,
                               handleChange,
                               loading,
                               loadData,
                               searchModel,
                             }: Props) => {
  return <CRow className="mb-2">
    <CCol>
      <RefOptionsField
        label={'Филиал'}
        fieldName={'branchId'}
        error={errors.branchId}
        options={branchOptions}
        handleChange={handleChange}
        value={searchModel.branchId}
      />
    </CCol>
    <CCol>
      <br />
      <CButton
        style={{ marginTop: '10px' }}
        color={'secondary'}
        onClick={loadData}
        disabled={loading}
      >
        Загрузить
      </CButton>
    </CCol>
  </CRow>
}

export default CallGridSearchPanel