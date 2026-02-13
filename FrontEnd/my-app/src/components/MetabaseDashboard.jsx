import { useEffect, useState } from "react";
import axios from "axios";

const MetabaseDashboard = () => {

  const [url, setUrl] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8713/metabase/dashboard"
      );

      setUrl(res.data);
    } catch (err) {
      console.error("Metabase error:", err);
    }
  };

  if (!url) return <div>Loading Dashboard...</div>;

  return (
    <iframe
      title="Metabase Dashboard"
      src={url}
      width="100%"
      height="700"
      style={{
        border: "none",
        borderRadius: "12px",
        background: "white"
      }}
    />
  );
};

export default MetabaseDashboard;
