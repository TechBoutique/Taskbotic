import { Router } from "express";
const router = Router();

import { accessTokenValidation } from "../libs/verifyToken";
import { getParticipantsBatchMapping, sendWelcomeMail ,getSpreadsheetData} from "../controllers/taskbotic.controller";


router.route(`/techboutique/taskbotic/getparticipantslist`)
    .get(getParticipantsBatchMapping);


router.route(`/techboutique/taskbotic/sendwelcomemail`)
    .get(sendWelcomeMail);
router.route(`/techboutique/taskbotic/getSpreadsheetData`)
    .get(getSpreadsheetData);

export default router;