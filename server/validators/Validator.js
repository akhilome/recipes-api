class Validator {
  static isEmail(email) {
    const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/ig;
    return re.test(email.trim().toLowerCase());
  }

  static isValidPassword(password) {
    return password.trim().length > 5;
  }

  static isMatchingPasswords(password, confirmPassword) {
    return password.trim() === confirmPassword.trim();
  }

  static isValidName(name) {
    return name.trim().length >= 2;
  }
}

export default Validator;
