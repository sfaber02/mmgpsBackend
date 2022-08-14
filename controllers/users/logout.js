
const logout = (req, res) => {
    
    //send back a null refresh token to overwrite current one
    try {
        res.cookie("refresh_token", null, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
    
        res.status(200).json({msg: "User Logged Out"})
    } catch (err) {
        res.status(400).json({err})
    }


};

module.exports = { logout };
