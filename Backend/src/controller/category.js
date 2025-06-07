const Category = require('../models/category')
const slugify = require('slugify')
const router = require('../routes/auth')
exports.addCategory = async (req, resp) => {
    try {
        const { name } = req.body;
        if (!name) {
            return resp.status(401).send({ message: "Name is required" });
        }
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return resp.status(200).send({
                success: true,
                message: "Category Already Exisits",
            });
        }
        const category = await new Category({
            name,
            slug: slugify(name),
        }).save();
        resp.status(201).send({
            success: true,
            message: "new category created",
            category,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            error,
            message: "Errro in Category",
        });
    }
}
exports.getCategories = async (req, resp) => {
    try {
        const category = await Category.find({});
        resp.status(200).send({
            success: true,
            message: "All Categories List",
            category,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories",
        });
    }
}


// Update Category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await Category.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating category",
            error,
        });
    }
};

// Delete Category
// exports.deleteCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Category.findByIdAndDelete(id);
//         res.status(200).send({
//             success: true,
//             message: "Category deleted successfully",
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error while deleting category",
//             error,
//         });
//     }
// };

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while deleting category",
            error,
        });
    }
};






//Original
// const category = require('../models/category')
// const slugify = require('slugify')
// const router = require('../routes/auth')
// exports.addCategory = (req, resp) => {
//     const categoryObj = {
//         name: req.body.name,
//         type:req.body.type,
//         slug: slugify(req.body.name)
//     }
//     if (req.body.name) {
//         categoryObj.parentId = req.body.parentId
//     }
//     const cat = new category(categoryObj)
//     cat.save().then((error, category) => {
//         if (error) {
//             return resp.status(400).json({ error })
//         }
//         if (category) {
//             return resp.status(201).json({ category })
//         }
//     })
// }
// exports.getCategories = (req, resp) => {
//     category.find({}).then((error, categories) => {
//         if (error) {
//             return resp.status(400).json({ error })
//         }
//         if (category) {
//             return resp.status(201).json({ category })
//         }
//     })
// }


