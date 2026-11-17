import { Router } from "express";
import { companyData } from "../data/company.data.js";

export const companyRouter = Router();

/**
 * GET /api/company
 * Returns statutory corporate details (CIN, legal name, registered office, grievance officer)
 */
companyRouter.get("/company", (_req, res) => {
  res.status(200).json({
    success: true,
    data: companyData,
  });
  return;
});
