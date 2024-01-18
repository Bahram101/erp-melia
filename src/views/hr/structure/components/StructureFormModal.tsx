import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react-pro'
import CurrPostsField from 'components/fields/CurrPostsField'
import InputField from 'components/fields/InputField'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import { months, years } from 'utils/Helpers'
import { CompanyStructureFormModel } from 'models/hr/HrModels'
import { DefaultPostRefModel, PostRefModel } from 'models/CommonModels'

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
  const [post, setPost] = useState<PostRefModel>(DefaultPostRefModel)

  useEffect(() => {
    if (model?.post) {
      setPost(model.post)
    }
  }, [model?.post])

  return (
    <>
      <CModal alignment="center" visible={visible} onClose={onClose}>
        <CModalHeader>
          <CModalTitle>Структура / Добавление</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {saving ? (
            <CSpinner color="primary" />
          ) : (
            <CForm
              className="row g-3 needs-validation"
              validated={errors && Object.keys(errors).length > 0}
            >
              <CCol md={6}>
                <RefOptionsField
                  label={'Год'}
                  fieldName={'year'}
                  options={years}
                  value={model?.year}
                  handleChange={handleChange}
                />
              </CCol>
              <CCol md={6}>
                <RefOptionsField
                  label={'Месяц'}
                  fieldName={'month'}
                  options={months}
                  value={model?.month}
                  handleChange={handleChange}
                />
              </CCol>
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
                  value={post}
                />
              </CCol>
            </CForm>
          )}
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
