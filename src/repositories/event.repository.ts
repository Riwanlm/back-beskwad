import { prisma } from "../config/prisma";

export const createEvent = async (
  title: string,
  description: string | null,
  location: string,
  date: string,
  id_user: number
) => {
  return prisma.events.create({
    data: {
      title: title,
      description: description,
      location: location,
      date: date,
      id_user: id_user,
    },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      date: true,
      id_user: true,
    },
  });
};

export const getEventById = async (eventId: number) => {
  const event = prisma.events.findUnique({
    where: {
      id: eventId,
    },
  });

  return event;
};

export const getAllEvents = async () => {
  const events = prisma.events.findMany({
    orderBy: { created_at: "desc" },
  });

  return events;
};

export const updateEvent = async (
  eventId: number,
  title: string,
  description: string
) => {
  const updatedEvent = prisma.events.update({
    where: {
      id: eventId,
    },
    data: {
      title: title,
      description: description,
    },
  });
  return updatedEvent;
};

export const deleteEvent = async (eventId: number) => {
  const eventToDelet = prisma.events.deleteMany({
    where: {
      id: eventId,
    },
  });
  return eventToDelet;
};
