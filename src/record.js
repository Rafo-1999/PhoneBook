export default class Record {
  constructor(name, surname, separator, phoneNumber) {
    this.name = name;
    this.surname = surname;
    this.separator = separator;
    this.phoneNumber = phoneNumber;
    this.validations = [];
  }

  validatePhoneNumber() {
    if (this.phoneNumber.length !== 9 || isNaN(this.phoneNumber)) {
      this.validations.push('phone number should be 9 digits');
    }
  }

  validateSeparator() {
    if (this.separator !== ':' && this.separator !== '-') {
      this.validations.push('separator should be `:` or `-`');
    }
  }

  isValid() {
    return this.validations.length === 0;
  }
}
