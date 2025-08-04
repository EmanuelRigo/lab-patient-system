import React from "react";
import talonApi from "@/services/talon.api";

const page = async ({ params }: { params: Promise<{ tid: string }> }) => {
  const { tid } = await params;
  const talon = await talonApi.getById(tid);
  return <div>{talon?._id}</div>;
};

export default page;
