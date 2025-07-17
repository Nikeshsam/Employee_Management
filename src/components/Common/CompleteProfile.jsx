import { CustomModal } from "../../pages/Props";
import { useState,useEffect } from "react";
import Images from '../../pages/Images.jsx';
import { Image } from "lucide-react";
const CompleteProfile = ({setActiveTab}) => {

    const [modalShow, setModalShow] = useState(true); // Modal shows on initial render
    
    
      const handleClearClick = () => {
        setModalShow(false);
      };
    
      const handleModalSubmit = () => {
        // Handle registration logic here
        setActiveTab('Company Profile');
        console.log('Register clicked');
        setModalShow(false);
      };

      useEffect(() => {
          const timer = setTimeout(() => {
            setModalShow(true);
          }, 1000); // 1000ms = 1 second
      
          return () => clearTimeout(timer); // cleanup
        }, []);
      

    return ( <CustomModal
        show={modalShow}
        onHide={handleClearClick}
        //title="Register"
        //subtitle='Start your 7-day free trial.'
        className='DialogueModal'
        bodyContent={
          <>
          <div className='diaImg'>
            <Image src={Images.ORGprofile}></Image>
          </div>
          <div className='daiContent'>
            <h5>Complete Your Profile</h5>
            <p>First, complete the <span>Organization Profile,</span> then proceed to the other details.</p>
          </div>
          </>
        }
        onSubmit={handleModalSubmit}
        footerButtonSubmit="Let's Complete"
        footerButtonCancel="Back"
        footerButtonSubmitClass="modal_primary_btn w-100"
        footerButtonCancelClass="modal_primary_border_btn w-100"
      /> );
}
 
export default CompleteProfile;