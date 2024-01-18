import React, { useEffect, useState } from 'react'
import { CButton, CCol, CSpinner } from '@coreui/react-pro'
import SortableTree from '@nosferatu500/react-sortable-tree'
import '@nosferatu500/react-sortable-tree/style.css'
import { toast } from 'react-toastify'
import {
  CompanyStructureFormModel,
  CompanyStructureModel,
  DefaultCompanyStructureFormModel,
  StructureSearchParamModel,
} from 'models/hr/HrModels'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'
import StructureFormModal from './StructureFormModal'
import {
  useCompanyStructureQuery,
  useStructureDeleteMutation,
  useStructureFormQuery,
  useStructurePostSaveMutation,
} from 'hooks/hr/structureQueries'
import Swal from 'sweetalert2'
import { parseResponseFormErrors } from 'utils/ErrorUtil'

interface Props {
  companyStructureData: CompanyStructureModel[]
  searchParams: StructureSearchParamModel
}

const Structure: React.FC<Props> = ({ companyStructureData, searchParams }) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [errors, setErrors] = useState<any>({})
  const [structureIdForDel, setStructureIdForDel] = useState<string>('')
  const [structureIdForEdit, setStructureIdForEdit] = useState<string>('')
  const [companyStructures, setCompanyStructures] = useState(companyStructureData || [])
  const [model, setModel] = useState<CompanyStructureFormModel>(DefaultCompanyStructureFormModel)

  const companyStructureQuery = useCompanyStructureQuery(searchParams, true)
  const structureFormQuery = useStructureFormQuery(structureIdForEdit, true)
  const saveMutation = useStructurePostSaveMutation(model.id || null)
  const delCompanyStructureQuery = useStructureDeleteMutation(structureIdForDel)

  useEffect(() => {
    if (structureFormQuery.data) {
      setModel(structureFormQuery.data)
    } else {
      setModel(DefaultCompanyStructureFormModel)
    }
  }, [structureFormQuery.data])

  useEffect(() => {
    if (companyStructureData) {
      setCompanyStructures(companyStructureData)
    }
  }, [companyStructureData])

  useEffect(() => {
    const handleDelete = async () => {
      if (structureIdForDel) {
        const confirmationResult = await Swal.fire({
          title: 'Вы уверены?',
          text: 'Вы не сможете отменить это действие!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Да, удалить!',
        })
        if (confirmationResult.isConfirmed) {
          try {
            await delCompanyStructureQuery.mutateAsync()
            await Swal.fire('Успешно удалено!', 'Ресурс был удален.', 'success')
            companyStructureQuery.refetch()
          } catch (error) {
            await Swal.fire('Ошибка удаления', 'Что-то пошло не так...', 'error')
          }
        }
      }
    }
    handleDelete()
  }, [structureIdForDel])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
  }

  const handleSubmit = () => {
    saveMutation
      .mutateAsync({
        form: model,
      })
      .then(() => {
        setModel(DefaultCompanyStructureFormModel)
        setVisible(false)
        companyStructureQuery.refetch()
        setErrors({})
        toast.success('Успешно сохранен!')
      })
      .catch((error) => {
        setErrors(parseResponseFormErrors(error))
      })
  }

  const toEdit = (id: string) => {
    setStructureIdForEdit(id)
    setVisible(true)
  }

  const toCreate = (parentId: string) => {
    setStructureIdForEdit('')
    setModel({ ...DefaultCompanyStructureFormModel, parentId })
    setVisible(true)
  }

  const toDelete = (id: string) => {
    setStructureIdForDel(id)
  }

  return (
    <CCol md={9}>
      <StructureFormModal
        visible={visible}
        onClose={() => setVisible(false)}
        handleSubmit={handleSubmit}
        saving={structureFormQuery.isFetching}
        handleChange={handleChange}
        model={model}
        errors={errors}
      />
      {companyStructureQuery.isFetching ? (
        <CSpinner color="primary" />
      ) : (
        <SortableTree
          treeData={companyStructures}
          onChange={(data) => setCompanyStructures(data)}
          generateNodeProps={(rowInfo) => {
            return {
              buttons: [
                <CButton
                  className="me-1"
                  size="sm"
                  color={'primary'}
                  variant="outline"
                  shape="square"
                  onClick={() => toEdit(rowInfo.node.id)}
                >
                  <FaPen className="translateY-2" />
                </CButton>,

                <CButton
                  className="me-1"
                  size="sm"
                  color={'primary'}
                  variant="outline"
                  shape="square"
                  onClick={() => toCreate(rowInfo.node.id)}
                >
                  <FaPlus className="translateY-2" />
                </CButton>,

                <CButton
                  size="sm"
                  color={'primary'}
                  variant="outline"
                  shape="square"
                  onClick={() => toDelete(rowInfo.node.id)}
                >
                  <FaTrash className="translateY-2 " />
                </CButton>,
              ],
            }
          }}
        />
      )}
    </CCol>
  )
}
export default Structure
