const Product = require("../models/product")
const shortid = require('shortid')
const category = require('../models/category')
const slugify = require('slugify')
const product = require("../models/product")
const fs = require('fs')

exports.createProduct = async (req, resp) => {
    try {
        const { name, description, slug, price, quantity, category } = req.fields
        const { photo } = req.files
        console.log(req.files)
        switch (true) {             //Comment line 13-26
            case !name:
                return resp.status(500).send({ error: "Name is required" })
            case !description:
                return resp.status(500).send({ error: "Description is required" })
            case !price:
                return resp.status(500).send({ error: "Price is required" })
            case !quantity:
                return resp.status(500).send({ error: "Quantity is required" })
            case !category:
                return resp.status(500).send({ error: "Category is required" })
            case !photo && photo.size > 1000000:
                return resp.status(500).send({ error: "Photo is required and should be less than 1Mb" })
        }
        const product = new Product({ ...req.fields, slug: slugify(name) })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        console.log(product)
        resp.status(201).send({
            success: true,
            message: "product created successfully",
            product
        })

    } catch (error) {
        resp.status(500).send({
            success: false,
            error,
            message: "Error in creating product"
        })
    }
}
exports.getProducts = async (req, resp) => {
    try {
        // const product = await Product.find({}).select("-photo").limit(10).sort({ createdAt: -1 }).populate("category")
        const product = await Product.find({}).select("-photo").sort({ createdAt: -1 }).populate("category")
        resp.status(200).send({
            success: true,
            total: product.length,
            message: "All Products",
            product,
        })
    } catch (error) {
        resp.status(500).send({
            success: false,
            message: "Error in getting products",
            error: error.message
        })
    }
}
exports.getSingleProduct = async (req, resp) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        resp.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product
        })
    } catch (error) {
        resp.status(500).send({
            success: false,
            message: "Error getting single products",
            error
        })
    }
}



exports.getProductphoto = async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid).select('photo');
        if (product && product.photo && product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        } else {
            return res.status(404).send({ message: 'Photo not found' });
        }
    } catch (error) {
        console.error('Error in getPhoto:', error);
        res.status(500).send({
            success: false,
            message: 'Error while getting photo',
            error: error.message
        });
    }
};


exports.productDelete = async (req, resp) => {
    try {
        await Product.findByIdAndDelete(req.params.pid)
        resp.status(200).send({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        resp.status(500).send({
            success: false,
            message: "Error deleting Product",
            error: error.message
        })
    }
}


exports.updateProduct = async (req, resp) => {
    try {
        const { name, description, slug, price, quantity, category } = req.fields;
        const { photo } = req.files || {};

        // Validation
        switch (true) {
            case !name:
                return resp.status(400).send({ error: "Name is required" });
            case !description:
                return resp.status(400).send({ error: "Description is required" });
            case !price:
                return resp.status(400).send({ error: "Price is required" });
            case !quantity:
                return resp.status(400).send({ error: "Quantity is required" });
            case !category:
                return resp.status(400).send({ error: "Category is required" });
            case photo && photo.size > 1000000:
                return resp.status(400).send({ error: "Photo should be less than 1Mb" });
        }

        // Update fields except photo first
        const updatedData = { ...req.fields, slug: slugify(name) };
        const product = await Product.findByIdAndUpdate(req.params.pid, updatedData, { new: true });

        // Update photo if exists
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
            await product.save();
        }

        resp.status(200).send({
            success: true,
            message: "Product updated successfully",
        });
    } catch (error) {
        resp.status(500).send({
            success: false,
            message: "Error in updating Product",
            error: error.message,
        });
    }
};




exports.filterProduct = async (req, resp) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const fproducts = await Product.find(args)
        resp.status(200).send({
            success: true,
            fproducts,
        })

    } catch (error) {
        resp.status(400).send({
            success: false,
            message: "Error in filtering product",
            error,
        })
    }
}




// exports.searchProduct = async (req, resp) => {
//     try {
//         const key = req.params
//         const result = await Product.find({
//             $or: [
//                 { name: { $regex: req.params.key } },
//                 { description: { $regex: req.params.key } }
//             ]
//         }).select("-photo")
//         resp.json(result)
//     }
//     catch (error) {
//         resp.status(400).send({
//             success: false,
//             message: "Error in Searching product",
//             error,
//         })
//     }
// }

