import express from "express";
import jwt from "express-jwt";
import jwksClient from "jwks-rsa";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
const app = express();
const secret = jwksClient.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    proxy: 'http://fdnproxy.fsoft.fpt.vn:8080', 
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
})
const jwtCheck = jwt({
    secret: secret,
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER,
    algorithms: ["RS256"],
    credentialsRequired: false,
});

app.use(jwtCheck, (err, req, res, next) => {
    if (err.code === "invalid_token") {
        return next();
    }
    return next(err);
});


export default app;