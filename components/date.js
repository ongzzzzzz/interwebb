import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
  dateString = dateString ? dateString : '2020-20-20'
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}