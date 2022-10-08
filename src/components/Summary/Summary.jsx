import moment from 'moment'
import './summary.css'
import React from 'react'

function Summary({day}) {
  const REACT_APP_ICON_URL = "https://openweathermap.org/img/wn/";

//   const day_icon = `${process.env.REACT_APP_ICON_URL + day.weather[0]["icon"]}@2x.png`
  const day_icon = `${REACT_APP_ICON_URL + day.weather[0]["icon"]}@2x.png`
  return (
    <li className="summary-items">
        <div>
            <p className="">{Math.round(day.main.temp)}&deg;C</p>
            <p className="">
                {day.weather[0].main}
                <img src={day_icon}  alt="" />
            </p>
            <p className="">{day.weather[0].description}</p>
            <p className="">{moment(day.dt_txt).format('hh:mm a')}</p>
        </div>
    </li>
  )
}

export default Summary