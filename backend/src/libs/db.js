import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Liên kết với CSDL thành công")
    } catch (error) {
        console.error("Lỗi khi kết nối cơ sở dữ liệu", error)
        process.exit(1);
    }
}