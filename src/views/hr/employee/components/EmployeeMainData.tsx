import { CTabPane, CTable, CTableRow, CTableBody, CTableDataCell } from '@coreui/react-pro'

type TabPaneProps = {
  mainData: any
}

const EmployeeMainData = ({ mainData }: TabPaneProps) => {
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
