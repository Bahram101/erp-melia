import React, { Component, useEffect, useState } from 'react'
import { CButton, CCol } from '@coreui/react-pro'
import SortableTree from '@nosferatu500/react-sortable-tree'
import '@nosferatu500/react-sortable-tree/style.css'
import {
  CompanyStructureFormModel,
  CompanyStructureModel,
  DefaultCompanyStructureFormModel,
} from 'models/hr/HrModels'
import { FaEye, FaPen, FaPlus, FaTrash } from 'react-icons/fa'
import FormModal from 'components/FormModal'
import StructureForm from './StructureFormModal'
import StructureFormModal from './StructureFormModal'
import { useCompanyStructureDel, useStructurePostSaveMutation } from 'hooks/hr/structureQueries'

interface Props {
  companyStructureData: CompanyStructureModel[]
  companyStructureQuery: any
}

const Structure: React.FC<Props> = ({ companyStructureData, companyStructureQuery }) => {
  const [componayStructures, setComponayStructures] = useState(companyStructureData || [])
  const [visible, setVisible] = useState<boolean>(false)
  const [structureId, setStructureId] = useState<string>('')
  const [errors, setErrors] = useState<any>({})
  const [model, setModel] = useState<CompanyStructureFormModel>(DefaultCompanyStructureFormModel)
  const saveMutation = useStructurePostSaveMutation(model.id)
  const delCompanyStructureQuery = useCompanyStructureDel(structureId)

  useEffect(() => {
    if (companyStructureData) {
      setComponayStructures(companyStructureData)
    }
  }, [companyStructureData])

  // useEffect(() => {
  //   if (structureId) {
  //     delCompanyStructureQuery.mutate(
  //       {},
  //       {
  //         onSuccess: () => {
  //           companyStructureQuery.refetch()
  //         },
  //       },
  //     )
  //   }
  // }, [structureId])

  useEffect(() => {
    const handleDelete = async () => {
      if (structureId) {
        try {
          await delCompanyStructureQuery.mutate()
          console.log('deleted')
          // companyStructureQuery.refetch()
        } catch (error) {
          console.log('eeeeee', error)
        }
      }
    }
    handleDelete()
  }, [structureId])

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
      })
      .catch((error) => {
        // setErrors(parseResponseFormErrors(error))
      })
  }
  // const toEdit = (postId: EmployeePostGridModel['id']) => {
  //   setSelectedPostId(postId)
  //   setVisible(true)
  // }

  console.log('model', model)
  console.log('companyStructureData', companyStructureData)

  const toCreate = (row: any) => {
    // setSelectedPostId(undefined)
    // setModel(DefaultEmployeePostFormModel)
    console.log('row', row)
    setModel({ ...model, parentId: row.node.id })
    setVisible(true)
  }

  const toDelete = (row: any) => {
    console.log('row', row)
    setStructureId(row.node.id)
  }

  return (
    <CCol md={9}>
      <StructureFormModal
        visible={visible}
        onClose={() => setVisible(false)}
        handleSubmit={handleSubmit}
        saving={false}
        handleChange={handleChange}
        model={model}
      />
      <SortableTree
        treeData={componayStructures}
        onChange={(data) => setComponayStructures(data)}
        generateNodeProps={(rowInfo) => {
          return {
            buttons: [
              <CButton
                className="me-1"
                size="sm"
                color={'primary'}
                variant="outline"
                shape="square"
                // onClick={() => alertNodeInfo(rowInfo)}
              >
                <FaPen className="translateY-2" />
              </CButton>,

              <CButton
                className="me-1"
                size="sm"
                color={'primary'}
                variant="outline"
                shape="square"
                onClick={() => toCreate(rowInfo)}
              >
                <FaPlus className="translateY-2" />
              </CButton>,

              <CButton
                size="sm"
                color={'primary'}
                variant="outline"
                shape="square"
                onClick={() => toDelete(rowInfo)}
              >
                <FaTrash className="translateY-2 " />
              </CButton>,
            ],
          }
        }}
      />
    </CCol>
  )
}
export default Structure
