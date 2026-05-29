// src/controllers/ticket-type.controller.ts

import { Request, Response } from "express";

import * as ticketTypeService from "../services/ticket-type.service";

export const createTicketType = async (req: Request, res: Response) => {
  try {
    const ticketType = await ticketTypeService.createTicketTypeService(
      req.body,
    );

    return res.status(201).json({
      success: true,
      message: "Create ticket type successfully",
      data: ticketType,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTicketTypes = async (req: Request, res: Response) => {
  try {
    const ticketTypes = await ticketTypeService.getAllTicketTypesService();

    return res.status(200).json({
      success: true,
      data: ticketTypes,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTicketTypeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "ticket type ID is required",
      });
    }
    const ticketType = await ticketTypeService.getTicketTypeByIdService(id);

    if (!ticketType) {
      return res.status(404).json({
        success: false,
        message: "Ticket type not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: ticketType,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTicketType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "ticket type ID is required",
      });
    }
    const ticketType = await ticketTypeService.updateTicketTypeService(
      id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Update ticket type successfully",
      data: ticketType,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTicketType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "ticket type ID is required",
      });
    }
    await ticketTypeService.deleteTicketTypeService(id);

    return res.status(200).json({
      success: true,
      message: "Delete ticket type successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
