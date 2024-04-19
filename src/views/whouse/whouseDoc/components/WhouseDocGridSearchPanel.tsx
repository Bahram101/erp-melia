import { CButton, CCol, CRow } from '@coreui/react-pro'
import { Doctype } from '../../../../models/CommonModels'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'
import React from 'react'
import { getInWhouseDoctypes, getOutWhouseDoctypes } from '../../../../utils/WhouseUtils'
import { useWhouseOptionsQuery } from '../../../../hooks/reference/refOptionsQueries'

type Props = {
  doctype: Doctype | null
  searchModel: any
  handleChange: (e: any) => void
  loadData: () => void
  loading: boolean
}
const WhouseDocGridSearchPanel = ({ doctype, searchModel, handleChange, loadData, loading }: Props) => {
  const whouseOptionsQuery = useWhouseOptionsQuery(true)

  return <CRow className="mb-2">
    <>
      {doctype && getInWhouseDoctypes().includes(doctype) && <CCol>
        <RefOptionsField
          label={'На склад'}
          fieldName={'toWhouseId'}
          error={''}
          options={whouseOptionsQuery.data || []}
          handleChange={handleChange}
          value={searchModel.toWhouseId}
        />
      </CCol>}

      {doctype && getOutWhouseDoctypes().includes(doctype) && <CCol>
        <RefOptionsField
          label={'Со склада'}
          fieldName={'fromWhouseId'}
          error={''}
          options={whouseOptionsQuery.data || []}
          handleChange={handleChange}
          value={searchModel.fromWhouseId}
        />
      </CCol>}
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

export default WhouseDocGridSearchPanel