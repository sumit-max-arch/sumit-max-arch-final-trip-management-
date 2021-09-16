import React from "react";
import useSWR from "swr";
import { useEffect } from 'react'
import AXIOSAPI from "../../axiosapi";


function Articles() {

  const fetcher = url => AXIOSAPI.get(url).then(res => res.data)
  const { data, error } = useSWR("/trip", fetcher, { refreshInterval: 1000 });
  console.log('getTrip->', data);
  return (
    <div>
      <table className="table table-white">
        <thead>
          <tr>
            <th scope="start date">Start Date</th>
            <th scope="">End Date</th>
            <th scope="">Company Name</th>
            <th scope="">Street</th>
            <th scope="">Street_num</th>
            <th scope="">City</th>
            <th scope="">Country</th>
            <th scope="">Zip</th>
            <th scope="">Covid</th>
            <th scope="">Covid test Date</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.reverse().map((trips, i) => (
              <tr>
                <td>{trips?.start_date}</td>
                <td>{trips?.end_date}</td>
                <td>{trips?.company_name}</td>
                <td>{trips?.address.street}</td>
                <td>{trips?.address.street_num}</td>
                <td>{trips?.address.city}</td>
                <td>{trips?.address.country}</td>
                <td>{trips?.address.zip}</td>
                <td>
                  {
                    trips?.covid == true ? (
                      <p style={{color: 'green'}}>Yes</p>
                    ) : (
                      <p style={{color: 'red'}}>No</p>
                    )
                  }
                </td>
                <td>{trips?.covid_test_date}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default Articles;
