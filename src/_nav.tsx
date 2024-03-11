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
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
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
        name: 'Login',
        to: '/login',
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
        name: 'Login',
        to: '/login',
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
        name: 'Login',
        to: '/login',
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
