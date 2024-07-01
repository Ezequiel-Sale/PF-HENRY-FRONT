"use client";

import { LuScanFace } from "react-icons/lu";
import { MdHealthAndSafety, MdOutlineSportsMartialArts } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Services = () => {
  return (
    <div className="text-white w-full px-20">
      <div className="w-full flex bg-[url('/power.jpg')]  h-[60vh] items-end bg-cover bg-center">
        <h2 className="text-8xl font-extrabold text-black-unfill bg-gray-100 bg-opacity-30 rounded-md">
          Servicios
        </h2>
      </div>
      <div className="w-full bg-transparent text-xl font-bold">
        <div className="text-white flex gap-6  justify-around py-5">
          <a
            className="border border-solid border-white rounded-md p-2 flex-col flex justify-center items-center min-w-36 hover:bg-black hover:text-white hover:cursor-pointer"
            href="#salud"
          >
            <MdHealthAndSafety size={70} />
            <p>Salud</p>
          </a>
          <a
            className="border border-solid border-gray-900 rounded-md p-2 flex-col flex justify-center items-center min-w-36 hover:bg-black hover:text-white hover:cursor-pointer"
            href="#sports"
          >
            <MdOutlineSportsMartialArts size={70} />
            <p>Deporte</p>
          </a>

          <a
            className="border border-solid border-gray-900 rounded-md p-2 flex-col flex justify-center items-center min-w-36 hover:bg-black hover:text-white hover:cursor-pointer"
            href="#estetico"
          >
            <LuScanFace size={70} />
            <p>Estetica</p>
          </a>
        </div>
      </div>
      <div className="my-10  w-full flex" id="salud">
        <div className="w-1/2 h-screen mt-10">
          <h3 className="text-8xl font-extrabold mt-10 ">Salud</h3>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="rehabilitacion_post_lesion"
          >
            <AccordionItem value="rehabilitacion_post_lesion">
              <AccordionTrigger>
                <h4 className="text-4xl font-semibold">
                  Rehabilitación Post-Lesión
                </h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 rounded-lg shadow-md">
                  <p className="text-sm">
                    Programas personalizados diseñados para ayudar en la
                    recuperación de lesiones, utilizando ejercicios específicos
                    para fortalecer las áreas afectadas.
                  </p>
                  <h5 className="mt-4 mb-2 text-lg font-semibold">
                    Beneficios:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Acelera la recuperación de lesiones.</li>
                    <li>Restaura la movilidad y la función.</li>
                    <li>Reduce el dolor y la inflamación.</li>
                    <li>Previene futuras lesiones.</li>
                  </ul>

                  <h5 className="mt-4 mb-2 text-lg font-semibold">
                    Ejercicios típicos:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Ejercicios de estiramiento específicos: 3 series de 10
                      repeticiones
                    </li>
                    <li>
                      Fortalecimiento del core: Plancha de 3 series de 30
                      segundos
                    </li>
                    <li>
                      Ejercicios de movilidad articular: 3 series de 10
                      repeticiones
                    </li>
                    <li>
                      Bandas elásticas para la resistencia: 3 series de 15
                      repeticiones
                    </li>
                    <li>
                      Ejercicios de equilibrio y propiocepción: 3 series de 1
                      minuto
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="entrenamiento_salud_general">
              <AccordionTrigger>
                <h4 className="text-4xl font-semibold">
                  Entrenamiento para la Salud General
                </h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 rounded-lg shadow-md">
                  <p className="text-sm">
                    Rutinas enfocadas en mantener y mejorar la salud general del
                    cuerpo, combinando ejercicios cardiovasculares, de fuerza y
                    de flexibilidad.
                  </p>
                  <h5 className="mt-4 mb-2 text-lg font-semibold">
                    Beneficios:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Mejora la salud cardiovascular.</li>
                    <li>Aumenta la fuerza y la resistencia muscular.</li>
                    <li>Mejora la flexibilidad y la movilidad.</li>
                    <li>Reduce el riesgo de enfermedades crónicas.</li>
                  </ul>

                  <h5 className="mt-4 mb-2 text-lg font-semibold">
                    Ejercicios típicos:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Caminata o trote ligero: 30 minutos</li>
                    <li>
                      Circuito de fuerza con pesas ligeras: 3 series de 15
                      repeticiones
                    </li>
                    <li>Estiramientos dinámicos: 10 minutos</li>
                    <li>Yoga o Pilates: 30 minutos</li>
                    <li>Ejercicios de respiración y relajación: 10 minutos</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <img src="dancing.png" alt="dancing" className="rounded-lg" />
      </div>

      <div className="mt-20  w-full flex justify-between" id="sports">
        <div className="w-1/2 h-screen  mt-10">
          <h3 className="text-8xl font-extrabold mt-10 ">Deporte</h3>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="hiit"
          >
            <AccordionItem value="hiit">
              <AccordionTrigger>
                <h4 className="text-3xl font-semibold">
                  Entrenamiento de Alta Intensidad
                </h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 rounded-lg shadow-md">
                  <p className="text-sm">
                    Sesiones cortas de ejercicio intenso seguidas de periodos de
                    descanso o actividad de baja intensidad, ideal para mejorar
                    la capacidad cardiovascular y la quema de grasa.
                  </p>
                  <h5 className="mt-4 mb-2 text-lg font-semibold">
                    Beneficios:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Mejora la capacidad aeróbica y anaeróbica.</li>
                    <li>Acelera la pérdida de grasa.</li>
                    <li>Incrementa la resistencia cardiovascular.</li>
                    <li>Mejora el rendimiento deportivo general.</li>
                  </ul>

                  <h5 className="mt-4 mb-2 text-lg font-semibold">
                    Ejercicios típicos:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Sprints: 8 series de 30 segundos con 1 minuto de descanso
                    </li>
                    <li>Burpees: 4 series de 20 repeticiones</li>
                    <li>Saltos de caja: 4 series de 15 repeticiones</li>
                    <li>Battle ropes: 4 series de 30 segundos</li>
                    <li>Kettlebell swings: 4 series de 20 repeticiones</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="entrenamiento_funcional">
              <AccordionTrigger>
                <h4 className="text-3xl font-semibold">
                  Entrenamiento Funcional
                </h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 rounded-lg shadow-md">
                  <p className="text-sm">
                    Rutinas que simulan movimientos naturales del cuerpo para
                    mejorar la fuerza y la coordinación, siendo muy útiles para
                    atletas de alto rendimiento.
                  </p>
                  <h5 className="mt-4 mb-2 text-lg font-semibold">
                    Beneficios:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Mejora la coordinación y el equilibrio.</li>
                    <li>Aumenta la fuerza funcional.</li>
                    <li>Reduce el riesgo de lesiones.</li>
                    <li>
                      Mejora el rendimiento deportivo en situaciones reales.
                    </li>
                  </ul>

                  <h5 className="mt-4 mb-2 text-lg font-semibold">
                    Ejercicios típicos:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Sentadilla con salto: 4 series de 15 repeticiones</li>
                    <li>
                      Lanzamiento de balón medicinal: 4 series de 15
                      repeticiones
                    </li>
                    <li>TRX Rows: 4 series de 15 repeticiones</li>
                    <li>Zancadas caminando con peso: 4 series de 20 pasos</li>
                    <li>Mountain climbers: 4 series de 30 segundos</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <img
          src="sport.png"
          alt="sport female"
          className="rounded-lg w-1/3 h-screen"
        />
      </div>

      <div
        className="mt-24 h-screen  pt-20  w-full flex justify-between mb-80"
        id="estetico"
      >
        <div className="w-1/2 h-screen  mt-10">
          <h3 className="text-8xl font-extrabold mt-10 ">Estetico</h3>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="tonificacion"
          >
            <AccordionItem value="tonificacion">
              <AccordionTrigger>
                <h4 className="text-3xl font-semibold">Tonificación</h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4  rounded-lg shadow-md">
                  <p className="text-sm ">
                    Rutina enfocada en ejercicios de resistencia con pesas
                    ligeras y altas repeticiones para definir y tonificar los
                    músculos sin incrementar significativamente el volumen
                    muscular.
                  </p>
                  <h5 className="mt-4 mb-2 text-lg font-semibold ">
                    Beneficios:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Mejora la resistencia muscular.</li>
                    <li>Mejora la definición muscular.</li>
                    <li>Incrementa la fuerza muscular.</li>
                    <li>Incrementa la resistencia cardiovascular.</li>
                  </ul>

                  <h5 className="mt-4 mb-2 text-lg font-semibold ">
                    Ejercicios típicos
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Sentadillas con mancuernas: 3 series de 15 repeticiones
                    </li>
                    <li>
                      Press de hombros con mancuernas: 3 series de 15
                      repeticiones
                    </li>
                    <li>Curl de bíceps: 3 series de 15 repeticiones</li>
                    <li>Elevaciones laterales: 3 series de 15 repeticiones</li>
                    <li>Plancha: 3 series de 30 segundos</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tonificacion_intensiva">
              <AccordionTrigger>
                <h4 className="text-3xl font-semibold">
                  Musculación Intensiva
                </h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4  rounded-lg shadow-md">
                  <p className="text-sm ">
                    Programa de entrenamiento con pesas pesadas y bajas
                    repeticiones para aumentar la masa muscular y la fuerza.
                  </p>
                  <h5 className="mt-4 mb-2 text-lg font-semibold ">
                    Beneficios:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Press de banca: 4 series de 8 repeticiones.</li>
                    <li>Peso muerto: 4 series de 8 repeticiones.</li>
                    <li>Dominadas: 4 series al fallo.</li>
                    <li>Prensa de piernas: 4 series de 8 repeticiones.</li>
                    <li>Remo con barra: 4 series de 8 repeticiones.</li>
                  </ul>

                  <h5 className="mt-4 mb-2 text-lg font-semibold ">
                    Ejercicios típicos
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Sentadillas con mancuernas: 3 series de 15 repeticiones
                    </li>
                    <li>
                      Press de hombros con mancuernas: 3 series de 15
                      repeticiones
                    </li>
                    <li>Curl de bíceps: 3 series de 15 repeticiones</li>
                    <li>Elevaciones laterales: 3 series de 15 repeticiones</li>
                    <li>Plancha: 3 series de 30 segundos</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <img
          src="estetico.png"
          alt="estetico"
          className="rounded-lg h-[70vh] "
        />
      </div>
    </div>
  );
};

export default Services;