// exports.searchProduct = async (req, resp) => {
//     try {
//         const key = req.params.key;
//         const result = await Product.find({
//             $or: [
//                 { name: { $regex: key, $options: "i" } },
//                 { description: { $regex: key, $options: "i" } }
//             ]
//         }).select("-photo");
//         resp.json(result);
//     } catch (error) {
//         resp.status(400).send({
//             success: false,
//             message: "Error in Searching product",
//             error,
//         });
//     }
// };


// exports.searchProduct = async (req, resp) => {
//     try {
//         const key = req.params.key;  // Make sure you extract .key here, not the whole params
//         const result = await Product.find({
//             $or: [
//                 { name: { $regex: key, $options: 'i' } },   // added 'i' for case-insensitive
//                 { description: { $regex: key, $options: 'i' } }
//             ]
//         }).select("-photo");
//         resp.json(result);
//     }
//     catch (error) {
//         resp.status(400).send({
//             success: false,
//             message: "Error in Searching product",
//             error,
//         });
//     }
// }

// exports.searchProduct = async (req, resp) => {
//     try {
//         const key = req.params.key || '';
//         const safeKey = escapeRegex(key);
//         const regex = new RegExp(safeKey, 'i'); // case-insensitive search

//         const result = await Product.find({
//             $or: [
//                 { name: { $regex: regex } },
//                 { description: { $regex: regex } }
//             ]
//         }).select("-photo");

//         resp.json(result);
//     } catch (error) {
//         resp.status(400).send({
//             success: false,
//             message: "Error in Searching product",
//             error,
//         });
//     }
// };


// exports.searchProduct = async (req, resp) => {
//     try {
//         console.log("Search key:", req.params.key); // Add this line

//         const key = req.params.key;

//         if (!key || key.trim() === "") {
//             return resp.status(400).json({ success: false, message: "Search keyword is required" });
//         }

//         const result = await Product.find({
//             $or: [
//                 { name: { $regex: key, $options: "i" } },
//                 { description: { $regex: key, $options: "i" } }
//             ]
//         }).select("-photo");

//         resp.json(result);
//     } catch (error) {
//         console.error("Search error:", error); // Add this line
//         resp.status(400).send({
//             success: false,
//             message: "Error in Searching product",
//             error,
//         });
//     }
// };


// exports.searchProduct = async (req, resp) => {
//     try {
//         const result = await Product.find({
//             $or: [
//                 { name: { $regex: req.params.key, $options: 'i' } },
//                 { description: { $regex: req.params.key, $options: 'i' } }
//             ]
//         }).select("-photo");

//         resp.json(result)
//     }
//     catch (error) {
//         resp.status(400).send({
//             success: false,
//             message: "Error in Searching product",
//             error,
//         })
//     }
// }

exports.searchProduct = async (req, resp) => {
    try {
        const key = req.params.key;
        if (!key) {
            return resp.status(400).send({ success: false, message: "Search key missing" });
        }

        const result = await Product.find({
            $or: [
                { name: { $regex: key, $options: 'i' } },
                { description: { $regex: key, $options: 'i' } }
            ]
        }).select("-photo");

        return resp.json(result);
    } catch (error) {
        console.error("Search error:", error);
        return resp.status(400).send({
            success: false,
            message: "Error in Searching product",
            error,
        });
    }
}











// const Product = require("../models/product")
// const shortid = require('shortid')
// const Category = require('../models/category')
// const slugify = require('slugify')
// // const product = require("../models/product")
// const fs = require('fs')
// exports.createProduct = async (req, resp) => {
//     try {
//         const { name, description, slug, price, quantity, category } = req.fields
//         const { photo } = req.files
//         switch (true) {
//             case !name:
//                 return resp.status(500).send({ error: "Name is required" })
//             case !description:
//                 return resp.status(500).send({ error: "Description is required" })
//             case !price:
//                 return resp.status(500).send({ error: "Price is required" })
//             case !quantity:
//                 return resp.status(500).send({ error: "Quantity is required" })
//             case !category:
//                 return resp.status(500).send({ error: "Category is required" })
//             case !photo && photo.size > 1000000:
//                 return resp.status(500).send({ error: "Photo is required and should be less than 1Mb" })
//         }
//         const product = new Product({ ...req.fields, slug: slugify(name) })
//         if (photo) {
//             product.photo.data = fs.readFileSync(photo.path)
//             product.photo.contentType = photo.type
//         }
//         await product.save()
//         resp.status(201).send({
//             success: true,
//             message: "Product created successfully",
//             product
//         })
//     } catch (error) {
//         resp.status(500).send({
//             success: false,
//             error,
//             message: "Error in creating product"
//         })
//     }
// }
// exports.getProducts = async (req, resp) => {
//     try {
//         const product = await Product.find({}).select("-photo").limit(10).sort({ createdAt: -1 }).populate("category")
//         resp.status(200).send({
//             success: true,
//             total: product.length,
//             message: "All Products",
//             product,

