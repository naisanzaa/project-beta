import { useEffect, useState } from "react";

function AutomobileList() {
  const [automobileList, setAutomobileList] = useState([]);

  const fetchAutomobileList = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const res = await fetch(url);
    const automobileListDict = await res.json();
    console.log(automobileListDict);
    setAutomobileList(automobileListDict.autos);
  };
  useEffect(() => {
    fetchAutomobileList();
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>VIN</th>
          <th>Color</th>
          <th>Year</th>
          <th>Model</th>
          <th>Manufacturer</th>
        </tr>
      </thead>
      <tbody>
        {automobileList.map((auto) => {
          return (
            <tr key={auto.href}>
              <td>{auto.vin}</td>
              <td>{auto.color}</td>
              <td>{auto.year}</td>
              <td>{auto.model.name}</td>
              <td>{auto.model.manufacturer.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default AutomobileList;
