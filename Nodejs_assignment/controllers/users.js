import jsonwebtoken from 'jsonwebtoken';
import multer from 'multer';


import bcrypt from 'bcrypt';

import uniqid from 'uniqid';


let users = [];

export const getUsers = (req, res) => {
    console.log(`Users in the database: ${users}`);

    res.send(users);
}
export const postUsers = (req, res) => {
    let user = { ...req.body }
    users.push(user);
    console.log(users);

    res.send("data got saved");
}


export const createUser = (req, res) => {
    console.log('came')
    const newUser = users.find((user) => user.email == req.body.email);
    if (newUser) {
        return res
            .status(409)
            .json({ success: false, message: "Email already exists" });
    } else {
        console.log(req.body.password)
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message,
                });
            } else {
                req.body.password = hash;

                const profilePicture = req.file.path;

                const user = req.body;
                console.log(profilePicture)
                console.log(user)

                const userId = uniqid();

                const userWithId = {
                    id: userId,
                    ...user,
                    profilePicture: profilePicture,
                };

                users.push(userWithId);
                console.log(typeof (user))
                return res.status(200).json({
                    success: true,
                    message: `User successfully created`, id: userId
                });
            }
        });
    }




};

export const signinUser = (req, res) => {

    const tempUser = users.find((user) => user.email == req.body.email);
    console.log(req.body.email)
    if (tempUser == null) {
        return res.status(401).json({ success: false, message: "Auth failed" });
    }

    bcrypt.compare(req.body.password, tempUser.password, (err, result) => {
        if (err) {
            return res.status(401).json({
                message: "Auth failed",
            });
        }
        if (result) {
            const token = jsonwebtoken.sign(
                {
                    email: tempUser.email,
                    id: tempUser.id,
                },
                "my_key",
                {
                    expiresIn: "1h",
                }
            );

            return res.status(200).json({
                message: "Auth successful",
                token: token,
            });
        }
    });



}
export const getUser = (req, res) => {
    const user = users.find((user) => user.id === req.params.id);
    res.send(user)
};
export const getAllUsers = (req, res) => {
    res.send(users)
};

export const deleteUser = (req, res) => {
    console.log(`user with id ${req.params.id} has been deleted`);

    users = users.filter((user) => user.id !== req.params.id);
    res.send("data deleted");
};

export const updateUser = (req, res) => {
    console.log("i am here");
    let user = { ...req.body }
    users.pop();
    users.push(user);
    res.send("data got saved");


};