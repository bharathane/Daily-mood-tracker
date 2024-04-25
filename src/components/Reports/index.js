import { useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import gsap from "gsap";
import "./index.css";
import Header from "../Header";
import MoodTrackerContext from "../../context/MoodTrackerContext";

const Reports = () => {
  const itemRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(itemRef.current, { x: 600 }, { x: 0, duration: 1 });
  }, []);
  return (
    <MoodTrackerContext.Consumer>
      {(value) => {
        const {
          isDarkTheme,
          calenderList,
          emojisListNew,
          onReportCalenderChange,
          calenderReportList,
          reportCalenderMonth,
        } = value;
        const lightBg = isDarkTheme ? "light-theme-reports" : "";
        return (
          <>
            <Header />
            <div
              data-testid="reportsBodyContainer"
              className={`reports-body-container ${lightBg}`}
            >
              <h1
                data-testid="emojiReportHeading"
                className="emoji-report-heading"
              >
                Overall Emojis
              </h1>
              <ul
                data-testid="emojiReportUl"
                className="emoji-report-ul"
                ref={itemRef}
              >
                {emojisListNew.map((item) => (
                  <li
                    data-testid="emojiReportLi"
                    className={`emoji-report-li ${
                      isDarkTheme && "bg-for-report-li"
                    }`}
                    key={item.id}
                  >
                    <p data-testid="emojiLiPara" className="emoji-li-para">
                      {item.emojiName}
                    </p>
                    <img
                      data-testid="emojiLiImg"
                      className="emoji-li-img"
                      src={item.emojiUrl}
                      alt={item.emojiName}
                    />

                    <p data-testid="emojiCount" className="emoji-count">
                      {item.count}
                    </p>
                  </li>
                ))}
              </ul>
              <div data-testid="monthlyContainer" className="monthly-container">
                <h1
                  data-testid="monthlyReportsHeading"
                  className="monthly-reports-heading"
                >
                  Monthly Reports
                </h1>
                <select
                  value={reportCalenderMonth}
                  onChange={onReportCalenderChange}
                  className="calender-select"
                  data-testid="calenderSelect"
                >
                  {calenderList.map((item) => (
                    <option key={item.month} value={item.month}>
                      {item.monthName}
                    </option>
                  ))}
                </select>
              </div>

              <BarChart
                className="bar-chart"
                width={1000}
                height={500}
                data={calenderReportList}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="emojiName" type="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#FFBE38" barSize={30}>
                  {calenderReportList.map((entry, index) => (
                    <img
                      key={entry.id}
                      src={entry.emojiUrl}
                      alt={`emoji-${index}`}
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                        borderRadius: "10px",
                      }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </div>
          </>
        );
      }}
    </MoodTrackerContext.Consumer>
  );
};

export default Reports;
