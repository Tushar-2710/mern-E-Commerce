const Product = require('../../models/product');
const Category = require('../../models/category');
//const User = require('../../models/user');
const User = require('../../models/auth')
const Order = require('../../models/order');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();

        // Dummy graph data बनवत आहोत (तुला नंतर improve करता येईल)
        const productAddedDates = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
        const productsCountByDate = [5, 8, 3, 7, 4];

        res.json({
            totalProducts,
            totalCategories,
            totalUsers,
            totalOrders,
            productAddedDates,
            productsCountByDate,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.getRecentActivity = async (req, res) => {
    try {
        const { filter } = req.query;

        // Filtration logic (आजचे, आठवड्याचे, महिन्याचे)
        let dateFilter = {};
        const now = new Date();

        if (filter === 'today') {
            dateFilter = {
                createdAt: {
                    $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate())
                }
            };
        } else if (filter === 'weekly') {
            const weekAgo = new Date();
            weekAgo.setDate(now.getDate() - 7);
            dateFilter = { createdAt: { $gte: weekAgo } };
        } else if (filter === 'monthly') {
            const monthAgo = new Date();
            monthAgo.setMonth(now.getMonth() - 1);
            dateFilter = { createdAt: { $gte: monthAgo } };
        }

        const recentProducts = await Product.find(dateFilter).sort({ createdAt: -1 }).limit(5);
        const recentOrders = await Order.find(dateFilter).sort({ createdAt: -1 }).limit(5);

        // Combine activities
        const activities = [
            ...recentProducts.map(p => ({ description: `New Product: ${p.name}`, createdAt: p.createdAt })),
            ...recentOrders.map(o => ({ description: `New Order ID: ${o._id}`, createdAt: o.createdAt }))
        ];

        // Sort descending (latest first)
        activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json({ activities });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};
