import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const EmployeeGridPage = React.lazy(() => import('./views/hr/employee/EmployeeGridPage'))
const EmployeeCardPage = React.lazy(() => import('./views/hr/employee/EmployeeCardPage'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/hr/employees', name: 'Hr Employees', element: EmployeeGridPage },
  { path: '/hr/employees/view/:id', name: 'Hr Employee Card', element: EmployeeCardPage },
]

export default routes
