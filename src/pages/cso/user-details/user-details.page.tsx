import React, { useEffect, useState } from "react";
import styles from "./user-details.module.css";
import SidebarComponent from "../../../components/sidebar/sidebar.component";
import NavLinkComponent from "../../../components/nav-link/nav-link.component";
import { useLocation, useNavigate } from "react-router";
import { User, UserStatus } from "../active-users/active-users.page";
import InputComponent, {
  InputType,
} from "../../../components/input/input.component";
import ButtonComponent, {
  ButtonType,
} from "../../../components/button/button.component";
import AppListTableComponent from "../../../components/app-list-table/app-list-table.component";
import { App, AppType } from "../../app-list/app-list.page";
import ModalComponent from "../../../components/modal/modal.component";

const UserDetailsPage: React.FC = () => {
  const location = useLocation();
  const userID = location.state?.userID;
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState<User>();
  const [userApps, setUserApps] = useState<App[]>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    // TODO: Fetch user details for this user ID
    const userDetails = fetchUserDetails(userID);
    setUserDetails(userDetails);

    // Fetch app details for this user ID
    const userApps = fetchUserAppDetails(userID);
    setUserApps(userApps);
  }, []);

  const fetchUserDetails = (userID: string): User => {
    return {
      id: userID,
      user: "Test User",
      email: "user@test.com",
      role: "",
      createdOn: new Date(),
      status: UserStatus.Active,
    };
  };

  const fetchUserAppDetails = (userID: string): App[] => {
    return [
      {
        id: "some app ID",
        name: "My Test App",
        type: AppType.Publisher,
        tra: "Some TRA",
      },
      {
        id: "another app ID",
        name: "Another App",
        type: AppType.Consumer,
      },
    ];
  };

  const handleDeleteOnClick = (): void => {
    console.log(`Deleting user ${userDetails?.user}`);
    setShowDeleteModal(false);
    navigate(-1);
  };

  return (
    <>
      <div className={styles.content}>
        <SidebarComponent />
        <div className={styles.dynamicContent}>
          <NavLinkComponent text="All Users" />
          <h2>{userDetails?.user}</h2>
          <h3>Account and user details</h3>
          {userDetails && (
            <div className={styles.inputContainer}>
              <InputComponent
                type={InputType.Text}
                value={userDetails.user}
                editable={false}
                label="Username"
              />
              <InputComponent
                type={InputType.Text}
                value={userDetails.email}
                editable={false}
                label="Email"
              />
              {userDetails.status === UserStatus.Active && (
                <ButtonComponent
                  type={ButtonType.Warning}
                  text="Delete"
                  onClick={() => setShowDeleteModal(true)}
                />
              )}
            </div>
          )}
          <h3>All apps for {userDetails?.user}</h3>
          {userApps && (
            <AppListTableComponent apps={userApps} readOnly={true} />
          )}
        </div>
      </div>
      {showDeleteModal && (
        <div className={styles.modalContainer}>
          <ModalComponent
            title={`Confirm deletion of user ${userDetails?.user}`}
            subtitle="This action is permanent and you will not be able to reverse this"
            buttonText="Delete"
            buttonType={ButtonType.Warning}
            onClick={handleDeleteOnClick}
            cancelOnClick={() => setShowDeleteModal(false)}
          />
        </div>
      )}
      {showDeleteModal && <div className={styles.overlay}></div>}
    </>
  );
};

export default UserDetailsPage;
