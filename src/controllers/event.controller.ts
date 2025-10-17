import { Request, Response } from "express";
import {
  CreateEventSchema,
  UpdateEventSchema,
} from "../validators/event.schema";
import * as eventService from "../services/event.service";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventService.getAllEvents();

    return res.status(200).json(events);
  } catch (error) {
    console.error("Erreur récupération des évènements: ", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  const parseResult = CreateEventSchema.safeParse(req.body);

  if (parseResult.error) {
    return res.status(400).json({
      error: "Validation échouée :",
      details: parseResult.error.message,
    });
  }

  const { title, description, location, date, id_user } = parseResult.data;
  try {
    const newEvent = await eventService.createEvent(
      title,
      description,
      location,
      date,
      id_user
    );
    return res.status(201).json(newEvent);
  } catch (error) {
    console.log(error);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);
  const parseResult = UpdateEventSchema.safeParse(req.body);

  if (parseResult.error) {
    return res.status(400).json({
      error: "Validation update event échoué",
      details: parseResult.error.message,
    });
  }

  const { title, description } = req.body;
  try {
    const updatedEvent = await eventService.updateEvent(
      eventId,
      title,
      description
    );
    return res.status(200).json(updatedEvent);
  } catch (error) {
    console.log(error);
  }
};

export const getEventById = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);
  try {
    const event = await eventService.getEventById(eventId);
    if (!event) {
      return res.status(400).json({
        message: "L'évènement n'existe pas",
      });
    }
    return res.status(200).json(event);
  } catch (error) {
    console.log(error);
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const evenId = Number(req.params.id);
  try {
    await eventService.deleteEvent(evenId);
    return res.status(200).json({
      message: "L'évènement à été supprimer avec succès",
    });
  } catch (error) {
    console.log(error);
    if (error === "Event existe pas") {
      return res.status(404).json({
        message: "L'évènement à supprimer n'existe pas",
      });
    }
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
