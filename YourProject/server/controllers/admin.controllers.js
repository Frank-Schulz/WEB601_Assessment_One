const asyncHandler = require('express-async-handler');

//@description     Check user is admin
//@route           POST /admin
//@access          Public
const isAdmin = asyncHandler(async (req, res) => {
    userId = req.session.user
    Users.findOne({ userId: userId })
        .then((user) => {
            if (user.isAdmin) {
                res.render('admin/admin');
            } else {
                res.redirect('/')
            }
        })
        .catch((err) => { console.log(err); })
    // if (req.session.user.isAdmin) {
    // res.render("admin/admin")
    // } else {
    //     res.redirect("/")
    // }
});


module.exports = { isAdmin };
