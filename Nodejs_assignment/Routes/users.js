import express from 'express';
import multer from 'multer';

import { getUsers, createUser, getUserByID, deleteUser, updateUser, signinUser, postUsers } from '../controllers/users.js';
// console.log(updateUser(null, null));
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads/");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});
const upload = multer({ storage: storage });
router.patch('/update/:id', updateUser);
router.get('/', getUsers);
router.post('/users', postUsers);

router.post('/', upload.single("profilePicture"), createUser);
router.post('/login', signinUser);
router.get('/:id', getUserByID);
// router.get('/showallusers', getAllUsers);

router.delete('/delete/:id', deleteUser);
export default router;