const { z } = require('zod');

const userZod = z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
    email: z.string()
});

module.exports = userZod;
