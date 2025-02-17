import React, { useEffect, useState } from "react";
import styles from "./app-list.module.css";
import NavLinkComponent from "../../components/nav-link/nav-link.component";
import TableComponent from "../../components/table/table.component";
import Chevron from "../../assets/chevron.svg";
import classNames from "classnames";

enum AppType {
  Publisher = "Publisher",
  Consumer = "Consumer",
}

interface AppView {
  pages: number;
  currentPage: number;
  apps: App[];
}

interface App {
  name: string;
  type: AppType;
  tra?: string;
}

const AppListPage: React.FC = () => {
  const [apps, setApps] = useState<AppView>();
  const [page, setPage] = useState<number>(1);
  const allApps: App[] = [
    {
      name: "Surrey County Council PUB",
      type: AppType.Publisher,
      tra: "Surrey County Council",
    },
    {
      name: "Surrey County Council PUB",
      type: AppType.Publisher,
      tra: "Surrey County Council",
    },
    {
      name: "Surrey County Council PUB",
      type: AppType.Publisher,
      tra: "Surrey County Council",
    },
    {
      name: "Surrey County Council PUB",
      type: AppType.Publisher,
      tra: "Surrey County Council",
    },
    {
      name: "Surrey County Council PUB",
      type: AppType.Publisher,
      tra: "Surrey County Council",
    },
    {
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
      name: "Blurrey County Council PUB",
      type: AppType.Consumer,
      tra: "Blurrey County Council",
    },
    {
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
    const appsPerPage = 5;
    const startIndex = (page - 1) * appsPerPage;
    const endIndex = startIndex + appsPerPage;
    const apps = allApps.slice(startIndex, endIndex);
    setApps({
      pages: Math.floor(allApps.length / appsPerPage) + 1,
      currentPage: page,
      apps,
    });
  };

  return (
    <div className={styles.content}>
      <NavLinkComponent text="Home" link="/" />
      <div className={styles.headerContainer}>
        <h2>View and refresh app credentials</h2>
      </div>
      <p>
        Click view to see details of your test production app and to generate
        new credentials.
      </p>
      {apps && (
        <div className={styles.paginationContainer}>
          <img
            className={classNames(styles.chevron, styles.chevronBack, {
              [styles.chevronDisabled]: apps.currentPage === 1,
            })}
            src={Chevron}
            onClick={() => {
              if (apps.currentPage === 1) return;
              setPage(apps.currentPage - 1);
            }}
          ></img>
          {Array.from({ length: apps?.pages || 1 }, (_, index) => (
            <p
              className={classNames(styles.pageLink, {
                [styles.activePage]: index === apps.currentPage - 1,
              })}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </p>
          ))}
          <img
            className={classNames(styles.chevron, {
              [styles.chevronDisabled]: apps.currentPage === apps.pages,
            })}
            src={Chevron}
            onClick={() => {
              if (apps.currentPage === apps.pages) return;
              setPage(apps.currentPage + 1);
            }}
          ></img>
        </div>
      )}
      <TableComponent
        headers={["Name", "Type", "Linked TRA", "Action"]}
        content={
          apps?.apps.map((app) =>
            Object.values(app).map((value) =>
              value !== null ? String(value) : null
            )
          ) || []
        }
      />
    </div>
  );
};

export default AppListPage;
