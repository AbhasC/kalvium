import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query } = req;
    const { eq } = query;
    const fullEq = (eq as string).replace(/\s/gm, "+");
    const ans = eval(fullEq);
    res.status(200).json({ question: fullEq, answer: ans });
  } catch {
    res.status(500).json({
      question: "Internal server error",
      answer: "Internal server error",
    });
  }
}
