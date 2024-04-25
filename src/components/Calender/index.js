import { Component } from "react";
import gsap from "gsap";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import "./index.css";
import MoodTrackerContext from "../../context/MoodTrackerContext";

class Calender extends Component {
  componentDidMount() {
    gsap.fromTo("#calenderID", { x: -500, duration: 2 }, { x: 0 });
  }

  render() {
    return (
      <MoodTrackerContext.Consumer>
        {(value) => {
          const {
            isDarkTheme,
            calenderList,
            onChangeCalenderList,
            onRightArrowClick,
            onLeftArrowClick,
            daysList,
            month,
          } = value;

          return (
            <div id="calenderID">
              <div data-testid="arrowContainer" className="arrow-container">
                <button
                  type="button"
                  onClick={onLeftArrowClick}
                  className={`arrow-button ${
                    isDarkTheme ? "light-arrow-btn" : ""
                  }`}
                  aria-label="Previous"
                  data-testid="previous-button"
                >
                  <MdOutlineKeyboardArrowLeft className="arrow-icon" />
                </button>

                <h1
                  data-testid="monthPara"
                  className={`month-para ${isDarkTheme ? "light-dates" : ""}`}
                >
                  {calenderList[month - 1].monthName}
                </h1>

                <button
                  type="button"
                  onClick={onRightArrowClick}
                  className="arrow-button"
                  aria-label="Previous"
                  data-testid="next-button"
                >
                  <MdOutlineKeyboardArrowRight className="arrow-icon" />
                </button>
              </div>
              <div data-testid="calenderDates" className="calender-dates">
                <ul data-testid="daysUl" className="days-ul">
                  {daysList.map((item) => (
                    <li data-testid="daysLi" key={item.id} className="days-li">
                      <p
                        data-testid="dayCalenderPara"
                        className={`day-calender-Para ${
                          isDarkTheme ? "light-dates" : ""
                        }`}
                      >
                        {item.day}
                      </p>
                    </li>
                  ))}
                </ul>
                <ul data-testid="datesUl" className="dates-ul">
                  {calenderList[month - 1].dates.map((item) => {
                    const { id, date, emojiUrl } = item;
                    const onClick = () => {
                      onChangeCalenderList(id, month);
                    };
                    return (
                      <li data-testid="datesLi" key={id} className="dates-li">
                        <button
                          type="button"
                          onClick={onClick}
                          className="dates-li-button"
                          data-testid="datesLiButton"
                        >
                          <p
                            data-testid="datesPara"
                            className={`dates-para ${
                              isDarkTheme ? "light-dates" : ""
                            }`}
                          >
                            {date}
                          </p>

                          {item.emojiName !== "" ? (
                            <img
                              className="dates-emoji"
                              src={emojiUrl}
                              alt={date}
                              data-testid="datesEmoji"
                            />
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        }}
      </MoodTrackerContext.Consumer>
    );
  }
}

export default Calender;
