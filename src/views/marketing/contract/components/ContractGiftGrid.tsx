import { ContractGiftGridModel } from '../../../../models/marketing/MrkModels'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { formatMoney } from '../../../../utils/UtilFuncs'

const ContractGiftGrid = ({ gifts }: { gifts: ContractGiftGridModel[] }) => {
  return <CCard>
    <CCardHeader>
      <h5>Подарки</h5>
    </CCardHeader>
    <CCardBody>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Подарок</CTableHeaderCell>
            <CTableHeaderCell scope="col">Количество</CTableHeaderCell>
            <CTableHeaderCell scope="col">Цена за ед.</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {gifts.map((item, index) => (
            <CTableRow key={item.giftId}>
              <CTableDataCell>{index + 1}</CTableDataCell>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{formatMoney(item.quantity)}</CTableDataCell>
              <CTableDataCell>{formatMoney(item.unitPrice)}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>
}

export default ContractGiftGrid
