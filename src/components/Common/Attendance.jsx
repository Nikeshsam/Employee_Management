import React from 'react'

function Attendance() {
  return (
    <div className='Attendance_container' style={{ height: '240px', overflow: 'auto', gap: '18px'}}>
      <div className='Attendance_content'>
        <div className='Attendance_timer'>
          <div className='Attendance_Start_date'>
            <span className='Attendance_start_time'>
              Stated at <i>10:00</i>
            </span>
            <span className='Attendance_date'>
              7 Jan 2020
            </span>
          </div>
          <div className='Attendance_clock'>
            <span>00:00:00 Hrs</span>
          </div>
          <div className='Attendance_action_button'>
            <button type='button' className='checkIn'>Check In</button>
            <button type='button' className='Break'>Take a Break</button>
            <div className='breakContent'><label htmlFor="">Break time left</label>  <span>30 min</span></div>
          </div>
        </div>
        <div className='Attendance_details'>
          <span>09 AM</span>
          <span>General</span>
          <span>06 pm</span>
        </div>
      </div>
    </div>
  )
}

export default Attendance
