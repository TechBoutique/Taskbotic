import { Router } from "express";
const router = Router();

import { accessTokenValidation } from "../libs/verifyToken";
import { getParticipantsBatchMapping, sendWelcomeMail } from "../controllers/taskbotic.controller";


router.route(`/techboutique/taskbotic/getparticipantslist`)
    .get(getParticipantsBatchMapping);


router.route(`/techboutique/taskbotic/sendwelcomemail`)
    .get(sendWelcomeMail);

export default router;