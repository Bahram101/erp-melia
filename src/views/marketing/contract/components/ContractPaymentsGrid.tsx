import { useContractPaymentsQuery } from '../../../../hooks/marketing/marketingQueries'
import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CSpinner } from '@coreui/react-pro'
import CashDocGridByContext from '../../../finance/components/CashDocGridByContext'
import { CashDocGridByContextModel } from '../../../../models/finance/FinModels'
import { Doctype } from '../../../../models/CommonModels'

const ContractPaymentsGrid = ({ contractId }: { contractId: string | undefined, }) => {
  if (!contractId) {
    return null
  }

  const [firstPayments, setFirstPayments] = useState<CashDocGridByContextModel[]>([])
  const [monthlyPayments, setMonthlyPayments] = useState<CashDocGridByContextModel[]>([])

  const paymentsQuery = useContractPaymentsQuery(contractId, false)

  useEffect(() => {
    if (contractId) {
      paymentsQuery.refetch()
        .then(({ data }) => {
          if (data) {
            setFirstPayments(data.filter(item => item.doctype.name === Doctype.CASH_DOC_FIRST_PAYMENT))
            setMonthlyPayments(data.filter(item => item.doctype.name === Doctype.CASH_DOC_MONTHLY_PAYMENT))
          }
        })
    }
  }, [contractId])

  return <>
    {
      paymentsQuery.isFetching
        ? <CSpinner color="primary" />
        : <CCard>
          <CCardHeader>
            <h5>Первоначальные взносы</h5>
          </CCardHeader>
          <CCardBody>
            <CashDocGridByContext docs={firstPayments} />
          </CCardBody>
        </CCard>
    }
    <hr />
    {
      paymentsQuery.isFetching
        ? <CSpinner color="primary" />
        : <CCard>
          <CCardHeader>
            <h5>Ежемесячные взносы</h5>
          </CCardHeader>
          <CCardBody>
            <CashDocGridByContext docs={monthlyPayments} />
          </CCardBody>
        </CCard>
    }
  </>
}

export default ContractPaymentsGrid
