import { Request, Response } from "express";
import { GoogleSpreadsheet } from "google-spreadsheet";
const otpGenerator = require("otp-generator") as any;

let doc = new GoogleSpreadsheet("1J1U8awhcpyYrQg5z4Vx9uTu8Jn3-ycwZTGnZCpOPSMo");

export class SpreadsheetService {
  constructor() {}
  async getSpreadsheetData(req: Request, res: Response) {
    try {
      let cred_email = process.env.client_email;
      let cred_private_key = process.env.private_key;
      cred_email = <string>cred_email;
      cred_private_key = <string>cred_private_key;
      await doc.useServiceAccountAuth({
        client_email: cred_email,
        private_key: cred_private_key,
      });
      await doc.loadInfo(); // loads document properties and worksheets
      console.log(doc.title);
      const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
      const rows = await sheet.getRows({
        limit: 1000,
        offset: 0,
      });
      let participants: any = [];
      rows.forEach((element) => {
        let participant_id =
          "PID" +
          otpGenerator.generate(8, {
            digits: true,
            alphabets: false,
            upperCase: false,
            specialChars: false,
          });
        let obj = {
          participant_id: participant_id,
          name: element["Drop your name here"],
          email: element["Your email?"],
          contact: element["Your Contact Number?"],
          linkedin: element["Drop your Linkedin Profile (URL)"],
          proficiency_MERN: element["Proficiency in MERN Stack?"],
          currently_doing: element["What are you currently doing? "],
          expectation:
            element[
              "What are your expectation from the 100-days-of-code and why you want to join?"
            ],
          github: element["Github URL"] || "Not Entered",
        };
        participants.push(obj);
      });
      res.status(200).json({
        participantData: participants,
      });
      // return conn.end();
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}
