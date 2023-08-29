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

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [editStart, setEditStart] = useState(dayjs("2022-04-17T15:30"));
  const [editEnd, setEditEnd] = useState(dayjs("2022-04-17T18:30"));
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetch("server/db/fechas.json")
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

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
    setError("");
  };
  useEffect(() => {
    console.log(selectedEvent);
  }, [selectedEvent]);

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
      // console.log(
      //   startDatetime.isAfter(eventStart) || startDatetime.isSame(eventStart)
      // );
      return (
        ((start.isAfter(eventStart) || start.isSame(eventStart)) &&
          start.isBefore(eventEnd)) ||
        (end.isAfter(eventStart) &&
          (end.isBefore(eventEnd) || end.isSame(eventEnd)))
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
    const isOverlap = information.some((event) => {
      const eventStart = dayjs(event.start);
      const eventEnd = dayjs(event.end);
      // console.log(
      //   startDatetime.isAfter(eventStart) || startDatetime.isSame(eventStart)
      // );
      return (
        ((startDatetime.isAfter(eventStart) ||
          startDatetime.isSame(eventStart)) &&
          startDatetime.isBefore(eventEnd)) ||
        (endDatetime.isAfter(eventStart) &&
          (endDatetime.isBefore(eventEnd) || endDatetime.isSame(eventEnd)))
      );
    });

    if (isOverlap) {
      // Mostrar mensaje de error o tomar acción apropiada
      setError("La nueva cita se superpone con una cita existente.");

      // console.log("La nueva cita se superpone con una cita existente.");
    } else {
      // No hay superposición, agregar el nuevo evento
      const updatedEvents = [...information, newEvent];
      setInformation(updatedEvents);
      setError("");
      handleClose();
    }
  };
  const [value, setValue] = React.useState(() => [
    dayjs("2022-04-17T15:30"),
    dayjs("2022-04-17T18:30"),
  ]);

  return (
    <div className="flex flex-col h-4/5 justify-around items-center ">
      <div>
        {/* <button
          onClick={addDay}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
          Agregar Fecha
        </button> */}
      </div>
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

          <Dialog open={open} onClose={handleClose}>
            <Button onClick={handleClose} color="primary">
              Cerrar
            </Button>
            <h1 className="text-center p-5 text-4xl">
              {moment(selectedDate).format("l")}
            </h1>

            <DialogTitle id="alert-dialog-title">{"Agregar Cita"}</DialogTitle>
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
              <Button onClick={handleSave} color="primary">
                Guardar
              </Button>
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
