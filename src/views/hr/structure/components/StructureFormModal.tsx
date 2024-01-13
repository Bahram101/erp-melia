import React from 'react'
import {
  CButton,
  CCol,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import CurrPostsField from 'components/fields/CurrPostsField'
import InputField from 'components/fields/InputField'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import { months, years } from 'utils/Helpers'
import { CompanyStructureFormModel } from 'models/hr/HrModels'

type Props = {
  visible: boolean
  onClose: () => void
  handleSubmit: (data: any) => void
  saving: boolean
  handleChange: (p: any) => void
  model: CompanyStructureFormModel
}

const StructureFormModal = ({
  visible,
  onClose,
  handleSubmit,
  handleChange,
  saving,
  model,
}: Props) => {
  return (
    <>
      <CModal alignment="center" visible={visible} onClose={onClose}>
        <CModalHeader>
          <CModalTitle>Структура / Добавление</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            // validated={errors && Object.keys(errors).length > 0}
          >
            <CCol md={6}>
              <RefOptionsField
                label={'Год'}
                fieldName={'year'}
                options={years}
                value={model.year}
                handleChange={handleChange}
                // error={errors.toCashId}
              />
            </CCol>
            <CCol md={6}>
              <RefOptionsField
                label={'Месяц'}
                fieldName={'month'}
                options={months}
                value={model.month}
                handleChange={handleChange}
              />
            </CCol>
            <CCol md={12}>
              <InputField
                label={'Название ветки'}
                fieldName={'title'}
                handleChange={handleChange}
              />
            </CCol>
            <CCol md={12}>
              <CurrPostsField
                label={'Сотрудник'}
                fieldName={'postId'}
                handleChange={handleChange}
                // error={errors.fitter}
                // value={model.title }
              />
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Отмена
          </CButton>
          <CButton disabled={saving} color="primary" onClick={handleSubmit}>
            {saving ? 'Ждите...' : 'Сохранить'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default StructureFormModal
