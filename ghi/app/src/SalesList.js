import { useEffect, useState } from "react";

function SalesList() {
  const [salesList, setSalesList] = useState([]);

  const fetchSalesList = async () => {
    const url = "http://localhost:8090/api/sales/";
    const res = await fetch(url);
    const salesListDict = await res.json();
    console.log(salesListDict);
    setSalesList(salesListDict.sales);
  };
  useEffect(() => {
    fetchSalesList();
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Sales staff's name</th>
          <th>Employee's number</th>
          <th>Customer's name</th>
          <th>Automobile VIN</th>
          <th>Purchase Price</th>
        </tr>
      </thead>
      <tbody>
        {salesList.map((sale) => {
          return (
            <tr key={sale.href}>
              <td>{sale.sales_staff.name}</td>
              <td>{sale.sales_staff.employee_number}</td>
              <td>{sale.customer.name}</td>
              <td>{sale.auto.vin}</td>
              <td>${sale.price.toLocaleString()}.00</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default SalesList;
