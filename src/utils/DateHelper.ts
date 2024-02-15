import moment from 'moment'

export const stringDDMMYYYYToMoment = (str: string) => {
  return moment(str, 'DD.MM.YYYY').toDate()
}

export const stringDDMMYYYYHHToMoment = (str: string) => {
  return moment(str, 'DD.MM.YYYY , h:mm').toDate()
}

export const dateToStringDDMMYYYY = (date: Date) => {
  return moment(date).format('DD.MM.YYYY')
}

export function momentToStringYYYYMMDD(date: Date) {
  return moment(date).format('YYYY.MM.DD')
}

export const addMonths = (date: Date, months: number) => {
  if (!date) {
    return date
  }
  const out = new Date(date.getTime())
  const dayOfMonth = out.getDate()
  out.setDate(1)
  out.setMonth(out.getMonth() + months)
  out.setDate(Math.min(dayOfMonth, getDaysInMonth(out.getFullYear(), out.getMonth())))

  return out
}

const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

const getDaysInMonth = (year: number, month: number) => {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
}
