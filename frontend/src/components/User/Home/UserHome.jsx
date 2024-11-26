import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    filterItemsBy,
  searchItemByName,
  sendUserHomeRequest,
} from "../../../services/AppServices";
import "./UserHome.css";

export default function UserHome() {
  const navigate = useNavigate();

  const [userHomeObj, setUserHomeObj] = useState({
    items: [],
    searchValue: "",
    ascSortDirection: true,
    sortBy: 1,
    watchedIconActive: false,
    seriesIconActive: false,
    moviesIconActive: false,
  });

  useEffect(() => {
    if (
      window.localStorage.getItem("userId") == null ||
      window.localStorage.getItem("username") == null ||
      window.localStorage.getItem("password") == null
    ) {
      navigate("/login");
    } else {
      sendUserHomeRequest(
        window.localStorage.getItem("userId"),
        window.localStorage.getItem("username"),
        window.localStorage.getItem("password")
      ).then((res) => {
        setUserHomeObj({...userHomeObj, items: res.data.response});
      });
    }
  }, []);
  

  const showWatchedItems = () => {
    if(!userHomeObj.watchedIconActive) {
        filterItemsBy("watched", window.localStorage.getItem("username"), window.localStorage.getItem("password"), window.localStorage.getItem("userId"))
        .then(res => {
            setUserHomeObj({...userHomeObj, items: res.data.response, watchedIconActive: !userHomeObj.watchedIconActive, seriesIconActive: false, moviesIconActive: false});
        })
      } else {
        sendUserHomeRequest(
            window.localStorage.getItem("userId"),
            window.localStorage.getItem("username"),
            window.localStorage.getItem("password")
          ).then((res) => {
            setUserHomeObj({...userHomeObj, items: res.data.response, watchedIconActive: !userHomeObj.watchedIconActive, seriesIconActive: false, moviesIconActive: false});
          })
    }
    
  }

  const showSeriesItems = () => {
    if(!userHomeObj.seriesIconActive) {
        filterItemsBy("series", window.localStorage.getItem("username"), window.localStorage.getItem("password"), window.localStorage.getItem("userId"))
        .then(res => {
        setUserHomeObj({...userHomeObj, items: res.data.response, seriesIconActive: !userHomeObj.seriesIconActive, watchedIconActive: false, moviesIconActive: false});
    })
    } else {
        sendUserHomeRequest(
            window.localStorage.getItem("userId"),
            window.localStorage.getItem("username"),
            window.localStorage.getItem("password")
          ).then((res) => {
            setUserHomeObj({...userHomeObj, items: res.data.response, seriesIconActive: !userHomeObj.seriesIconActive, watchedIconActive: false, moviesIconActive: false});
          });
    }
  }

  const showMovieItems = () => {
    if(!userHomeObj.moviesIconActive) {
        filterItemsBy("movies", window.localStorage.getItem("username"), window.localStorage.getItem("password"), window.localStorage.getItem("userId"))
        .then(res => {
            setUserHomeObj({...userHomeObj, items: res.data.response, moviesIconActive: !userHomeObj.moviesIconActive, seriesIconActive: false, watchedIconActive: false});
    })
    } else {
        sendUserHomeRequest(
            window.localStorage.getItem("userId"),
            window.localStorage.getItem("username"),
            window.localStorage.getItem("password")
          ).then((res) => {
            setUserHomeObj({...userHomeObj, items: res.data.response, moviesIconActive: !userHomeObj.moviesIconActive, seriesIconActive: false, watchedIconActive: false});
          });
    }
  }

  const sortItemsByTypeAndDirection = (by = userHomeObj.sortBy, ascDirection = userHomeObj.ascSortDirection) => {
    switch (by.toString()) {
        case "1":
          if (ascDirection) {
            setUserHomeObj({...userHomeObj, items: userHomeObj.items.sort((a, b) => {if (a.id < b.id) {return -1;} if (a.id > b.id) {return 1;}return 0;}), ascSortDirection: !userHomeObj.ascSortDirection})
          } else {
              setUserHomeObj({...userHomeObj, items: userHomeObj.items.sort((a, b) => {if (a.id > b.id) {return -1;} if (a.id < b.id) {return 1;}return 0;}), ascSortDirection: !userHomeObj.ascSortDirection})
          }
          break;
  
        case "2":
          if (ascDirection) {
              setUserHomeObj({...userHomeObj, items: userHomeObj.items.sort((a, b) => {if (a.name < b.name) {return -1;} if (a.name > b.name) {return 1;}return 0;}), ascSortDirection: !userHomeObj.ascSortDirection})
            } else {
                setUserHomeObj({...userHomeObj, items: userHomeObj.items.sort((a, b) => {if (a.name > b.name) {return -1;} if (a.name < b.name) {return 1;}return 0;}), ascSortDirection: !userHomeObj.ascSortDirection})
            }
          break;

        case "3":
          if (ascDirection) {
              setUserHomeObj({...userHomeObj, items: userHomeObj.items.sort((a, b) => {if (a.year < b.year) {return -1;} if (a.year > b.year) {return 1;}return 0;}), ascSortDirection: !userHomeObj.ascSortDirection})
            } else {
                setUserHomeObj({...userHomeObj, items: userHomeObj.items.sort((a, b) => {if (a.year > b.year) {return -1;} if (a.year < b.year) {return 1;}return 0;}), ascSortDirection: !userHomeObj.ascSortDirection})
            }
          break;

        case "4":
          if (ascDirection) {
              setUserHomeObj({...userHomeObj, items: userHomeObj.items.sort((a, b) => {if (a.rating < b.rating) {return -1;} if (a.rating > b.rating) {return 1;}return 0;}), ascSortDirection: !userHomeObj.ascSortDirection})
            } else {
                setUserHomeObj({...userHomeObj, items: userHomeObj.items.sort((a, b) => {if (a.rating > b.rating) {return -1;} if (a.rating < b.rating) {return 1;}return 0;}), ascSortDirection: !userHomeObj.ascSortDirection})
            }
          break;

        default:
          console.log("none");
      }
  }

  const handleSelectedValueChange = (event) => {
    sortItemsByTypeAndDirection(event.target.value, true);
  };

  const handleSearchValue = () => {
    searchItemByName(
      userHomeObj.searchValue,
      window.localStorage.getItem("username"),
      window.localStorage.getItem("password"),
      window.localStorage.getItem("userId")
    ).then((res) => {
        setUserHomeObj({...userHomeObj, items: res.data.response});
    });
  };

  const handleSearchFieldChange = (event) => {
    setUserHomeObj({...userHomeObj, searchValue: event.target.value});
  };

  const sortItems = () => {
    sortItemsByTypeAndDirection(undefined, !userHomeObj.ascSortDirection);
  };

  return (
    <div className="user-home-container">
      <div className="top-tool-bar">
        <div className="search-control-container">
          <input
            type="text"
            id="search-input"
            autoComplete="off"
            onChange={handleSearchFieldChange}
          />
          <i
            className="search-icon fa-solid fa-magnifying-glass"
            onClick={handleSearchValue}
          ></i>
        </div>

        {userHomeObj.ascSortDirection ? (
          <i
            className="icon fa-solid fa-arrow-down-wide-short"
            onClick={sortItems}
          ></i>
        ) : (
          <i
            className="icon fa-solid fa-arrow-up-wide-short"
            onClick={sortItems}
          ></i>
        )}

        <select onChange={handleSelectedValueChange}>
          <option value="1">creation date</option>
          <option value="2">name</option>
          <option value="3">release year</option>
          <option value="4">rating</option>
        </select>

        <i className={userHomeObj.watchedIconActive ? 'icon fa-regular fa-eye highlight-icon' : 'icon fa-regular fa-eye'} onClick={showWatchedItems}></i>
        <i className={userHomeObj.seriesIconActive ? 'icon fa-solid fa-tv highlight-icon' : 'icon fa-solid fa-tv'} onClick={showSeriesItems}></i>
        <i className={userHomeObj.moviesIconActive ? 'icon fa-solid fa-video highlight-icon' : 'icon fa-solid fa-video'} onClick={showMovieItems}></i>
      </div>

    

      <div className="items-container">
        {userHomeObj.items.map((item) => {
          return (
            <div className="item" key={item.id}>
              <img
                src={item.poster}
                alt={item.name + " image"}
                width="100%"
                height="100%"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
