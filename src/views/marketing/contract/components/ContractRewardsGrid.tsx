import { useContractRewardsQuery } from '../../../../hooks/marketing/marketingQueries'
import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { formatMoney } from '../../../../utils/UtilFuncs'
import { ContractRewardGridModel } from '../../../../models/marketing/MrkModels'

const ContractRewardsGrid = ({ contractId }: { contractId: string | undefined, }) => {
  if (!contractId) {
    return null
  }

  const rewardsQuery = useContractRewardsQuery(contractId, true)

  return <>

    {
      rewardsQuery.isFetching
        ? <CSpinner color="primary" />
        : <CCard>
          <CCardHeader>
            <h5>Вознаграждения</h5>
          </CCardHeader>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">SN</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Статус</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Тип</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Сумма</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Дата-время создания</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rewardsQuery.data?.map((item: ContractRewardGridModel, index: number) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{item.targetContractRegCode}</CTableDataCell>
                    <CTableDataCell>{item.status?.displayName}</CTableDataCell>
                    <CTableDataCell>{item.doctype?.displayName}</CTableDataCell>
                    <CTableDataCell>{formatMoney(item.amount)}</CTableDataCell>
                    <CTableDataCell>{item.createdAt}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
    }
  </>
}

export default ContractRewardsGrid
