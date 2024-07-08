"use client";
import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard/DashboardCard";
import SuscriptionTable from "./Suscripciones/SuscriptionTable";
import {
  Folder,
  MessageCircle,
  Newspaper,
  User,
  ShieldCheck,
  ShieldOff,
  PersonStanding,
} from "lucide-react";
import Link from "next/link";
import { getProfesors, getUsers } from "@/helper/petitions";
import { IUser } from "@/types/profesorInterface";

const Dashboard = () => {
   const [profesorNumber, setProfesorNumber] = useState([]);
   const [users, setUsers] = useState<IUser[]>([]);
   const [inactiveUser, setInactiveUser] = useState(0);

   useEffect(() => {
    const fetchProfesors = async () =>{
      const profesors = await getProfesors();
      setProfesorNumber(profesors);
      const user = await getUsers();
      setUsers(user);

      const inactiveUsers = user.filter((u: IUser) => !u.estado);
      setInactiveUser(inactiveUsers.length);
    };

    fetchProfesors();
  }, [users]);

  return (
    <>
      <div className="flex flex-col md:flex-row justift-betweeen gap-5 mb-5">
        <DashboardCard
          title="Usuarios"
          count={users.length}
          icon={<User size={72} className="text-slate-500" />}
        />

        <DashboardCard
          title="Activos"
          count={users.filter((u) => u.estado).length}
          icon={<ShieldCheck size={72} className="text-slate-500" />}
        />

        <DashboardCard
          title="Inactivos"
          count={inactiveUser}
          icon={<ShieldOff size={72} className="text-slate-500" />}
        />

        <Link href="/dashboard/profesores">
          <DashboardCard
            title="Profesores"
            count={profesorNumber.length}
            icon={<PersonStanding size={72} className="text-slate-500" />}
          />
        </Link>
      </div>
      <SuscriptionTable title="Suscripciones" limit={5} />
    </>
  );
};

export default Dashboard;
