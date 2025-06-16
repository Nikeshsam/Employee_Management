import React, { useState } from 'react';

const AttendanceSummary = () => {
    const [data, setEvents] = useState([
        {
            label: 'Absent',
            value: 8,
            varient:'absent'
        },
        {
            label: 'Present',
            value: 107,
            varient:'present'
        },
        {
            label: 'On leave',
            value: 6,
            varient:'on-leave'
        },
        {
            label: 'Sick leave',
            value: 6,
            varient:'sick-leave'
        },
    ]);

    return (
        <div className="AttendanceSummary">
            {data.map((item, idx) => (
                <div key={idx} className="flex items-center">
                    <div className={`att_dot ${item.dot, item.varient}`}></div>
                    <div className="att_data">{item.label}</div>
                    <div className="att_value">{item.value}</div>
                </div>
            ))}
        </div>
    );
};

export default AttendanceSummary;



