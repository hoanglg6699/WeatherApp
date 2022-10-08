import { TbMapSearch } from "react-icons/tb";
import { TbSearch } from "react-icons/tb";
import { useState } from "react";
import Header from "./components/Header/Header";
import Details from "./components/Details/Details";
import Summary from "./components/Summary/Summary";

function App() {
  // const API_KEY = process.env.REACT_APP_API_KEY;

  const REACT_APP_API_KEY = "bccfbf2597ac2a1a2b049fb99ec61ba6";
  const API_KEY = REACT_APP_API_KEY;
  const REACT_APP_ICON_URL = "http://openweathermap.org/img/wn/";
  const REACT_APP_URL = "https://api.openweathermap.org/data/2.5/forecast?";

  const [noData, setNoData] = useState("No Data Yet");
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("Unknown location");
  const [weatherIcon, setWeatherIcon] = useState(
    // `${process.env.REACT_APP_ICON_URL}10n@2x.png`
    `${REACT_APP_ICON_URL}10n@2x.png`
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(searchTerm);
  };

  const getWeather = async (location) => {
    setWeatherData([]);
    const howToSearch =
      typeof location === "string"
        ? `q=${location}`
        : `lat:${location[0]}&lon=${location[1]}`;

    try {
      // let res = await fetch(`${process.env.REACT_APP_URL + howToSearch}
      let res = await fetch(`${REACT_APP_URL + howToSearch}
      &appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`);
      let data = await res.json();
      // if (data.cod != 200) {
      //   setNoData("Location Not Found");
      //   return;
      // }
      if (data.cod == 200) {
        setWeatherData(data);
        setCity(`${data.city.name}, ${data.city.country}`);
        setWeatherIcon(
          `${REACT_APP_ICON_URL + data.list[0].weather[0].icon}@4x.png`
        );
      } else setNoData("Location Not Found");

      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

  const myIP = (location) => {
    const { latitude, longitude } = location.coords;
    getWeather([latitude, longitude]);
    console.log("location", location);
  };

  return (
    <div className="container">
      <div className="blur" style={{ top: "-10%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-6rem" }}></div>
      <div className="content">
        <div className="form-container">
          <div className="name">
            <div className="logo">
              Weather App<hr></hr>
            </div>
            <div className="city">
              <TbMapSearch />
              <p>{city}</p>
            </div>
          </div>
          <div className="search">
            {/* <h2>!</h2> */}
            <hr />
            <form className="search-bar" noValidate onSubmit={handleSubmit}>
              <input
                type="text"
                // name=""
                // id=""
                placeholder="Search Place"
                onChange={handleChange}
                required
              />
              <button className="s-icon">
                <TbSearch
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition(myIP);
                  }}
                />
              </button>
            </form>
          </div>
        </div>
        <div className="info-container">
          <Header />
          {weatherData.length === 0 ? (
            <div className="nodata">
              <h1>{noData}</h1>
            </div>
          ) : (
            <>
              <h1>Today</h1>
              <Details weather_icon={weatherIcon} data={weatherData} />
              <h1 className="title">More On {city}</h1>
              <ul className="summary">
                {weatherData.list.map((days, index) => {
                  if (index > 0) {
                    return <Summary key={index} day={days} />;
                  }
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
