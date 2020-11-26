import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
  // const date = parseISO(dateString)
  // return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
  return <time>{format(dateString, 'LLLL d, yyyy')}</time>
}