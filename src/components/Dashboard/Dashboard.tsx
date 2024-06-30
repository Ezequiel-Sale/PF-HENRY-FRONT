"use client";
import React from "react";
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

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justift-betweeen gap-5 mb-5">
        <DashboardCard
          title="Usuarios"
          count={100}
          icon={<User size={72} className="text-slate-500" />}
        />

        <DashboardCard
          title="Activos"
          count={78}
          icon={<ShieldCheck size={72} className="text-slate-500" />}
        />

        <DashboardCard
          title="Inactivos"
          count={22}
          icon={<ShieldOff size={72} className="text-slate-500" />}
        />

        <Link href="/dashboard/profesores">
          <DashboardCard
            title="Profesores"
            count={4}
            icon={<PersonStanding size={72} className="text-slate-500" />}
          />
        </Link>
      </div>
      <SuscriptionTable title="Suscripciones" limit={5} />
    </>
  );
};

export default Dashboard;
