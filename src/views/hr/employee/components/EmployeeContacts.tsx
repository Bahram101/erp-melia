import React from 'react'
import {
  CTabPane,
  CTable,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CSpinner,
  CSmartTable,
  CButton,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import { FaEye, FaPen } from 'react-icons/fa'

type TabPaneProps = {
  activeKey: string
  data: any
}

const EmployeeContacts = ({ activeKey, data }: TabPaneProps) => {
  return (
    <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 'CONTACTS'}>
      <CSmartTable
        columns={[]}
        items={[]}
        loading={data.isLoading}
        itemsPerPage={30}
        pagination
        columnFilter
        scopedColumns={{
          actions: (item: any) => (
            <td>
              <Link to={`/hr/employees/view/${item.employeeId}`}>
                <CButton color={'primary'} variant="outline" shape="square" size="sm">
                  <FaEye />
                </CButton>
                &nbsp;
              </Link>
              <Link to={`/hr/employees/edit/${item.employeeId}`}>
                <CButton color={'primary'} variant="outline" shape="square" size="sm">
                  <FaPen />
                </CButton>
              </Link>
            </td>
          ),
        }}
      />
    </CTabPane>
  )
}

export default EmployeeContacts
