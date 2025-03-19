import React, { useEffect, useState } from "react";
import sharedStyles from "../../../styles/shared.module.css";
import styles from "./tros.module.css";
import SidebarComponent from "../../../components/sidebar/sidebar.component";
import Up from "../../../assets/up-arrow.svg";
import Refresh from "../../../assets/refresh.svg";
import More from "../../../assets/more.svg";
import PaginationComponent from "../../../components/pagination/pagination.component";
import { SortOrder } from "../pending-requests/pending-requests.page";
import UsersTableComponent from "../../../components/users-table/users-table.component";
import ButtonComponent, {
  ButtonType,
} from "../../../components/button/button.component";
import classNames from "classnames";
import Chevron from "../../../assets/chevron.svg";
import CheckboxComponent from "../../../components/checkbox/checkbox.component";
import { regulationTypes, troTypes } from "./constants";
import TROCardComponent from "../../../components/tro-card/tro-card.component";

interface FilterItem {
  title: string;
  items: { title: string; value: number }[];
  open: boolean;
  selectedItems: boolean[];
}

interface TRO {
  title: string;
  region: string;
  tra: string;
  troType: string;
  regulationType: string;
  id: string;
  dsp: string;
  effectiveDate: Date;
  publishDate: Date;
}

interface TROResponse {
  totalTROs: number;
  page: number;
  totalPages: number;
  tros: TRO[];
}

const TrosPage: React.FC = () => {
  const [filterItems, setFilterItems] = useState<FilterItem[]>([
    {
      title: "TRO type",
      items: troTypes,
      open: false,
      selectedItems: new Array(troTypes.length).fill(false),
    },
    {
      title: "Regulation type",
      items: regulationTypes,
      open: false,
      selectedItems: new Array(regulationTypes.length).fill(false),
    },
  ]);

  const [troResponse, setTroResponse] = useState<TROResponse>({
    totalTROs: 200,
    totalPages: 20,
    page: 1,
    tros: [
      {
        title: "Carnival road closures due to road works",
        region: "Midlands",
        tra: "Transport for West Midlands",
        troType: "Temporary",
        regulationType: "Dimension",
        id: "xdczgvsdfgfdsg",
        dsp: "Buchanan Computing",
        effectiveDate: new Date(),
        publishDate: new Date(),
      },
      {
        title: "Carnival road closures due to road works",
        region: "Midlands",
        tra: "Transport for West Midlands",
        troType: "Temporary",
        regulationType: "Dimension",
        id: "xdczgvsdfgfdsg",
        dsp: "Buchanan Computing",
        effectiveDate: new Date(),
        publishDate: new Date(),
      },
    ],
  });
  const trosPerPage = 5;
  const [page, setPage] = useState<number>(1);

  const handleClick = (index: number) => {
    setFilterItems((prevItems) =>
      prevItems.map((item, i) => ({
        ...item,
        open: i === index ? !item.open : false,
      }))
    );
  };

  const handleChange = (filterIndex: number, newSelectedItems: boolean[]) => {
    setFilterItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[filterIndex].selectedItems = newSelectedItems;
      return updatedItems;
    });
  };

  const handleSearchClick = () => {
    const payload = filterItems.map((item) => ({
      title: item.title,
      items: item.items,
      selectedItems: item.selectedItems,
    }));
    console.log(payload);
  };

  const hasNoSearchCriteria = () => {
    return !filterItems.some((filter) => filter.selectedItems.includes(true));
  };

  return (
    <div className={sharedStyles.content}>
      <SidebarComponent />
      <div className={sharedStyles.dynamicContent}>
        <h2>TROs</h2>
        <p>Select filters and search to view TROs</p>
        <div className={sharedStyles.card}>
          <div className={sharedStyles.tableControls}>
            <div className={sharedStyles.controlItem}>
              <div>ASC</div>
              <img src={Up} />
            </div>
            <div className={sharedStyles.controlItem}>
              <div>DESC</div>
              <img className={sharedStyles.downArrow} src={Up} />
            </div>
            <div className={sharedStyles.trailingControls}>
              <div
                className={sharedStyles.controlItem}
                onClick={() => setPage(1)}
              >
                {/* Calling setPage triggers fetching of the data */}
                <img src={Refresh}></img>
              </div>
              <div className={sharedStyles.controlItem}>
                <img className={sharedStyles.downArrow} src={Up}></img>
              </div>
              <div className={sharedStyles.controlItem}>
                <img src={More}></img>
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <p>Filter by:</p>
            <div className={styles.filters}>
              {filterItems.map((item, index) => (
                <div className={styles.filterItem}>
                  <div
                    className={classNames(styles.filterItemContainer, {
                      [styles.selected]: item.open,
                    })}
                    onClick={() => handleClick(index)}
                  >
                    <div>{item.title}</div>
                    <img
                      className={classNames(styles.chevron, {
                        [styles.chevronOpen]: item.open,
                        [styles.chevronClosed]: !item.open,
                      })}
                      src={Chevron}
                    ></img>
                  </div>
                  {item.open && (
                    <div className={styles.overlay}>
                      <CheckboxComponent
                        items={item.items}
                        selectedItems={filterItems[index].selectedItems}
                        allowSelectAll={true}
                        onChange={(newSelectedItems) =>
                          handleChange(index, newSelectedItems)
                        }
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <ButtonComponent
            text="Search"
            type={ButtonType.Primary}
            disabled={hasNoSearchCriteria()}
            onClick={handleSearchClick}
          />
        </div>
        {troResponse && (
          <div className={styles.paginationContainer}>
            <div className={styles.countContainer}>
              Showing <strong>{trosPerPage}</strong> of{" "}
              <strong>{troResponse.totalTROs}</strong> results
            </div>
            <div className={styles.paginationComponentContainer}>
              <PaginationComponent
                currentPage={page}
                totalPages={troResponse.totalPages}
                onClickDown={() => {
                  if (page === 1) return;
                  setPage((prev) => prev - 1);
                }}
                onClickNumber={(index: number) => {
                  setPage(index);
                }}
                onClickUp={() => {
                  if (page === troResponse.totalPages) return;
                  setPage((prev) => prev + 1);
                }}
              />
            </div>
          </div>
        )}
        {troResponse.tros.map((tro) => (
          <TROCardComponent
            name={tro.title}
            dsp={tro.dsp}
            effectiveDate={tro.effectiveDate}
            id={tro.id}
            publishDate={tro.publishDate}
            region={tro.region}
            regulationType={tro.regulationType}
            tra={tro.tra}
            troType={tro.troType}
          />
        ))}
      </div>
    </div>
  );
};

export default TrosPage;
