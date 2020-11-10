import { Request, Response } from "express";
import { GoogleSpreadsheet } from "google-spreadsheet";
const otpGenerator = require("otp-generator") as any;

export class SpreadsheetService {
  constructor() {}
  async getSpreadsheetData(req: Request, res: Response) {
    try {
      let sheetUrl: any = req.headers.sheeturl;
      let sheetId: any = sheetUrl.replace("https://", "").split("/")[3];

      let doc = new GoogleSpreadsheet(sheetId);

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

      let colomnName = rows[0]._sheet.headerValues;

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

        let obj: any = {};
        obj["participant_id"] = participant_id;
        colomnName.forEach((colelement: any) => {
          obj[colelement] = element[colelement] || "Not Entered";
        });

        participants.push(obj);
      });
      res.status(200).json({
        spreadsheetData: participants,
      });
      // return conn.end();
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}
