import { CCol, CForm } from '@coreui/react-pro'
import { DatePickerField } from 'components/fields/DatePickerField'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import TextAreaField from 'components/fields/TextAreaField'
import { Doctype, RefOptionsModel } from 'models/CommonModels'
import { WhouseDocFormModel } from 'models/whouse/whouseModels'
import WhouseDocsItemForm from './WhouseDocItemForm'

interface Props {
  model: WhouseDocFormModel
  errors: any
  whouseOptions: RefOptionsModel[]
  supplierOptions: RefOptionsModel[]
  goodsOptions: RefOptionsModel[]
  hasSerialGoodsIds: string[]
  handleChange: (e: any) => void
  handleItemChange: (e: any, index: number) => void
  addItemRow: () => void
  deleteItemRow: (index: number) => void
  showSnFormModal: (index: number, serialNumbers: string[]) => void
}

const WhouseDocForm = ({
                         model,
                         errors,
                         whouseOptions,
                         supplierOptions,
                         goodsOptions,
                         hasSerialGoodsIds,
                         handleChange,
                         handleItemChange,
                         addItemRow,
                         deleteItemRow,
                         showSnFormModal,
                       }: Props) => {
  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={4} className="pe-3">
        {model.doctype === Doctype.SUPPLY && (
          <>
            <div className="mb-3">
              <RefOptionsField
                label={'На склад'}
                fieldName={'toWhouseId'}
                error={errors.toWhouseId}
                options={whouseOptions}
                value={model.toWhouseId}
                handleChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <RefOptionsField
                label={'Поставщик'}
                fieldName={'customerId'}
                error={errors.customerId}
                options={supplierOptions}
                value={model.customerId}
                handleChange={handleChange}
              />
            </div>
          </>
        )}
        {model.doctype === Doctype.MOVE_OUT || model.doctype === Doctype.MOVE_IN ? (
          <>
            <div className="mb-3">
              <RefOptionsField
                label={'Со склада'}
                fieldName={'fromWhouseId'}
                error={errors.fromWhouseId}
                options={whouseOptions}
                value={model.fromWhouseId}
                handleChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <RefOptionsField
                label={'На склад'}
                fieldName={'toWhouseId'}
                error={errors.toWhouseId}
                options={whouseOptions}
                value={model.toWhouseId}
                handleChange={handleChange}
              />
            </div>
          </>
        ) : (
          ''
        )}
        {model.doctype === Doctype.RETURN && (
          <>
            <div className="mb-3">
              <RefOptionsField
                label={'На склад'}
                fieldName={'toWhouseId'}
                error={errors.toWhouseId}
                options={whouseOptions}
                value={model.toWhouseId}
                handleChange={handleChange}
              />
            </div>
            <TextAreaField
              label={'Род. документ'}
              fieldName="note"
              value={model.note}
              handleChange={handleChange}
              error={errors.note}
            />
          </>
        )}
        {model.doctype === Doctype.WRITEOFF_LOST && (
          <>
            <div className="mb-3">
              <RefOptionsField
                label={'Со склада'}
                fieldName={'fromWhouseId'}
                error={errors.fromWhouseId}
                options={whouseOptions}
                value={model.fromWhouseId}
                handleChange={handleChange}
              />
            </div>
          </>
        )}
        <div className="mb-3">
          <DatePickerField
            label={'Дата документа'}
            fieldName={'docDate'}
            error={errors.docDate}
            value={model.docDate}
            handleChange={handleChange}
          />
        </div>
        <TextAreaField
          label={'Примечание'}
          fieldName="note"
          value={model.note}
          handleChange={handleChange}
          error={errors.note}
        />
      </CCol>
      <CCol md={8} className="goodsOptionsForm ">
      <WhouseDocsItemForm
        model={model}
        errors={errors}
        goodsOptions={goodsOptions || []}
        hasSerialGoodsIds={hasSerialGoodsIds}
        handleItemChange={handleItemChange}
        addItemRow={addItemRow}
        deleteItemRow={deleteItemRow}
        showSnFormModal={showSnFormModal}
      />
      </CCol>
    </CForm>
  )
}

export default WhouseDocForm
