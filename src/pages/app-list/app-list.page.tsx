import React, { useEffect, useState } from "react";
import styles from "./app-list.module.css";
import sharedStyles from "../../styles/shared.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import AppListTableComponent from "../../components/app-list-table/app-list-table.component";
import PaginationComponent from "../../components/pagination/pagination.component";
import SpinnerComponent from "../../components/spinner/spinner.component";
import AppService from "../../services/application";

export enum AppType {
  Publisher = "Publisher",
  Consumer = "Consumer",
}

interface AppView {
  results: App[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface App {
  id: string;
  name: string;
  type: AppType;
  tra?: string;
}

const AppListPage: React.FC = () => {
  const [apps, setApps] = useState<AppView>();
  const [page, setPage] = useState<number>(1);
  const appsPerPage = 2;

  useEffect(() => {
    fetchApps(page);
  }, []);

  useEffect(() => {
    fetchApps(page);
  }, [page]);

  const fetchApps = async (page: number): Promise<void> => {
    try {
      const token = ""; // TODO: add token from login
      const data = await AppService.getApplications(page, appsPerPage, token);
      setApps(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Home" />
      <div className={styles.headerContainer}>
        <h2>View and refresh app credentials</h2>
      </div>
      {!apps && <div className={sharedStyles.loadingContainer}><SpinnerComponent /></div>}
      {apps && apps.results.length > 0 && <div>
        <p className={styles.info}>
          Click view to see details of your app and to generate new credentials.
        </p>
        <div className={styles.paginationContainer}>
          {apps.totalCount > 1 && <PaginationComponent
            currentPage={page}
            totalPages={apps.totalCount}
            onClickDown={() => {
              if (apps.page === 1) return;
              setPage(apps.page - 1);
            }}
            onClickNumber={(index: number) => {
              setPage(index);
            }}
            onClickUp={() => {
              if (apps.page === apps.totalCount) return;
              setPage(apps.page + 1);
            }}
          />}
        </div>
        <AppListTableComponent apps={apps.results} />
      </div>}
      {apps?.results.length == 0 && <p className={styles.info}>There are no apps to display</p>}
    </div>
  );
};

export default AppListPage;
