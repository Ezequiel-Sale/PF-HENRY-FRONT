"use client";

import { DataTablePagination } from "@/components/Table/data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { getPayments } from "@/services/pay";
import { useEffect, useState } from "react";

interface IPayment {
  id: string;
  fecha_pago: string;
  metodopago: string;
  clientes: {
    email: string;
  };
  id_plan: {
    name: string;
    price: number;
  };
}

const Pays = () => {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [loading, setLoading] = useState(true);

  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPagesIndex, setTotalPagesIndex] = useState(2);
  const [totalPayments, setTotalPayments] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { payments, metadata } = await getPayments(pageIndex, pageSize);
        console.log("Payments", payments);
        if (Array.isArray(payments)) {
          setPayments(payments);
          setTotalPayments(metadata.totalPays);
          setTotalPagesIndex(metadata.totalPages);
        } else {
          console.error("La respuesta no es un array:", payments);
          setPayments([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [pageSize, pageIndex, totalPagesIndex, totalPayments]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="mt-4">
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-blue-100">
              <TableHead className="text-center py-3 px-4 font-semibold text-gray-700">
                Método de pago
              </TableHead>
              <TableHead className="text-center py-3 px-4 font-semibold text-gray-700 hidden md:table-cell">
                Fecha de pago
              </TableHead>
              <TableHead className="text-center py-3 px-4 font-semibold text-gray-700">
                Correo usuario
              </TableHead>
              <TableHead className="text-center py-3 px-4 font-semibold text-gray-700">
                Plan
              </TableHead>
              <TableHead className="text-center py-3 px-4 font-semibold text-gray-700">
                Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment: IPayment, index: number) => (
              <TableRow
                key={payment.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <TableCell className="text-center py-2 px-4">
                  {payment.metodopago}
                </TableCell>
                <TableCell className="text-center py-2 px-4 hidden md:table-cell">
                  {payment.fecha_pago}
                </TableCell>
                <TableCell className="text-center py-2 px-4">
                  {payment.clientes.email}
                </TableCell>
                <TableCell className="text-center py-2 px-4">
                  {payment.id_plan.name}
                </TableCell>
                <TableCell className="text-center py-2 px-4">
                  {payment.id_plan.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DataTablePagination
          data={payments}
          allDataSize={totalPayments}
          pageSizeOptions={[5, 10, 15, 20, 25]}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          totalPagesIndex={totalPagesIndex}
        />
      </div>
    </div>
  );
};

export default Pays;
