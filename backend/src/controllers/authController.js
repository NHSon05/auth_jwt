import bcrypt from 'bcrypt'
import User from '../models/User.js';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import Session from '../models/Session.js';

const ACCESS_TOKEN_TTL = '30m';
const REFRESH_TOKEN_TLL = 14 * 24 * 60 * 60 * 1000; // 14 ngày, 24 giờ, 60 phút, 60s, 1000ms

export const signUp = async (req, res) => {
    try {
        const {username, password, email, firstName, lastName} = req.body;
        if(!username || !password || !email || !firstName || !lastName){
            return res.status(400).json({message: "Không thể hiếu username, password, email, firstName, lastName"})
        }

        // kiểm tra user tồn tại chưa
        const duplicate = await User.findOne({username});

        if (duplicate){
            return res.status(409).json({message: "username đã tồn tại"})
        }
        // mã hoá password
        const hashedPassword = await bcrypt.hash(password, 10) //salt = 10. Số lần mà bcrypt thực hiện lặp đi lặp lại để tạo ra kết quả cuối cùng


        // tạo user mới
        await User.create({
            username,
            hashedPassword,
            email,
            displayName: `${firstName} ${lastName}`
        })
        // return
        return res.sendStatus(204);
    } catch (error) {
        console.error("Lỗi khi gọi signUp", error)
        return res.status(500).json({message : "Lỗi hệ thống"});
    }    
}
export const signIn = async (req, res) => {
    try {
        // Input from request body
        const {username, password} = req.body

        if (!username || !password) {
            return res.status(400).json({message: "Thiếu username hoặc password"})
        }
        // Take hashedPassword in db to compare password
        const user = await User.findOne({username})
        if (!user) {
            return res.status(401).json({message: "username hoặc password không chính xác"})
        }
        // check password
        const passwordCorrect = await bcrypt.compare(password, user.hashedPassword)
        if (!passwordCorrect) {
            return res
                .status(401)
                .json({message: "user hoặc password không chính xác"})
        }
         
        // Similar -> create accessToken with JWT\
        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRECT, {expiresIn: ACCESS_TOKEN_TTL})
        // create refeshToken
        const refreshToken = crypto.randomBytes(64).toString('hex');
        // create new session to save fresh token
        await Session.create({
            userId: user._id,
            refreshToken, 
            expireAt: new Date(Date.now() + REFRESH_TOKEN_TLL),
        })
        // return refresh token in cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none', // backend, frontend deploy riêng
            maxAge: REFRESH_TOKEN_TLL,
        })
        // return access token in response
        return res.status(200).json({message: `User ${user.displayName} đã login`, accessToken})
    } catch (error) {
        console.error("Lỗi khi gọi signIn", error)
        return res.status(500).json({message: "Lỗi hệ thống"})
    }
}

export const signOut = async (req, res) => {
    try {
        // lấy refresh token từ cookie
        const token = req.cookies?.refreshToken;
        if (token){
        // xoá refresh token trong Session
            await Session.deleteOne({refreshToken: token})
            // xoá cookie
            res.clearCookie("refreshToken")
        }
        return res.sendStatus(204)
    } catch (error) {
        console.error("Lỗi khi gọi signOut", error)
        return res.status(500).json({message: "Lỗi hệ thống"})
    }
}