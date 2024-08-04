const z =require('zod');

const loginschema =z.object({
  email: z
  .string({required_error:"email is required"})
  .trim()
  .email({message: " Invalid email address"})
  .min(3,{message:"email must be at least of 3 characters, "})
  .max(255, { message: "email must not be more than 255 characters ."}),

  password: z
  .string({required_error:"password is required"})
  .trim()
  .min(3,{message:"password must be at least of 3 characters, "})
  .max(255, { message: "password must not be more than 255 characters ."}),
})

const signupschema = loginschema.extend({
  username: z
  .string({required_error:"name is required"})
  .trim()
  .min(3,{message:"name must be at least of 3 characters, "})
  .max(255, { message: "name must not be more than 255 characters ."}),
 
  phone: z
  .string({required_error:"phone is required"})
  .trim()
  .min(3,{message:"phonemust be at least of 3 characters, "})
  .max(255, { message: "phone must not be more than 255 characters ."}),
 
  
});

module.exports = {signupschema,loginschema};