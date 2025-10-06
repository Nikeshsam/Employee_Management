import 'bootstrap/dist/css/bootstrap.css';
import Images from '../../pages/Images.jsx';
import { useLoginUser } from '../../context/LoginUserContext.jsx';
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ handleSidebarClick, activeTab }) => {
  const { loginUser,clearLoginUser } = useLoginUser();

  const navigate = useNavigate();
  const handleLogout = () => {
    clearLoginUser();
    navigate('/Authentication');
  }

  const menuItems = [
    {
      label: "Dashboard",
      key: "Dashboard",
      icon: Images.Dashboard,
      roles: ["admin", "user"], // only admin
    },
    {
      label: "On Boarding",
      key: "On-Boarding",
      icon: Images.OnBoarding,
      roles: ["user"], // both can see
    },
    {
      label: "Company Profile",
      key: "Company Profile",
      icon: Images.CompanyProfile,
      roles: ["admin"], // only admin
    },
    {
      label: "Add Employee",
      key: "Add Employee",
      icon: Images.AddEmployee,
      roles: ["admin"], // only admin
    },
    {
      label: "Manage Holidays",
      key: "Manage Holidays",
      icon: Images.ManageHoliday,
      roles: ["admin"], // only admin
    },
  ];

  return (
    <>
      <div className='sidebar_content'>
        <div className='Innerlogo'>
          <img src={Images.InnerLogo} alt="Logo" />
        </div>
        <ul className="sidebar_menu">
          {menuItems
            .filter(item => item.roles.includes(loginUser?.user?.role)) // show only allowed
            .map(item => (
              <li
                key={item.key}
                onClick={() => handleSidebarClick(item.key)}
                className={activeTab === item.key ? "active" : ""}
              >
                <i><img src={item.icon} alt={item.label} /></i>
                <span>{item.label}</span>
              </li>
            ))}
        </ul>
      </div>
      <div className="sidebar_setting">
        <ul className='sidebar_menu'>
          <li onClick={handleLogout}>
            <i><img src={Images.Logout} alt="Logout" /></i>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
