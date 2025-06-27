import { Router, Request, Response } from "express";
import { Pool } from "pg";

const router = Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// GET /profile/:user_id
router.get("/id/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;
  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" });
  }
  try {
    const { rows } = await pool.query(
      "SELECT * FROM proofs WHERE user_id = $1",
      [user_id],
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});

// GET /profile/age-groups
router.get("/age-groups", async (_req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      `SELECT user_id, date_of_birth FROM proofs WHERE date_of_birth IS NOT NULL`,
    );
    const today = new Date();
    const groups = {
      under_18: [] as string[],
      age_18_25: [] as string[],
      age_25_35: [] as string[],
      age_35_55: [] as string[],
      over_55: [] as string[],
    };
    for (const row of rows) {
      const dob = new Date(row.date_of_birth);
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      if (age < 18) groups.under_18.push(row.user_id);
      else if (age < 26) groups.age_18_25.push(row.user_id);
      else if (age < 36) groups.age_25_35.push(row.user_id);
      else if (age < 56) groups.age_35_55.push(row.user_id);
      else groups.over_55.push(row.user_id);
    }
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});

// GET /profile/gender-groups
router.get("/gender-groups", async (_req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      `SELECT user_id, gender FROM proofs WHERE gender IS NOT NULL`,
    );
    const groups: Record<string, string[]> = {};
    for (const row of rows) {
      if (!row.user_id || !row.gender) continue;
      const gender = row.gender;
      if (!groups[gender]) groups[gender] = [];
      groups[gender].push(row.user_id);
    }
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});

// GET /profile/all
router.get("/all", async (_req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM proofs");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});

export default router;
