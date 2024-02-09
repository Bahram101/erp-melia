import { RefOptionsModel } from '../models/CommonModels'

interface TitleTypes {
  [key: string]: string
}
export const DoctypesTitles: TitleTypes = {
  supplies: 'Поступление товаров',
  shipments: 'Реализация товаров',
  move_outs: 'Отправка товаров на другой склад',
  move_ins: 'Внутр. поуступления товаров',
  returns: 'Возврат товара от клиента',
  writeoff_losts: 'Списание по потере',
}

export const getYearOptions = (): RefOptionsModel[] => {
  const out: RefOptionsModel[] = []
  for (var year = 2017; year < 2031; year++) {
    out.push({
      id: year + '',
      label: year + '',
      value: year + '',
    })
  }

  return out
}

export const getMonthOptions = () => [
  {
    id: '1',
    label: 'Январь',
  },
  {
    id: '2',
    label: 'Февраль',
  },
  {
    id: '3',
    label: 'Март',
  },
  {
    id: '4',
    label: 'Апрель',
  },
  {
    id: '5',
    label: 'Май',
  },
  {
    id: '6',
    label: 'Июнь',
  },
  {
    id: '7',
    label: 'Июль',
  },
  {
    id: '8',
    label: 'Августь',
  },
  {
    id: '9',
    label: 'Сентябрь',
  },
  {
    id: '10',
    label: 'Октябрь',
  },
  {
    id: '11',
    label: 'Ноябрь',
  },
  {
    id: '12',
    label: 'Декабрь',
  },
]
