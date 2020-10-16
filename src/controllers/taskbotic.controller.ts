import { Request, Response } from "express";
import { TaskBoticService } from "../services/taskbotic.service"; 
import { EmailService } from "../services/email.service"

const taskboticService = new TaskBoticService();
const emailService = new EmailService(); 

export async function getParticipantsBatchMapping(req: Request, res: Response) {
    return taskboticService.getParticipantsBatchMapping(req, res);
} 

export async function sendWelcomeMail(req: Request, res: Response) {
    return emailService.sendWelcomeMail(req, res);
} 


export async function getSpreadsheetData(req: Request, res: Response) {
    return taskboticService.getSpreadsheetData(req, res);
}
