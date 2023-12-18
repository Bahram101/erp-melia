import React, { useMemo } from 'react'
import { useCurrentEmployeesQuery } from '../../../hooks/hr/employeeQueries'
import { CCard, CCardHeader, CCardBody, CSmartTable, CButton } from '@coreui/react-pro'
import { FaPen, FaEye } from 'react-icons/fa'

const EmployeeGridPage = () => {
  const currentEmpListQuery = useCurrentEmployeesQuery()

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

  console.log('data', currentEmpListQuery.data)

  const rows = useMemo(() => {
    return currentEmpListQuery?.data?.flatMap((item: any, index: number) => {
      return item.posts.map((post: any, subIndex: number) => ({
        ...item,
        id: post.id,
        positionName: post.positionName,
        branchName: post.branchName,
      }))
    })
  }, [currentEmpListQuery?.data])

  return (
    <CCard>
      <CCardHeader>
        <h4 style={{ float: 'left' }}>Список сотрудников</h4>
        <div style={{ float: 'right' }}>
          <CButton color={'primary'} shape="square" href={'/hr/employees/add'}>
            Добавить
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        <CSmartTable
          columns={columns}
          items={rows || []}
          loading={currentEmpListQuery.isLoading}
          itemsPerPage={30}
          pagination
          columnFilter
          scopedColumns={{
            actions: (item: any) => (
              <td>
                <CButton
                  color={'primary'}
                  variant="outline"
                  shape="square"
                  size="sm"
                  href={`/hr/employees/view/${item.employeeId}`}
                >
                  <FaEye />
                </CButton>
                &nbsp;
                <CButton
                  color={'primary'}
                  variant="outline"
                  shape="square"
                  size="sm"
                  href={`/hr/employees/edit/${item.employeeId}`}
                >
                  <FaPen />
                </CButton>
              </td>
            ),
          }}
        />
      </CCardBody>
    </CCard>
  )
}

export default EmployeeGridPage
