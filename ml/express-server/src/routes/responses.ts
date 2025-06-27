import { Router, Request, Response } from "express";
import { Pool } from "pg";

const router = Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// GET /responses/:user_id
router.get("/latest/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;
  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" });
  }
  try {
    const { rows } = await pool.query(
      "SELECT response_id FROM responses WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1",
      [user_id],
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "No responses found for user" });
    }
    // Return the latest response_id
    res.json({ response_id: rows[0].response_id });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});

// GET /responses/user/:response_id
router.get("/user/:response_id", async (req: Request, res: Response) => {
  const { response_id } = req.params;
  if (!response_id) {
    return res.status(400).json({ error: "Missing response_id" });
  }
  try {
    const { rows } = await pool.query(
      "SELECT user_id FROM responses WHERE response_id = $1",
      [response_id],
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "No user found for response_id" });
    }
    res.json({ user_id: rows[0].user_id });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});

export default router;
