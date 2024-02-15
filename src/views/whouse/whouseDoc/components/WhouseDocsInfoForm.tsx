import { CCol, CForm, CInputGroup } from '@coreui/react-pro'
import { DatePickerField } from 'components/fields/DatePickerField'
import InputField from 'components/fields/InputField'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import TextAreaField from 'components/fields/TextAreaField'
import { RefOptionsModel } from 'models/CommonModels'
import { WhouseDocFormModel } from 'models/whouse/whouseModels'
import React from 'react'
import { DocStatuses, DoctypesTitles } from 'utils/Helpers'

interface Props {
  model: WhouseDocFormModel
  doctype: string | undefined
  whouseList: RefOptionsModel[] | undefined
  supplierList: RefOptionsModel[] | undefined
  handleChange: (e: any, index: any) => void
}

const WhouseDocsInfoForm = ({ model, doctype, whouseList, supplierList, handleChange }: Props) => {
  console.log('doctype', doctype)

  return (
    <CCol md={4} className="pe-3">
      <div className="mb-3">
        <InputField
          label={'Тип документа'}
          fieldName={'doctype'}
          error={''}
          disabled
          value={doctype && DoctypesTitles[doctype]}
          handleChange={() => {}}
        />
      </div>
      <div className="mb-3">
        <InputField
          label={'Статус документа'}
          fieldName={'status'}
          error={''}
          disabled
          value={DocStatuses[model.status]}
          handleChange={() => {}}
        />
      </div>
      <div className="mb-3">
        <DatePickerField
          label={'Дата документа'}
          fieldName={'docDate'}
          error={''}
          value={model.docDate}
          handleChange={(e: any) => handleChange(e, false)}
        />
      </div>
      {doctype === 'supplies' && (
        <>
          <div className="mb-3">
            <RefOptionsField
              label={'На склад'}
              fieldName={'toWhouseId'}
              error={''}
              options={whouseList || []}
              value={model.toWhouseId}
              handleChange={(e: any) => handleChange(e, false)}
            />
          </div>
          <div className="mb-3">
            <RefOptionsField
              label={'Поставщик'}
              fieldName={'customerId'}
              error={''}
              options={supplierList || []}
              value={model.customerId}
              handleChange={(e: any) => handleChange(e, false)}
            />
          </div>
          <TextAreaField
            label={'Примечание'}
            fieldName="note"
            value={model.note}
            handleChange={(e: any) => handleChange(e, false)}
          />
        </>
      )}
      {doctype === 'move-outs' || (
        <>
          <div className="mb-3">
            <RefOptionsField
              label={'Со склада'}
              fieldName={'fromWhouseId'}
              error={''}
              options={whouseList || []}
              value={model.fromWhouseId}
              handleChange={(e: any) => handleChange(e, false)}
            />
          </div>
          <div className="mb-3">
            <RefOptionsField
              label={'На склад'}
              fieldName={'toWhouseId'}
              error={''}
              options={whouseList || []}
              value={model.toWhouseId}
              handleChange={(e: any) => handleChange(e, false)}
            />
          </div>
          <TextAreaField
            label={'Примечание'}
            fieldName="note"
            value={model.note}
            handleChange={(e: any) => handleChange(e, false)}
          />
        </>
      )}
      {doctype === 'move-ins' || (
        <>
          <div className="mb-3">
            <RefOptionsField
              label={'Со склада'}
              fieldName={'fromWhouseId'}
              error={''}
              options={whouseList || []}
              value={model.fromWhouseId}
              handleChange={(e: any) => handleChange(e, false)}
            />
          </div>
          <div className="mb-3">
            <RefOptionsField
              label={'На склад'}
              fieldName={'toWhouseId'}
              error={''}
              options={whouseList || []}
              value={model.toWhouseId}
              handleChange={(e: any) => handleChange(e, false)}
            />
          </div>
          <TextAreaField
            label={'Примечание'}
            fieldName="note"
            value={model.note}
            handleChange={(e: any) => handleChange(e, false)}
          />
        </>
      )}
      {doctype === 'returns' && (
        <>
          <div className="mb-3">
            <RefOptionsField
              label={'На склад'}
              fieldName={'toWhouseId'}
              error={''}
              options={whouseList || []}
              value={model.toWhouseId}
              handleChange={(e: any) => handleChange(e, false)}
            />
          </div>
          <div className="mb-3">
            <InputField
              label={'Род. документ'}
              fieldName={'note'}
              error={''}
              disabled
              value={model.note}
              handleChange={() => {}}
            />
          </div>
          <TextAreaField
            label={'Примечание'}
            fieldName="note"
            value={model.note}
            handleChange={(e: any) => handleChange(e, false)}
          />
        </>
      )}
      {doctype === 'writeoff-losts' && (
        <>
          <div className="mb-3">
            <RefOptionsField
              label={'Со склада'}
              fieldName={'fromWhouseId'}
              error={''}
              options={whouseList || []}
              value={model.fromWhouseId}
              handleChange={(e: any) => handleChange(e, false)}
            />
          </div>
          <TextAreaField
            label={'Примечание'}
            fieldName="note"
            value={model.note}
            handleChange={(e: any) => handleChange(e, false)}
          />
        </>
      )}
    </CCol>
  )
}

export default WhouseDocsInfoForm
