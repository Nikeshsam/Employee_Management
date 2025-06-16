import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import EventUser from '../../assets/Images/event_user.svg';

const UpcomingEvents = ()=> {
  
  // Sample data for upcoming events.
  
  const [events, setEvents] = useState([
    {
      id: 1,
      date: 'July 29',
      time: '09.00AM - 05.00PM',
      title: 'Company Training',
      description: 'Brief description of the event..',
      actionButtonText: 'Zoom Meeting',
      icons: [EventUser, EventUser, EventUser, EventUser]
    },
    {
      id: 2,
      date: 'August 5',
      time: '10.00AM - 04.00PM',
      title: 'Team Building Activity',
      description: 'Brief description of the event..',
      actionButtonText: 'Zoom Meeting',
      icons: [EventUser, EventUser, EventUser, EventUser]
    },
    // Add more events as needed
  ]);

  return (
    <div className='UPC_event_container'>
      {events.map(event => (
        <div className='UPC_event' key={event.id}>
          <div className="event_details">
            <div className="event_date_time">
              <span className="event_day">{event.date}</span>
              <span className="event_time">{event.time}</span>
            </div>
            <div className="event_info">
              <h4 className='event_title'>{event.title}</h4>
              <p className='event_description'>{event.description}</p>
            </div>
          </div>
          <div className="event_actions">
            <button className='event_action_button'>{event.actionButtonText}</button>
            <ul className='event_user_icons'>
              {event.icons.map((icon, index) => (
                <li key={index}><img src={icon} alt={`Event Icon ${index + 1}`} /></li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UpcomingEvents;
