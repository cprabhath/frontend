import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const Reports = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleGenerateReport = (reportType) => {
    if(!fromDate || !toDate){
        toast.error("Please select from and to date");
    }
    console.log(`Generating ${reportType} report from ${fromDate} to ${toDate}`);
  };

  return (
    <div className="card shadow" style={{ marginBottom: "150px" }}>
      <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
        <Link to="/dashboard">
          <i className="fas fa-arrow-left"></i>{" "}
        </Link>
        <h6 className="m-0 font-weight-bold text-primary">Reports</h6>
        <div>{""}</div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Report Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ride Report</td>
                <td>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleGenerateReport("Total Rides")}
                  >
                    Generate Report
                  </button>
                </td>
              </tr>
              <tr>
                <td>Passenger Report</td>
                <td>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleGenerateReport("Ride Status")}
                  >
                    Generate Report
                  </button>
                </td>
              </tr>
              <tr>
                <td>Driver Report</td>
                <td>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleGenerateReport("Rides by Driver")}
                  >
                    Generate Report
                  </button>
                </td>
              </tr>
              <tr>
                <td>Vehicle Report</td>
                <td>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleGenerateReport("Rides by Passenger")}
                  >
                    Generate Report
                  </button>
                </td>
              </tr>
             
              <tr>
                <td>Revenue Report</td>
                <td>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="form-control"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleGenerateReport("Rides by Passenger")}
                  >
                    Generate Report
                  </button>
                </td>
              </tr>
              {/* Add more report types as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
