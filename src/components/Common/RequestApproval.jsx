import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Images from '../../pages/Images.jsx';
// import UserName from '../../assets/Images/user_img.svg';
// import ConfirmCheck from '../../assets/Images/user_img.svg';

const RequestApproval = () => {

    const [requestApproval, setRequestApproval] = useState([
        {
            id: 1,
            task: 'Timesheet',
            day: '30-Jan-2025',
        },
        {
            id: 2,
            task: 'Expense Submission',
            day: '26-Feb-2025',
        },
        {
            id: 3,
            task: 'Leave',
            day: '15-Mar-2025',
        },
    ])

    return (
        <div className='Req_App_container' style={{ height: '240px', overflow: 'auto', gap: '18px'}}>
            {requestApproval.map(requestApprovals => (
                <div className="Req_App_details" key={requestApprovals.id}>
                    <div className="Req_App_task_date">
                        <div className="RA_icon">
                            <img src={Images.TaskCheck} alt="" />
                        </div>
                        <div className="RA_Content">
                            <span className="Req_App_task">{requestApprovals.task}</span>
                            <span className="Req_App_day">{requestApprovals.day}</span>
                        </div>
                    </div>
                    <div className="Req_App_icon">
                        <i><img src={Images.UserName} /></i>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RequestApproval;