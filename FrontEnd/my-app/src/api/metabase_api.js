import axios from "axios";

export const getMetabaseDashboardUrl = () =>
  axios.get("http://localhost:8713/metabase/dashboard");