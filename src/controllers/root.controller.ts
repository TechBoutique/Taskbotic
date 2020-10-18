import { Request, Response } from "express";
import { EmailService } from "../services/email.service";
import { SpreadsheetService } from "../services/spreadsheet.service";

const emailService = new EmailService();
const spreadsheetService = new SpreadsheetService();

export async function sendWelcomeMail(req: Request, res: Response) {
  return emailService.sendWelcomeMail(req, res);
}

export async function getSpreadsheetData(req: Request, res: Response) {
  return spreadsheetService.getSpreadsheetData(req, res);
}
