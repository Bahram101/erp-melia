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
import { useStructurePostSaveMutation } from 'hooks/hr/structureQueries'

interface Props {
  // companyStructureQuery: CompanyStructureModel[] | undefined
  companyStructureData: CompanyStructureModel[]
}

const Structure: React.FC<Props> = ({ companyStructureData }) => {
  const [componayStructures, setComponayStructures] = useState(companyStructureData || [])
  const [visible, setVisible] = useState<boolean>(false)
  const [errors, setErrors] = useState<any>({})
  const [model, setModel] = useState<CompanyStructureFormModel>(DefaultCompanyStructureFormModel)
  const saveMutation = useStructurePostSaveMutation(model.id)

  useEffect(() => {
    if (companyStructureData) {
      setComponayStructures(companyStructureData)
    }
  }, [companyStructureData])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    console.log('name', name)
    console.log('value', value)
    // if (name === 'postId') {
    //   setModel({ ...model, postName: value.positionName, postId: value.id, title: value.empName })
    // } else {
    //   setModel({ ...model, [name]: name !== 'parentId' ? +value : value })
    // }
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
        // empPostsQuery.refetch()
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

  const toCreate = (row: any) => {
    // setSelectedPostId(undefined)
    // setModel(DefaultEmployeePostFormModel)
    setModel({ ...model, parentId: row.node.id })
    setVisible(true)
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
                onClick={() => toCreate(rowInfo)}
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
