import { Router } from "express";
const router = Router();

import { accessTokenValidation } from "../libs/verifyToken";
import { getParticipantsBatchMapping, getSpreadsheetData } from "../controllers/taskbotic.controller";


router.route(`/techboutique/taskbotic/getparticipantslist`)
    .get(getParticipantsBatchMapping);

router.route(`/techboutique/taskbotic/getSpreadsheetData`)
    .get(getSpreadsheetData);

export default router;