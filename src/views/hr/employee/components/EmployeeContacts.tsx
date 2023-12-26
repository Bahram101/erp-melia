import React from 'react'
import { CTabPane, CSmartTable } from '@coreui/react-pro'

type TabPaneProps = {
  activeKey: string
  data: any
}

const EmployeeContacts = ({ activeKey, data }: TabPaneProps) => {
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
    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 'CONTACTS'}>
      <CSmartTable
        columns={columns}
        items={data.data || []}
        loading={data?.isLoading}
        itemsPerPage={30}
        pagination
        columnFilter={false}
      />
    </CTabPane>
  )
}

export default EmployeeContacts
