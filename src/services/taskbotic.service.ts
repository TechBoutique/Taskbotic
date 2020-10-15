import { Request, Response } from "express";
import { connect } from "../database.mysql/database";
import { ParticipantBatchMap } from "../interface/taskbotic";
const otpGenerator = require('otp-generator') as any;

export class TaskBoticService {
    constructor() { }

    async getParticipantsBatchMapping(req: Request, res: Response) {
        try {
            let db: any = req.headers.db;
            const conn = await connect(db);
            let url:any =`select * from participants_batch_map`
            const participants = await conn.query(url);
            res.status(200).json(
                participants
            );
            return conn.end();
        }
        catch (err) {
            res.status(500).json({
                message: err
            })
        }
    }

}