import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import CalendarHeader from './CalendarHeader.js'
import Sidebar from './Sidebar.js';
import Month from './Month.js';

function Calendar(month = dayjs().month()) {
    const year = dayjs().year()
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;

    const [currentMonth, setCurrentMonth] = useState([]);

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

export default Calendar;
