import "./App.css";
function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold text-white">
        CarCar
        <img src="/images/car-solid.svg" width="45" height="45" alt="" />
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">All of your automobile needs in one place</p>
      </div>
    </div>
  );
}

export default MainPage;
