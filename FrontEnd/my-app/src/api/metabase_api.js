import axios from "axios";

const res = await axios.get(
  "http://localhost:8713/metabase/dashboard",
  { withCredentials: true }
);