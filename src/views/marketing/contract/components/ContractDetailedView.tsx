import { ContractDetailedModel } from '../../../../models/marketing/MrkModels'
import { CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from '@coreui/react-pro'
import ContractStatusBadge from './ContractStatusBadge'
import { formatMoney } from '../../../../utils/UtilFuncs'
import PhoneNumber from '../../../../components/phone/PhoneNumber'
import PostRef from '../../../../components/post/PostRef'
import CustomerRef from '../../../../components/customer/CustomerRef'
import ContractRecommender from './ContractRecommender'
import ContractGiftGrid from './ContractGiftGrid'

type Props = {
  contract: ContractDetailedModel | undefined
}
const ContractDetailedView = ({ contract }: Props) => {
  if (!contract) {
    return null
  }

  return (
    <CRow>
      <CCol md>
        <CTable className={'table table-striped item-detailed'}>
          <CTableBody>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Регистрационный номер
              </CTableDataCell>
              <CTableHeaderCell>
                {contract.regCode}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Статус договора
              </CTableDataCell>
              <CTableHeaderCell>
                <ContractStatusBadge
                  status={contract.status.status}
                  statusName={contract.status.displayName}
                />
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Филиал
              </CTableDataCell>
              <CTableHeaderCell>{contract.branch?.displayName}</CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Сервис Филиал
              </CTableDataCell>
              <CTableHeaderCell>{contract.serviceBranch?.displayName}</CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Дата договора
              </CTableDataCell>
              <CTableHeaderCell>{contract.docDate}</CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Дилер
              </CTableDataCell>
              <CTableHeaderCell>
                <PostRef post={contract.dealer} />
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Демосекретарь
              </CTableDataCell>
              <CTableHeaderCell>
                <PostRef post={contract.demoSec} />
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Установщик
              </CTableDataCell>
              <CTableHeaderCell>
                <PostRef post={contract.fitter} />
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Взносщик
              </CTableDataCell>
              <CTableHeaderCell>
                <PostRef post={contract.collector} />
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Примечание
              </CTableDataCell>
              <CTableHeaderCell>{contract.note}</CTableHeaderCell>
            </CTableRow>
          </CTableBody>
        </CTable>
        <hr />
        <ContractGiftGrid gifts={contract.gifts} />
      </CCol>
      <CCol md>
        <CTable className={'table table-striped item-detailed'}>
          <CTableBody>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Клиент
              </CTableDataCell>
              <CTableHeaderCell>
                <CustomerRef customer={contract.customer} />
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Адрес
              </CTableDataCell>
              <CTableHeaderCell>
                {contract.address}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>Тел.</CTableDataCell>
              <CTableHeaderCell>
                {contract.phoneNumbers && contract.phoneNumbers.map((phoneNumber, idx) => <PhoneNumber
                  phoneNumber={phoneNumber} key={idx} />)}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                За город
              </CTableDataCell>
              <CTableHeaderCell>{contract.outCity ? 'ДА' : 'НЕТ'}</CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Рекомендатель (ФИО)
              </CTableDataCell>
              <CTableHeaderCell>
                <ContractRecommender recommender={contract?.recommender} />
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Продукт
              </CTableDataCell>
              <CTableHeaderCell>
                {contract?.goods?.displayName}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Серииный номер продукта
              </CTableDataCell>
              <CTableHeaderCell>{contract.serialNumber}</CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Серииный номер продукта (2)
              </CTableDataCell>
              <CTableHeaderCell>{contract.serialNumber2}</CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Цена продажи продукта
              </CTableDataCell>
              <CTableHeaderCell>{formatMoney(contract.price)}</CTableHeaderCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Скидка от дилера
              </CTableDataCell>
              <CTableHeaderCell>{formatMoney(contract.discountFromDealer)}</CTableHeaderCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Вид продажи
              </CTableDataCell>
              <CTableHeaderCell>
                {contract?.saleType.displayName}
              </CTableHeaderCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Первоначальный взнос
              </CTableDataCell>
              <CTableHeaderCell>{formatMoney(contract.firstPayment)}</CTableHeaderCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Перв. взнос наличными
              </CTableDataCell>
              <CTableHeaderCell>{formatMoney(contract.firstPayment)}</CTableHeaderCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell style={{ textAlign: 'end' }}>
                Оплаченный первоначальный взнос
              </CTableDataCell>
              <CTableHeaderCell>{formatMoney(contract.paidFirstPayment)}</CTableHeaderCell>
            </CTableRow>

          </CTableBody>
        </CTable>
      </CCol>
    </CRow>
  )
}

export default ContractDetailedView
