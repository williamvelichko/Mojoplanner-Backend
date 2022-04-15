const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");

const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-jz8ljx4f.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "this is unique identifier",
  issuer: "https://dev-jz8ljx4f.us.auth0.com/",
  algorithms: ["RS256"],
}).unless({ path: ["/"] });

const protectedApi = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const resp = await axios.get("https://dev-jz8ljx4f.us.auth0.com/userinfo", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    userinfo = resp.data;
    next();
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = { verifyJwt, protectedApi };
