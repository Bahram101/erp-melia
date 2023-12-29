import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const EmployeeGridPage = React.lazy(() => import('./views/hr/employee/EmployeeGridPage'))
const EmployeeDetailedPage = React.lazy(() => import('./views/hr/employee/EmployeeDetailedPage'))
const ContractGridPage = React.lazy(() => import('./views/marketing/contract/ContractGridPage'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/hr/employees', name: 'Hr Employees', element: EmployeeGridPage },
  { path: '/hr/employees/view/:id', name: 'Hr Employee Card', element: EmployeeDetailedPage },
  { path: '/marketing/contracts', name: 'Список договоров', element: ContractGridPage },
]

export default routes
