import { ExpInItemFormModel } from '../../../../models/reference/RefModels'
import { CCol, CRow } from '@coreui/react-pro'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'
import InputField from '../../../../components/fields/InputField'
import YesNoOptionsField from '../../../../components/fields/YesNoOptionsField'

type Props = {
  model: ExpInItemFormModel
  errors: any
  handleChange: (e: any) => void
}
const RefExpInItemForm = ({ model, handleChange, errors }: Props) => {

  return <CRow>
    <CCol>
      <InputField
        label={'Название'}
        fieldName={'name'}
        handleChange={handleChange}
        value={model.name}
        error={errors.name}
      />
      <RefOptionsField
        label={'Тип'}
        options={[
          {
            id: 'OUT',
            label: 'Расход',
          },
          {
            id: 'IN',
            label: 'Приход',
          },
        ]}
        handleChange={handleChange}
        fieldName={'type'}
        value={model.type}
        error={errors.type}
      />

      <YesNoOptionsField
        label={'Системное'}
        fieldName={'system'}
        handleChange={handleChange}
        value={model.system}
        error={errors.system}
      />

      <YesNoOptionsField
        label={'Доступ только админам'}
        fieldName={'viewOnlyAdmin'}
        handleChange={handleChange}
        value={model.viewOnlyAdmin}
        error={errors.viewOnlyAdmin}
      />
    </CCol>
  </CRow>
}

export default RefExpInItemForm