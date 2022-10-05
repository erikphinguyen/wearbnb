import React, { useState } from 'react';
import dayjs from 'dayjs';
import CalendarHeader from './CalendarHeader'
import Sidebar from './Sidebar';
import Month from './Month';

function getMonth(month = dayjs().month()) {
    const year = dayjs().year()
    // creates the first day of the month
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;

    const [currentMonth, setCurrentMonth] = useState([])

    const daysMatrix = new Array(5).fill([].map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++
            return dayjs(new Date(year, month, currentMonthCount))
        })
    }));
    return (
        <>
            <div className='h-screen flex flex-columns'>
                {daysMatrix}
                <CalendarHeader />
                <div>
                    <Sidebar />
                    <Month month={currentMonth} />
                </div>
            </div>
        </>
    )
}

export default getMonth;
