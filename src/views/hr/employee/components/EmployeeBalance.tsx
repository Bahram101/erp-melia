import {
  CBadge,
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { useState } from 'react'
import { toast } from 'react-toastify'
import FormModal from 'components/FormModal'
import { DatePickerField } from 'components/fields/DatePickerField'
import { useFinCustomerDepsMutation } from 'hooks/finance/financeQueries'
import { useCashOptionsQuery } from 'hooks/reference/refOptionsQueries'
import { useCustomerBalanceQuery } from 'hooks/report/reportQueries'
import { CustomerDeptFormModel, DefaultCustomerDeptFormModel } from 'models/finance/FinModels'
import { CustomerBalance } from 'models/report/reportModels'
import { parseResponseFormErrors } from 'utils/ErrorUtil'
import BalanceForm from 'views/hr/components/BalanceForm'
import { formatMoney } from 'utils/UtilFuncs'

type Props = {
  customerId: string | undefined
  employeeInfo: { firstname: string; lastname: string }
}

const EmployeeBalance = ({ customerId, employeeInfo }: Props) => {
  const [errors, setErrors] = useState<any>({})
  const [searchParams, setSearchParams] = useState<{
    dateFrom: string | null
    dateTo: string | null
  }>({
    dateFrom: null,
    dateTo: null,
  })

  const [visibleFormModal, setVisibleFormModal] = useState<boolean>(false) 
  const [model, setModel] = useState<CustomerDeptFormModel>(DefaultCustomerDeptFormModel)

  const balancesQuery = useCustomerBalanceQuery(customerId, searchParams)
  const chashOptionsQuery = useCashOptionsQuery(true)
  const saveMutation = useFinCustomerDepsMutation()

  const onChangeSearchParams = (e: any) => {
    const { name, value } = e.target
    setSearchParams({ ...searchParams, [name]: value })
  }
  const onChangeForm = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
  }

  const loadData = () => {
    balancesQuery.refetch()
  }

  const handleSubmit = () => {
    saveMutation
      .mutateAsync({
        form: { ...model, customerId },
      })
      .then(() => {
        setModel(DefaultCustomerDeptFormModel)
        setVisibleFormModal(false)
      })
      .catch((error: any) => {
        setErrors(parseResponseFormErrors(error))
        if (error?.response?.data?.message !== null) {
          toast.error(error.response.data.message)
        }
      })
  }

  const toCreate = () => {
    setVisibleFormModal(true)
  }

  return (
    <>
      <FormModal
        title={`Оплата долга сотрудника (контрагента) ${employeeInfo.lastname} ${employeeInfo.firstname}`}
        visibleFormModal={visibleFormModal}
        onClose={() => setVisibleFormModal(false)}
        handleSubmit={handleSubmit}
        saving={balancesQuery.isFetching}
      >
        <BalanceForm
          cashOptions={chashOptionsQuery.data || []}
          handleChange={onChangeForm}
          model={model}
          errors={errors}
        />
      </FormModal>
      <CRow className="mb-3">
        <CCol md={3}>
          <DatePickerField
            label={'Дата c'}
            placeholder="Дата c"
            fieldName={'dateFrom'}
            handleChange={onChangeSearchParams}
          />
        </CCol>
        <CCol md={3}>
          <DatePickerField
            label={'Дата по'}
            placeholder="Дата по"
            fieldName={'dateTo'}
            handleChange={onChangeSearchParams}
          />
        </CCol>
        <CCol md={4}>
          <br />
          <CButton
            className="me-3"
            style={{ marginTop: '10px' }}
            color={'dark'}
            onClick={loadData}
            disabled={balancesQuery.isFetching}
          >
            {balancesQuery.isFetching ? 'Ждите...' : 'Сформировать'}
          </CButton>
          <CButton style={{ marginTop: '10px' }} color={'primary'} onClick={toCreate}>
            Оплатить долг
          </CButton>
        </CCol>
      </CRow>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">No</CTableHeaderCell>
            <CTableHeaderCell scope="col">Дата</CTableHeaderCell>
            <CTableHeaderCell scope="col">Тип</CTableHeaderCell>
            <CTableHeaderCell scope="col">Действие</CTableHeaderCell>
            <CTableHeaderCell scope="col">Вход</CTableHeaderCell>
            <CTableHeaderCell scope="col">Расход</CTableHeaderCell>
            <CTableHeaderCell scope="col">Баланс</CTableHeaderCell>
            <CTableHeaderCell scope="col">Прим.</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {balancesQuery.data?.map((balance: CustomerBalance, index: number) => (
            <CTableRow key={balance.id}>
              <CTableDataCell>{index + 1}</CTableDataCell>
              <CTableDataCell>{balance.docDate}</CTableDataCell>
              <CTableDataCell>{balance.doctypeName}</CTableDataCell>
              <CTableDataCell>{balance.actionName}</CTableDataCell>
              <CTableDataCell>
                <CBadge color="success">{formatMoney(balance.inAmount)}</CBadge>
              </CTableDataCell>
              <CTableDataCell>
                <CBadge color="danger">{formatMoney(balance.outAmount)}</CBadge>
              </CTableDataCell>
              <CTableDataCell>{formatMoney(balance.balance)}</CTableDataCell>
              <CTableDataCell>{balance.note}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default EmployeeBalance
