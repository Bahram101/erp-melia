import { CTabPane, CTable, CTableRow, CTableBody, CTableDataCell } from '@coreui/react-pro'
import { EmployeeDetailedModel } from '../../../../models/hr/HrModels'

type TabPaneProps = {
  mainData: EmployeeDetailedModel | undefined
}

const EmployeeMainData = ({ mainData }: TabPaneProps) => {
  if (!mainData) {
    return null
  }

  return (
    <>
      <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={true}>
        <CTable striped>
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
      </CTabPane>
    </>
  )
}

export default EmployeeMainData
