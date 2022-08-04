import { useEffect, useState } from "react";

function SalesHistory() {
  const [salesHistory, setSalesHistory] = useState([]);

  const fetchSalesHistory = async () => {
    const url = "http://localhost:8090/api/sales/";
    const res = await fetch(url);
    const salesHistoryDict = await res.json();
    console.log(salesHistoryDict);
    setSalesHistory(salesHistoryDict.sales);
  };

  const [salesStaffs, setSalesStaffs] = useState([]);
  const fetchSalesStaffs = async () => {
    const url = "http://localhost:8090/api/salesstaffs/";
    const response = await fetch(url);
    const salesStaffsDict = await response.json();
    if (response.ok) {
      setSalesStaffs(salesStaffsDict.sales_staffs);
    }
  };

  const [selectedStaff, setSelectedStaff] = useState();

  useEffect(() => {
    fetchSalesHistory();
    fetchSalesStaffs();
  }, []);

  const handleChange = (event) => {
    setSelectedStaff(event.target.value);
  };

  return (
    <div>
      <h1>Sales staff history</h1>
      <select
        onChange={handleChange}
        id="filter-sales-history"
        name="sales_staff"
        className="form-select"
      >
        <option value="">Choose a sales staff</option>
        {salesStaffs.map((sales_staff) => {
          console.log("select:", sales_staff.id);
          return (
            <option key={sales_staff.id} value={sales_staff.id}>
              {sales_staff.name}
            </option>
          );
        })}
      </select>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sales staff's name</th>
            <th>Customer's name</th>
            <th>Automobile VIN</th>
            <th>Purchase Price</th>
          </tr>
        </thead>
        <tbody>
          {salesHistory.map((sale) => {
            console.log(sale.sales_staff.id, selectedStaff);
            if (sale.sales_staff.id === Number(selectedStaff)) {
              return (
                <tr key={sale.href}>
                  <td>{sale.sales_staff.name}</td>
                  <td>{sale.customer.name}</td>
                  <td>{sale.auto.vin}</td>
                  <td>${sale.price.toLocaleString()}.00</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
export default SalesHistory;
