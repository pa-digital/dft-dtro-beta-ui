import React, { useEffect, useState } from "react";
import styles from "./user-details.module.css";
import SidebarComponent from "../../../components/sidebar/sidebar.component";
import NavLinkComponent from "../../../components/nav-link/nav-link.component";
import { useLocation } from "react-router";
import useAuthNavigate from "../../../hooks/use-auth-navigate";
import InputComponent, {
  InputType,
} from "../../../components/input/input.component";
import ButtonComponent, {
  ButtonType,
} from "../../../components/button/button.component";
import AppListTableComponent from "../../../components/app-list-table/app-list-table.component";
import { App } from "../../app-list/app-list.page";
import ModalComponent from "../../../components/modal/modal.component";
import { Routes as r } from "../../../constants/routes";
import axiosInstance from "../../../utils/axios-instance";
import { Endpoints } from "../../../constants/endpoints";

const UserDetailsPage: React.FC = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useAuthNavigate();

  const [userApps, setUserApps] = useState<App[]>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    fetchUserAppDetails(user?.id);
  }, []);

  const fetchUserAppDetails = async (userID: string): Promise<void> => {
    try {
      const response = await axiosInstance.get(`${Endpoints.UserDetails}/${userID}`);
      setUserApps(response.data.applications);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(userApps);
  }, [userApps]);

  const handleDeleteOnClick = (): void => {
    console.log(`Deleting user ${user?.id}`);
    setShowDeleteModal(false);
    navigate(r.CSO.Users);
  };

  return (
    <>
      <div className={styles.content}>
        <SidebarComponent />
        <div className={styles.dynamicContent}>
          <NavLinkComponent text="All Users" link={r.CSO.Users} />
          <h2>{user?.name}</h2>
          <h3>Account and user details</h3>
          {user && (
            <div className={styles.inputContainer}>
              <InputComponent
                type={InputType.Text}
                value={user?.name}
                editable={false}
                label="Username"
              />
              <InputComponent
                type={InputType.Text}
                value={user?.email}
                editable={false}
                label="Email"
              />
              <ButtonComponent
                type={ButtonType.Warning}
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </ButtonComponent>
            </div>
          )}
          <h3>All apps for {user?.name}</h3>
          {userApps && (
            <AppListTableComponent apps={userApps} readOnly={true} />
          )}
        </div>
      </div>
      {showDeleteModal && (
        <div className={styles.modalContainer}>
          <ModalComponent
            title={`Confirm deletion of user ${user?.name}`}
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
