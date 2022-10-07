module.exports = {
  BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 8,
  JWT_SECRET:
    process.env.JWT_SECRET ||
    "my secret and insane password (you'll never guess!!)",
};
