import { GiftFormModel } from '../../../../models/reference/RefModels'
import { RefOptionsModel } from '../../../../models/CommonModels'
import { CForm } from '@coreui/react-pro'
import InputField from '../../../../components/fields/InputField'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'
import CurrencyField from '../../../../components/fields/CurrencyField'

type Props = {
  model: GiftFormModel
  goodsOptions: RefOptionsModel[]
  handleChange: (e: any) => void
  errors: any
}
const RefGiftForm = ({ model, goodsOptions, handleChange, errors }: Props) => {

  return <>
    <CForm>
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
          label={'Товар'}
          options={goodsOptions}
          handleChange={handleChange}
          fieldName={'goodsId'}
          value={model.goodsId}
          error={errors.goodsId}
        />
      </div>
      <div className="mb-3">
        <CurrencyField
          label={'Цена (оплачивает дилер)'}
          fieldName={'price'}
          handleChange={handleChange}
          value={model.price}
          error={errors.price}
        />
      </div>
    </CForm>
  </>
}

export default RefGiftForm