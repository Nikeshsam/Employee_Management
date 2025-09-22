import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const HolidayList = () => {

  const [holidayLists, setHolidayList] = useState([
    {
      id: 1,
      title: 'New Year',
      date: 'Jan - 01',
      day: 'Wednesday',
    },
    {
      id: 2,
      title: 'Pongal',
      date: 'Jan - 14',
      day: 'Wednesday',
    },
    {
      id: 3,
      title: 'Republic Day',
      date: 'Jan - 26',
      day: 'Wednesday',
    },
    {
      id: 4,
      title: 'Independence Day',
      date: 'Aug - 15',
      day: 'Wednesday',
    },
    {
      id: 5,
      title: 'Christmas',
      date: 'Dec - 25',
      day: 'Wednesday',
    },
  ])

  return (
    <div className="holiday_list_container" style={{height: '240px' }}>
      {holidayLists.map(holidayList => (
        <div className="holiday_list_content" key={holidayList.id}>
          <div className="holiday_list_left">
            <h5>{holidayList.title}</h5>
          </div>
          <div className="holiday_list_right">
            <span className="holiday_date">{holidayList.date}</span>
            <span className="holiday_day">{holidayList.day}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HolidayList
