import { SummaryItem, SummaryPie } from "./components";
import "./App.css";

function App() {
  return (
    <div className="main">
      <div className="rowItem">
        <SummaryPie
          label="Type of Vehicle"
          chartData={[
            { label: "truck", value: 80 },
            { label: "bus", value: 120 },
            { label: "car", value: 120 },
          ]}
        />
        <SummaryPie
          label="Commercial/Non-commercial"
          chartData={[
            { label: "commercial", value: 80 },
            { label: "non-commercial", value: 120 },
          ]}
        />
      </div>
      <div className="rowItem">
        <SummaryItem label="Total Vehicle" value={1} />
        <SummaryItem label="Average Speed" value={1} />
      </div>
      <div className="rowItem">
        <SummaryItem
          label="Total Car Entry"
          description="in last minute"
          value={1}
        />
        <SummaryItem
          label="Total Car Exit"
          description="in last minute"
          value={1}
        />
      </div>
      <div className="rowItem">
        <SummaryItem
          label="Total Car Entry"
          description="in rush hour"
          value={1}
        />
        <SummaryItem
          label="Total Car Exit"
          description="in rush hour"
          value={1}
        />
      </div>
    </div>
  );
}

export default App;
