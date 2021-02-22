import { google } from 'googleapis';

import config from '../config';

const oauth2Client = new google.auth.OAuth2(
  config.client_id,
  config.client_secret,
  `${config.base}/auth/google/code`
);

google.options({
  auth: oauth2Client,
});

const scopes = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.force-ssl',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtubepartner',
];

let refreshToken = null;

const authorizeURL = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

const setToken = async (code) => {
  if (refreshToken !== null) {
    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });
    return;
  }
  const { tokens } = await oauth2Client.getToken(code);
  refreshToken = tokens.refresh_token;
  oauth2Client.credentials = tokens;
};

const getAPIData = async () => {
  const service = google.youtube('v3');
  const res = await service.subscriptions.list({
    mine: true,
    part: 'snippet',
  });
  return res;
};

export { authorizeURL, setToken, getAPIData };
