import MetabaseDashboard from "../components/MetabaseDashboard";

const DashboardHome = () => {
  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Dashboard Home
      </h1>


      <div className="card metabase-card">
        <MetabaseDashboard />
      </div>

    </div>
  );
};

export default DashboardHome;




