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
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error("Error getting notifications:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting the notifications." });
  }
};

export const getNotificationCount = async (req, res) => {
  const { id } = req.user;
  try {
    const result = await db.query(
      `SELECT COUNT(*) FROM notifications WHERE user_id = $1 AND is_read = false`,
      [id]
    );
    const count = result.rows[0].count;
    res.status(200).json({ count });
  } catch (error) {
    console.log("Error getting notification count:", error);
  }
};

export const markNotificationAsRead = async (req, res) => {
  const { id } = req.user;
  const { notificationId } = req.body;
  try {
    await db.query(
      `UPDATE notifications
      SET is_read = true
      WHERE user_id = $1
        AND (id = $2 OR created_at < CURRENT_DATE + TIME '09:00:00');
      `,
      [id, notificationId]
    );
    res.status(200).json({ message: "Notifications marked as read." });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({
      error: "An error occurred while marking notifications as read.",
    });
  }
};
