import FullCalendar from "@fullcalendar/react"; // Put it at the top
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timelinePlugin from "@fullcalendar/timeline";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Card,
  Button,
  Container,
  Typography,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../layouts/dashboard";
import { DialogAnimate } from "/src/components/animate";
import getEvents from "/src/store/actions/calendar/getEvents";
import openModal from "/src/store/actions/calendar/openModal";
import closeModal from "/src/store/actions/calendar/closeModal";
import updateEvent from "/src/store/actions/calendar/updateEvent";
import selectEvent from "/src/store/actions/calendar/selectEvent";
import selectRange from "/src/store/actions/calendar/selectRange";
import setAndShowSuccessToast from "/src/store/actions/config/toast/setAndShowSuccessToast";
import useSettings from "/src/hooks/useSettings";
import Page from "/src/components/atoms/Page";
import {
  CalendarForm,
  CalendarStyle,
  CalendarToolbar,
} from "/src/components/organisms/calendar";

const selectedEventSelector = (state) => {
  const { events, selectedEventId } = state.calendar;
  if (selectedEventId) {
    return events.find((_event) => _event.id === selectedEventId);
  }
  return null;
};

export default function Calendar() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const calendarRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(isMobile ? "listWeek" : "dayGridMonth");
  const selectedEvent = useSelector(selectedEventSelector);
  const { events, isOpenModal, selectedRange } = useSelector(
    (state) => state.calendar
  );

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isMobile ? "listWeek" : "dayGridMonth";
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isMobile]);

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleSelectRange = (arg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    dispatch(selectRange(arg.start, arg.end));
  };

  const handleSelectEvent = (arg) => {
    dispatch(selectEvent(arg.event.id));
  };

  const handleResizeEvent = async ({ event }) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end,
        })
      );
      dispatch(setAndShowSuccessToast("Event updated successfully!"));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropEvent = async ({ event }) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end,
        })
      );
      dispatch(setAndShowSuccessToast("Event updated successfully!"));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddEvent = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <DashboardLayout>
      <Page title="Calendar | BackpackyWorld">
        <Container maxWidth={themeStretch ? false : "xl"}>
          <Grid
            container
            fullWidth
            direction="row"
            justifyContent="space-between"
          >
            <Grid item>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                color="primary"
                gutterBottom
                paragraph
                style={{
                  display: "flex",
                }}
              >
                My Calendar
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<Icon icon={plusFill} width={20} height={20} />}
                onClick={handleAddEvent}
              >
                New Event
              </Button>
            </Grid>
          </Grid>

          <Card>
            <CalendarStyle>
              <CalendarToolbar
                date={date}
                view={view}
                onNextDate={handleClickDateNext}
                onPrevDate={handleClickDatePrev}
                onToday={handleClickToday}
                onChangeView={handleChangeView}
              />
              <FullCalendar
                weekends
                editable
                droppable
                selectable
                events={events}
                ref={calendarRef}
                rerenderDelay={10}
                initialDate={date}
                initialView={view}
                dayMaxEventRows={3}
                eventDisplay="block"
                headerToolbar={false}
                allDayMaintainDuration
                eventResizableFromStart
                select={handleSelectRange}
                eventDrop={handleDropEvent}
                eventClick={handleSelectEvent}
                eventResize={handleResizeEvent}
                height={isMobile ? "auto" : 720}
                plugins={[
                  listPlugin,
                  dayGridPlugin,
                  timelinePlugin,
                  timeGridPlugin,
                  interactionPlugin,
                ]}
              />
            </CalendarStyle>
          </Card>

          <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
            <DialogTitle>
              {selectedEvent ? "Edit Event" : "Add Event"}
            </DialogTitle>

            <CalendarForm
              event={selectedEvent}
              range={selectedRange}
              onCancel={handleCloseModal}
            />
          </DialogAnimate>
        </Container>
      </Page>
    </DashboardLayout>
  );
}
