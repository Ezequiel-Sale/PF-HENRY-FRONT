import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { getUsers } from "@/helper/petitions";
import ButtonFile from "./ButtonFile";
import { User } from "@/app/dashboard/users/page";

const Lunes = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="px-2">
      {[
        { time: "08:00 - 10:00am" },
        { time: "10:00 - 12:00pm" },
        { time: "12:00 - 14:00pm" },
        { time: "14:00 - 16:00pm" },
        { time: "16:00 - 18:00pm" },
        { time: "18:00 - 20:00pm" },
        { time: "20:00 - 22:00pm" },
        { time: "22:00 - 00:00am" },
      ].map((slot, index) => (
        <Accordion key={index} type="single" collapsible>
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger>{slot.time}</AccordionTrigger>
            <AccordionContent>
              <TabsContent value="lunes">
                <TabsList className="w-[80vw] flex justify-around">
                  <Tabs className="w-14">Nombre</Tabs>
                  <Tabs className="w-20">Horario</Tabs>
                  <Tabs className="w-20">Peso</Tabs>
                  <Tabs className="w-20">Rutina</Tabs>
                </TabsList>
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-around items-center bg-gray-300 my-1"
                  >
                    <div className="w-20">{user.name}</div>
                    <div className="w-25">{user.horario}</div>
                    <div className="w-20">{user.peso}</div>
                    <ButtonFile id={user.id.toString()} />
                  </div>
                ))}
              </TabsContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default Lunes;
