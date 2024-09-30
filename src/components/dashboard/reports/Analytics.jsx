import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Line, Bar, Pie, Doughnut, PolarArea } from "react-chartjs-2";
import { defaults } from "chart.js/auto";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf"; // Import jsPDF
import html2canvas from "html2canvas"; // Import html2canvas

defaults.responsive = true;

const timeAgo = (date) => {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  return `${seconds} seconds ago`;
};

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [tripReport, settripReport] = useState(null);
  const [driverPerformace, setDriverPerformance] = useState(null);
  const [passengerActivity, setPassengerActivity] = useState(null);
  const [vehicleActivity, setVehicleActivity] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [phoneOperatorPerformance, setPhoneOperatorPerformance] = useState(null);

  useEffect(() => {
    if (chartData === null) {
      setTimeout(() => {
        fetchRevenueData();
        fetchTotalRides();
        fetchDriverPerformance();
        fetchPassengerActivity();
        fetchVehicleActivity();
        fetchPhoneOperatorPerformance();
      }, 3000);
    }
  }, [chartData]);

  const fetchRevenueData = async () => {
    try {
      await axios
        .get("http://localhost:3000/api/v1/reports/total-earnings")
        .then((response) => {
          console.log(response.data);
          setChartData(response.data);
        })
        .catch((error) => {
          toast.error("Error fetching revenue data " + error);
        });
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  const fetchTotalRides = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/v1/reports/total-rides"
      );
      settripReport(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching total rides " + error);
      setIsLoading(false);
    }
  };

  const fetchDriverPerformance = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/v1/reports/driver-performance"
      );
      setDriverPerformance(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching driver performance " + error);
      setIsLoading(false);
    }
  };

  const fetchPassengerActivity = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/v1/reports/passenger-activity"
      );
      setPassengerActivity(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching passenger activity " + error);
      setIsLoading(false);
    }
  };

  const fetchVehicleActivity = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/v1/reports/vehicle-activity"
      );
      setVehicleActivity(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching vehicle activity " + error);
      setIsLoading(false);
    }
  };

  const fetchPhoneOperatorPerformance = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/v1/reports/operator-performance"
      );
      setPhoneOperatorPerformance(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching phone operator performance " + error);
      setIsLoading(false);
    }
  };

  const updatedAt = new Date(); 

  const downloadPDF = async () => {
    setIsDownloading(true);
    const pdf = new jsPDF();
    const content = document.querySelector("#analytics-content"); 
    const canvas = await html2canvas(content, {
      useCORS: true,
      scale: 4,
    });
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 190; // Width in mm
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`analytics-report-${updatedAt.toLocaleString()}.pdf`);
    setIsDownloading(false); 
  };

  return (
    <div className="card shadow">
      <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
        <Link to="/dashboard">
          <i className="fas fa-arrow-left"></i>{" "}
        </Link>
        <h5 className="m-0 font-weight-bold text-primary">Analytics</h5>
        <button onClick={downloadPDF} className="btn btn-primary" style={{ width:"170px" }} disabled={isDownloading}>
              {
                isDownloading ? (
                  "Please wait..."
                ) : "Download as PDF"
              }
            </button>
        
      </div>
      <div className="card-body" id="analytics-content">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="row">
              <div className="chart-container mb-5 col">
                <h4 className="text-primary text-center">Revenue Over Time</h4>
                <div className="d-flex justify-content-center">
                  {chartData === null ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  ) : (
                    <Line data={chartData} />
                  )}
                </div>
              </div>
              <div className="chart-container mb-5 col">
                <h4 className="text-primary text-center">Trip Reports</h4>
                <div className="d-flex justify-content-center">
                  {tripReport === null ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  ) : (
                    <Bar data={tripReport} />
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="chart-container mb-5 col">
                <h4 className="text-primary text-center">Driver Performance</h4>
                <div className="d-flex justify-content-center">
                  {tripReport === null ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  ) : (
                    <Bar data={driverPerformace} />
                  )}
                </div>
              </div>
              <div className="chart-container mb-5 col">
                <h4 className="text-primary text-center">Passenger Activity</h4>
                <div className="d-flex justify-content-center">
                  {tripReport === null ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  ) : (
                    <div style={{ width: "300px" }}>
                      <Pie data={passengerActivity} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="chart-container mb-5 col">
                <h4 className="text-primary text-center">Vehicle Activity</h4>
                <div className="d-flex justify-content-center">
                  {tripReport === null ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  ) : (
                    <div style={{ width: "300px" }}>
                      <Doughnut data={vehicleActivity} />
                    </div>
                  )}
                </div>
              </div>
              <div className="chart-container mb-5 col">
                <h4 className="text-primary text-center">Operator Performance</h4>
                <div className="d-flex justify-content-center">
                  {tripReport === null ? (
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>
                  ) : (
                    <div style={{ width: "300px" }}>
                      <PolarArea data={phoneOperatorPerformance} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        <p className="text-muted text-sm" style={{ fontSize:"10px" }}>
          <i className="fas fa-check-circle me-2 text-success"></i>
          Last Updated: <span>{timeAgo(updatedAt)}</span> on {updatedAt.toLocaleString()}
        </p>
      </div>
      
    </div>
  );
};

export default Analytics;
