import React, { useEffect, useState } from "react";
import styles from "./app-list.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import AppListTableComponent from "../../components/app-list-table/app-list-table.component";
import PaginationComponent from "../../components/pagination/pagination.component";

enum AppType {
  Publisher = "Publisher",
  Consumer = "Consumer",
}

interface AppView {
  pages: number;
  currentPage: number;
  apps: App[];
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
  const appsPerPage = 5;
  const allApps: App[] = [
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Surrey County Council PUB",
      type: AppType.Publisher,
      tra: "Surrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Surrey County Council PUB",
      type: AppType.Publisher,
      tra: "Surrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Surrey County Council PUB",
      type: AppType.Publisher,
      tra: "Surrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Surrey County Council PUB",
      type: AppType.Publisher,
      tra: "Surrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Surrey County Council PUB",
      type: AppType.Publisher,
      tra: "Surrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      id: "9abeda12-a123-4104-9b6a-2bb6a95339ab",
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
  ];

  useEffect(() => {
    // TODO: fetch apps from the backend for this page
    fetchApps(page);
  }, []);

  useEffect(() => {
    fetchApps(page);
  }, [page]);

  const fetchApps = (page: number): void => {
    const startIndex = (page - 1) * appsPerPage;
    const endIndex = startIndex + appsPerPage;
    const apps = allApps.slice(startIndex, endIndex);
    setApps({
      pages: Math.ceil(allApps.length / appsPerPage),
      currentPage: page,
      apps,
    });
  };

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Home" />
      <div className={styles.headerContainer}>
        <h2>View and refresh app credentials</h2>
      </div>
      <p className={styles.info}>
        Click view to see details of your test production app and to generate
        new credentials.
      </p>
      {apps && (
        <div className={styles.paginationContainer}>
          <PaginationComponent
            currentPage={page}
            totalPages={Math.ceil(allApps.length / appsPerPage)}
            onClickDown={() => {
              if (apps.currentPage === 1) return;
              setPage(apps.currentPage - 1);
            }}
            onClickNumber={(index: number) => {
              setPage(index);
            }}
            onClickUp={() => {
              if (apps.currentPage === apps.pages) return;
              setPage(apps.currentPage + 1);
            }}
          />
        </div>
      )}
      {apps && <AppListTableComponent apps={apps.apps} />}
    </div>
  );
};

export default AppListPage;
