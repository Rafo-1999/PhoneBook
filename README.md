# Phone Book Console Application

This is a console-based application that allows users to manage and sort phone book records stored in a file. Users can specify sorting criteria and ordering to view sorted records along with validation messages for each record.

## Features

- Read phone book records from a file.
- Validate each record for phone number format, surname presence, and separator correctness.
- Sort records based on specified criteria (FirstName, LastName, or PhoneNumberCode) and ordering (Ascending or Descending).
- Display sorted records along with validation messages for invalid records.

## Requirements

- Node.js installed on your machine.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Rafo-1999/PhoneBook.git
2. Install dependencies:

   ```bash
   npm install
3. Navigate to the project directory:
4. Run the application:

   ```bash
   npm start
5. Follow the prompts to enter the file path, sorting criteria, and ordering:
6. The file should have the following structure:

   ```bash
    {name} {surname} {separator} {phoneNumber}
    John Doe - 094949494
    Jane Smith : 093939393


