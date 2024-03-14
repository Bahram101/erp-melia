import { RefOptionsModel } from '../models/CommonModels'

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

export const genderList = [
  {
    id: '1',
    label: 'MALE',
  },
  {
    id: '2',
    label: 'FEMALE',
  },
]
