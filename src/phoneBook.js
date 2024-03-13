import fs from 'fs';
import chalk from 'chalk';
import Record from './record.js';

export default class PhoneBook {
  constructor() {
    this.records = [];
  }

  addRecord(record) {
    this.records.push(record);
  }

  readRecordsFromFile(filePath) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const lines = fileContent.split('\n').map(line => line.trim());
      lines.forEach((line, index) => {
        if (line.trim() !== '') {
          const [name, surname, separator, phoneNumber] = line.split(' ');
          const record = new Record(name, surname, separator, phoneNumber);
          record.validatePhoneNumber();
          record.validateSeparator();
          if (!record.isValid()) {
            console.log(chalk.red(
                `Validation: line ${index + 1}: ${record.validations.join(
                    ', ')}.`));
          }
          this.addRecord(record);
        }
      });
    } catch (error) {
      console.log(chalk.red('Error reading the file:', error.message));
    }
  }

  sortRecords(criteria, ordering) {
    const comparer = (a, b) => {
      let valueA, valueB;
      switch (criteria) {
        case 'FirstName':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case 'LastName':
          valueA = (a.surname || '').toLowerCase() || 'zzzzzzzz';
          valueB = (b.surname || '').toLowerCase() || 'zzzzzzzz';
          break;
        case 'PhoneNumberCode':
          valueA = a.phoneNumber.substring(0, 3);
          valueB = b.phoneNumber.substring(0, 3);
          break;
        default:
          throw new Error('Invalid criteria.');
      }

      if (valueA === valueB) {
        return a.name.localeCompare(b.name);
      }

      if (ordering === 'Ascending') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    };

    this.records.sort(comparer);
  }

  displayRecords() {
    console.log(chalk.blue('Sorted Records:'));
    this.records.forEach((record, index) => {
      console.log(chalk.green(`${index + 1}. ${record.name} ${record.surname
      || ''} ${record.separator} ${record.phoneNumber}`));
    });
  }

  displayValidations() {
    console.log(chalk.yellow('Validations:'));
    this.records.forEach((record, index) => {
      if (!record.isValid()) {
        console.log(
            chalk.red(`line ${index + 1}: ${record.validations.join(', ')}`));
      }
    });
  }

  showRecordsWithValidations(criteria, ordering) {
    this.sortRecords(criteria, ordering);
    this.displayRecords();
    this.displayValidations();
  }

}
