"use client";

import React from "react";
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
    <div className="text-white w-full px-20 bg-black">
      <div className="w-full flex flex-col items-center justify-center h-[60vh] bg-black relative overflow-hidden">
        <h2 className="text-8xl font-extrabold text-white mb-4 relative z-10 transition-all duration-300 hover:scale-105">
          <span className="relative group">
            Objetivos
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </span>
        </h2>
        <p className="text-xl text-white text-center max-w-2xl relative z-10 transition-all duration-300">
          Descubre cómo nuestros servicios personalizados pueden ayudarte a alcanzar tus metas de salud, deporte y estética.
        </p>
      </div>
      <div className="w-full bg-transparent text-xl font-bold">
        <div className="text-white flex gap-6 justify-around py-10">
          {[
            { icon: MdHealthAndSafety, text: "Salud", href: "#salud", hoverColor: "hover:bg-red-700" },
            { icon: MdOutlineSportsMartialArts, text: "Deporte", href: "#sports", hoverColor: "hover:bg-red-700" },
            { icon: LuScanFace, text: "Estética", href: "#estetico", hoverColor: "hover:bg-red-700" },
          ].map((item, index) => (
            <a key={index} className={`group border-2 border-gray-600 rounded-md p-4 flex-col flex justify-center items-center min-w-36 ${item.hoverColor} hover:text-white transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-red-500`} href={item.href}>
              {React.createElement(item.icon, { size: 70, className: "transition-all duration-300 group-hover:text-white" })}
              <p className="mt-2 group-hover:text-white">{item.text}</p>
            </a>
          ))}
        </div>
      </div>
      <div className="my-20 w-full flex flex-col lg:flex-row" id="salud">
        <div className="w-full lg:w-1/2 mt-10">
          <h3 className="text-6xl lg:text-8xl font-extrabold mt-10 text-white">Salud</h3>
          <Accordion
            type="single"
            collapsible
            className="w-full mt-6"
            defaultValue="rehabilitacion_post_lesion"
          >
            <AccordionItem value="rehabilitacion_post_lesion">
              <AccordionTrigger>
                <h4 className="text-2xl lg:text-4xl font-semibold text-gray-300">
                  Rehabilitación Post-Lesión
                </h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 rounded-lg shadow-md bg-gray-800 bg-opacity-50">
                  <p className="text-sm">
                    Programas personalizados diseñados para ayudar en la
                    recuperación de lesiones, utilizando ejercicios específicos
                    para fortalecer las áreas afectadas.
                  </p>
                  <h5 className="mt-4 mb-2 text-lg font-semibold text-gray-300">
                    Beneficios:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Acelera la recuperación de lesiones.</li>
                    <li>Restaura la movilidad y la función.</li>
                    <li>Reduce el dolor y la inflamación.</li>
                    <li>Previene futuras lesiones.</li>
                  </ul>
                  <h5 className="mt-4 mb-2 text-lg font-semibold text-gray-300">
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
                <h4 className="text-2xl lg:text-4xl font-semibold text-gray-300">
                  Entrenamiento para la Salud General
                </h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 rounded-lg shadow-md bg-gray-800 bg-opacity-50">
                  <p className="text-sm">
                    Rutinas enfocadas en mantener y mejorar la salud general del
                    cuerpo, combinando ejercicios cardiovasculares, de fuerza y
                    de flexibilidad.
                  </p>
                  <h5 className="mt-4 mb-2 text-lg font-semibold text-gray-300">
                    Beneficios:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Mejora la salud cardiovascular.</li>
                    <li>Aumenta la fuerza y la resistencia muscular.</li>
                    <li>Mejora la flexibilidad y la movilidad.</li>
                    <li>Reduce el riesgo de enfermedades crónicas.</li>
                  </ul>
                  <h5 className="mt-4 mb-2 text-lg font-semibold text-gray-300">
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
        <div className="lg:w-1/2 flex items-center justify-center">
          <img src="dancing.png" alt="dancing" className="rounded-lg mt-10 lg:mt-0 w-[450px] h-[600px]" />
        </div>
      </div>

      <div className="mt-20 w-full flex flex-col lg:flex-row justify-between" id="sports">
        <div className="w-full lg:w-1/2 mt-10">
          <h3 className="text-6xl lg:text-8xl font-extrabold mt-10 text-white">Deporte</h3>
          <Accordion
            type="single"
            collapsible
            className="w-full mt-6"
            defaultValue="hiit"
          >
            <AccordionItem value="hiit">
              <AccordionTrigger>
                <h4 className="text-2xl lg:text-3xl font-semibold text-gray-300">
                  Entrenamiento de Alta Intensidad
                </h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 rounded-lg shadow-md bg-gray-800 bg-opacity-50">
                  <p className="text-sm">
                    Sesiones cortas de ejercicio intenso seguidas de periodos de
                    descanso o actividad de baja intensidad, ideal para mejorar
                    la capacidad cardiovascular y la quema de grasa.
                  </p>
                  <h5 className="mt-4 mb-2 text-lg font-semibold text-gray-300">
                    Beneficios:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Mejora la capacidad aeróbica y anaeróbica.</li>
                    <li>Acelera la pérdida de grasa.</li>
                    <li>Incrementa la resistencia cardiovascular.</li>
                    <li>Mejora el rendimiento deportivo general.</li>
                  </ul>
                  <h5 className="mt-4 mb-2 text-lg font-semibold text-gray-300">
                    Ejercicios típicos:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Sprints: 8 series de 30 segundos con 1 minuto de descanso
                    </li>
                    <li>Burpees: 4 series de 20 repeticiones</li>
                    <li>
                      Saltos de cuerda: 5 series de 1 minuto con 30 segundos de
                      descanso
                    </li>
                    <li>Mountain climbers: 4 series de 30 segundos</li>
                    <li>Sentadillas con salto: 3 series de 15 repeticiones</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="deporte">
              <AccordionTrigger>
                <h4 className="text-2xl lg:text-3xl font-semibold text-gray-300">
                  Entrenamiento Deportivo Específico
                </h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 rounded-lg shadow-md bg-gray-800 bg-opacity-50">
                  <p className="text-sm">
                    Programas diseñados para mejorar habilidades específicas de
                    un deporte, incluyendo ejercicios técnicos, tácticos y de
                    acondicionamiento físico.
                  </p>
                  <h5 className="mt-4 mb-2 text-lg font-semibold text-gray-300">
                    Beneficios:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Mejora las habilidades técnicas y tácticas.</li>
                    <li>Incrementa la resistencia y la fuerza.</li>
                    <li>Optimiza el rendimiento en competiciones.</li>
                    <li>Reduce el riesgo de lesiones.</li>
                  </ul>
                  <h5 className="mt-4 mb-2 text-lg font-semibold text-gray-300">
                    Ejercicios típicos:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Drills específicos del deporte: 30 minutos</li>
                    <li>
                      Entrenamiento de fuerza funcional: 3 series de 12
                      repeticiones
                    </li>
                    <li>Ejercicios de agilidad: 20 minutos</li>
                    <li>Sesión de estiramientos y movilidad: 15 minutos</li>
                    <li>Simulación de juego o competición: 30 minutos</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="lg:w-1/2 flex items-center justify-center">
        <img
          src="sport.png"
          alt="sport female"
          className="rounded-lg mt-10 lg:mt-0 w-[450px] h-[600px]"
        />
        </div>
      </div>

      <div className="mt-20 w-full flex flex-col lg:flex-row justify-between" id="estetico">
        <div className="w-full lg:w-1/2 mt-10">
          <h3 className="text-6xl lg:text-8xl font-extrabold mt-10 text-white">Estética</h3>
          <Accordion
            type="single"
            collapsible
            className="w-full mt-6"
            defaultValue="p_perdida_grasa"
          >
            <AccordionItem value="p_perdida_grasa">
              <AccordionTrigger>
                <h4 className="text-2xl lg:text-3xl font-semibold text-gray-300">
                  Programas de Pérdida de Grasa
                </h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 rounded-lg shadow-md bg-gray-800 bg-opacity-50">
                  <p className="text-sm">
                    Entrenamientos y planes nutricionales diseñados para
                    maximizar la quema de grasa y mejorar la composición
                    corporal.
                  </p>
                  <h5 className="mt-4 mb-2 text-lg font-semibold text-gray-300">
                    Beneficios:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Reducción significativa de la grasa corporal.</li>
                    <li>Mejora de la definición muscular.</li>
                    <li>Incremento del metabolismo basal.</li>
                    <li>Mejora de la salud cardiovascular.</li>
                  </ul>
                  <h5 className="mt-4 mb-2 text-lg font-semibold text-gray-300">
                    Ejercicios típicos:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Intervalos de alta intensidad: 8 series de 1 minuto con 30
                      segundos de descanso
                    </li>
                    <li>
                      Circuito de fuerza con pesas moderadas: 3 series de 15
                      repeticiones
                    </li>
                    <li>
                      Cardio en estado estacionario: 30 minutos a ritmo
                      moderado
                    </li>
                    <li>Ejercicios de core: 4 series de 20 repeticiones</li>
                    <li>Estiramientos y flexibilidad: 10 minutos</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="m_hipertrofia">
              <AccordionTrigger>
                <h4 className="text-2xl lg:text-3xl font-semibold text-gray-300">
                  Planes de Hipertrofia Muscular
                </h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 rounded-lg shadow-md bg-gray-800 bg-opacity-50">
                  <p className="text-sm">
                    Rutinas centradas en el aumento de la masa muscular,
                    combinando ejercicios de resistencia con una nutrición
                    adecuada.
                  </p>
                  <h5 className="mt-4 mb-2 text-lg font-semibold text-gray-300">
                    Beneficios:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Incremento significativo de la masa muscular.</li>
                    <li>Mejora de la fuerza y la resistencia.</li>
                    <li>Optimización de la síntesis de proteínas.</li>
                    <li>Mejora de la estética corporal.</li>
                  </ul>
                  <h5 className="mt-4 mb-2 text-lg font-semibold text-gray-300">
                    Ejercicios típicos:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Levantamiento de pesas: 4 series de 10 repeticiones con
                      peso progresivo
                    </li>
                    <li>
                      Ejercicios compuestos como sentadillas y press de banca: 4
                      series de 8 repeticiones
                    </li>
                    <li>Series de drop sets: 3 series de 12 repeticiones</li>
                    <li>
                      Entrenamiento de aislamiento para grupos musculares
                      específicos: 3 series de 15 repeticiones
                    </li>
                    <li>Estiramientos post-entrenamiento: 10 minutos</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="lg:w-1/2 flex items-center justify-center">
          <img src="estetico.png" alt="estetico" className="rounded-lg mt-10 lg:mt-0 w-[400px] h-[450px]" />
        </div>
      </div>
    </div>
  );
};

export default Services;
