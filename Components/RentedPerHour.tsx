import * as React from 'react';
// import './style.css';
import { TripData } from '../App';
import _ from 'lodash';
import { Bar } from 'react-chartjs-2';

export default function RentedPerHour(props: {
  tripData: TripData[];
}): JSX.Element {
  const [rentPerHourData, setRentPerHourData] = React.useState<any>();

  React.useEffect(() => {
    const rentPerHour = _.chain(props.tripData)
      .groupBy((item) => new Date(item.start_time).getHours())
      .map((value, key) => {
        return { key: key, itemsCount: value.length };
      })
      .value() as { key: string; itemsCount: number }[];

    setRentPerHourData({
      labels: rentPerHour.map((m) => m.key),
      datasets: [
        {
          label: 'Rented Per Hour',
          data: rentPerHour.map((m) => m.itemsCount),
          backgroundColor: ['#50AF95', '#2a71d0'],
        },
      ],
    });
  }, [props.tripData]);
  return (
    <React.Fragment>
      {rentPerHourData && (
        <Bar
          data={rentPerHourData}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Bikes Rented Per Hour',
              },
              legend: {
                display: true,
                position: 'bottom',
              },
            },
          }}
        ></Bar>
      )}
    </React.Fragment>
  );
}
