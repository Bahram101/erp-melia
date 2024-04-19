import { CashFormModel } from '../../../../models/reference/RefModels'
import { RefOptionsModel } from '../../../../models/CommonModels'
import { CCol, CForm, CRow } from '@coreui/react-pro'
import InputField from '../../../../components/fields/InputField'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'
import ActionButtonContent, { ActionButtonType } from '../../../../components/button/ActionButtonContent'

type Props = {
  model: CashFormModel
  branchOptions: RefOptionsModel[]
  bankOptions: RefOptionsModel[]
  handleChange: (e: any) => void
  errors: any
  addBranchIdsRow: () => void
  removeBranchIdsRow: (index: number) => void
  handleBranchIdsChange: (idx: number, value: string | null) => void
}
const RefCashForm = ({
                       model,
                       branchOptions,
                       handleChange,
                       errors,
                       bankOptions,
                       addBranchIdsRow,
                       removeBranchIdsRow,
                       handleBranchIdsChange,
                     }: Props) => {

  return <>
    <CForm>
      <CRow>
        <CCol>
          <div className="mb-3">
            <InputField
              label={'Название'}
              value={model.name}
              fieldName={'name'}
              handleChange={handleChange}
              error={errors.name}
            />
          </div>
          <div className="mb-3">
            <RefOptionsField
              label={'Тип'}
              options={[
                {
                  id: 'CASH',
                  label: 'Касса',
                },
                {
                  id: 'BANK_ACCOUNT',
                  label: 'Банковский счет',
                },
              ]}
              handleChange={handleChange}
              fieldName={'type'}
              value={model.type}
              error={errors.type}
            />
          </div>
          <div className="mb-3">
            <RefOptionsField
              label={'Банк'}
              options={bankOptions}
              handleChange={handleChange}
              fieldName={'bankId'}
              value={model.bankId}
              error={errors.bankId}
            />
          </div>

          <div className="mb-3">
            <RefOptionsField
              label={'Валюта'}
              options={[
                {
                  id: 'KZT',
                  label: 'Теңге',
                },
                {
                  id: 'USD',
                  label: 'Dollar',
                },
              ]}
              handleChange={handleChange}
              fieldName={'currency'}
              value={model.currency}
              error={errors.currency}
            />
          </div>
        </CCol>

        <CCol>
          <h6>Филиалы</h6>
          <table style={{ width: '100%' }}>
            <tr>
              <td></td>
              <td>
                <div className={'float-end'}>
                  <ActionButtonContent
                    type={ActionButtonType.ADD}
                    onClick={addBranchIdsRow}
                  />
                </div>
              </td>
            </tr>
            {model.branchIds.map((brId, idx) => {
              return <tr>
                <td>
                  <RefOptionsField
                    options={branchOptions}
                    handleChange={(e) => handleBranchIdsChange(idx, e.target.value)}
                    fieldName={'branchIds'}
                    error={''}
                    value={brId}
                  />
                </td>
                <td>
                  <div className={'float-end'}>
                    <ActionButtonContent
                      onClick={() => removeBranchIdsRow(idx)}
                      type={ActionButtonType.DELETE}
                    />
                  </div>
                </td>
              </tr>
            })}
          </table>
        </CCol>
      </CRow>
    </CForm>
  </>
}

export default RefCashForm