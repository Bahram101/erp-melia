import React, { useEffect, useState } from 'react'
import { CCol, CRow } from '@coreui/react-pro'
import StructureSearchPanel from './components/StructureSearchPanel'
import StructureTree from './components/StructureTree'
import {
  useCompanyStructureQuery,
  useStructureDeleteMutation,
  useStructureFormQuery,
  useStructurePostSaveMutation,
} from 'hooks/hr/structureQueries'
import {
  CompanyStructureFormModel,
  DefaultCompanyStructureFormModel,
  StructureSearchParamModel,
} from 'models/hr/HrModels'
import StructureFormModal from './components/StructureFormModal'
import Swal from 'sweetalert2'
import { DeleteConfirmOptionsModel } from '../../../models/CommonModels'
import { toast } from 'react-toastify'
import { parseResponseError, parseResponseFormErrors } from '../../../utils/ErrorUtil'

export type errorTypes = {
  [key: string]: string
}

const CompanyStructurePage = () => {
  const [searchErrors, setSearchErrors] = useState<errorTypes>({ year: '', month: '' })
  const [searchParams, setSearchParams] = useState<StructureSearchParamModel>({
    year: (new Date()).getFullYear().toString(),
    month: ((new Date()).getMonth() + 1).toString(),
  })
  const [formErrors, setFormErrors] = useState<any>({})
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false)
  const [model, setModel] = useState<CompanyStructureFormModel>(DefaultCompanyStructureFormModel)

  const companyStructureQuery = useCompanyStructureQuery(searchParams, true)
  const structureFormQuery = useStructureFormQuery(model.id || undefined, true)
  const saveMutation = useStructurePostSaveMutation(model.id || null)
  const delCompanyStructureQuery = useStructureDeleteMutation()

  useEffect(() => {
    if (model.id) {
      structureFormQuery.refetch()
        .then(({ data }) => setModel(data || DefaultCompanyStructureFormModel))
    } else {
      setModel(DefaultCompanyStructureFormModel)
    }
  }, [model.id])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setSearchParams((prev: any) => ({ ...prev, [name]: +value }))
    setSearchErrors((prev: errorTypes) => ({
      ...prev,
      [name]: '',
    }))
  }

  const handleFormChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
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
      setSearchErrors(err)
    } else {
      companyStructureQuery.refetch()
    }
  }

  const handleFormSubmit = () => {
    saveMutation
      .mutateAsync({
        form: model,
      })
      .then(() => {
        setModel(DefaultCompanyStructureFormModel)
        setFormModalVisible(false)
        companyStructureQuery.refetch()
        setFormErrors({})
        toast.success('Успешно сохранен!')
      })
      .catch((error) => {
        setFormErrors(parseResponseFormErrors(error))
      })
  }

  const deleteTreeNode = async (id: string) => {
    const confirmationResult = await Swal.fire(DeleteConfirmOptionsModel)
    if (confirmationResult.isConfirmed) {
      delCompanyStructureQuery.mutateAsync({ id: id })
        .then(() => {
          toast.success('Успешно удалено')
          companyStructureQuery.refetch()
        })
        .catch((error) => toast.error(parseResponseError(error)))
    }
  }

  const editTreeNode = (id: string) => {
    setModel({ ...model, id: id })
    setFormModalVisible(true)
  }

  const createTreeNode = (parentId: string) => {
    setModel({ ...DefaultCompanyStructureFormModel, parentId: parentId })
    setFormModalVisible(true)
  }

  return (
    <CRow>
      <CCol md={3}>
        <StructureSearchPanel
          searchParams={searchParams}
          errors={searchErrors}
          loadData={loadData}
          handleChange={handleChange}
          isLoading={companyStructureQuery.isFetching}
        />
      </CCol>
      <CCol md={9}>
        <StructureFormModal
          visible={formModalVisible}
          onClose={() => setFormModalVisible(false)}
          handleSubmit={handleFormSubmit}
          saving={saveMutation.isLoading}
          handleChange={handleFormChange}
          model={model}
          errors={formErrors}
        />
        <StructureTree
          items={companyStructureQuery.data || []}
          isLoading={companyStructureQuery.isFetching}
          deleteNode={deleteTreeNode}
          editNode={editTreeNode}
          createNode={createTreeNode}
        />
      </CCol>
    </CRow>
  )
}

export default CompanyStructurePage
