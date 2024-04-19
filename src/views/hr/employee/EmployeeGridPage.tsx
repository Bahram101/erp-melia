import React from 'react'
import { useCurrentEmployeesQuery } from '../../../hooks/hr/employeeQueries'
import { CButton, CCard, CCardBody, CCardHeader, CSmartTable } from '@coreui/react-pro'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const EmployeeGridPage = () => {
  const currentEmpListQuery = useCurrentEmployeesQuery({}, true)

  const columns = [
    {
      key: 'lastname',
      label: 'Фамилия',
    },
    {
      key: 'firstname',
      label: 'Имя',
    },
    {
      key: 'middlename',
      label: 'Отчество',
    },
    {
      key: 'positionName',
      label: 'Должность',
    },
    {
      key: 'branchName',
      label: 'Филиал',
    },
    {
      key: 'actions',
      label: '',
      filter: false,
      sorter: false,
      _style: { width: '10%' },
    },
  ]

  return (
    <CCard>
      <CCardHeader>
        <h4 className="float-start">Список сотрудников</h4>
        <div className="float-end">
          <Link to={'/hr/employees/add'}>
            <CButton color={'primary'} shape="square">
              Добавить
            </CButton>
          </Link>
        </div>
      </CCardHeader>
      <CCardBody>
        <CSmartTable
          columns={columns}
          items={currentEmpListQuery.data || []}
          loading={currentEmpListQuery.isLoading}
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
              </td>
            ),
          }}
        />
      </CCardBody>
    </CCard>
  )
}

export default EmployeeGridPage
