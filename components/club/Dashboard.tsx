import AgoraRTC from "agora-rtc-sdk-ng";
import React, { useEffect, useState } from "react";
import { rtc } from "../../lib/agora";

export default function Dashboard() {
  const [first, setFirst] = useState("");
  useEffect(() => {
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  }, [first]);

  return <div>dashboardd</div>;
}
