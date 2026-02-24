import { useEffect, useState } from "react";
import axios from "axios";
import "./MetabaseDashboard.css";

const MetabaseDashboard = () => {
  const [url, setUrl] = useState("");
  const [iframeLoaded, setIframeLoaded] = useState(false);

useEffect(() => {
  
  setIframeLoaded(false);
  loadDashboard();
}, []);


const loadDashboard = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8713/metabase/dashboard",
      {
        headers: {
          "Cache-Control": "no-cache"
        }
      }
    );

    // 🔥 cache buster
    const freshUrl =
      res.data +
      (res.data.includes("?") ? "&" : "?") +
      "t=" +
      Date.now();

    setIframeLoaded(false); // reset loading
    setUrl(freshUrl);
  } catch (err) {
    console.error("Metabase error:", err);
  }
};


  const isLoading = !url || !iframeLoaded;

  return (
    <div className="metabase-wrapper">
      {/* ✅ Loading Overlay */}
      {isLoading && (
        <div className="metabase-loading">
          <div className="metabase-spinner"></div>
          <p className="metabase-loading-text">
            Loading dashboard...
          </p>
        </div>
      )}

      {/* ✅ Iframe */}
      {url && (
        <iframe
            key={url} // 🔥 penting
            title="Metabase Dashboard"
            src={url}
            width="100%"
            height="700"
            onLoad={() => setIframeLoaded(true)}
            className={`metabase-iframe ${
    iframeLoaded ? "show" : "hide"
  }`}
/>

      )}
    </div>
  );
};

export default MetabaseDashboard;
