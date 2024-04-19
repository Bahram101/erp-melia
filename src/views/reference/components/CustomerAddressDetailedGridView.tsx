import { CustomerAddressGridModel } from '../../../models/reference/RefModels'
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import React, { useState } from 'react'
import CustomerAddressFormModal from './CustomerAddressFormModal'
import ActionButtonContent, { ActionButtonType } from '../../../components/button/ActionButtonContent'

const CustomerAddressDetailedGridView = ({ addresses, reloadPage, customerId }: {
  addresses: CustomerAddressGridModel[],
  reloadPage?: () => void
  customerId: string
}) => {
  const [formModalVisible, setFormMovalVisible] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)

  return (
    <>
      <CustomerAddressFormModal
        customerId={customerId}
        visible={formModalVisible}
        onClose={() => {
          setFormMovalVisible(false)
          setSelectedId(undefined)
        }}
        addressId={selectedId}
        handleAfterSubmit={() => {
          setFormMovalVisible(false)
          setSelectedId(undefined)
          if (reloadPage) {
            reloadPage()
          }
        }}
      />
      <div className="float-end">
        <ActionButtonContent
          type={ActionButtonType.ADD}
          onClick={() => {
            setFormMovalVisible(true)
            setSelectedId(undefined)
          }}
        />
      </div>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Название</CTableHeaderCell>
            <CTableHeaderCell scope="col">Область</CTableHeaderCell>
            <CTableHeaderCell scope="col">Район</CTableHeaderCell>
            <CTableHeaderCell scope="col">Город</CTableHeaderCell>
            <CTableHeaderCell scope="col">Район в горорде</CTableHeaderCell>
            <CTableHeaderCell scope="col">Мкр.</CTableHeaderCell>
            <CTableHeaderCell scope="col">Улица</CTableHeaderCell>
            <CTableHeaderCell scope="col">Номер дома</CTableHeaderCell>
            <CTableHeaderCell scope="col">Номер квартиры</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {addresses?.map((address: CustomerAddressGridModel) => (
            <CTableRow key={address.id}>
              <CTableDataCell>{address.name}</CTableDataCell>
              <CTableDataCell>{address.regionName}</CTableDataCell>
              <CTableDataCell>{address.districtName}</CTableDataCell>
              <CTableDataCell>{address.cityName}</CTableDataCell>
              <CTableDataCell>{address.cityDistrict}</CTableDataCell>
              <CTableDataCell>{address.microDistrict}</CTableDataCell>
              <CTableDataCell>{address.street}</CTableDataCell>
              <CTableDataCell>{address.houseNumber}</CTableDataCell>
              <CTableDataCell>{address.flatNumber}</CTableDataCell>
              <CTableDataCell>
                <ActionButtonContent
                  type={ActionButtonType.EDIT}
                  onClick={() => {
                    setSelectedId(address.id)
                    setFormMovalVisible(true)
                  }}
                />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default CustomerAddressDetailedGridView
