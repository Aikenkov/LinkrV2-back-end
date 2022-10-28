import dayjs from 'dayjs';
import advancedFormat  from 'dayjs/plugin/advancedFormat.js';
dayjs.extend(advancedFormat);

export default function orderArray(arr){
    const orderedArray = arr.sort((a, b) => {
        if (dayjs(a.time).format('x') < dayjs(b.time).format('x')) return 1;
        if (dayjs(a.time).format('x') > dayjs(b.time).format('x')) return -1;
        return 0;
    })
    return orderedArray
}