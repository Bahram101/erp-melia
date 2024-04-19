import { GoodsFormModel } from '../../../../models/reference/RefModels'
import { CCol, CRow } from '@coreui/react-pro'
import InputField from '../../../../components/fields/InputField'
import YesNoOptionsField from '../../../../components/fields/YesNoOptionsField'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'
import { RefOptionsModel } from '../../../../models/CommonModels'

type Props = {
  model: GoodsFormModel
  errors: any
  handleChange: (e: any) => void
  groupOptions: RefOptionsModel[]
}
const RefGoodsForm = ({ model, handleChange, errors, groupOptions }: Props) => {

  return <CRow>
    <CCol>
      <div className="mb-3">
        <InputField
          label={'Название'}
          fieldName={'name'}
          handleChange={handleChange}
          value={model.name}
          error={errors.name}
        />
      </div>
      <div className="mb-3">
        <InputField
          label={'Код'}
          fieldName={'code'}
          handleChange={handleChange}
          value={model.code}
          error={errors.code}
        />
      </div>
      <div className="mb-3">
        <YesNoOptionsField
          label={'Имеет сер. номер'}
          fieldName={'hasSerialNumber'}
          handleChange={handleChange}
          value={model.hasSerialNumber}
          error={errors.hasSerialNumber}
        />
      </div>
      <div className="mb-3">
        <InputField
          label={'Единица измерения'}
          fieldName={'measure'}
          handleChange={handleChange}
          value={model.measure}
          error={errors.measure}
        />
      </div>
      <div className="mb-3">
        <RefOptionsField
          label={'Группа'}
          options={groupOptions}
          handleChange={handleChange}
          fieldName={'groupId'}
          value={model.groupId}
          error={errors.groupId}
        />
      </div>
    </CCol>
  </CRow>
}

export default RefGoodsForm