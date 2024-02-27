import { CButton, CCol, CForm, CRow } from '@coreui/react-pro'
import { FaTrash } from 'react-icons/fa'
import { SaleBonusFormModel } from '../../../../models/marketing/MrkModels'
import { RefOptionsModel } from '../../../../models/CommonModels'
import InputField from '../../../../components/fields/InputField'
import CurrencyField from '../../../../components/fields/CurrencyField'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'
import { getMonthOptions, getYearOptions } from '../../../../utils/Helpers'

type Props = {
  model: SaleBonusFormModel
  errors: any
  handleChange: (e: any) => void
  positionOptions: RefOptionsModel[]
  addConfigRow: () => void
  handleConfigRowChange: (idx: number, e: any) => void
  deleteConfigRow: (idx: number) => void
  branchOptions: RefOptionsModel[]
  productOptions: RefOptionsModel[]
}
const SaleBonusForm = ({
                         model,
                         errors,
                         handleChange,
                         positionOptions,
                         addConfigRow,
                         handleConfigRowChange,
                         deleteConfigRow,
                         branchOptions,
                         productOptions,
                       }: Props) => {
  return <CForm className="row g-3 needs-validation">
    <CRow>
      <CCol lg={5} md={5}>
        <CRow>
          <RefOptionsField
            label={'Год'}
            options={getYearOptions()}
            handleChange={handleChange}
            fieldName={'year'}
            error={errors.year}
            value={model.year}
          />
        </CRow>
        <CRow>
          <RefOptionsField
            label={'Месяц'}
            options={getMonthOptions()}
            handleChange={handleChange}
            fieldName={'month'}
            error={errors.month}
            value={model.month}
          />
        </CRow>
        <CRow>
          <RefOptionsField
            label={'Филиал'}
            options={branchOptions}
            handleChange={handleChange}
            fieldName={'branchId'}
            error={errors.branchId}
            value={model.branchId}
          />
        </CRow>

        <CRow>
          <RefOptionsField
            label={'Продукт'}
            options={productOptions}
            handleChange={handleChange}
            fieldName={'productId'}
            error={errors.productId}
            value={model.productId}
          />
        </CRow>

        <CRow>
          <RefOptionsField
            label={'Должность'}
            options={positionOptions}
            handleChange={handleChange}
            fieldName={'positionId'}
            error={errors.positionId}
            value={model.positionId}
          />
        </CRow>
      </CCol>

      <CCol lg={1} md={1}></CCol>
      <CCol lg={5} md={6}>
        {errors.configs && <div className={'invalid-feedback'} style={{ display: 'block' }}>{errors.configs}</div>}
        <table className={'table'}>
          <tbody>
          <tr>
            <td>
              <h6>Бонусы</h6>
            </td>
            <td></td>
            <td></td>
            <td>
              <CButton onClick={addConfigRow} className={'float-end btn-primary'} color={'primary'}>
                Добавить
              </CButton>
            </td>
          </tr>
          {model.configs.map((config, idx) => <tr key={idx}>
            <td>
              <InputField
                type={'number'}
                label={'Количество С'}
                fieldName={'fromCount'}
                handleChange={(e: any) => handleConfigRowChange(idx, e)}
                value={config.fromCount === null ? '' : config.fromCount}
                error={errors[`configs[${idx}].fromCount`]}
              />
            </td>
            <td>
              <InputField
                type={'number'}
                label={'Количество По'}
                fieldName={'toCount'}
                handleChange={(e: any) => handleConfigRowChange(idx, e)}
                value={config.toCount === null ? '' : config.toCount}
                error={errors[`configs[${idx}].toCount`]}
              />
            </td>
            <td>
              <CurrencyField
                label={'Сумма'}
                fieldName={'amount'}
                handleChange={(e: any) => handleConfigRowChange(idx, e)}
                value={config.amount}
                error={errors[`configs[${idx}].amount`]}
              />
            </td>
            <td>
              <CButton
                style={{ marginTop: '35px' }}
                color="danger"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => deleteConfigRow(idx)}
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

export default SaleBonusForm