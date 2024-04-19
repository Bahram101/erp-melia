import { CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableRow } from '@coreui/react-pro'
import { EmployeeDetailedModel } from '../../../../models/hr/HrModels'
import ActionButtonContent, { ActionButtonType } from '../../../../components/button/ActionButtonContent'
import EmployeeMainDataFormModal from './EmployeeMainDataFormModal'
import { useState } from 'react'
import EmployeeUserDataFormModal from './EmployeeUserDataFormModal'

type TabPaneProps = {
  mainData: EmployeeDetailedModel | undefined
  reloadPage: () => void
}

const EmployeeMainData = ({ mainData, reloadPage }: TabPaneProps) => {
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false)
  const [userFormModalVisible, setUserFormModalVisible] = useState<boolean>(false)

  if (!mainData) {
    return null
  }

  return <>
    <EmployeeMainDataFormModal
      visible={formModalVisible}
      onClose={() => {
        setFormModalVisible(false)
      }}
      handleAfterSubmit={() => {
        setFormModalVisible(false)
        reloadPage()
      }}
      empId={mainData.id}
    />
    <EmployeeUserDataFormModal
      visible={userFormModalVisible}
      onClose={() => setUserFormModalVisible(false)}
      empId={mainData.id}
      handleAfterSubmit={() => {
        setUserFormModalVisible(false)
        reloadPage()
      }}
    />
    <CRow>
      <CCol>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableDataCell className="col-4 fw-bold"></CTableDataCell>
              <CTableDataCell className={'float-end'}>
                <ActionButtonContent
                  type={ActionButtonType.EDIT}
                  onClick={() => setFormModalVisible(true)}
                />
              </CTableDataCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell className="col-4 fw-bold">Фамилия</CTableDataCell>
              <CTableDataCell>{mainData?.lastname}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="fw-bold">Имя</CTableDataCell>
              <CTableDataCell>{mainData?.firstname}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="fw-bold">Отчество</CTableDataCell>
              <CTableDataCell>{mainData?.middlename}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="fw-bold">ИИН</CTableDataCell>
              <CTableDataCell>{mainData?.iin}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="fw-bold">Дата рождения</CTableDataCell>
              <CTableDataCell>{mainData?.birthDate}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCol>
      <CCol>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableDataCell className="col-4 fw-bold"></CTableDataCell>
              <CTableDataCell className={'float-end'}>
                <ActionButtonContent
                  type={ActionButtonType.EDIT}
                  onClick={() => setUserFormModalVisible(true)}
                />
              </CTableDataCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell className="col-4 fw-bold">Пользователь</CTableDataCell>
              <CTableDataCell>{mainData?.user?.username}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="fw-bold">Пароль</CTableDataCell>
              <CTableDataCell>***</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell className="fw-bold">Статус</CTableDataCell>
              <CTableDataCell>{mainData?.user?.status}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCol>
    </CRow>
  </>
}

export default EmployeeMainData
