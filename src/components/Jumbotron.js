import "./Jumbotron.css";

const Jumbotron = () => (
  <div className="styles">
    <div className="container">
      <div className="row text-center">
        <div
          className="col-md-12 col-12 textStyle"
          style={{ fontSize: 30, padding: 20 }}
        >
          <p>Welcome to</p>
        </div>
        <div className="col-md-12 col-12">
          <h1 style={{ fontSize: 100 }} className="textStyle">
            Earmark$
          </h1>
        </div>
        <div
          className="col-md-12 col-12 textStyle"
          style={{ fontSize: 30, padding: 50 }}
        >
          <p>
            The most convenient way to manage your personal income and expenses.
            Register now and start earmarking your budget spending!
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Jumbotron;
