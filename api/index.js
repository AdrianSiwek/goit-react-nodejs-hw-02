const express = require("express");
const router = express.Router();

const ctrlContact = require("../controller/ctrlContact");
const ctrlUser = require("../controller/ctrlUser");
const ctrlAuth = require("../controller/auth");
const multer = require("multer");
const path = require("path");
const storeAvatar = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storeAvatar);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    limits: {
        fileSize: 1048576,
    },
});
const upload = multer({ storage });

router.get("/contacts", ctrlAuth.auth, ctrlContact.get);

router.get("/users/logout", ctrlAuth.auth, ctrlUser.logout);

router.get("/users/current", ctrlAuth.auth, ctrlUser.current);

router.patch(
    "/users/avatars",
    upload.single("avatar"),
    ctrlAuth.auth,
    ctrlUser.setAvatar
);

module.exports = router;