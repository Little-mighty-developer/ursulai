import type { NextApiRequest, NextApiResponse } from "next";

// Example: Replace with your real data source or database query
const engagementData: Record<string, number> = {
  "2024-05-10": 1,
  "2024-05-11": 2,
  "2024-05-12": 3,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(engagementData);
  }
  res.status(405).end();
}
