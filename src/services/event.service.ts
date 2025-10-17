import * as eventRepository from "../repositories/event.repository";

export const createEvent = async (
  title: string,
  description: string | null,
  location: string,
  date: string,
  id_user: number
) => {
  const createdEvent = await eventRepository.createEvent(
    title,
    description,
    location,
    date,
    id_user
  );
  const eventResponse = {
    ...createdEvent,
    id: Number(createdEvent.id),
    id_user: Number(createdEvent.id_user),
  };
  return eventResponse;
};

export const getAllEvents = async () => {
  const events = (await eventRepository.getAllEvents()).map((event) => ({
    ...event,
    id: Number(event.id),
    id_user: Number(event.id_user),
  }));
  return events;
};

export const updateEvent = async (
  eventId: number,
  title: string,
  description: string
) => {
  const updatedEvent = await eventRepository.updateEvent(
    eventId,
    title,
    description
  );

  const updatedEventResponse = {
    ...updatedEvent,
    id: Number(updatedEvent.id),
    id_user: Number(updatedEvent.id_user),
  };

  return updatedEventResponse;
};

export const getEventById = async (eventId: number) => {
  const getEventById = await eventRepository.getEventById(eventId);

  const eventByIdResponse = {
    ...getEventById,
    id: Number(getEventById?.id),
    id_user: Number(getEventById?.id_user),
  };
  return eventByIdResponse;
};

export const deleteEvent = async (eventId: number) => {
  const deletedEvent = await eventRepository.deleteEvent(eventId);
  if (deletedEvent.count === 0) {
    throw new Error("Event existe pas");
  }
  return deletedEvent;
};
