import React, { useEffect, useState } from "react";
import styles from "./pending-requests.module.css";
import SidebarComponent from "../../../components/sidebar/sidebar.component";
import Up from "../../../assets/up-arrow.svg";
import Refresh from "../../../assets/refresh.svg";
import More from "../../../assets/more.svg";
import RequestsTableComponent from "../../../components/requests-table/requests-table.component";
import PaginationComponent from "../../../components/pagination/pagination.component";

interface RequestsView {
  pages: number;
  currentPage: number;
  requests: PendingRequest[];
}

export interface PendingRequest {
  id: string;
  user: string;
  type: string;
  tra: string;
  date: Date;
}

export enum SortOrder {
  Ascending = "ascending",
  Descending = "descending",
}

const PendingRequestsPage: React.FC = () => {
  const requestsPerPage = 10;
  const [requests, setRequests] = useState<RequestsView>();
  const [page, setPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Descending);
  const [allRequests, setAllRequests] = useState<PendingRequest[]>([
    {
      id: "some Id",
      user: "Ben Pauley",
      type: "Publisher account",
      tra: "Some TRA",
      date: new Date(),
    },
    {
      id: "some Id",
      user: "Ben Pauley",
      type: "Publisher account",
      tra: "Some TRA",
      date: new Date(),
    },
    {
      id: "some Id",
      user: "Ben Pauley",
      type: "Publisher account",
      tra: "Some TRA",
      date: new Date(),
    },
    {
      id: "some Id",
      user: "Ben Pauley",
      type: "Publisher account",
      tra: "Some TRA",
      date: new Date(),
    },
    {
      id: "some Id",
      user: "Ben Pauley",
      type: "Publisher account",
      tra: "Some TRA",
      date: new Date(),
    },
    {
      id: "some Id",
      user: "Ben Pauley",
      type: "Publisher account",
      tra: "Some TRA",
      date: new Date(),
    },
    {
      id: "some Id",
      user: "Ben Pauley",
      type: "Publisher account",
      tra: "Some TRA",
      date: new Date(),
    },
    {
      id: "some Id",
      user: "Ben Pauley",
      type: "Publisher account",
      tra: "Some TRA",
      date: new Date(),
    },
    {
      id: "some Id",
      user: "Ben Pauley",
      type: "Publisher account",
      tra: "Some TRA",
      date: new Date(),
    },
    {
      id: "some Id",
      user: "Ben Pauley",
      type: "Publisher account",
      tra: "Some TRA",
      date: new Date(),
    },
    {
      id: "some Id",
      user: "Ben Pauley",
      type: "Publisher account",
      tra: "Some TRA",
      date: new Date(),
    },
  ]);

  useEffect(() => {
    // TODO: fetch requests from the backend for this page
    fetchRequests(page, sortOrder);
  }, []);

  useEffect(() => {
    fetchRequests(page, sortOrder);
  }, [page, sortOrder]);

  const fetchRequests = (page: number, sortOrder: SortOrder): void => {
    const requestsPerPage = 10;
    const startIndex = (page - 1) * requestsPerPage;
    const endIndex = startIndex + requestsPerPage;
    const requests = allRequests.slice(startIndex, endIndex);
    setRequests({
      pages: Math.ceil(allRequests.length / requestsPerPage),
      currentPage: page,
      requests,
    });
  };

  return (
    <div className={styles.content}>
      <SidebarComponent />
      <div className={styles.dynamicContent}>
        <h2>Pending requests</h2>
        <p>View and action user requests</p>
        <div className={styles.card}>
          <div className={styles.cardHeader}>Request log</div>
          <div className={styles.tableControls}>
            <div className={styles.controlItem}>
              <div>ASC</div>
              <img src={Up} />
            </div>
            <div className={styles.controlItem}>
              <div>DESC</div>
              <img className={styles.downArrow} src={Up} />
            </div>
            <div className={styles.trailingControls}>
              <div className={styles.controlItem} onClick={() => setPage(1)}>
                {/* Calling setPage triggers fetching of the data */}
                <img src={Refresh}></img>
              </div>
              <div className={styles.controlItem}>
                <img className={styles.downArrow} src={Up}></img>
              </div>
              <div className={styles.controlItem}>
                <img src={More}></img>
              </div>
            </div>
          </div>
          {requests && (
            <div className={styles.tableContainer}>
              <RequestsTableComponent requests={requests.requests} />
              <PaginationComponent
                currentPage={page}
                totalPages={Math.ceil(allRequests.length / requestsPerPage)}
                onClickDown={() => setPage((prev) => prev - 1)}
                onClickNumber={(index: number) => {
                  setPage(index);
                }}
                onClickUp={() => setPage((prev) => prev + 1)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingRequestsPage;
