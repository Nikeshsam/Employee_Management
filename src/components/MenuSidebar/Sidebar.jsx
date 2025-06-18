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
        <li onClick={() => handleSidebarClick('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>
          <i><img src={Dashboard} alt="Dashboard" /></i>
          <span>Dashboard</span>
        </li>
        <li onClick={() => handleSidebarClick('onboarding')} className={activeTab === 'onboarding' ? 'active' : ''}>
          <i><img src={OnBoarding} alt="OnBoarding" /></i>
          <span>On Boarding</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
