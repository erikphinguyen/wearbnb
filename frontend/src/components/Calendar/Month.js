import React from 'react';
import Day from  './Day'

function Month({ month }) {
    return (
        <div className='flex-1 grid grid-cols-7 grid-rows-5'>
            {month.map((row, i) => (
                <>
                    {row.map((day, idx) => (
                        <Day day={day} key={idx} />
                    ))}
                </>
            ))}
        </div>
    )
}

export default Month
