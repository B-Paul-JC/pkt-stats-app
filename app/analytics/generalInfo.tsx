import React from "react";

interface ChartInfo {
  title: string;
  data: number[];
  description: string;
}

export const GeneralInfo: React.FC<{ charts?: ChartInfo[] }> = ({ charts }) => {
  return (
    <div>
      <h1>Chart Information</h1>
      {charts?.map((chart, index) => (
        <div key={index}>
          <h2>{chart.title}</h2>
          <p>{chart.description}</p>
          <h3>Data:</h3>
          <ul>
            {chart.data.map((value, idx) => (
              <li key={idx}>{value}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
