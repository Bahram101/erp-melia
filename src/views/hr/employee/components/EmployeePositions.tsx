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

type Props = {
  positions: any
}

const EmployeePositions = ({ positions }: Props) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [validated, setValidated] = useState<boolean>(false)
  const positionsWithIndex = positions.map((item: any, index: number) => ({
    ...item,
    index: index + 1,
  }))

  const handleSubmit = () => {
    console.log('handle')
  }

  return (
    <>
      <FormModal
        visible={visible}
        setVisible={setVisible}
        handleSubmit={handleSubmit}
        title={'Добавление должности сотруднику'}
      >
        <PostForm validated={validated} setValidated={setValidated} />
      </FormModal>
      <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={true}>
        <div className="float-end">
          <Link to={{}}>
            <CButtonGroup role="group" aria-label="Basic mixed styles example">
              <CButton
                color="success mb-2"
                className="text-white"
                onClick={() => setVisible(!visible)}
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
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
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
            {positionsWithIndex.map((position: any) => (
              <CTableRow key={position.id}>
                <CTableDataCell>{position.index}</CTableDataCell>
                <CTableDataCell>{position.branchName}</CTableDataCell>
                <CTableDataCell>{position.positionName}</CTableDataCell>
                <CTableDataCell>{position.beginDate}</CTableDataCell>
                <CTableDataCell>{position.endDate}</CTableDataCell>
                <CTableDataCell>{position.salary}</CTableDataCell>
                <CTableDataCell>{position.hasAccess}</CTableDataCell>
                <CTableDataCell>
                  <Link to={{}}>
                    <CButton color={'primary'} variant="outline" shape="square" size="sm">
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

export default EmployeePositions