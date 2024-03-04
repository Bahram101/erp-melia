import { Doctype, RefOptionsModel } from '../../../../models/CommonModels'
import { CButton, CCol, CRow } from '@coreui/react-pro'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'
import React from 'react'

type Props = {
  doctype: Doctype | undefined
  branchOptions: RefOptionsModel[]
  cashOptions: RefOptionsModel[]
  errors: any
  model: any
  handleChange: (e: any) => void
  loading: boolean
  loadData: () => void
}
const CashDocGridSearchPanel = ({
                                  doctype,
                                  branchOptions,
                                  cashOptions,
                                  errors,
                                  model,
                                  handleChange,
                                  loading,
                                  loadData,
                                }: Props) => {
  return <CRow className="mb-2">
    <>
      {doctype === Doctype.CASH_DOC_SERVICE_PAYMENT && <CCol>
        <RefOptionsField
          label={'Филиал'}
          fieldName={'branchId'}
          error={errors.branchId}
          options={branchOptions}
          handleChange={handleChange}
          value={model.branchId}
        />
      </CCol>}
      {doctype === Doctype.CASH_DOC_MOVE_IN || doctype === Doctype.CASH_DOC_MOVE_OUT && <>
        <CCol>
          <RefOptionsField
            label={'Из кассы'}
            fieldName={'fromCashId'}
            error={errors.fromCashId}
            options={cashOptions}
            handleChange={handleChange}
            value={model.fromCashId}
          />
        </CCol>
        <CCol>
          <RefOptionsField
            label={'На кассу'}
            fieldName={'toCashId'}
            error={errors.toCashId}
            options={cashOptions}
            handleChange={handleChange}
            value={model.toCashId}
          />
        </CCol>
      </>}
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
    </>
  </CRow>
}

export default CashDocGridSearchPanel