// "use client";

// import React, { useEffect, useState } from "react";
// import { FaTrash } from "react-icons/fa";

// import { getAllLabStaff } from "@/services/labStaff.api";
// import LabStaffCard from "./LabStaffCard";
// import { LabStaff } from "../../../types/labStaff.types";

// // type LabStaff = {
// //   id: string;
// //   name: string;
// //   role: "role_admin" | "Secretary" | "role_lab_technician";
// // };

// const LabStaffList = () => {
//   const [staff, setStaff] = useState<LabStaff[]>([]);

//   useEffect(() => {
//     const fetchStaff = async () => {
//       try {
//         const data = await getAllLabStaff();
//         console.log("🚀 ~ fetchStaff ~ data:", data);

//         setStaff(data); // suponiendo que ya es un array de LabStaff
//       } catch (error) {
//         console.error("❌ Error al obtener el personal:", error);
//       }
//     };

//     fetchStaff();
//   }, []);

//   return (
//     <div className="space-y-4 p-2 rounded-lg shadow-md bg-white">
//       {staff.map((person) => (
//         <LabStaffCard
//           key={person._id}
//           id={person._id}
//           name={person.firstname}
//           lastname={person.lastname}
//           role={person.role}
//         />
//       ))}
//     </div>
//   );
// };

// export default LabStaffList;
