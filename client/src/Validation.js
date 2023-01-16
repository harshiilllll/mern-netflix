const Validation = (values) => {
    let errors = {};

    if (!values.username) {
        errors.username = "Username required"
    } else if (values.username.length < 2) {
        errors.username = "Username must contain 2 letters"
    }

    if (!values.password) {
        errors.password = "Password required"
    } else if (values.password.length < 6) {
        errors.password = "Password must contain 6 letters"
    }

    return errors;
}

export default Validation;