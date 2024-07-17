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
import { getProfesors } from "@/helper/petitions";
import { IUser } from "@/types/profesorInterface";
import { getUsers } from "@/services/users";
import { metadata } from "@/app/layout";
import { set } from "zod";

const Dashboard = () => {
  const [profesorNumber, setProfesorNumber] = useState([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [inactiveUser, setInactiveUser] = useState(0);
  const [totalUserActives, setTotalUserActives] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProfessors, setTotalProfessors] = useState(0);

  useEffect(() => {
    const fetchProfesors = async () => {
      const { professors } = await getProfesors(1, 1000);
      setProfesorNumber(professors);
      const { users, metadata } = await getUsers(1, 5);
      setUsers(users);
      setTotalUserActives(metadata.totalUserActives);
      setInactiveUser(metadata.totalUserInactives);
      setTotalUsers(metadata.totalUsers);
    };

    fetchProfesors();
  }, [users.length, inactiveUser, totalUserActives]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-center md:items-center md:flex-wrap justift-betweeen gap-5 mb-5">
        <DashboardCard
          title="Usuarios"
          count={totalUsers}
          icon={<User size={72} className="text-slate-500" />}
        />

        <DashboardCard
          title="Activos"
          count={totalUserActives}
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
