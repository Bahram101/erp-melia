import React, { Component, useEffect, useState } from 'react'
import { CButton, CCol } from '@coreui/react-pro'
import SortableTree from '@nosferatu500/react-sortable-tree'
import '@nosferatu500/react-sortable-tree/style.css'
import {
  CompanyStructureFormModel,
  CompanyStructuresModel,
  DefaultCompanyStructureFormModel,
} from 'models/hr/HrModels'
import { FaEye, FaPen, FaPlus, FaTrash } from 'react-icons/fa'
import FormModal from 'components/FormModal'
import StructureForm from './StructureFormModal'
import StructureFormModal from './StructureFormModal'

interface Props {
  // companyStructureQuery: CompanyStructuresModel[] | undefined
  companyStructureQuery: any
}

const Structure: React.FC<Props> = ({ companyStructureQuery }) => {
  const [componayStructures, setComponayStructures] = useState(companyStructureQuery || [])
  const [visibleFormModal, setVisibleFormModal] = useState<boolean>(false)
  const [errors, setErrors] = useState<any>({})
  const [model, setModel] = useState<CompanyStructureFormModel>(DefaultCompanyStructureFormModel)

  useEffect(() => {
    if (companyStructureQuery) {
      setComponayStructures(companyStructureQuery)
    }
  }, [companyStructureQuery])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
  }

  const handleSubmit = () => {
    // saveMutation
    //   .mutateAsync({
    //     form: model,
    //   })
    //   .then(() => {
    //     setSelectedPostId(undefined)
    //     setModel(DefaultEmployeePostFormModel)
    //     setVisibleFormModal(false)
    //     empPostsQuery.refetch()
    //     setErrors({})
    //   })
    //   .catch((error) => {
    //     setErrors(parseResponseFormErrors(error))
    //   })
  }

  // const toEdit = (postId: EmployeePostGridModel['id']) => {
  //   setSelectedPostId(postId)
  //   setVisibleFormModal(true)
  // }

  console.log('model', model)

  const toCreate = (row: any) => {
    // setSelectedPostId(undefined)
    // setModel(DefaultEmployeePostFormModel)
    setModel({ ...model, parentId: row.node?.id })
    setVisibleFormModal(true)
  }

  return (
    <CCol md={9}>
      <StructureFormModal
        visibleFormModal={visibleFormModal}
        onClose={() => setVisibleFormModal(false)}
        handleSubmit={handleSubmit}
        saving={false}
        handleChange={handleChange}
        model={model}
      />
      <SortableTree
        treeData={componayStructures}
        onChange={(data) => setComponayStructures(data)}
        generateNodeProps={(rowInfo) => {
          console.log('rowInfo', rowInfo)
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
                onClick={()=>toCreate(rowInfo)}
              >
                <FaPlus className="translateY-2" />
              </CButton>,

              <CButton
                size="sm"
                color={'primary'}
                variant="outline"
                shape="square"

                // onClick={() => alertNodeInfo(rowInfo)}
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
