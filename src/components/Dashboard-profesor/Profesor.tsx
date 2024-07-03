import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Lunes from "./Lunes";

export const arrayUser = [
  {
    id: 1,
    name: "Ezequiel",
    horario: "08:00 - 10:00",
    peso: "80kg",
  },
  {
    id: 2,
    name: "Jorge",
    horario: "08:00 - 10:00",
    peso: "80kg",
  },
  {
    id: 3,
    name: "Jorge",
    horario: "08:00 - 10:00",
    peso: "80kg",
  },
];
export const arrayUser2 = [
  {
    id: 1,
    name: "Jorge",
    horario: "10:00 - 12:00",
    peso: "80kg",
  },
  {
    id: 2,
    name: "Juan",
    horario: "10:00 - 12:00",
    peso: "80kg",
  },
  {
    id: 3,
    name: "Julieta",
    horario: "10:00 - 12:00",
    peso: "80kg",
  },
];
const Profesor = () => {
  return (
    <>
      <h3 className="text-3xl font-bold text-center text-white">Foto?</h3>
      <h1 className="text-3xl font-bold text-center text-white">Profesor `nombre del profesor`</h1>
      <div className="flex justify-center mt-4 h-[100%] pb-10">
        <Tabs defaultValue="account" className="bg-white rounded-md">
          <TabsList className="w-[80vw] flex justify-around">
            <TabsTrigger value="lunes">Lunes</TabsTrigger>
            <TabsTrigger value="martes">Martes</TabsTrigger>
            <TabsTrigger value="miercoles">Miercoles</TabsTrigger>
            <TabsTrigger value="jueves">Jueves</TabsTrigger>
            <TabsTrigger value="viernes">Viernes</TabsTrigger>
          </TabsList>
          <Lunes />

          <TabsContent value="martes"></TabsContent>
          <TabsContent value="miercoles"></TabsContent>
          <TabsContent value="jueves"></TabsContent>
          <TabsContent value="viernes"></TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profesor;
