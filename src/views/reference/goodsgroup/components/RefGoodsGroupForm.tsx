import { GoodsGroupFormModel } from '../../../../models/reference/RefModels'
import { CCol, CRow } from '@coreui/react-pro'
import InputField from '../../../../components/fields/InputField'
import TextAreaField from '../../../../components/fields/TextAreaField'

type Props = {
  model: GoodsGroupFormModel
  errors: any
  handleChange: (e: any) => void
}
const RefGoodsGroupForm = ({ model, handleChange, errors }: Props) => {

  return <CRow>
    <CCol>
      <InputField
        label={'Название'}
        fieldName={'name'}
        handleChange={handleChange}
        value={model.name}
        error={errors.name}
      />

      <TextAreaField
        label={'Описание'}
        fieldName={'description'}
        handleChange={handleChange}
        value={model.description}
        error={errors.description}
      />
    </CCol>
  </CRow>
}

export default RefGoodsGroupForm