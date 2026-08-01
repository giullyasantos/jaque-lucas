const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const DEFAULT_SPREADSHEET_ID = '1M7_jUQaxw9nM96Fd_DlYK7TZ_395MJ5eLCBGBj2MfHc';
const DEFAULT_SHEET_RANGE = 'Página1!A:E';

const normalizeCredentials = (credentials) => {
  if (credentials.private_key) {
    return {
      ...credentials,
      private_key: credentials.private_key.replace(/\\n/g, '\n'),
    };
  }

  return credentials;
};

const loadCredentials = () => {
  const rawCredentials = process.env.GOOGLE_CREDENTIALS || process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (rawCredentials) {
    return normalizeCredentials(JSON.parse(rawCredentials));
  }

  if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    return normalizeCredentials({
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
  }

  const localCredentialsPath = path.join(process.cwd(), 'backend/rsvp.json');
  if (fs.existsSync(localCredentialsPath)) {
    return normalizeCredentials(JSON.parse(fs.readFileSync(localCredentialsPath, 'utf8')));
  }

  throw new Error('Google Sheets credentials are not configured');
};

const appendRsvp = async ({ firstName, lastName, people, whoComing, allergies }) => {
  const auth = new google.auth.GoogleAuth({
    credentials: loadCredentials(),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  return sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SPREADSHEET_ID || DEFAULT_SPREADSHEET_ID,
    range: process.env.SHEET_RANGE || DEFAULT_SHEET_RANGE,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[firstName, lastName, people, whoComing, allergies]],
    },
  });
};

module.exports = {
  appendRsvp,
  DEFAULT_SPREADSHEET_ID,
  DEFAULT_SHEET_RANGE,
};
