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


export const getCallResultOptions = () => {
  return [
    {
      id: 'NO_ANSWER',
      label: 'Не отвечает'
    },
    {
      id: 'NOT_AVAILABLE',
      label: 'Не доступен'
    },
    {
      id: 'RECALL',
      label: 'Перезвонить'
    },
    {
      id: 'POSITIVE',
      label: 'Положительный'
    },
    {
      id: 'NEGATIVE',
      label: 'Отрицательный'
    },
    {
      id: 'WRONG_NUMBER',
      label: 'Ошиблись номером'
    },
  ]
}
export const getGenderOptions  = [
  {
    id: 'MALE',
    label: 'Муж.',
  },
  {
    id: 'FEMALE',
    label: 'Жен.',
  },
]

export const getUserStatusOptions  = [
  {
    id: 'ACTIVE',
    label: 'ACTIVE',
  },
  {
    id: 'BLOCKED',
    label: 'BLOCKED',
  },
]
