import axios from "axios";
import { useEffect, useState } from "react";

export const Orders = () => {
  const [filterData, setFilterData] = useState([]);
  const [sortText, setSortText] = useState("");
  //  Get all data when admin logs in and populate it
  // store it in redux
  useEffect(() => {
    axios.get("http://localhost:8080/orders").then((data) => {
      setFilterData(data.data);
    });
  }, []);

  const sortId = (e) => {
    setSortText(e.value);
    const filterd = filterData.sort((a, b) => {
      return e.value == "status"
        ? a[e.value].localeCompare(b[e.value])
        : a[e.value] - b[e.value];
    });
    setFilterData(filterd);
  };

  return (
    <div>
      <div>
        <div>
          <select
            className='controls'
            name='progress'
            id='progress'
            onChange={(e) => sortId(e.target)}
          >
            <option value='id'>ID</option>
            <option value='status'>Status</option>
            <option value='cost'>Cost</option>
          </select>
        </div>
        <table className='orders'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Problem</th>
              <th>Client Name</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Change Status</th>
              <th>Accept</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((e) => (
              <tr className='orders-row' key={e.id}>
                <td className='id'>{e.id}</td>
                <td className='problem'>{e.problem}</td>
                <td className='owner'>{e.owner_name}</td>
                <td className='status'>{e.status}</td>
                <td className='cost'>{e.cost}</td>
                <td className='change-status'>
                  {/* Show select dropdown only if status is Not Accepted */}
                  <select className='changeStatus' name='changeStatus'>
                    <option value='Pending'>Pending</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Done'>Done</option>
                    <option value='Not Accepted'>Not Accepted</option>
                  </select>
                </td>
                <td className='accept'>
                  {/* Show this button only if status is Not Accepted */}
                  {/* on change make request to update it in db, and show changed status in table */}
                  <button>Accept</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
