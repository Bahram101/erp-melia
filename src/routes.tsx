import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const EmployeeGridPage = React.lazy(() => import('./views/hr/employee/EmployeeGridPage'))
const EmployeeFormPage = React.lazy(() => import('./views/hr/employee/EmployeeFormPage'))
const EmployeeDetailedPage = React.lazy(() => import('./views/hr/employee/EmployeeDetailedPage'))
const CompanyStructure = React.lazy(() => import('./views/hr/structure/CompanyStructurePage'))
const ContractGridPage = React.lazy(() => import('./views/marketing/contract/ContractGridPage'))
const ContractViewPage = React.lazy(() => import('./views/marketing/contract/ContractViewPage'))
const ContractRenewFormPage = React.lazy(() => import('./views/marketing/contract/ContractRenewFormPage'))
const ContractFormPage = React.lazy(() => import('./views/marketing/contract/ContractFormPage'))
const WhouseDocsGridPage = React.lazy(() => import('./views/whouse/whouseDoc/WhouseDocsGridPage'))
const WhouseDocFormPage = React.lazy(
  () => import('./views/whouse/whouseDoc/WhouseDocFormPage'),
)
const SaleTypeGridPage = React.lazy(() => import('./views/marketing/saletype/SaleTypeGridPage'))
const SaleTypeFormPage = React.lazy(() => import('./views/marketing/saletype/SaleTypeFormPage'))
const ApproveDocGridPage = React.lazy(() => import('./views/docflow/ApproveDocGridPage'))
const ApproveDocDetailedPage = React.lazy(() => import('./views/docflow/ApproveDocDetailedPage'))
const SaleBonusGridPage = React.lazy(() => import('./views/marketing/salebonus/SaleBonusGridPage'))
const SaleBonusFormPage = React.lazy(() => import('./views/marketing/salebonus/SaleBonusFormPage'))

//Finance
const CashDocGridPage = React.lazy(() => import('./views/finance/cashdoc/CashDocGridPage'))
const CashDocViewPage = React.lazy(() => import('./views/finance/cashdoc/CashDocViewPage'))
const CashDocFormPage = React.lazy(() => import('./views/finance/cashdoc/CashDocFormPage'))

//References
const RefGiftGridPage = React.lazy(() => import('./views/reference/gift/RefGiftGridPage'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/hr/employees', name: 'Список сотрудников', element: EmployeeGridPage },
  { path: '/hr/employees/view/:id', name: 'Карточка сотрудника', element: EmployeeDetailedPage },
  { path: '/hr/employees/edit/:id', name: 'Редактирование сотрудника', element: EmployeeFormPage },
  { path: '/hr/employees/add', name: 'Создание сотрудника', element: EmployeeFormPage },
  { path: '/hr/structures', name: 'Структура компании', element: CompanyStructure },
  { path: '/marketing/contracts', name: 'Список договоров', element: ContractGridPage },
  { path: '/marketing/contracts/view/:id', name: 'Просмотр договора', element: ContractViewPage },
  { path: '/marketing/contracts/renew/:id', name: 'Переоформление договора', element: ContractRenewFormPage },
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
  {
    path: '/marketing/sale-types',
    name: 'Список типов продаж',
    element: SaleTypeGridPage,
  },
  {
    path: '/marketing/sale-types/add',
    name: 'Добавление типа продаж',
    element: SaleTypeFormPage,
  },
  {
    path: '/marketing/sale-types/edit/:id',
    name: 'Редактирование типа продаж',
    element: SaleTypeFormPage,
  },
  {
    path: '/marketing/docflow/approve-docs',
    name: 'Список документов на утверждении',
    element: ApproveDocGridPage,
  },
  {
    path: '/marketing/docflow/approve-docs/view/:id',
    name: 'Просмотр документа на утверждении',
    element: ApproveDocDetailedPage,
  },
  {
    path: '/marketing/sale-bonuses',
    name: 'Список бонусов',
    element: SaleBonusGridPage,
  },
  {
    path: '/marketing/sale-bonuses/add',
    name: 'Добавление бонуса продаж',
    element: SaleBonusFormPage,
  },
  {
    path: '/marketing/sale-bonuses/edit/:id',
    name: 'Редактирование бонуса продаж',
    element: SaleBonusFormPage,
  },
  {
    path: '/marketing/sale-gifts',
    name: 'Список подарков',
    element: RefGiftGridPage,
  },

  { path: '/finance/cash-docs/:cashdoctype', name: 'Список документов кассы', element: CashDocGridPage },
  { path: '/finance/cash-docs/:cashdoctype/create', name: 'Добавление документа кассы', element: CashDocFormPage },
  {
    path: '/finance/cash-docs/:cashdoctype/edit/:id',
    name: 'Редактирование документа кассы',
    element: CashDocFormPage,
  },
  { path: '/finance/cash-docs/:cashdoctype/view/:id', name: 'Просмотр кассового документа', element: CashDocViewPage },
]

export default routes
