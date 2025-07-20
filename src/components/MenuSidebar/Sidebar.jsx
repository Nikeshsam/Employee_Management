import 'bootstrap/dist/css/bootstrap.css';
import Images from '../../pages/Images.jsx';
import { useLoginUser } from '../../context/LoginUserContext.jsx';



const Sidebar = ({ handleSidebarClick, activeTab }) => {
  const { loginUser } = useLoginUser();
  return (
    <>
      <div className='sidebar_content'>
        <div className='Innerlogo'>
          <img src={Images.InnerLogo} alt="Logo" />
        </div>
        <ul className='sidebar_menu'>
          {loginUser?.user?.role === 'admin' &&
            <li onClick={() => handleSidebarClick('Dashboard')} className={activeTab === 'Dashboard' ? 'active' : ''}>
              <i><img src={Images.Dashboard} alt="Dashboard" /></i>
              <span>Dashboard</span>
            </li>
          }

          <li onClick={() => handleSidebarClick('On-Boarding')} className={activeTab === 'On-Boarding' ? 'active' : ''}>
            <i><img src={Images.OnBoarding} alt="OnBoarding" /></i>
            <span>On Boarding</span>
          </li>

          {loginUser?.user?.role === 'admin' &&
            <li onClick={() => handleSidebarClick('Company Profile')} className={activeTab === 'Company Profile' ? 'active' : ''}>
              <i><img src={Images.CompanyProfile} alt="Company Profile" /></i>
              <span>Company Profile</span>
            </li>
          }
          {loginUser?.user?.role === 'admin' &&
            <li onClick={() => handleSidebarClick('Add Employee')} className={activeTab === 'Add Employee' ? 'active' : ''}>
              <i><img src={Images.AddEmployee} alt="Add Employee" /></i>
              <span>Add Employee</span>
            </li>
          }
        </ul>
      </div>
      <div className="sidebar_setting">
        <ul className='sidebar_menu'>
          <li>
            <i><img src={Images.Logout} alt="Logout" /></i>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
