import { CButton, CCol, CForm, CRow } from '@coreui/react-pro'
import { SaleTypeFormModel } from '../../../../models/marketing/MrkModels'
import InputField from '../../../../components/fields/InputField'
import CurrencyField from '../../../../components/fields/CurrencyField'
import { DatePickerField } from '../../../../components/fields/DatePickerField'
import YesNoOptionsField from '../../../../components/fields/YesNoOptionsField'
import { RefOptionsModel } from '../../../../models/CommonModels'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'
import { FaTrash } from 'react-icons/fa'

type Props = {
  model: SaleTypeFormModel
  errors: any
  handleChange: (e: any) => void
  bankOptions: RefOptionsModel[]
  positionOptions: RefOptionsModel[]
  addAwardRow: () => void
  handleAwardRowChange: (idx: number, e: any) => void
  deleteAwardRow: (idx: number) => void
}
const SaleTypeForm = ({
                        model,
                        errors,
                        handleChange,
                        bankOptions,
                        positionOptions,
                        addAwardRow,
                        handleAwardRowChange,
                        deleteAwardRow,
                      }: Props) => {
  return <CForm className="row g-3 needs-validation">
    <CRow>
      <CCol lg={5} md={5}>
        <CRow>
          <InputField
            label={'Название'}
            fieldName={'name'}
            handleChange={handleChange}
            error={errors.name}
            value={model.name}
          />
        </CRow>
        <CRow>
          <CurrencyField
            label={'Цена'}
            fieldName={'price'}
            handleChange={handleChange}
            value={model.price}
            error={errors.price}
          />
        </CRow>
        <CRow>
          <CurrencyField
            label={'Первоначальный взнос'}
            fieldName={'firstPayment'}
            handleChange={handleChange}
            value={model.firstPayment}
            error={errors.firstPayment}
          />
        </CRow>

        <CRow>
          <CurrencyField
            label={'Минимальный первоначальный взнос'}
            fieldName={'minFirstPayment'}
            handleChange={handleChange}
            value={model.minFirstPayment}
            error={errors.minFirstPayment}
          />
        </CRow>

        <CRow>
          <CurrencyField
            label={'Минимальная сумма для премии'}
            fieldName={'minPaymentAmount'}
            handleChange={handleChange}
            value={model.minPaymentAmount}
            error={errors.minPaymentAmount}
          />
        </CRow>

        <CRow>
          <CurrencyField
            label={'Минимальная сумма для премии дилера'}
            fieldName={'minDealerPaymentAmount'}
            handleChange={handleChange}
            value={model.minDealerPaymentAmount}
            error={errors.minDealerPaymentAmount}
          />
        </CRow>

        <CRow>
          <InputField
            type={'number'}
            label={'Количество месяцев'}
            fieldName={'monthCount'}
            handleChange={handleChange}
            value={model.monthCount}
            error={errors.monthCount}
          />
        </CRow>

        <CRow>
          <DatePickerField
            label={'Дата С'}
            fieldName={'fromDate'}
            handleChange={handleChange}
            value={model.fromDate}
            error={errors.fromDate}
          />
        </CRow>

        <CRow>
          <DatePickerField
            label={'Дата по'}
            fieldName={'toDate'}
            handleChange={handleChange}
            value={model.toDate}
            error={errors.toDate}
          />
        </CRow>

        <CRow>
          <YesNoOptionsField
            label={'Продажа через банк'}
            fieldName={'saleViaBank'}
            handleChange={handleChange}
            value={model.saleViaBank}
            error={errors.saleViaBank}
          />
        </CRow>

        {model.saleViaBank && <CRow>
          <RefOptionsField
            label={'Банк'}
            options={bankOptions}
            handleChange={handleChange}
            fieldName={'bankId'}
            value={model.bankId}
            error={errors.bankId}
          />
        </CRow>}
      </CCol>

      <CCol lg={1} md={1}></CCol>
      <CCol lg={5} md={6}>
        <table className={'table'}>
          <tbody>
          <tr>
            <td>
              <h6>Премии</h6>
            </td>
            <td></td>
            <td>
              <CButton onClick={addAwardRow} className={'float-end btn-primary'} color={'primary'}>
                Добавить
              </CButton>
            </td>
          </tr>
          {model.awards.map((award, idx) => <tr key={idx}>
            <td>
              <RefOptionsField
                label={'Должность'}
                options={positionOptions}
                handleChange={(e: any) => handleAwardRowChange(idx, e)}
                fieldName={'positionId'}
                value={award.positionId}
                error={''}
              />
            </td>
            <td>
              <CurrencyField
                label={'Сумма'}
                fieldName={'amount'}
                handleChange={(e: any) => handleAwardRowChange(idx, e)}
                value={award.amount}
                error={''}
              />
            </td>
            <td>
              <CButton
                style={{ marginTop: '35px' }}
                color="danger"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => deleteAwardRow(idx)}
              >
                <FaTrash />
              </CButton>
            </td>
          </tr>)}
          </tbody>
        </table>
      </CCol>
    </CRow>
  </CForm>
}

export default SaleTypeForm