import { CCol, CForm, CInputGroup } from '@coreui/react-pro'
import { DatePickerField } from 'components/fields/DatePickerField'
import InputField from 'components/fields/InputField'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import TextAreaField from 'components/fields/TextAreaField'
import { RefOptionsModel } from 'models/CommonModels'
import { WhouseDocFormModel } from 'models/whouse/whouseModels'
import React from 'react'
import { DoctypesTitles } from 'utils/Helpers'

interface Props {
  model: WhouseDocFormModel
  doctype: string | undefined
  whouseList: RefOptionsModel[] | undefined
  handleChange: (e: any) => void
}

const WhouseDocsInfoForm = ({ model, doctype, whouseList, handleChange }: Props) => {
  return (
    <CCol md={4} className="pe-3">
      <div className="mb-3">
        <InputField
          label={'Тип документа'}
          fieldName={'doctype'}
          error={''}
          readOnly={true}
          value={doctype && DoctypesTitles[doctype]}
          handleChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <InputField
          label={'Статус документа'}
          fieldName={''}
          error={''}
          readOnly={true}
          value={'Новый'}
          handleChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <RefOptionsField
          label={'Поставщик'}
          fieldName={'branchId'}
          error={''}
          options={[]}
          value={''}
          handleChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <RefOptionsField
          label={'На склад'}
          fieldName={'toWhouseId'}
          error={''}
          options={whouseList || []}
          value={model.toWhouseId}
          handleChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <DatePickerField
          label={'Дата документа'}
          fieldName={'docDate'}
          error={''}
          value={model.docDate}
          handleChange={handleChange}
        />
      </div>

      <TextAreaField
        label={'Примечание'}
        fieldName="note"
        value={model.note}
        handleChange={handleChange}
      />
    </CCol>
  )
}

export default WhouseDocsInfoForm
