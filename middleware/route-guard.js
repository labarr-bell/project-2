const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.redirect('/login');
    }
    next();
};

// if an already logged in user tries to access the login page it will redirect the user to the home page
const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
        return res.redirect('/');
    }
    next();
}

// const isAdmin = (req, res, next) => {
//     if (req.user.role === ‘admin’) {
//       return res.redirect(‘/admin-panel/’)
//     } else if(req.user.role != ‘admin’) {
//       return res.redirect(‘/login’);
//     }
//     next();
//   };
//   const isAdminOrEditor = (req,res, next) => {
//     if (req.user.role === ‘admin’) {
//       return res.redirect(‘/posts-panel/’)
//     } else if (req.user.role === ‘editor’) {
//       return res.redirect(‘/posts-panel/’)
//     } else if (req.user.role != ‘admin’ || req.user.role != ‘editor’) {
//       return res.redirect(‘/login’);
//     }
//     next();
//   }

module.exports = {
    isLoggedIn,
    isLoggedOut,
    // isAdmin,
    // isAdminOrEditor
};