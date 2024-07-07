import { useState } from "react";

const WeekdayPicker = ({
  onchange,
}: {
  onchange: (value: string[]) => void;
}) => {
  const [weekdays, setWeekdays] = useState([
    { name: "Lun", checked: false, value: "Lunes" },
    { name: "Mar", checked: false, value: "Martes" },
    { name: "Mie", checked: false, value: "Miercoles" },
    { name: "Jue", checked: false, value: "Jueves" },
    { name: "Vie", checked: false, value: "Viernes" },
  ]);

  const toggleDay = (index: number) => {
    const newWeekdays = [...weekdays];
    newWeekdays[index].checked = !newWeekdays[index].checked;
    setWeekdays(newWeekdays);
    onchange(newWeekdays.filter((day) => day.checked).map((day) => day.value));
  };

  return (
    <div className="flex justify-center items-center space-x-2 p-4">
      {weekdays.map((day, index) => (
        <div key={index} className="form-checkbox">
          <input
            type="checkbox"
            id={`weekday-${index}`}
            checked={day.checked}
            onChange={() => toggleDay(index)}
            className="sr-only"
          />
          <label
            htmlFor={`weekday-${index}`}
            className={`w-12 h-12 flex justify-center items-center rounded-full border-2 cursor-pointer ${
              day.checked ? "bg-red-600 text-white" : "bg-white text-red-600"
            }`}
          >
            {day.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default WeekdayPicker;
