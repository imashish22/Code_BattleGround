import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate categories
    },
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
