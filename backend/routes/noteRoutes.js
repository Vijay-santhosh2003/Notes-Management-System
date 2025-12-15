const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

router.use(auth);
router.post("/", createNote);
router.get("/", getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
