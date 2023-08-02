module.exports = {
    admin: (req, res, next) => {
        if (req.user.type === 'admin') next();
        else return res.status(403).json({error: 'You must be an admin'});
    },

    subAdmin: (req, res, next) => {
        if (req.user.type === 'admin' || req.user.type === 'sub-admin') next();
        else return res.status(403).json({error: 'You must be an admin or sub-admin'});
    }
}

    