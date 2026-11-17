import type { SiteConfig } from "@nevrora/types";
import { DEFAULT_SITE_CONFIG, STATUTORY_DETAILS } from "@nevrora/config";

export const companyData: SiteConfig = {
  ...DEFAULT_SITE_CONFIG,
  legalName: STATUTORY_DETAILS.legalName,
  cin: STATUTORY_DETAILS.cin,
  registeredOffice: STATUTORY_DETAILS.registeredOffice,
  phone: STATUTORY_DETAILS.phone,
  email: STATUTORY_DETAILS.email,
  grievanceContact: {
    ...STATUTORY_DETAILS.grievanceContact,
  },
};
