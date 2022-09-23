import * as React from 'react';
import './style.css';
import _ from 'lodash';
import { Bar } from 'react-chartjs-2';
import RentedPerHour from './Components/RentedPerHour';
import AvgAgeByLocation from './Components/AvgAgeByLocation';

export type TripData = {
  tripduration: number;
  start_time: string;
  stop_time: string;
  start_station_id: number;
  start_station_name: string;
  // 'start station latitude': string;
  start_station_longitude: string;
  end_station_id: number;
  end_station_name: string;
  end_station_latitude: string;
  end_station_longitude: string;
  bike_id: number;
  usertype: string;
  'birth year': number;
  gender: number;
};

export default function App() {
  const [tripData, setTripData] = React.useState([]);
  React.useEffect(() => {
    const getTripData = async () => {
      const res = await fetch(
        'https://lo-interview.s3.us-west-2.amazonaws.com/trips.json'
      );
      const tripData: TripData[] = await res.json();
      setTripData(tripData);
    };
    getTripData();
  }, []);
  return (
    <div className={'dashboard'}>
      <div>{<RentedPerHour tripData={tripData}></RentedPerHour>}</div>
      <div>{<AvgAgeByLocation tripData={tripData}></AvgAgeByLocation>}</div>
    </div>
  );
}
