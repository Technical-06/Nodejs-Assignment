import express from 'express';
import multer from 'multer';

import { getUsers, createUser, getUser, deleteUser, updateUser, signinUser, getAllUsers, postUsers } from '../controllers/users.js';
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
router.patch('/update', updateUser);
router.get('/', getUsers);
router.post('/users', postUsers);

router.post('/', upload.single("profilePicture"), createUser);
router.post('/login', signinUser);
router.get('/:id', getUser);
router.get('/', getAllUsers);

router.delete('/delete', deleteUser);
export default router;