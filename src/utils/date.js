import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from "dayjs/plugin/timezone";
import utc from 'dayjs/plugin/utc'

function dateView(date) {

    dayjs.extend(utc)
    dayjs.extend(timezone)
    dayjs.locale('ko')
    dayjs.extend(relativeTime)

    return dayjs().to(dayjs(date).tz().format('YYYY-MM-DD HH:mm:ss'))
}

export default dateView