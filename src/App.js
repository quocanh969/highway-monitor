import React from "react";
import { SummaryItem, SummaryPie } from "./components";
import "./App.css";

const ONE_MINUTE = 60000;

function App() {
  const [data, setData] = React.useState();
  const [realtimeData, setRealtimeData] = React.useState();

  const fetchRealtimeData = () => {
    fetch("http://localhost:3500/api/realtimeInsights")
      .then(async (response) => {
        if (response.ok) {
          const jsonRes = await response.json();
          setRealtimeData(jsonRes);
        }
      })
      .catch(() => alert("Unexpected error when fetching data .."));
  };

  React.useEffect(() => {
    fetch("http://localhost:3500/api/dailyInsights")
      .then(async (response) => {
        if (response.ok) {
          const jsonRes = await response.json();
          setData(jsonRes);
        }
      })
      .catch(() => alert("Unexpected error when fetching data .."));
  }, []);

  React.useEffect(() => {
    fetchRealtimeData();
    const interval = setInterval(fetchRealtimeData, ONE_MINUTE);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    console.log("hello");
  }, []);

  return (
    <div className="main">
      <div className="rowItem">
        <SummaryPie
          label="Type of Vehicle"
          chartData={[
            { label: "truck", value: data?.truck ?? 0 },
            { label: "bus", value: data?.bus ?? 0 },
            { label: "car", value: data?.car ?? 0 },
          ]}
        />
        <SummaryPie
          label="Commercial/Non-commercial"
          chartData={[
            { label: "commercial", value: data?.commercial ?? 0 },
            { label: "non-commercial", value: data?.non_commerical ?? 0 },
          ]}
        />
      </div>
      <div className="rowItem">
        <SummaryItem label="Total Vehicle" value={data?.total_in ?? 0} />
        <SummaryItem label="Average Speed" value={data?.average_speed ?? 0} />
      </div>
      <div className="rowItem">
        <SummaryItem
          label="Total Car Entry"
          description="in last minute"
          value={realtimeData?.exit_count ?? 0}
        />
        <SummaryItem
          label="Total Car Exit"
          description="in last minute"
          value={realtimeData?.entry_count ?? 0}
        />
      </div>
      <div className="rowItem">
        <SummaryItem
          label="Total Car Entry"
          description="in rush hour"
          value={data?.morning_rush_hour_entry ?? 0}
        />
        <SummaryItem
          label="Total Car Exit"
          description="in rush hour"
          value={data?.evening_rush_hour_entry ?? 0}
        />
      </div>
    </div>
  );
}

export default App;
