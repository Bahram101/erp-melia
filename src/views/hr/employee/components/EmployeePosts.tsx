import {
  CButton,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabPane,
} from '@coreui/react-pro'
import { FaPen } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa6'
import React, { useEffect, useState } from 'react'
import FormModal from 'components/FormModal'
import PostForm from 'views/hr/components/PostForm'
import { useBranchOptionsQuery, usePositionOptionsQuery } from 'hooks/reference/refOptionsQueries'
import { DefaultEmployeePostFormModel, EmployeePostFormModel, EmployeePostGridModel } from 'models/hr/HrModels'
import { useEmployeePostFormQuery, useEmployeePostSaveMutation } from '../../../../hooks/hr/employeeQueries'

type Props = {
  posts: EmployeePostGridModel[],
  employeeId: string;
}

const EmployeePosts = ({ posts, employeeId }: Props) => {
  const branchOptionsQuery = useBranchOptionsQuery(true)
  const positionOptionsQuery = usePositionOptionsQuery(true)
  const [visibleFormModal, setVisibleFormModal] = useState<boolean>(false)
  const [model, setModel] = useState<EmployeePostFormModel>(DefaultEmployeePostFormModel)
  const [selectedPostId, setSelectedPostId] = useState<string | undefined>(undefined)

  const postFormQuery = useEmployeePostFormQuery(employeeId, selectedPostId || '', true)
  const saveMutation = useEmployeePostSaveMutation(employeeId, selectedPostId)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({...model, [name]: value})
  }

  useEffect(() => {
    if(postFormQuery.data) {
      setModel(postFormQuery.data)
    } else {
      setModel(DefaultEmployeePostFormModel)
    }
  }, [postFormQuery.data])

  const handleSubmit = () => {
    let promise = saveMutation.mutateAsync({
      form: model,
    })
      .then(() => {
        setSelectedPostId(undefined)
        setModel(DefaultEmployeePostFormModel)
        setVisibleFormModal(false)
      })
      .catch((error) => {
        // ToDo - Handle error
        console.log('err', error)
      });
  }

  const toEdit = (postId: string) => {
    setSelectedPostId(postId)
    setVisibleFormModal(true)
  }

  const toCreate = () => {
    setSelectedPostId(undefined)
    setModel(DefaultEmployeePostFormModel)
    setVisibleFormModal(true)
  }

  return (
    <>
      <FormModal
        title={'Добавление должности сотруднику'}
        visibleFormModal={visibleFormModal}
        onClose={() => setVisibleFormModal(false)}
        handleSubmit={handleSubmit}
      >
        {postFormQuery.isFetching
          ? <CSpinner color="primary" />
          : <PostForm
            branchOptions={branchOptionsQuery.data || []}
            positionOptions={positionOptionsQuery.data || []}
            handleChange={handleChange}
            model={model}
          />}
      </FormModal>
      <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={true}>
        <div className="float-end">
          <CButton
            color="success mb-2"
            className="text-white"
            onClick={toCreate}
          >
            <FaPlus className="mb-1 me-2" />
            Добавить должность
          </CButton>
        </div>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Филиал</CTableHeaderCell>
              <CTableHeaderCell scope="col">Должность</CTableHeaderCell>
              <CTableHeaderCell scope="col">Дата начало</CTableHeaderCell>
              <CTableHeaderCell scope="col">Дата окончания</CTableHeaderCell>
              <CTableHeaderCell scope="col">Оклад</CTableHeaderCell>
              <CTableHeaderCell scope="col">Доступ к системе</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {posts?.map((post) => (
              <CTableRow key={post.id}>
                <CTableDataCell>{post.branchName}</CTableDataCell>
                <CTableDataCell>{post.positionName}</CTableDataCell>
                <CTableDataCell>{post.beginDate}</CTableDataCell>
                <CTableDataCell>{post.endDate}</CTableDataCell>
                <CTableDataCell>{post.salary}</CTableDataCell>
                <CTableDataCell>{post.hasAccess ? 'Да' : 'Нет'}</CTableDataCell>
                <CTableDataCell>
                  <Link to={{}}>
                    <CButton
                      color={'primary'}
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => toEdit(post.id)}
                    >
                      <FaPen />
                    </CButton>
                  </Link>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CTabPane>
    </>
  )
}

export default EmployeePosts
