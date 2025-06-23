import User from "../modals/user.model.js";
import bcrypt from "bcryptjs";
export const signup =  async (req, res,next) => {
    console.log(req.body);
    const { username, email, password } = req.body;

bcrypt.genSalt(10, async (err, salt) => {
    if (err) {
        console.error("Error generating salt:", err);
        return res.status(500).json({
            message: "Error generating salt",
            error: err.message
        });
    }
    bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json({
                message: "Error hashing password",
                error: err.message
            });
        }

        try {
            const newUser = new User({
                username,
                email,
                password: hash
            });
            await newUser.save();
            res.status(201).json({
                message: "User created successfully"
            });
        } catch (error) {
  console.error(error); // Add this line
  next(error);
}
    });
    });

   
    
};
