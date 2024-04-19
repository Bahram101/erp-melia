import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { EmpPostAccessBranch, EmpPostAccessBranchFormModel } from '../../../../models/hr/HrModels'
import {
  useEmpPostAccessBranchesQuery,
  useEmpPostAccessBranchFormSaveMutation,
} from '../../../../hooks/hr/employeeQueries'
import { RefOptionsModel } from '../../../../models/CommonModels'
import ActionButtonContent, { ActionButtonType } from '../../../../components/button/ActionButtonContent'
import FormModal from '../../../../components/FormModal'
import CheckboxField from '../../../../components/fields/CheckboxField'

type Props = {
  branchOptions: RefOptionsModel[]
  empId: string | undefined
}

const EmployeeUserBranches = ({ branchOptions, empId }: Props) => {
  const [items, setItems] = useState<EmpPostAccessBranch[]>([])
  const [selectedItem, setSelectedItem] = useState<EmpPostAccessBranch | undefined>(undefined)
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false)
  const [model, setModel] = useState<EmpPostAccessBranchFormModel>({
    postId: '',
    branchIds: [],
  })
  const itemsQuery = useEmpPostAccessBranchesQuery(empId, false)
  const saveMutation = useEmpPostAccessBranchFormSaveMutation(empId || '')

  if (!empId) {
    return null
  }

  useEffect(() => {
    loadData()
  }, [empId])

  const loadData = () => {
    itemsQuery.refetch()
      .then(({ data }) => setItems(data || []))
  }

  const getBranchName = (branchId: string) => {
    const foundBranch = branchOptions.find((branch) => branchId === branch.id)
    return foundBranch ? foundBranch.label : '-'
  }

  const onClickEdit = (item: EmpPostAccessBranch) => {
    setSelectedItem(item)
    setModel({
      postId: item.postId,
      branchIds: item.branchIds,
    })
    setFormModalVisible(true)
  }

  const saveForm = () => {
    saveMutation.mutateAsync({
      form: model,
    }).then(() => {
      loadData()
      setFormModalVisible(false)
      setSelectedItem(undefined)
    }).catch((error) => {
      console.log('err', error)
    })
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    if (value) {
      const brIds = [...model.branchIds]
      brIds.push(name)
      setModel({ ...model, branchIds: brIds })
    } else {
      setModel({ ...model, branchIds: model.branchIds.filter((branchId) => branchId !== name) })
    }
  }

  const formModal = <FormModal
    title={`Доступы к филиалам для должности ${selectedItem && selectedItem.postName}`}
    handleSubmit={saveForm}
    visibleFormModal={formModalVisible}
    saving={saveMutation.isLoading}
    onClose={() => {
      setFormModalVisible(false)
      setSelectedItem(undefined)
    }}
  >
    <CRow>
      <CCol>
        {branchOptions.map((branch, idx: number) => <CheckboxField
          key={branch.id}
          fieldName={branch.id || ''}
          handleChange={handleChange}
          label={branch.label}
          value={model.branchIds.includes(branch.id || '')}
        />)}
      </CCol>
    </CRow>

  </FormModal>

  return <CCard>
    <CCardBody>
      {formModal}
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Должность</CTableHeaderCell>
            <CTableHeaderCell scope="col">Доступные филиалы</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {items.map((item: EmpPostAccessBranch, idx: number) => {
            return (
              <CTableRow key={item.postId}>
                <CTableHeaderCell>{idx + 1}</CTableHeaderCell>
                <CTableDataCell>{item.postName}</CTableDataCell>
                <CTableDataCell>
                  {item.branchIds.map((branchId) => getBranchName(branchId) + ', ')}
                </CTableDataCell>
                <CTableDataCell>
                  <ActionButtonContent
                    type={ActionButtonType.EDIT}
                    item={item}
                    onClick={(it: EmpPostAccessBranch) => onClickEdit(it)}
                  />
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </CCardBody>
  </CCard>
}

export default EmployeeUserBranches
