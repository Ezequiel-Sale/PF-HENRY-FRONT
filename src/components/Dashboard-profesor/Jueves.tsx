import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { arrayUser, arrayUser2 } from "./Profesor";
import ButtonFile from "./ButtonFile";
const Jueves = () => {
  return (
    <div className="px-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>08:00 - 10:00am</AccordionTrigger>
            <AccordionContent>
        <TabsContent value="jueves">
          <TabsList className="w-[80vw] flex justify-around">
            <Tabs className="w-14">Nombre</Tabs>
            <Tabs className="w-20">Horario</Tabs>
            <Tabs className="w-20">Peso</Tabs>
            <Tabs className="w-20">Rutina</Tabs>
          </TabsList>
          {arrayUser.map((user) => (
            <div
              key={user.id}
              className="flex justify-around items-center bg-gray-300 my-1"
            >
              <div className="w-20">{user.name}</div>
              <div className="w-25">{user.horario}</div>
              <div className="w-20">{user.peso}</div>
              <ButtonFile />
            </div>
          ))}
        </TabsContent>
              
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>10:00 - 12:00pm</AccordionTrigger>
            <AccordionContent>
        <TabsContent value="jueves">
          <TabsList className="w-[80vw] flex justify-around">
          <Tabs className="w-14">Nombre</Tabs>
            <Tabs className="w-20">Horario</Tabs>
            <Tabs className="w-20">Peso</Tabs>
            <Tabs className="w-20">Rutina</Tabs>
          </TabsList>
          {arrayUser2.map((user) => (
            <div
              key={user.id}
              className="flex justify-around items-center bg-gray-300 my-1"
            >
              <div className="w-20">{user.name}</div>
              <div className="w-25">{user.horario}</div>
              <div className="w-20">{user.peso}</div>
              <ButtonFile />
            </div>
          ))}
        </TabsContent>
              
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>12:00 - 14:00pm</AccordionTrigger>
            <AccordionContent>
        <TabsContent value="jueves">
          <TabsList className="w-[80vw] flex justify-around">
          <Tabs className="w-14">Nombre</Tabs>
            <Tabs className="w-20">Horario</Tabs>
            <Tabs className="w-20">Peso</Tabs>
            <Tabs className="w-20">Rutina</Tabs>
          </TabsList>
          {arrayUser2.map((user) => (
            <div
              key={user.id}
              className="flex justify-around items-center bg-gray-300 my-1"
            >
              <div className="w-20">{user.name}</div>
              <div className="w-25">{user.horario}</div>
              <div className="w-20">{user.peso}</div>
              <ButtonFile />
            </div>
          ))}
        </TabsContent>
              
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>14:00 - 16:00pm</AccordionTrigger>
            <AccordionContent>
        <TabsContent value="jueves">
          <TabsList className="w-[80vw] flex justify-around">
          <Tabs className="w-14">Nombre</Tabs>
            <Tabs className="w-20">Horario</Tabs>
            <Tabs className="w-20">Peso</Tabs>
            <Tabs className="w-20">Rutina</Tabs>
          </TabsList>
          {arrayUser2.map((user) => (
            <div
              key={user.id}
              className="flex justify-around items-center bg-gray-300 my-1"
            >
              <div className="w-20">{user.name}</div>
              <div className="w-25">{user.horario}</div>
              <div className="w-20">{user.peso}</div>
              <ButtonFile />
            </div>
          ))}
        </TabsContent>
              
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>16:00 - 18:00pm</AccordionTrigger>
            <AccordionContent>
        <TabsContent value="jueves">
          <TabsList className="w-[80vw] flex justify-around">
          <Tabs className="w-14">Nombre</Tabs>
            <Tabs className="w-20">Horario</Tabs>
            <Tabs className="w-20">Peso</Tabs>
            <Tabs className="w-20">Rutina</Tabs>
          </TabsList>
          {arrayUser2.map((user) => (
            <div
              key={user.id}
              className="flex justify-around items-center bg-gray-300 my-1"
            >
              <div className="w-20">{user.name}</div>
              <div className="w-25">{user.horario}</div>
              <div className="w-20">{user.peso}</div>
              <ButtonFile />
            </div>
          ))}
        </TabsContent>
              
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>18:00 - 20:00pm</AccordionTrigger>
            <AccordionContent>
        <TabsContent value="jueves">
          <TabsList className="w-[80vw] flex justify-around">
          <Tabs className="w-14">Nombre</Tabs>
            <Tabs className="w-20">Horario</Tabs>
            <Tabs className="w-20">Peso</Tabs>
            <Tabs className="w-20">Rutina</Tabs>
          </TabsList>
          {arrayUser2.map((user) => (
            <div
              key={user.id}
              className="flex justify-around items-center bg-gray-300 my-1"
            >
              <div className="w-20">{user.name}</div>
              <div className="w-25">{user.horario}</div>
              <div className="w-20">{user.peso}</div>
              <ButtonFile />
            </div>
          ))}
        </TabsContent>
              
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>20:00 - 22:00pm</AccordionTrigger>
            <AccordionContent>
        <TabsContent value="jueves">
          <TabsList className="w-[80vw] flex justify-around">
          <Tabs className="w-14">Nombre</Tabs>
            <Tabs className="w-20">Horario</Tabs>
            <Tabs className="w-20">Peso</Tabs>
            <Tabs className="w-20">Rutina</Tabs>
          </TabsList>
          {arrayUser2.map((user) => (
            <div
              key={user.id}
              className="flex justify-around items-center bg-gray-300 my-1"
            >
              <div className="w-20">{user.name}</div>
              <div className="w-25">{user.horario}</div>
              <div className="w-20">{user.peso}</div>
              <ButtonFile />
            </div>
          ))}
        </TabsContent>
              
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>22:00 - 00:00am</AccordionTrigger>
            <AccordionContent>
        <TabsContent value="jueves">
          <TabsList className="w-[80vw] flex justify-around">
          <Tabs className="w-14">Nombre</Tabs>
            <Tabs className="w-20">Horario</Tabs>
            <Tabs className="w-20">Peso</Tabs>
            <Tabs className="w-20">Rutina</Tabs>
          </TabsList>
          {arrayUser2.map((user) => (
            <div
              key={user.id}
              className="flex justify-around items-center bg-gray-300 my-1"
            >
              <div className="w-20">{user.name}</div>
              <div className="w-25">{user.horario}</div>
              <div className="w-20">{user.peso}</div>
              <ButtonFile />
            </div>
          ))}
        </TabsContent>
              
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </div>
    
  )
}

export default Jueves