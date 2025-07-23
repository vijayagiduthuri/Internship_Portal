import crypto from "crypto";
export const generateInternshipHash = async (data) => {
  const normalized = [
    data.title?.trim().toLowerCase(),
    data.company?.trim().toLowerCase(),
    data.location?.trim().toLowerCase(),
    data.startDate?.trim(), // ISO format if possible
    data.duration?.trim().toLowerCase(),
  ].join("-");

  return crypto.createHash("sha256").update(normalized).digest("hex");
};
