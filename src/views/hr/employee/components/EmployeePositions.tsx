import {
  CButton,
  CButtonGroup,
  CTabPane,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { FaPen } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa6'
import { useState } from 'react'
import FormModal from 'components/FormModal'
import PostForm from 'views/hr/components/PostForm'
import { useBranchOptionsQuery, usePositionOptionsQuery } from 'hooks/reference/refOptionsQueries'
import { EmployeePostsModel } from 'models/hr/HrModels'

type Props = {
  posts: EmployeePostsModel[] | undefined
}

const EmployeePosts = ({ posts }: Props) => {
  const branchOptionsQuery = useBranchOptionsQuery(true)
  const positionOptionsQuery = usePositionOptionsQuery(true)
  const [visibleFormModal, setVisibleFormModal] = useState<boolean>(false)
  const [state, setState] = useState<EmployeePostsModel>({
    id: '',
    beginDate: '',
    endDate: '',
    salary: 0,
    branchName: '',
    positionName: '',
    hasAccess: false,
    accessAllBranches: false,
  })

  const handleChange = (e: any) => {
    console.log('eee', e)
    const { name, value } = e.target
    setState({
      ...state,
      [name]:
        name == 'hasAccess' || name == 'accessAllBranches'
          ? JSON.parse(value)
          : name == 'salary'
          ? +value
          : value,
    })
  }

  const handleSubmit = () => {
    console.log('handleSubmit')
  }

  console.log('state', state)

  return (
    <>
      <FormModal
        title={'Добавление должности сотруднику'}
        visibleFormModal={visibleFormModal}
        onClose={() => setVisibleFormModal(false)}
        handleSubmit={handleSubmit}
      >
        <PostForm
          branchOptions={branchOptionsQuery.data}
          positionOptions={positionOptionsQuery.data}
          handleChange={handleChange}
          state={state}
        />
      </FormModal>
      <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={true}>
        <div className="float-end">
          <Link to={{}}>
            <CButtonGroup role="group" aria-label="Basic mixed styles example">
              <CButton
                color="success mb-2"
                className="text-white"
                onClick={() => setVisibleFormModal(!visibleFormModal)}
              >
                <FaPlus className="mb-1 me-2" />
                Добавить должность
              </CButton>
            </CButtonGroup>
          </Link>
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
            {posts?.map((position) => (
              <CTableRow key={position.id}>
                <CTableDataCell>{position.branchName}</CTableDataCell>
                <CTableDataCell>{position.positionName}</CTableDataCell>
                <CTableDataCell>{position.beginDate}</CTableDataCell>
                <CTableDataCell>{position.endDate}</CTableDataCell>
                <CTableDataCell>{position.salary}</CTableDataCell>
                <CTableDataCell>{position.hasAccess ? 'Да' : 'Нет'}</CTableDataCell>
                <CTableDataCell>
                  <Link to={{}}>
                    <CButton
                      color={'primary'}
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => setVisibleFormModal(!visibleFormModal)}
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
