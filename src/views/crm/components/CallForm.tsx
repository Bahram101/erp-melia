import { CCol, CForm } from '@coreui/react-pro'
import { DatePickerField } from '../../../components/fields/DatePickerField'
import TextAreaField from '../../../components/fields/TextAreaField'
import { CallFormModel, CallResult, CallType } from '../../../models/crm/CallModels'
import InputField from '../../../components/fields/InputField'
import { RefOptionsField } from '../../../components/fields/RefOptionsField'
import { getCallResultOptions } from '../../../utils/Helpers'

type Props = {
  handleChange: (e: any) => void
  model: CallFormModel
  errors: any
}
const CallForm = ({ model, handleChange, errors }: Props) => {

  const showRecallTiemField = () => {
    return model.result && model.result !== CallResult.POSITIVE
      && model.result !== CallResult.WRONG_NUMBER && model.result !== CallResult.NEGATIVE
  }

  return <CForm className="row g-3 needs-validation">
    <CCol md={6} className="pe-3">
      <div className="mb-3">
        <InputField label={'SN'} fieldName={''} handleChange={() => {
        }} disabled={true} value={model.contractRegCode} />
      </div>

      <div className="mb-3">
        <DatePickerField
          label={'Дата-время звонка'}
          fieldName={'callTime'}
          handleChange={handleChange}
          value={model.callTime}
          error={errors.callTime}
          timepicker={true}
        />
      </div>

      <div className="mb-3">
        <InputField
          label={'Тел. номер'}
          fieldName={'phoneNumber'}
          handleChange={handleChange}
          value={model.phoneNumber}
          error={errors.phoneNumber}
        />
      </div>

      <div className="mb-3">
        <TextAreaField
          label={'Примечание'}
          fieldName="note"
          value={model.note}
          handleChange={handleChange}
          error={errors.note}
        />
      </div>
    </CCol>
    <CCol md={6}>
      <div className="mb-3">
        <InputField
          label={'Тип звонка'}
          fieldName={''}
          handleChange={() => {
          }}
          disabled={true}
          value={model.type === CallType.AFTER_SALE ? 'После продажи' : 'UNKNOWN'}
        />
      </div>

      <div className="mb-3">
        <RefOptionsField
          label={'Результат'}
          options={getCallResultOptions()}
          handleChange={handleChange}
          fieldName={'result'}
          value={model.result}
          error={errors.result}
        />
      </div>

      {showRecallTiemField() && <div className="mb-3">
        <DatePickerField
          label={'Дата-время перезвона'}
          fieldName={'recallTime'}
          handleChange={handleChange}
          value={model.recallTime}
          error={errors.recallTime}
          timepicker={true}
        />
      </div>}
    </CCol>
  </CForm>
}

export default CallForm