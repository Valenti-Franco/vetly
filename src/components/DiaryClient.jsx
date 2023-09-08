import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
import dayjs from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { SingleInputDateTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputDateTimeRangeField";
import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
const Diary = () => {
  const addDay = () => {};

  const [information, setInformation] = useState([]);
  const [eventsData, setEventsData] = useState(information);

  const [selectedDate, setSelectedDate] = useState(dayjs("2023-08-01"));

  const [start, setStart] = useState(dayjs("2022-04-17T15:30"));
  const [end, setEnd] = useState(dayjs("2022-04-17T18:30"));
  const [title, setTitle] = useState("");
  const [task, setTask] = useState(0);

  //MASCOTA STATE
  const [owner, setOwner] = useState({
    fullName: "",
    phone: "",
    dni: "",
    gender: null,
    birthDate: null,
    email: "",
  });
  const [typeAnimal, setTypeAnimal] = useState(null);
  const [sizePet, setSizePet] = useState(null);
  const [genderPet, setGenderPet] = useState(null);
  const [birthPet, setBirthPet] = useState(null);
  const [racePet, setRacePet] = useState("");
  const [causePet, setCausePet] = useState("");

  const [time, setTime] = useState(null);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [editStart, setEditStart] = useState(dayjs("2022-04-17T15:30"));
  const [editEnd, setEditEnd] = useState(dayjs("2022-04-17T18:30"));
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetch("server/db/fechasClient.json")
      .then((response) => response.json())
      .then((data) => {
        const events = data.map((event) => ({
          ...event,
          start: moment(event.start).toDate(), // Convertir a objeto Date
          end: moment(event.end).toDate(), // Convertir a objeto Date
        }));
        setInformation(events);
      });
  }, []);

  // useEffect(() => {
  //   console.log(information);
  // }, [information]);

  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const redTheme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.variant === "contained" &&
              ownerState.color === "primary" && {
                backgroundColor: "#FF0000", // Rojo
                color: "#fff", // Texto blanco
              }),
          }),
        },
      },
    },
  });
  const handleOpen = () => {
    setOpen(true);
  };
  const handleTypeAnimalChange = (event) => {
    setTypeAnimal(event.target.value);
  };
  const handlesetSizePet = (event) => {
    setSizePet(event.target.value);
  };
  const handlesetGenderPet = (event) => {
    setGenderPet(event.target.value);
  };
  const handlesetBirthPet = (event) => {
    setBirthPet(event.target.value);
  };
  const handlesetTime = (event) => {
    setTime(event.target.value);
  };
  const handlesetRacePet = (event) => {
    setRacePet(event.target.value);
  };

  const handlesetCause = (event) => {
    setCausePet(event.target.value);
  };
  const handleFullNameChange = (event) => {
    setOwner({ ...owner, fullName: event.target.value });
  };

  const handlePhoneChange = (event) => {
    setOwner({ ...owner, phone: event.target.value });
  };

  const handleDniChange = (event) => {
    setOwner({ ...owner, dni: event.target.value });
  };

  const handleGenderChange = (event) => {
    setOwner({ ...owner, gender: event.target.value });
  };

  const handleBirthDateChange = (event) => {
    setOwner({ ...owner, birthDate: event.target.value });
  };

  const handleEmailChange = (event) => {
    setOwner({ ...owner, email: event.target.value });
  };

  const handleClose = () => {
    setTask(0);
    setTypeAnimal(null);
    setSizePet(null);
    setGenderPet(null);
    setBirthPet(null);
    setRacePet(null);
    setCausePet("");
    setTime(null);
    setOpen(false);
    setOpenEdit(false);
    setError("");
  };
  useEffect(() => {
    // console.log(`${causePet} / ${typeAnimal} / ${owner.fullName}`);
    // console.log(title);
    if (task === 2) {
      setTitle(`${causePet} / ${typeAnimal} / ${owner.fullName}`);
    }
  }, [title]);

  useEffect(() => {
    // console.log(`${causePet} / ${typeAnimal} / ${owner.fullName}`);
    if (task === 2) {
      setTitle(`${causePet} / ${typeAnimal} / ${owner.fullName}`);
    }
  }, [task]);

  const handleEventClick = (slotInfo) => {
    setOpenEdit(true);
    const citation = slotInfo;
    setSelectedEvent(slotInfo);

    // console.log(citation);
    const citationStart = dayjs(citation.start)
      .hour(dayjs(citation.start).hour())
      .minute(dayjs(citation.start).minute());
    // console.log(citationStart);
    const citationEnd = dayjs(citation.end)
      .hour(dayjs(citation.end).hour())
      .minute(dayjs(citation.end).minute());
    setTitle(citation.title);
    setStart(citationStart);
    setEnd(citationEnd);

    // Aquí puedes hacer lo que necesites con el número del día del mes
  };
  const events = [
    {
      start: moment("2023-08-28T10:00:00").toDate(),
      end: moment("2023-08-28T12:00:00").toDate(),
      title: "Gatito",
    },
  ];
  const handleSelect = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setTitle("");
    handleOpen();
  };
  const handlerSaveEdit = () => {
    const DeleteEvent = {
      title: selectedEvent.title, // Usar el título del evento original seleccionado
      start: selectedEvent.start, // Usar la fecha de inicio del evento original seleccionado
      end: selectedEvent.end, // Usar la fecha de finalización del evento original seleccionado
    };
    const newEvent = {
      title: title,
      start: start.toDate(),
      end: end.toDate(),
    };
    if (title === "") {
      return setError("Ingresa un titulo");
    }
    // Verificar superposición de fechas con citas existentes
    const isOverlap = information.some((event) => {
      if (event === selectedEvent) {
        return false; // Excluir el evento original de la comparación
      }
      const eventStart = dayjs(event.start);
      const eventEnd = dayjs(event.end);
      console.log(
        ((start.isAfter(eventStart) || start.isSame(eventStart)) &&
          start.isBefore(eventEnd)) ||
          (end.isAfter(eventStart) &&
            (end.isBefore(eventEnd) || end.isSame(eventEnd))) ||
          (start.isBefore(eventStart) && end.isAfter(eventEnd))
      );
      return (
        ((start.isAfter(eventStart) || start.isSame(eventStart)) &&
          start.isBefore(eventEnd)) ||
        (end.isAfter(eventStart) &&
          (end.isBefore(eventEnd) || end.isSame(eventEnd))) ||
        (start.isBefore(eventStart) && end.isAfter(eventEnd))
      );
    });

    if (isOverlap) {
      // Mostrar mensaje de error o tomar acción apropiada
      setError("La nueva cita se superpone con una cita existente.");
      // console.log("La nueva cita se superpone con una cita existente.");
    } else {
      // No hay superposición, agregar el nuevo evento
      const updatedEvents = information.map((event) =>
        event === selectedEvent ? newEvent : event
      );
      setError("");
      setInformation(updatedEvents);
      handleClose();
    }
  };
  const handleDeleteEvent = () => {
    // Eliminar el evento original seleccionado
    const updatedEvents = information.filter(
      (event) => event !== selectedEvent
    );
    setInformation(updatedEvents);
    handleClose();
    setError("");
  };
  const handleSave = (slotInfo) => {
    // console.log(selectedDate);
    const selectedDate1 = dayjs(selectedDate);
    const startDatetime = selectedDate1
      .hour(dayjs(start).hour())
      .minute(dayjs(start).minute());
    const endDatetime = selectedDate1
      .hour(dayjs(end).hour())
      .minute(dayjs(end).minute());

    if (title === "") {
      return setError("Ingresa un titulo");
    }
    const newEvent = {
      title: title,
      start: startDatetime.toDate(),
      end: endDatetime.toDate(),
    };

    // Verificar superposición de fechas con citas existentes
    // const isOverlap = information.some((event) => {
    //   console.log(event);
    //   // console.log(information);
    //   const eventStart = dayjs(event.start);
    //   const eventEnd = dayjs(event.end);
    //   const start1 = dayjs(start);
    //   const end1 = dayjs(end);

    //   console.log("eventStart", eventStart, "start", start);
    //   console.log("eventEnd", eventEnd, "end", end);

    //   // Comprueba si `start` está después o es igual a `eventStart` y antes de `eventEnd`
    //   // const condition1 =
    //   //   (start.isAfter(eventStart) || start.isSame(eventStart)) &&
    //   //   start.isBefore(eventEnd);
    //   // // console.log("Condition 1:", condition1);

    //   // // Comprueba si `end` está después de `eventStart` y antes o es igual a `eventEnd`
    //   // const condition2 =
    //   //   end.isAfter(eventStart) &&
    //   //   (end.isBefore(eventEnd) || end.isSame(eventEnd));
    //   // // console.log("Condition 2:", condition2);

    //   // // Comprueba si `start` está antes de `eventStart` y `end` está después de `eventEnd`
    //   // const condition3 = start.isBefore(eventStart) && end.isAfter(eventEnd);
    //   // // console.log("Condition 3:", condition3);

    //   if (start.isBefore(eventEnd) && end.isAfter(eventStart)) {
    //     // Hay un solapamiento entre el nuevo evento y el evento actual
    //     return true;
    //   }

    //   return false;
    // });

    // if (isOverlap) {
    //   // Mostrar mensaje de error o tomar acción apropiada
    //   setError("La nueva cita se superpone con una cita existente.");

    //   // console.log("La nueva cita se superpone con una cita existente.");
    // } else {
    //   // No hay superposición, agregar el nuevo evento
    //   const updatedEvents = [...information, newEvent];
    //   setInformation(updatedEvents);
    //   // setError("");
    //   // setTask(0);
    //   // handleClose();
    // }
    const overlappingEvents = information.filter((event) => {
      const eventStart = dayjs(event.start);
      const eventEnd = dayjs(event.end);

      return (
        (startDatetime.isBefore(eventEnd) && endDatetime.isAfter(eventStart)) ||
        (eventStart.isBefore(endDatetime) && eventEnd.isAfter(startDatetime))
      );
    });

    if (overlappingEvents.length > 0) {
      // Mostrar o manejar los eventos que se superponen
      console.log("Eventos superpuestos:", overlappingEvents);
      setError("La nueva cita se superpone con una o más citas existentes.");
    } else {
      // No hay superposición, agregar el nuevo evento
      const updatedEvents = [...information, newEvent];
      setInformation(updatedEvents);
      setError(""); // Limpia el error si no hay superposición
      setTask(0);
      handleClose();
      // Otras acciones necesarias
    }
  };
  const [value, setValue] = React.useState(() => [
    dayjs("2022-04-17T15:30"),
    dayjs("2022-04-17T18:30"),
  ]);

  const backTask = () => {
    setTask(task - 1);
  };
  const nextTask = () => {
    if (task === 0) {
      let errorMessages = [];

      if (typeAnimal === null) {
        errorMessages.push("Ingresa un Tipo de Animal");
      }
      if (birthPet === null) {
        errorMessages.push("Ingresa la fecha de nacimiento");
      }
      if (sizePet === null) {
        errorMessages.push("Selecciona el tamaño del animal");
      }
      if (genderPet === null) {
        errorMessages.push("Selecciona el género del animal");
      }
      if (racePet === null) {
        errorMessages.push("Ingresa la raza del animal");
      }
      if (causePet === "") {
        errorMessages.push("Ingresa la causa del turno");
      }

      if (errorMessages.length > 0) {
        return setError(errorMessages);
      }
    }
    if (task === 1) {
      let errorMessages = [];
      // console.log(owner.fullName === "");
      if (owner.fullName === "") {
        errorMessages.push("Ingresa el nombre completo del dueño");
      }
      if (owner.phone === "") {
        errorMessages.push("Ingresa el número de teléfono del dueño");
      }
      if (owner.dni === "") {
        errorMessages.push("Ingresa el DNI del dueño");
      }
      if (owner.gender === null) {
        errorMessages.push("Selecciona el género del dueño");
      }
      if (owner.birthDate === null) {
        errorMessages.push("Ingresa la fecha de nacimiento del dueño");
      }
      if (owner.email === "") {
        errorMessages.push("Ingresa el correo electrónico del dueño");
      }
      // Validación del nombre completo
      if (owner.fullName.trim().split(" ").length < 2) {
        errorMessages.push("El nombre completo debe tener al menos 2 palabras");
      }

      // Validación del número de teléfono
      if (owner.phone.trim().length < 10) {
        errorMessages.push(
          "El número de teléfono debe tener al menos 10 dígitos"
        );
      }

      // Validación del DNI
      if (owner.dni.trim().length !== 8 || !/^\d+$/.test(owner.dni.trim())) {
        errorMessages.push("El DNI debe tener 8 dígitos numéricos");
      }

      // Validación del correo electrónico
      if (
        !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
          owner.email.trim()
        )
      ) {
        errorMessages.push(
          "El correo electrónico debe tener un formato válido"
        );
      }

      if (errorMessages.length > 0) {
        return setError(errorMessages);
      }
    }
    setError("");
    setTask(task + 1);
  };
  return (
    <div className="flex flex-col h-4/5 justify-around items-center ">
      <div></div>
      <div className="w-full h-4/5">
        <div>
          <Dialog open={openEdit} onClose={handleClose}>
            <Button onClick={handleClose} color="primary">
              Cerrar
            </Button>
            <h1 className="text-center p-5 text-4xl">
              {moment(selectedDate).format("l")}
            </h1>

            <DialogTitle id="alert-dialog-title">{"Editar Cita"}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Titulo"
                type="text"
                fullWidth
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </DialogContent>
            <DialogContent>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <SingleInputTimeRangeField
                  label="Hora de Inicio y Finalización"
                  value={[start, end]}
                  onChange={(newValue) => {
                    setStart(newValue[0]);
                    setEnd(newValue[1]);
                  }}
                />
              </LocalizationProvider>
            </DialogContent>
            {error !== "" ? (
              <DialogContent>
                <p
                  style={{
                    color: "red",
                    maxWidth: "250px",
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              </DialogContent>
            ) : null}
            <DialogActions>
              <Button onClick={handleDeleteEvent} color="secondary">
                Eliminar
              </Button>
              <Button onClick={handlerSaveEdit} color="primary">
                Editar
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog className=" " open={open} onClose={handleClose}>
            <Button onClick={handleClose} color="primary">
              Cerrar
            </Button>
            <h1 className="text-center p-5 text-4xl">
              {moment(selectedDate).format("l")}
            </h1>
            <p className="  font-extrabold text-center font-bold text-lg text-gray-900">
              PEDIR TURNO
            </p>
            <DialogTitle id="alert-dialog-title">
              {task === 0 ? (
                <p className="  text-center mb-2 font-bold text-lg text-gray-900">
                  Datos de la Mascota
                </p>
              ) : task === 1 ? (
                <p className="  text-center mb-2 font-bold text-lg text-gray-900">
                  Datos del Dueño
                </p>
              ) : (
                <p className="  text-center mb-2 font-bold text-lg text-gray-900">
                  Horarios
                </p>
              )}

              <div class="w-full h-2 bg-blue-200 rounded-full">
                <div
                  className={
                    task === 0
                      ? "w-0 h-full text-center text-xs text-white bg-blue-600 rounded-full transition-width duration-300"
                      : task === 1
                      ? "w-1/3 h-full text-center text-xs text-white bg-blue-600 rounded-full transition-width duration-300"
                      : "w-2/3 h-full text-center text-xs text-white bg-blue-600 rounded-full transition-width duration-300"
                  }
                ></div>
              </div>
            </DialogTitle>
            <DialogContent>
              {task === 0 ? (
                <form className=" flex w-96   flex flex-col">
                  <label class="mb-2 font-bold text-lg text-gray-900">
                    Tipo de Animal
                    <select
                      value={typeAnimal}
                      onChange={handleTypeAnimalChange}
                      className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                    >
                      <option selected disabled>
                        Selecciona el tipo de mascota
                      </option>
                      <option>Perro</option>
                      <option>Gato</option>
                      <option>Conejo</option>
                      <option>Pájaro</option>
                      <option>Hámster</option>
                      <option>Reptil</option>
                      <option>Tortuga</option>
                    </select>
                  </label>
                  <label class="mb-2 font-bold text-lg text-gray-900">
                    Tamaño
                    <select
                      value={sizePet}
                      onChange={handlesetSizePet}
                      className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                    >
                      <option selected disabled>
                        Tamaño
                      </option>

                      <option>Chico (10-30 cm)</option>
                      <option>Mediano (30-50 cm)</option>
                      <option>Grande (más de 50 cm)</option>
                    </select>
                  </label>
                  <label class="mb-2 font-bold text-lg text-gray-900">
                    Género
                    <select
                      value={genderPet}
                      onChange={handlesetGenderPet}
                      className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                    >
                      <option selected disabled>
                        Género
                      </option>

                      <option>Macho</option>
                      <option>Hembra</option>
                    </select>
                  </label>
                  <label
                    class="mb-2 font-bold text-lg text-gray-900"
                    for="first_name"
                  >
                    Fecha de Nacimineto de la Mascota
                    <input
                      onChange={handlesetBirthPet}
                      value={birthPet}
                      className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                      placeholder="Fecha de Nacimiento"
                      type="Date"
                    />
                  </label>

                  <label class="mb-2 font-bold text-lg text-gray-900">
                    Raza
                    <input
                      onChange={handlesetRacePet}
                      value={racePet}
                      className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                      type="text"
                      placeholder="Raza "
                    />
                  </label>
                  <label class="mb-2 font-bold text-lg text-gray-900">
                    Causa del turno
                    <input
                      type="text"
                      onChange={handlesetCause}
                      value={causePet}
                      placeholder="Dificultad respiratoria de mi gato "
                      className="w-full  p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                    />
                  </label>
                </form>
              ) : task === 1 ? (
                <form className="flex w-96 flex flex-col">
                  <label class="mb-2 font-bold text-lg text-gray-900">
                    Nombre Completo
                    <input
                      className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                      type="text"
                      placeholder="Juan Perez"
                      value={owner.fullName}
                      onChange={handleFullNameChange}
                    />
                  </label>
                  <label class="mb-2 font-bold text-lg text-gray-900">
                    Teléfono
                    <input
                      className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                      type="number"
                      placeholder="3415951231"
                      value={owner.phone}
                      onChange={handlePhoneChange}
                    />
                  </label>
                  <label class="mb-2 font-bold text-lg text-gray-900">
                    DNI
                    <input
                      className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                      type="number"
                      placeholder="34567901"
                      value={owner.dni}
                      onChange={handleDniChange}
                    />
                  </label>
                  <label class="mb-2 font-bold text-lg text-gray-900">
                    Género
                    <select
                      className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                      value={owner.gender}
                      onChange={handleGenderChange}
                    >
                      <option selected disabled>
                        Género
                      </option>
                      <option>Masculino</option>
                      <option>Femenino</option>
                    </select>
                  </label>
                  <label
                    class="mb-2 font-bold text-lg text-gray-900"
                    for="first_name"
                  >
                    Fecha de Nacimiento
                    <input
                      className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                      placeholder="Fecha de Nacimiento"
                      value={owner.birthDate}
                      onChange={handleBirthDateChange}
                      type="Date"
                    />
                  </label>
                  <label class="mb-2 font-bold text-lg text-gray-900">
                    Email
                    <input
                      className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                      type="mail"
                      placeholder="hola@gmail.com"
                      value={owner.email}
                      onChange={handleEmailChange}
                    />
                  </label>
                </form>
              ) : (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <label class="mb-2 font-bold text-lg text-gray-900">
                    Hora de Inicio y Finalización
                    <SingleInputTimeRangeField
                      className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                      value={[start, end]}
                      onChange={(newValue) => {
                        setStart(newValue[0]);
                        setEnd(newValue[1]);
                      }}
                    />
                  </label>
                </LocalizationProvider>
              )}
            </DialogContent>

            {error !== "" ? (
              <DialogContent className=" flex">
                <p class="mb-2 font-bold text-lg text-red-600  text-gray-900">
                  {
                    <ul className="mb-2 text-lg text-red-600 text-gray-900">
                      {Array.isArray(error) ? (
                        error.map((errorMessage, index) => (
                          <li key={index}>{errorMessage}</li>
                        ))
                      ) : (
                        <li>{error}</li>
                      )}
                    </ul>
                  }
                </p>
              </DialogContent>
            ) : null}
            <DialogActions>
              {task !== 0 ? (
                <>
                  <Button onClick={backTask} color="primary">
                    ANTERIOR PASO
                  </Button>
                  <Button
                    onClick={task === 1 ? nextTask : handleSave}
                    color="primary"
                  >
                    {task === 1 ? "SUIGUIENTE PASO" : "CONFIRMAR TURNO"}
                  </Button>
                </>
              ) : (
                <Button onClick={nextTask} color="primary">
                  SUIGUIENTE PASO
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </div>
        <Calendar
          selectable
          localizer={localizer}
          events={information}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          toolbar={true}
          onSelectEvent={handleEventClick}
          onSelectSlot={handleSelect}
          // Para depurar y ver cuándo cambia la vista
        />
      </div>
    </div>
  );
};

export default Diary;
