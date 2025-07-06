import 'bootstrap/dist/css/bootstrap.css';

import InnerLogo from '../../assets/Images/Logo.svg';
import Dashboard from '../../assets/Images/dashboard.svg';
import OnBoarding from '../../assets/Images/on-boarding.svg';

const Sidebar = ({ handleSidebarClick, activeTab }) => {
  return (
    <div className='sidebar_content'>
      <div className='Innerlogo'>
        <img src={InnerLogo} alt="Logo" />
      </div>
      <ul className='sidebar_menu'>
        <li onClick={() => handleSidebarClick('Dashboard')} className={activeTab === 'Dashboard' ? 'active' : ''}>
          <i><img src={Dashboard} alt="Dashboard" /></i>
          <span>Dashboard</span>
        </li>
        <li onClick={() => handleSidebarClick('On-Boarding')} className={activeTab === 'On-Boarding' ? 'active' : ''}>
          <i><img src={OnBoarding} alt="OnBoarding" /></i>
          <span>On Boarding</span>
        </li>
        <li onClick={() => handleSidebarClick('Company Profile')} className={activeTab === 'Company Profile' ? 'active' : ''}>
          <i><img src={OnBoarding} alt="Company Profile" /></i>
          <span>Company Profile</span>
        </li>
        <li onClick={() => handleSidebarClick('Add Employee')} className={activeTab === 'Add Employee' ? 'active' : ''}>
          <i><img src={OnBoarding} alt="Add Employee" /></i>
          <span>Add Employee</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