//         })
//     } catch (error) {
//         resp.status(500).send({
//             success: false,
//             message: "Error in getting products",
//             error: error.message
//         })
//     }
// }

// exports.getSingleProduct = async (req, resp) => {
//     try {
//         // const product = await Product.findOne({ slug: req.params.slug }).select("-photo").populate("category")
//         const product = await Product.findById(req.params.pid).select("photo").populate("category")
//         resp.status(200).send({
//             success: true,
//             message: "Single Product Fetched",
//             product
//         })
//     } catch (error) {
//         resp.status(500).send({
//             success: false,
//             message: "Error getting single product",
//             error
//         })
//     }
// }
// // exports.getProductphoto = async (req, resp) => {
// //     try {
// //         const product = await Product.findById(req.params.pid).select("photo")
// //         if (product.photo.data) {
// //             resp.set('Content-type', product.photo.contentType)
// //             return resp.status(200).send(product.photo.data)
// //         }
// //     } catch (error) {
// //         resp.status(500).send({
// //             success: false,
// //             message: "Error getting Product Photo",
// //             error
// //         })
// //     }
// // }
// exports.getProductphoto = async (req, resp) => {
//     try {
//         // const product = await Product.findOne({ slug: req.params.slug }).select("photo");
//         const product = await Product.findById(req.params.pid).select("photo");
//         if (!product || !product.photo || !product.photo.data) {
//             return resp.status(404).send({
//                 success: false,
//                 message: "Photo not found",
//             });
//         }
//         resp.set("Content-Type", product.photo.contentType);
//         return resp.send(product.photo.data);
//     } catch (error) {
//         console.error("Error in getProductphoto:", error);
//         resp.status(500).send({
//             success: false,
//             message: "Error getting Product Photo",
//             error: error.message,
//         });
//     }
// };

// exports.productDelete = async (req, resp) => {
//     try {
//         await Product.findByIdAndDelete(req.params.pid).select("-photo")
//         resp.status(200).send({
//             success: true,
//             message: "Product deleted successfully",
//         })
//     } catch (error) {
//         resp.status(500).send({
//             success: false,
//             message: "Error in deleting Product",
//             error
//         })
//     }
// }
// exports.updateProduct = async (req, resp) => {
//     try {
//         const { name, description, slug, price, quantity, category } = req.fields
//         const { photo } = req.files
//         switch (true) {
//             case !name:
//                 return resp.status(500).send({ error: "Name is required" })
//             case !description:
//                 return resp.status(500).send({ error: "Description is required" })
//             case !price:
//                 return resp.status(500).send({ error: "Price is required" })
//             case !quantity:
//                 return resp.status(500).send({ error: "Quantity is required" })
//             case !category:
//                 return resp.status(500).send({ error: "Category is required" })
//             case !photo && photo.size > 1000000:
//                 return resp.status(500).send({ error: "Photo is required and should be less than 1Mb" })
//         }
//         const product = await Product.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })
//         if (photo) {
//             product.photo.data = fs.readFileSync(photo.path)
//             product.photo.contentType = photo.type
//         }
//         await product.save()
//         resp.status(201).send({
//             success: true,
//             message: "Product updated successfully",
//             product
//         })


//     } catch (error) {
//         resp.status(500).send({
//             success: false,
//             error,
//             message: "Error in updating product"
//         })
//     }
// }
// exports.filterProduct = async (req, resp) => {
//     try {
//         const { checked, radio } = req.body
//         let args = {}
//         if (checked.length > 0) args.category = checked
//         if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
//         const fproducts = await Product.find(args)
//         resp.status(200).send({
//             success: true,
//             fproducts,
//         })

//     } catch (error) {
//         resp.status(400).send({
//             success: false,
//             message: "Error in filtering product",
//             error,
//         })
//     }
// }
// exports.searchProduct = async (req, resp) => {
//     try {

//         const result = await Product.find({
//             $or: [
//                 { name: { $regex: req.params.key } },
//                 { description: { $regex: req.params.key } }
//             ]
//         }).select("-photo")
//         resp.json(result)
//     }
//     catch (error) {
//         resp.status(400).send({
//             success: false,
//             message: "Error in Searching product",
//             error,
//         })
//     }
// }