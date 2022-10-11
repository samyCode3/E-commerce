const Category = require("../model/Category")
const CreateCategory = async (req, res) => {
    try {
       const category_name = req.body
        const uuid = req.params.unique_id
        await Category.find().then((catField) => {

            if (catField.length > 0) {
                for (let i = 0; i < catField.length; i++) {
                    if (catField[i].category_id !== uuid) {
                        return res.json({ statust: "failed" })
                    }
                }
            } else 
            {
                res.send("hello")
            }
            
        })

    } catch (err) {
        if (err) throw err
    }

}

module.exports = {
    CreateCategory
}