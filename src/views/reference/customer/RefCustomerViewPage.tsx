import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import { useCustomerDetailedQuery } from '../../../hooks/reference/refCustomerQueries'
import { useEffect, useState } from 'react'
import { CustomerDetailedModel } from '../../../models/reference/RefModels'
import CustomerDetailedView from '../components/CustomerDetailedView'

const RefCustomerViewPage = () => {
  const { id } = useParams()

  const [model, setModel] = useState<CustomerDetailedModel | undefined>(undefined)
  const detailedQuery = useCustomerDetailedQuery(id, false)

  useEffect(() => {
    if (id) {
      loadData()
    } else {
      setModel(undefined)
    }
  }, [id])

  const loadData = () => {
    detailedQuery.refetch()
      .then(({ data }) => setModel(data))
  }

  return <CCard>
    <CCardHeader>
      <h4>Карточка контрагента</h4>
    </CCardHeader>
    <CCardBody>
      <CustomerDetailedView
        reloadPage={() => loadData()}
        customer={model}
        editable={true}
      />
    </CCardBody>
  </CCard>
}

export default RefCustomerViewPage