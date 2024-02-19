import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const EmployeeGridPage = React.lazy(() => import('./views/hr/employee/EmployeeGridPage'))
const EmployeeDetailedPage = React.lazy(() => import('./views/hr/employee/EmployeeDetailedPage'))
const CompanyStructure = React.lazy(() => import('./views/hr/structure/CompanyStructurePage'))
const ContractGridPage = React.lazy(() => import('./views/marketing/contract/ContractGridPage'))
const ContractViewPage = React.lazy(() => import('./views/marketing/contract/ContractViewPage'))
const ContractFormPage = React.lazy(() => import('./views/marketing/contract/ContractFormPage'))
const WhouseDocsGridPage = React.lazy(() => import('./views/whouse/whouseDoc/WhouseDocsGridPage'))
const WhouseDocFormPage = React.lazy(
  () => import('./views/whouse/whouseDoc/WhouseDocFormPage'),
)

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/hr/employees', name: 'Список сотрудников', element: EmployeeGridPage },
  { path: '/hr/employees/view/:id', name: 'Карточка сотрудника', element: EmployeeDetailedPage },
  { path: '/hr/structures', name: 'Структура компании', element: CompanyStructure },
  { path: '/marketing/contracts', name: 'Список договоров', element: ContractGridPage },
  { path: '/marketing/contracts/view/:id', name: 'Просмотр договора', element: ContractViewPage },
  {
    path: '/marketing/contracts/edit/:id',
    name: 'Редактирование договора',
    element: ContractFormPage,
  },
  { path: '/marketing/contracts/create', name: 'Добавление договора', element: ContractFormPage },
  { path: '/whouse/docs/:whousedocpath', name: 'Список документов склада', element: WhouseDocsGridPage },
  {
    path: '/whouse/docs/:whousedocpath/create',
    name: 'Документы склада создание',
    element: WhouseDocFormPage,
  },
  {
    path: '/whouse/docs/:whousedocpath/edit/:id?',
    name: 'Документы склада редактирование',
    element: WhouseDocFormPage,
  },
]

export default routes
