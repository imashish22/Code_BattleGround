
import jwt from "jsonwebtoken";
import path from "path";

export const generateTokenAndSetCookie = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: true,
		// secure: process.env.NODE_ENV === "production",
		// sameSite: "strict",
		sameSite: "None",
		maxAge: 7 * 24 * 60 * 60 * 1000,
		path: "/",
	});

	return token;
};	