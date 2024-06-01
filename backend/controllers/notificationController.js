import db from "../config/Db.js";

export const getNotifications = async (req, res) => {
    const { id } = req.user;
    const { page = 1, limit = 10 } = req.query;
  
    const offset = (page - 1) * limit;
  
    try {
      const notifications = await db.query(
        `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
        [id, limit, offset]
      );
      
      const totalCountResult = await db.query(
        `SELECT COUNT(*) FROM notifications WHERE user_id = $1`,
        [id]
      );
      const totalCount = totalCountResult.rows[0].count;
  
      res.status(200).json({
        notifications: notifications.rows,
        page: parseInt(page),
        limit: parseInt(limit),
        totalCount: parseInt(totalCount),
        totalPages: Math.ceil(totalCount / limit)
      });
    } catch (error) {
      console.error("Error getting notifications:", error);
      res.status(500).json({ error: "An error occurred while getting the notifications." });
    }
  }
  

