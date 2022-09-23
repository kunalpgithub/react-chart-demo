import * as React from 'react';
// import './style.css';
import { Bar } from 'react-chartjs-2';
import { TripData } from '../App';
import _ from 'lodash';

export default function AvgAgeByLocation(props: {
  data: TripData[];
}): JSX.Element {
  const [avgAgeData, setAvgAgeData] = React.useState<any>();
  React.useEffect(() => {
    const avgAgeByLocation = _.chain(props.data)
      .groupBy((item) => item.start_station_id)
      .map((value, key) => {
        return {
          key: key,
          itemsCount: _.meanBy(
            value,
            (v) => (new Date().getFullYear() - v['birth year']) as number
          ),
        };
      })
      .value() as { key: string; itemsCount: number }[];

    console.log('avgAgeByLocation' + avgAgeByLocation);

    setAvgAgeData({
      labels: avgAgeByLocation.map((m) => m.key),
      datasets: [
        {
          label: 'Avg Age At Start location',
          data: avgAgeByLocation.map((m) => m.itemsCount),
          backgroundColor: ['#ffbb11', '#ecf0f1'],
        },
      ],
    });
  });
  return (
    <div>
      {avgAgeData && (
        <Bar
          data={avgAgeData}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Avg age for start location',
              },
              legend: {
                display: true,
                position: 'bottom',
              },
            },
          }}
        ></Bar>
      )}
    </div>
  );
}
