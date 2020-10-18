import { Router } from "express";
const router = Router();

import { accessTokenValidation } from "../libs/verifyToken";
import {
  sendWelcomeMail,
  getSpreadsheetData,
} from "../controllers/root.controller";

router.route(`/techboutique/taskbotic/sendwelcomemail`).get(sendWelcomeMail);
router
  .route(`/techboutique/taskbotic/getSpreadsheetData`)
  .get(getSpreadsheetData);

export default router;
