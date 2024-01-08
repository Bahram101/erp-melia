import {
  useContractPaymentSchedulesQuery,
  useSaleTypeDetailedQuery,
} from '../../../../hooks/marketing/marketingQueries'
import React, { useEffect } from 'react'
import ContractPaymentScheduleGrid from './ContractPaymentScheduleGrid'
import { CSpinner } from '@coreui/react-pro'
import SaleTypeDetailedView from './SaleTypeDetailedView'

const ContractAddDataView = ({ contractId, saleTypeId }: {
  contractId: string | undefined,
  saleTypeId: string | undefined
}) => {
  if (!contractId) {
    return null
  }

  const psQuery = useContractPaymentSchedulesQuery(contractId, true)
  const stDetailedQuery = useSaleTypeDetailedQuery(saleTypeId || '', false)

  useEffect(() => {
    if (saleTypeId) {
      stDetailedQuery.refetch()
    }
  }, [saleTypeId])

  return <>

    {
      psQuery.isFetching
        ? <CSpinner color="primary" />
        : <ContractPaymentScheduleGrid items={psQuery.data || []} />
    }
    <hr />
    {
      stDetailedQuery.isFetching
        ? <CSpinner color="primary" />
        : <SaleTypeDetailedView saleType={stDetailedQuery.data || undefined} />
    }

  </>
}

export default ContractAddDataView
