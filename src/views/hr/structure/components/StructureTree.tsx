import React, { useEffect, useState } from 'react'
import { CButton, CSpinner } from '@coreui/react-pro'
import SortableTree from '@nosferatu500/react-sortable-tree'
import '@nosferatu500/react-sortable-tree/style.css'
import { CompanyStructureModel } from 'models/hr/HrModels'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'

interface Props {
  items: CompanyStructureModel[]
  isLoading: boolean
  deleteNode: (id: string) => void
  createNode: (parentId: string) => void
  editNode: (id: string) => void
}

const StructureTree: React.FC<Props> = ({ items, isLoading, deleteNode, createNode, editNode }) => {
  const [treeData, setTreeData] = useState<CompanyStructureModel[]>([])

  useEffect(() => {
    setTreeData(items || [])
  }, [items])

  return (
    isLoading
      ? <CSpinner color="primary" />
      : <SortableTree
        treeData={treeData}
        onChange={(data) => setTreeData(data)}
        generateNodeProps={(rowInfo) => {
          return {
            buttons: [
              <CButton
                className="me-1"
                size="sm"
                color={'primary'}
                variant="outline"
                shape="square"
                onClick={() => editNode(rowInfo.node.id)}
              >
                <FaPen className="translateY-2" />
              </CButton>,

              <CButton
                className="me-1"
                size="sm"
                color={'info'}
                variant="outline"
                shape="rounded"
                onClick={() => createNode(rowInfo.node.id)}
              >
                <FaPlus className="translateY-2" />
              </CButton>,

              <CButton
                size="sm"
                color={'danger'}
                variant="outline"
                shape="square"
                onClick={() => deleteNode(rowInfo.node.id)}
              >
                <FaTrash className="translateY-2 " />
              </CButton>,
            ],
          }
        }}
      />
  )
}
export default StructureTree
