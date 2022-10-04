import dayjs from 'dayjs'

export function getMonth(month = dayjs().month()) {
    const year = dayjs().year()
    // creates the first day of the month
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;

    const daysMatrix = new Array(5).fill([].map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++
            return dayjs(new Date(year, month, currentMonthCount))
        })
    }));
    return (
        <>
            {/* {daysMatrix} */}
            <div className='h-screen flex flex-columns'>
                <div>

                </div>
            </div>
        </>
    )
}
