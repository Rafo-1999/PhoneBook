import readlineSync from 'readline-sync';
import chalk from 'chalk';
import fs from 'fs';
import PhoneBook from '././src/phoneBook.js';

async function main() {
  console.log(chalk.blue('Welcome to the Phone Book Console Application!'));

  try {
    let filePath;
    do {
      filePath = readlineSync.question('Please enter the file path: ');
      if (!fs.existsSync(filePath)) {
        console.log(
            chalk.red('Invalid file path. Please enter a valid file path.'));
      }
    } while (!fs.existsSync(filePath));

    const phoneBook = new PhoneBook();
    phoneBook.readRecordsFromFile(filePath);

    if (phoneBook.records.length === 0) {
      console.log(chalk.yellow('No records found in the file.'));
      return;
    }

    let ordering;
    do {
      ordering = readlineSync.question(
          'Please choose an ordering to sort (Ascending or Descending): ');
      if (ordering !== 'Ascending' && ordering !== 'Descending') {
        console.log(chalk.red(
            'Invalid ordering criteria. Please choose "Ascending" or "Descending".'));
      }
    } while (ordering !== 'Ascending' && ordering !== 'Descending');

    let criteria;
    do {
      criteria = readlineSync.question(
          'Please choose criteria (FirstName, LastName, or PhoneNumberCode): ');
      if (!['FirstName', 'LastName', 'PhoneNumberCode'].includes(criteria)) {
        console.log(chalk.red(
            'Invalid criteria. Please choose "FirstName", "LastName", or "PhoneNumberCode".'));
      }
    } while (!['FirstName', 'LastName', 'PhoneNumberCode'].includes(criteria));

    phoneBook.showRecordsWithValidations(criteria, ordering);
  } catch (error) {
    console.log(chalk.red('An error occurred:', error.message));
  }
}

main();
