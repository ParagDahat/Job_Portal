import express from 'express';
import { employerGetAllApplications,jobSeekerDeleteApplication,jobSeekerGetAllApplications,postApplication } from '../controllers/applicationController.js';
import { isAuthorized } from '../middlewares/auth.js';

const router = express.Router();

router.get("/jobseeker/getall",isAuthorized,jobSeekerGetAllApplications)
router.get("/jobseeker/getall",isAuthorized,jobSeekerGetAllApplications)
router.get("/employer/getall",isAuthorized,employerGetAllApplications)
router.post("/post",isAuthorized,postApplication)

export default router;