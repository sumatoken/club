import dynamic from "next/dynamic";
import React from "react";

const Dashboard = dynamic(() => import("../../components/club/Dashboard"), {
  ssr: false,
});

export default function Club() {
  return <Dashboard />;
}
