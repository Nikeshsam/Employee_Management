import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TaskReminder from '../../assets/Images/task_remi.svg';

const TaskList = ()=> {

    // ARRAY STRUCTURE FOR TASKS
    // Each task has an id, title, description, duration, and notification

    const [tasks, setTask] = useState( [
        { 
            id: 1, 
            title: 'Schedule Performance Reviews', 
            description: 'Description for Task 1', 
            duration: '2 ongoing', 
            notification: 'Due this month' 
        },
        { 
            id: 2, 
            title: 'Plan Training Sessions', 
            description: 'Schedule and plan training sessions', 
            duration: 'ASAP', 
            notification: 'Due next week' 
        },
        { 
            id: 3, 
            title: 'Schedule Performance Reviews', 
            description: '4 reviews pending scheduling', 
            duration: '2 ongoing', 
            notification: 'Due this month' 
        },
        { 
            id: 4, 
            title: 'Plan Training Sessions', 
            description: 'Schedule and plan training sessions', 
            duration: 'ASAP', 
            notification: 'Due next week' 
        }
    ]);

    return(
        <div className="task_reminder_container">
            {tasks.map(task => (
                <div className="task_reminder_content" key={task.id}>
                    <div className="task_rem_left">
                        <div className="task_rem_icon">
                            <i><img src={TaskReminder} alt="" /></i>
                        </div>
                        <div className="task_rem_content">
                            <h5>{task.title}</h5>
                            <p>{task.description}</p>
                        </div>
                    </div>
                    <div className="task_rem_right">
                        <div className="task_noti_dur">
                            <span className="task_dur">{task.duration}</span>
                            <span className="task_noti">{task.notification}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TaskList;


