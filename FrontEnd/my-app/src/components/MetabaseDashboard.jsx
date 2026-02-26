import { useEffect, useState } from "react";
import axios from "axios";
import "./MetabaseDashboard.css";

import { FiRefreshCw } from "react-icons/fi";

/**
 * MetabaseDashboard
 * Embeds a Metabase dashboard via signed URL from backend.
 */
const MetabaseDashboard = () => {
  const [url, setUrl] = useState("");
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setError(false);
      setIframeLoaded(false);

      const res = await axios.get("http://localhost:8713/metabase/dashboard", {
        headers: { "Cache-Control": "no-cache" },
      });

      const cacheBustedUrl =
        res.data + (res.data.includes("?") ? "&" : "?") + "t=" + Date.now();

      setUrl(cacheBustedUrl);
    } catch (err) {
      console.error("Metabase error:", err);
      setError(true);
    }
  };

  const isLoading = !url || !iframeLoaded;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100">
      {/* Loading Overlay */}
      {isLoading && !error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
          <p className="mt-4 text-sm font-medium text-slate-600">Loading dashboard...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl text-center px-6">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-slate-600 font-medium mb-4">Failed to load dashboard</p>
          <button
            onClick={loadDashboard}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            <FiRefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {/* Iframe */}
      {url && !error && (
        <iframe
          key={url}
          title="Metabase Dashboard"
          src={url}
          width="100%"
          height="700"
          onLoad={() => setIframeLoaded(true)}
          className={`border-none rounded-2xl bg-white transition-opacity duration-500 ${
            iframeLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

export default MetabaseDashboard;
