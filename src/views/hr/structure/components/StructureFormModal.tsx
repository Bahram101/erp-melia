import React from 'react'
import {
  CCol,
  CForm,
} from '@coreui/react-pro'
import CurrPostsField from 'components/fields/CurrPostsField'
import InputField from 'components/fields/InputField'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import { getMonthOptions, getYearOptions } from 'utils/Helpers'
import { CompanyStructureFormModel } from 'models/hr/HrModels'
import FormModal from '../../../../components/FormModal'

type Props = {
  visible: boolean
  onClose: () => void
  handleSubmit: (data: any) => void
  saving: boolean
  handleChange: (p: any) => void
  model: CompanyStructureFormModel | undefined
  errors: any
}

const StructureFormModal = ({
  visible,
  onClose,
  handleSubmit,
  handleChange,
  saving,
  model,
  errors,
}: Props) => {

  return <FormModal
    visibleFormModal={visible}
    onClose={onClose}
    title={'Структура / Добавление'}
    handleSubmit={handleSubmit}
    saving={saving}
  >
    <CForm
      className="row g-3 needs-validation"
      validated={errors && Object.keys(errors).length > 0}
    >
      {!model?.parentId && <>
        <CCol md={6}>
          <RefOptionsField
            label={'Год'}
            fieldName={'year'}
            options={getYearOptions()}
            value={model?.year}
            handleChange={handleChange}
          />
        </CCol>
        <CCol md={6}>
          <RefOptionsField
            label={'Месяц'}
            fieldName={'month'}
            options={getMonthOptions()}
            value={model?.month}
            handleChange={handleChange}
          />
        </CCol>
      </>}
      <CCol md={12}>
        <InputField
          label={'Название ветки'}
          fieldName={'title'}
          handleChange={handleChange}
          value={model?.title || ''}
          error={errors.title}
        />
      </CCol>
      <CCol md={12}>
        <CurrPostsField
          label={'Сотрудник'}
          fieldName={'post'}
          handleChange={handleChange}
          value={model?.post}
          error={errors.post}
        />
      </CCol>
    </CForm>
  </FormModal>
}

export default StructureFormModal
