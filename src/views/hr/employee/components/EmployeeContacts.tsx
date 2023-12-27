import { CTabPane, CTable } from '@coreui/react-pro'

type Props = {
  addresses: any
}

const EmployeeContacts = ({ addresses }: Props) => {
  const columns = [
    {
      key: 'index',
      label: '#',
      filter: false,
      _style: { width: '40px' },
    },
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
  const addressesWithIndex = addresses.map((item: any, index: number) => ({
    ...item,
    index: index + 1,
  }))

  return (
    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={true}>
      <CTable striped hover responsive columns={columns} items={addressesWithIndex || []} />
    </CTabPane>
  )
}

export default EmployeeContacts
