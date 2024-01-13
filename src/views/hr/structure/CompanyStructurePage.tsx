import React, { useEffect, useState } from 'react'
import { CContainer, CRow } from '@coreui/react-pro'
import StructureSearchPanel from './components/StructureSearchPanel'
import Structure from './components/Structure'
import { FormData } from 'models/CommonModels'
import { useCompanyStructureQuery } from 'hooks/hr/structureQueries'
import { StructureSearchParamModel } from 'models/hr/HrModels'

const CompanyStructure = () => {
  const [errors, setErrors] = useState<FormData>({
    year: '',
    month: '',
  })
  const [searchParams, setSearchParams] = useState<StructureSearchParamModel>({
    year: '',
    month: '',
  })

  const companyStructureQuery = useCompanyStructureQuery(searchParams, true)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setSearchParams((prev: any) => ({ ...prev, [name]: +value }))
    setErrors((prev: any) => ({
      ...prev,
      [name]: '',
    }))
  }

  const loadData = () => {
    let err: FormData = {}

    for (const fieldName in searchParams) {
      if (searchParams[fieldName] === '') {
        err[fieldName] = 'Поле обязательно'
      }
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
      <Structure companyStructureData={companyStructureQuery.data || []} />
    </CRow>
  )
}

export default CompanyStructure
