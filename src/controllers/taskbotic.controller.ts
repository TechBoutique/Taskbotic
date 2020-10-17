import { Request, Response } from "express";
import {DatabaseService} from "../services/database.service";
import { EmailService } from "../services/email.service" 
import { SpreadsheetService } from "../services/spreadsheet.service"

const databaseService = new DatabaseService();
const emailService = new EmailService();  
const spreadsheetService = new SpreadsheetService();

export async function getParticipantsBatchMapping(req: Request, res: Response) {
    return databaseService.getParticipantsBatchMapping(req, res);
} 

export async function sendWelcomeMail(req: Request, res: Response) {
    return emailService.sendWelcomeMail(req, res);
} 


export async function getSpreadsheetData(req: Request, res: Response) {
    return spreadsheetService.getSpreadsheetData(req, res);
}
