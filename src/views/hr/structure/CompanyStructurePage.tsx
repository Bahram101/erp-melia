import React, { useState } from 'react'
import { CRow } from '@coreui/react-pro'
import StructureSearchPanel from './components/StructureSearchPanel'
import Structure from './components/StructureTree'
import { useCompanyStructureQuery } from 'hooks/hr/structureQueries'
import { StructureSearchParamModel } from 'models/hr/HrModels'

export type errorTypes = {
  [key: string]: string
}

const CompanyStructurePage = () => {
  const [errors, setErrors] = useState<errorTypes>({ year: '', month: '' })
  const [searchParams, setSearchParams] = useState<StructureSearchParamModel>({
    year: '',
    month: '',
  })

  const companyStructureQuery = useCompanyStructureQuery(searchParams, true)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setSearchParams((prev: any) => ({ ...prev, [name]: +value }))
    setErrors((prev: errorTypes) => ({
      ...prev,
      [name]: '',
    }))
  }

  const loadData = () => {
    let err: errorTypes = {}

    if (searchParams.year === '') {
      err.year = 'Поле обязательно'
    }
    if (searchParams.month === '') {
      err.month = 'Поле обязательно'
    }

    if (Object.keys(err).length > 0) {
      setErrors(err)
    } else {
      companyStructureQuery.refetch()
    }
  }

  return (
    <CRow>
      <StructureSearchPanel
        searchParams={searchParams}
        errors={errors}
        loadData={loadData}
        handleChange={handleChange}
      />
      <Structure
        companyStructureData={companyStructureQuery.data || []}
        searchParams={searchParams}
      />
    </CRow>
  )
}

export default CompanyStructurePage
