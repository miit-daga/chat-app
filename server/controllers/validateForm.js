const yup = require("yup");

const formSchema = yup.object({
    username: yup
        .string()
        .required("Username is required")
        .min(4, "Username must be at least 4 characters")
        .max(20, "Username must be at most 20 characters"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(28, "Password must be at most 28 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[\W_]/, "Password must contain at least one special character"),
});

const validateForm = (req, res, next) => {
    formSchema.validate(req.body, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch(err => {
            console.log(err.errors);
            res.status(422).json({ errors: err.errors });
        });
};

module.exports = { validateForm };
