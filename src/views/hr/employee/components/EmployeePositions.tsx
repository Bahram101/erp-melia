import { CSmartTable, CTabPane, CTable } from '@coreui/react-pro'

type Props = {
  positions: any
}

const EmployeePositions = ({ positions }: Props) => {
  const columns = [
    {
      key: 'index',
      label: '#',
      filter: false,
      _style: { width: '40px' },
    },
    {
      key: 'branchName',
      label: 'Филиал',
    },
    {
      key: 'positionName',
      label: 'Должность',
    },
    {
      key: 'beginDate',
      label: 'Дата начало',
    },
    {
      key: 'endDate',
      label: 'Дата окончания',
    },
    {
      key: 'salary',
      label: 'Оклад',
    },
    {
      key: 'hasAccess',
      label: 'Доступ к системе',
    },
    // {
    //   key: 'flatNumber',
    //   label: 'Номер квартиры',
    // },
  ]
  const addressesWithIndex = positions.map((item: any, index: number) => ({
    ...item,
    index: index + 1,
  }))

  return (
    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={true}>
      <CSmartTable columns={columns} items={addressesWithIndex || []} />
    </CTabPane>
  )
}

export default EmployeePositions
