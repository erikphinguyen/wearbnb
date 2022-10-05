import React, { useContext } from 'react';
import Logo from '../Navigation/wearbnb-logo.PNG';
import GlobalContext from '../../context/GlobalContext';

function CalendarHeader() {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    return (
        <header className='px-4 py-2 flex items-center'>
            <img src={Logo} width="200" alt="logo" />
            <h1 className='mr-10 text-xl text-gray-500 font-bold'>
                Calendar
            </h1>
            <button className='border rounded py-2 px-4 mr-5'>
                Today
            </button>
            <button>
                <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                    chevron_left
                </span>
            </button>
            <button>
                <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                    chevron_right
                </span>
            </button>
        </header>
    )
}

export default CalendarHeader
