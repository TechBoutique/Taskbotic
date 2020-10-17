import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { GENERAL_ERROR_INFO } from "../controllers/constants";

export const accessTokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!process.env.JWT_ACCESS_KEY) return res.status(401).json({
            EEXX023423: 'Contact Administrator if the Issue persists'
        });
        const accessToken = req.header('Bearer-Token');
        if (accessToken) {
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, function (err, decoded) {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        return res.status(401).json({
                            EEXX087423: "Access Token Expired",

                        });
                    }
                    return res.status(401).json({
                        EEXX023093: err
                    });
                }
                if (decoded) {
                    next();
                }
            })
        } else {
            return res.status(401).json({
                EEXX023983: 'Access Denied'
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
            errCode: err.errno,
            info: GENERAL_ERROR_INFO
        });
    }
}

export const refreshTokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!process.env.JWT_REFRESH_KEY) return res.status(401).json({
            EEXX023423: 'Contact Administrator if the Issue persists'
        });
        const cookies = req.cookies;
        if (cookies && cookies.Authorization) {
            jwt.verify(cookies.Authorization, process.env.JWT_REFRESH_KEY, function (err: any, decoded: any) {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        return res.status(401).json({
                            EEXX087423: "Refresh Token Expired",
                        });
                    }
                    return res.status(401).json({
                        EEXX023093: err
                    });
                }
                if (decoded) {
                    next();
                }
            })
        } else {
            return res.status(401).json({
                EEXX023983: 'Access Denied'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            errCode: err.errno,
            info: GENERAL_ERROR_INFO
        });
    }
}