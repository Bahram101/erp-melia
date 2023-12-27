import { CTabPane, CSmartTable, CTable } from '@coreui/react-pro'

type Props = {
  addresses: any
}

const EmployeeContacts = ({ addresses }: Props) => {
  const columns = [
    {
      key: 'regionName',
      label: 'Область',
      filter: false,
      _style: { width: '10%' },
    },
    {
      key: 'districtName',
      label: 'Район',
    },
    {
      key: 'cityName',
      label: 'Город',
    },
    {
      key: 'cityDistrict',
      label: 'Район в горорде',
    },
    {
      key: 'microDistrict',
      label: 'Район',
    },
    {
      key: 'name',
      label: 'Адрес регистрации',
    },
    {
      key: 'street',
      label: 'Улица',
    },
    {
      key: 'houseNumber',
      label: 'Номер дома',
    },
    {
      key: 'flatNumber',
      label: 'Номер квартиры',
    },
  ]
  return (
    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={true}>
      <CTable striped hover responsive columns={columns} items={addresses || []} />
    </CTabPane>
  )
}

export default EmployeeContacts
