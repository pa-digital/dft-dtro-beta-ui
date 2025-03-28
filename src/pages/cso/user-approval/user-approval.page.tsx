import React, { useEffect, useState } from "react";
import styles from "./user-approval.module.css";
import NavLinkComponent from "../../../components/nav-link/nav-link.component";
import { useLocation } from "react-router-dom";
import InputComponent, {
  InputType,
} from "../../../components/input/input.component";
import ButtonComponent, {
  ButtonType,
} from "../../../components/button/button.component";
import ModalComponent from "../../../components/modal/modal.component";

interface UserDetails {
  userId: string;
  date: Date;
  email: string;
  dsp: string;
}

const CSOUserApprovalPage: React.FC = () => {
  const [applicationDetails, setApplicationDetails] = useState<UserDetails>();
  const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    const userId = location.state?.userId;
    setApplicationDetails({
      userId: userId,
      date: new Date(),
      email: "user@test.com",
      dsp: "Some DSP",
    });
  }, []);

  const handleOnClick = (): void => {
    setShowApprovalModal(true);
  };

  const approveUser = (): void => {
    console.log(`User ${applicationDetails?.userId} approved`);
    setShowApprovalModal(false);
    // TODO: navigate user back to pending requests page
  };

  return (
    <div className={styles.content}>
      <NavLinkComponent text="All requests" />
      <div className={styles.headerContainer}>
        <h2>{`Request: ${applicationDetails?.userId}`}</h2>
        <h2>{applicationDetails?.date.toDateString()}</h2>
      </div>
      {applicationDetails && (
        <div className={styles.container}>
          <h2>Review and approve new account request</h2>
          <div className={styles.inputContainer}>
            <InputComponent
              type={InputType.Text}
              value={applicationDetails.dsp}
              editable={false}
            />
            <InputComponent
              type={InputType.Text}
              value={applicationDetails.email}
              editable={false}
            />
            <ButtonComponent
              type={ButtonType.Primary}
              onClick={handleOnClick}
            >
              Approve
            </ButtonComponent>
          </div>
        </div>
      )}
      {showApprovalModal && (
        <div className={styles.modalContainer}>
          <ModalComponent
            title="Confirm user approval"
            subtitle="Are you sure you want to approve this user?"
            buttonText="Approve"
            buttonType={ButtonType.Primary}
            onClick={approveUser}
            cancelOnClick={() => setShowApprovalModal(false)}
          />
        </div>
      )}
      {showApprovalModal && <div className={styles.overlay}></div>}
    </div>
  );
};

export default CSOUserApprovalPage;
