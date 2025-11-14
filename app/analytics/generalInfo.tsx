import React from "react";

interface ChartInfo {
  title: string;
  data: number[];
  description: string;
}

export const GeneralInfo: React.FC<{ charts?: ChartInfo[] }> = ({ charts }) => {
  const sharts: any[] = []
  
  return (
    <div>
      <h1>Chart Information</h1>
      {sharts?.map((chart, index) => (
        <div key={index}>
          <h2>{chart.title}</h2>
          <p>{chart.description}</p>
          <h3>Data:</h3>
          <ul>
            {chart.data.map((value: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
              <li key={idx}>{value}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
