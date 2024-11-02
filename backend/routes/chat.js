const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const ChatMessage = require("../model/chatMessage");

// DELETE endpoint to remove all chat messages for a user
router.delete("/api/user/messages", requireAuth, async (req, res) => {
  try {
    await ChatMessage.deleteMany({ userId: req.user._id }); // Deletes all messages for the authenticated user
    res.status(200).json({ message: "Chat messages cleared successfully." });
  } catch (error) {
    console.error("Error clearing chat messages:", error);
    res.status(500).json({ message: "Failed to clear chat messages." });
  }
});

module.exports = router;
