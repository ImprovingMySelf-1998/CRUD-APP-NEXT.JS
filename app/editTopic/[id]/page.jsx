import EditUser from "@/components/EditUser";
import React from "react";

function page({ params }) {
  return <EditUser userId={params.id} />;
}

export default page;
