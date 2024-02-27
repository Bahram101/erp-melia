import { CustomFieldProps } from '../../models/customField/CustomFieldProps'
import { ContractRefModel, DefaultContractRefModel, RefOptionsModel } from '../../models/CommonModels'
import { useEffect, useState } from 'react'
import { RefOptionsField } from './RefOptionsField'
import { CButton, CFormLabel, CInputGroup, CSpinner } from '@coreui/react-pro'
import InputField from './InputField'
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useContractRefQuery } from '../../hooks/marketing/marketingQueries'
import { AxiosError } from 'axios'

interface Props extends CustomFieldProps {
  branchOptions: RefOptionsModel[];
  value: ContractRefModel;
}

const RefContractField = ({ branchOptions, value, label, handleChange, fieldName }: Props) => {
  const [model, setModel] = useState<ContractRefModel>(DefaultContractRefModel)
  const [error, setError] = useState<any>()
  const [searching, setSearching] = useState<boolean>(false)
  const contractRefSearchQuery = useContractRefQuery(model.branchId, model.regNumber, false)

  useEffect(() => {
    setModel(value)
  }, [value])

  useEffect(() => {
    //console.log('asdsadasdsa', contractRefSearchQuery.error)
    //console.log('isErr', contractRefSearchQuery.isError)
    if (contractRefSearchQuery.error && contractRefSearchQuery.error instanceof AxiosError) {
      if ((contractRefSearchQuery.error as AxiosError)?.response?.status === 404) {
        setError('Договор не найден')
      }
    }
  }, [contractRefSearchQuery.error])

  const localHandleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
  }

  const searchContract = () => {
    if (!model.branchId) {
      setError('Выберите значения всех полей')
      return
    }

    if (!model.regNumber) {
      setError('Выберите значения всех полей')
      return
    }

    setError(null)
    setSearching(true)
    contractRefSearchQuery.refetch()
      .then(({ data }) => {
        if (data) {
          handleChange({
            target: {
              name: fieldName,
              value: data,
            },
          })
        }
      })
      .finally(() => setSearching(false))
  }

  return <>
    {label && <CFormLabel>{label}</CFormLabel>}
    <CInputGroup className="mb-3">
      <RefOptionsField
        options={branchOptions}
        handleChange={localHandleChange}
        fieldName={'branchId'}
        optionLabel={'Филиал'}
        value={model.branchId}
      />

      <InputField
        fieldName={'regNumber'}
        handleChange={localHandleChange}
        placeholder={'Рег. номер'}
        value={model.regNumber}
      />

      <CButton
        onClick={searchContract}
        color={'success'}
        disabled={searching}
        size="sm">
        {searching ? <CSpinner component="span" size="sm" aria-hidden="true" />
          : <CIcon style={{ color: '#ffffff' }} icon={cilSearch} />
        }

      </CButton>
    </CInputGroup>
    {error && error.length > 0 && <div style={{fontSize: '14px', color: 'red', marginTop: '-15px'}}>{error}</div>}
  </>
}

export default RefContractField
