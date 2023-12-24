import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const EmployeeGridPage = React.lazy(() => import('./views/hr/employee/EmployeeGridPage'))
const EmployeeDetailedPage = React.lazy(() => import('./views/hr/employee/EmployeeDetailedPage'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/hr/employees', name: 'Hr Employees', element: EmployeeGridPage },
  { path: '/hr/employees/view/:id', name: 'Hr Employee Card', element: EmployeeDetailedPage },
]

export default routes
