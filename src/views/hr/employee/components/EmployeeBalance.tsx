import {
  CBadge,
  CButton,
  CCol,
  CRow,
  CTabPane,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import FormModal from 'components/FormModal'
import { DatePickerField } from 'components/fields/DatePickerField'
import { useCustomerBalanceQuery } from 'hooks/report/customerQueries'
import { CustomerBalance } from 'models/report/reportModels'
import { useState } from 'react'
import BalanceForm from 'views/hr/components/BalanceForm'

type Props = {
  customerId: string | undefined
  employeeInfo: { firstname: string; lastname: string }
}

const EmployeeBalance = ({ customerId, employeeInfo }: Props) => {
  const [errors, setErrors] = useState<any>({})
  const [customer, setCustomerId] = useState(customerId)
  const [searchParams, setSearchParams] = useState<{
    dateFrom: string | null
    dateTo: string | null
  }>({
    dateFrom: null,
    dateTo: null,
  })

  const [visibleFormModal, setVisibleFormModal] = useState<boolean>(false)
  const [formValidated, setFormValidated] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [model, setModel] = useState({})

  const balancesQuery = useCustomerBalanceQuery(customer, searchParams)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setErrors({ ...errors, [name]: null })
    setSearchParams({ ...searchParams, [name]: value })
  }

  const loadData = () => {
    if (!searchParams.dateFrom && !searchParams.dateTo) {
      return
    }

    balancesQuery.refetch()
  }

  const handleSubmit = () => {
    // saveMutation
    //   .mutateAsync({
    //     form: model,
    //   })
    //   .then(() => {
    //     setSelectedPostId(undefined)
    //     setModel(DefaultEmployeePostFormModel)
    //     setVisibleFormModal(false)
    //     employeePositionsQuery.refetch()
    //   })
    //   .catch((error) => {
    //     setFormValidated(true)
    //     setError(true)
    //   })
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
      >
        <BalanceForm
          handleChange={handleChange}
          formValidated={formValidated}
          model={model}
          error={error}
        />
      </FormModal>

      <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={true}>
        <CRow className="mb-3">
          <CCol md={3}>
            <DatePickerField
              label={'Дата c'}
              placeholder="Дата c"
              fieldName={'dateFrom'}
              handleChange={handleChange}
            />
          </CCol>
          <CCol md={3}>
            <DatePickerField
              label={'Дата по'}
              placeholder="Дата по"
              fieldName={'dateTo'}
              handleChange={handleChange}
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
                  <CBadge color="success">{balance.inAmount}</CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color="danger">{balance.outAmount}</CBadge>
                </CTableDataCell>
                <CTableDataCell>{balance.balance}</CTableDataCell>
                <CTableDataCell>{balance.note}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CTabPane>
    </>
  )
}

export default EmployeeBalance
