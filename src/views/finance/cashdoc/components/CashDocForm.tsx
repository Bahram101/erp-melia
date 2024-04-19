import { CCol, CForm } from '@coreui/react-pro'
import { CashDocFormModel } from '../../../../models/finance/FinModels'
import { DefaultPostRefModel, Doctype, RefOptionsModel } from '../../../../models/CommonModels'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'
import TextAreaField from '../../../../components/fields/TextAreaField'
import { DatePickerField } from '../../../../components/fields/DatePickerField'
import CashDocItemForm from './CashDocItemForm'
import CurrencyField from '../../../../components/fields/CurrencyField'
import CurrPostsField from '../../../../components/fields/CurrPostsField'

interface Props {
  model: CashDocFormModel
  errors: any
  branchoptions: RefOptionsModel[]
  cashOptions: RefOptionsModel[]
  handleChange: (e: any) => void
  handleItemChange: (e: any, index: number) => void
  addItemRow: () => void
  deleteItemRow: (index: number) => void
  expenseItemOptions: RefOptionsModel[]
}

const CashDocForm = ({
                       model,
                       errors,
                       cashOptions,
                       branchoptions,
                       handleChange,
                       handleItemChange,
                       addItemRow,
                       deleteItemRow,
                       expenseItemOptions,
                     }: Props) => {

  const hasItemDoc = () => {
    return model.doctype !== Doctype.CASH_DOC_MOVE_OUT
      && model.doctype !== Doctype.CASH_DOC_PREPAYMENT_OUT
      && model.doctype !== Doctype.CASH_DOC_SALARY_OUT
  }

  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={5} className="pe-3">
        <div className="mb-3">
          <RefOptionsField
            label={'Филиал'}
            fieldName={'branchId'}
            error={errors.branchId}
            options={branchoptions}
            value={model.branchId}
            handleChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <RefOptionsField
            label={'Из кассы'}
            fieldName={'fromCashId'}
            error={errors.fromCashId}
            options={cashOptions}
            value={model.fromCashId}
            handleChange={handleChange}
          />
        </div>

        {model.doctype === Doctype.CASH_DOC_MOVE_OUT && <div className="mb-3">
          <RefOptionsField
            label={'На кассу'}
            fieldName={'toCashId'}
            error={errors.toCashId}
            options={cashOptions}
            value={model.toCashId}
            handleChange={handleChange}
          />
        </div>}

        <div className="mb-3">
          <DatePickerField
            label={'Дата документа'}
            fieldName={'docDate'}
            error={errors.docDate}
            value={model.docDate || ''}
            handleChange={handleChange}
          />
        </div>

        {model.doctype === Doctype.CASH_DOC_MOVE_OUT && <div className="mb-3">
          <CurrencyField
            label={'Сумма'}
            value={model.amount}
            error={errors.amount}
            fieldName={'amount'}
            handleChange={handleChange} />
        </div>}

        <TextAreaField
          label={'Примечание'}
          fieldName="note"
          value={model.note}
          handleChange={handleChange}
          error={errors.note}
        />
      </CCol>
      <CCol md={7}>
        {hasItemDoc() && <CashDocItemForm
          errors={errors}
          expenseItemOptions={expenseItemOptions}
          handleItemChange={handleItemChange}
          addItemRow={addItemRow}
          deleteItemRow={deleteItemRow}
          items={model.items || []}
        />}

        {(model.doctype === Doctype.CASH_DOC_PREPAYMENT_OUT || model.doctype === Doctype.CASH_DOC_SALARY_OUT) && <CurrPostsField
          label={'Сотрудник'}
          fieldName={'responsible'}
          handleChange={handleChange}
          value={model.responsible}
          error={errors.responsible}
        />}

        {(model.doctype === Doctype.CASH_DOC_PREPAYMENT_OUT || model.doctype === Doctype.CASH_DOC_SALARY_OUT) && <CurrencyField
          label={'Сумма'}
          fieldName={'amount'}
          handleChange={handleChange}
          value={model.amount}
          error={errors.amount}
        />}
      </CCol>
    </CForm>
  )
}

export default CashDocForm
