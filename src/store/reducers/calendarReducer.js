import { cloneDeep, map } from "lodash";
import {
  START_LOADING,
  HAS_ERROR,
  OPEN_MODAL,
  CLOSE_MODAL,
  GET_EVENTS,
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  SELECT_EVENT,
  SELECT_RANGE,
} from "../actionTypes/calendar";

const initialState = {
  isLoading: false,
  error: false,
  events: [],
  isOpenModal: false,
  selectedEventId: null,
  selectedRange: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case HAS_ERROR:
      return { ...state, isLoading: true };

    case OPEN_MODAL:
      return { ...state, isOpenModal: true };

    case CLOSE_MODAL:
      return {
        ...state,
        isOpenModal: false,
        selectedEventId: null,
        selectedRange: null,
      };

    case GET_EVENTS: {
      const { events } = action.payload;
      return {
        ...state,
        isLoading: false,
        events,
      };
    }

    case CREATE_EVENT: {
      const { newEvent } = action.payload;
      return {
        ...state,
        isLoading: false,
        events: [...state.events, newEvent],
      };
    }

    case UPDATE_EVENT: {
      const { eventId, event } = action.payload;
      const updateEvent = map(state.events, (_event) => {
        if (_event.id === eventId) {
          return { ..._event, ...event };
        }
        return _event;
      });
      return {
        ...state,
        isLoading: false,
        events: updateEvent,
      };
    }

    case DELETE_EVENT: {
      const { eventId } = action.payload;
      const events = cloneDeep(state.events);
      const eventIndex = events.findIndex((event) => event.id === eventId);
      events.splice(eventIndex, 1);
      return {
        ...state,
        isLoading: false,
        events: events,
      };
    }

    case SELECT_EVENT: {
      const { eventId } = action.payload;
      return {
        ...state,
        isOpenModal: true,
        selectedEventId: eventId,
      };
    }

    case SELECT_RANGE: {
      const { start, end } = action.payload;
      return {
        ...state,
        isOpenModal: true,
        selectedRange: { start, end },
      };
    }

    default:
      return state;
  }
};
