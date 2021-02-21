import { google } from 'googleapis';

import config from '../config';

const oauth2Client = new google.auth.OAuth2(
  config.client_id,
  config.client_secret,
  `${config.base}/google/callback`
);

const scopes = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.force-ssl',
  'https://www.googleapis.com/auth/youtube.readonly',
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

export default { url, oauth2Client };
