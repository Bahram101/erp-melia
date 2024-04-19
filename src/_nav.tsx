import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilChartPie,
  cilSpeedometer,
  cilPeople,
  cilHouse,
  cilMoney,
  cilSettings,
  cilTruck,
  cilBrowser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Основные',
  },
  {
    component: CNavGroup,
    name: 'HR',
    to: '/hr',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Список сотрудников',
        to: '/hr/employees',
      },
      {
        component: CNavItem,
        name: 'Структура компании',
        to: '/hr/structures',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Склад',
    to: '/whouse',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Поступление товаров',
        to: '/whouse/docs/supplies',
      },
      {
        component: CNavItem,
        name: 'Реализация товаров',
        to: '/whouse/docs/shipments',
      },
      {
        component: CNavItem,
        name: 'Отправка товаров на другой склад',
        to: '/whouse/docs/move-outs',
      },
      {
        component: CNavItem,
        name: 'Внутр. поуступления товаров',
        to: '/whouse/docs/move-ins',
      },
      {
        component: CNavItem,
        name: 'Возврат товара от клиента',
        to: '/whouse/docs/returns',
      },
      {
        component: CNavItem,
        name: 'Списание по потере',
        to: '/whouse/docs/writeoff-losts',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Маркетинг',
    to: '/marketing',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Список договоров',
        to: '/marketing/contracts',
      },
      {
        component: CNavItem,
        name: 'Типы продаж',
        to: '/marketing/sale-types',
      },
      {
        component: CNavItem,
        name: 'Документы на утверждение',
        to: '/marketing/docflow/approve-docs',
      },
      {
        component: CNavItem,
        name: 'Бонусы',
        to: '/marketing/sale-bonuses',
      },
      {
        component: CNavItem,
        name: 'Подарки',
        to: '/marketing/sale-gifts',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Финанс',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Сервис платежи',
        to: '/finance/cash-docs/service-payments',
      },
      {
        component: CNavItem,
        name: 'Расходники',
        to: '/finance/cash-docs/expenses',
      },
      {
        component: CNavItem,
        name: 'Отправки из кассы',
        to: '/finance/cash-docs/move-outs',
      },
      {
        component: CNavItem,
        name: 'Постпуления в кассу',
        to: '/finance/cash-docs/move-ins',
      },
      {
        component: CNavItem,
        name: 'Перв. взносы',
        to: '/finance/cash-docs/first-payments',
      },
      {
        component: CNavItem,
        name: 'Ежем. взносы',
        to: '/finance/cash-docs/monthly-payments',
      },
      //ToDo - Начисления
      {
        component: CNavItem,
        name: 'Авансы',
        to: '/finance/cash-docs/prepayments',
      },
      {
        component: CNavItem,
        name: 'Зар. платы',
        to: '/finance/cash-docs/salaries',
      },
      {
        component: CNavItem,
        name: 'Вознаграждения',
        to: '/finance/reward-docs',
      },
      {
        component: CNavItem,
        name: 'Оплаченные вознаграждения',
        to: '/finance/cash-docs/reward-outs',
      },
      {
        component: CNavItem,
        name: 'Возврат денег контрагенту',
        to: '/finance/cash-docs/customer-returns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Сервис',
    to: '/charts',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'CRM',
    icon: <CIcon icon={cilBrowser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Звонки после продаж',
        to: '/crm/calls',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Отчеты',
  },
  {
    component: CNavGroup,
    name: 'Склад',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Остатки',
        to: '/report/whouse/goods-in-whouses',
      },
      {
        component: CNavItem,
        name: 'Поиск по сер. номеру',
        to: '/report/whouse/goods-findby-sernumber',
      },
      {
        component: CNavItem,
        name: 'Движение товаров',
        to: '/report/whouse/goods-flow',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Маркетинг',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Отчет по продажам',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Отчет по продажам-2',
        to: '/report/marketing/sales-2',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Финанс',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Справочники',
  },
  {
    component: CNavGroup,
    name: 'Системные',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Склад',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Группа товаров',
        to: '/reference/goods-groups',
      },
      {
        component: CNavItem,
        name: 'Товары',
        to: '/reference/goods',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Финанс',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Контрагенты',
        to: '/reference/customers',
      },
      {
        component: CNavItem,
        name: 'Статьи',
        to: '/reference/exp-in-items',
      },
      {
        component: CNavItem,
        name: 'Кассы',
        to: '/reference/cashes',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Сервис',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
    ],
  },
]

export default _nav
