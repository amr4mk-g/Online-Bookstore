module.exports = {
    login: (req, res, next) => {
        let {email, password} = req.body
        if (!email || typeof email !== 'string') 
            return res.status(400).json({error: 'Invalid email'})
        if (!password || typeof password !== 'string') 
            return res.status(400).json({error: 'Invalid password'})
        next()
    },

    reset: (req, res, next) => {
        let {email} = req.body
        if (!email || typeof email !== 'string') 
            return res.status(400).json({error: 'Invalid email'})
        next()
    },

    address: (req, res, next) => {
        let {address} = req.body
        if (!address || typeof address !== 'string') 
            return res.status(400).json({error: 'Invalid address'})
        next()
    },

    signup: (req, res, next) => {
        let {name, email, password} = req.body
        if (!name || typeof name !== 'string') 
            return res.status(400).json({error: 'Invalid name'})
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
            return res.status(400).json({error: 'Invalid email'})
        if (!password || typeof password !== 'string' || password.length < 5) 
            return res.status(400).json({error: 'Invalid password'})
        next()
    },

    book: (req, res, next) => {
        let {name, costPrice, sellingPrice, category, description, imageURL, quantity} = req.body
        if (!name || typeof name !== 'string') 
            return res.status(400).json({error: 'Invalid name'})
        if (!costPrice || typeof costPrice !== 'number') 
            return res.status(400).json({error: 'Invalid cost price'})
        if (!sellingPrice || typeof sellingPrice !== 'number') 
            return res.status(400).json({error: 'Invalid selling price'})
        if (!category || typeof category !== 'string') 
            return res.status(400).json({error: 'Invalid category'})
        if (!description || typeof description !== 'string') 
            return res.status(400).json({error: 'Invalid description'})
        if (!imageURL || typeof imageURL !== 'string') 
            return res.status(400).json({error: 'Invalid imageURL'})
        if (!quantity || typeof quantity !== 'number') 
            return res.status(400).json({error: 'Invalid quantity'})
        next()
    }
}
