import { google } from 'googleapis';

import config from '../config';

const oauth2Client = new google.auth.OAuth2(
  config.clientID,
  config.clientSecret,
  config.callbackURL
);

const usingAPIs = ['youtube'];

google.options({
  auth: oauth2Client,
});

/**
 * Sets the auth credentials.
 * @param {string} token Token for credentials.
 */
const setAuthCredentials = (token) => {
  oauth2Client.credentials = token;
};

/**
 * Check for API supported by Google.
 * @param {string} googleAPI Google's API name.
 * @param {string} version Google's API version.
 */
const checkAPI = (googleAPI = '', version = '') => {
  const supportedAPIs = google.getSupportedAPIs();
  const {
    [googleAPI]: {},
  } = supportedAPIs;
  const apiVersion = supportedAPIs[googleAPI];
  return {
    valid: usingAPIs.includes(googleAPI) && apiVersion.includes(version),
    service: google[googleAPI](version),
  };
};

/**
 * Return service supported by Google.
 * @param {string} googleAPI Google's API name.
 * @param {string} version Google's API version.
 */
const getService = async (googleAPI = '', version = '') => {
  if (googleAPI === '') {
    throw new Error('Should be pass api');
  }
  try {
    const { valid, service } = checkAPI(googleAPI, version);
    if (!valid) {
      throw new Error(`${googleAPI} api is not supported.`);
    } else {
      return service;
    }
  } catch (err) {
    console.error(err);
  }
};

export { setAuthCredentials, getService, oauth2Client };
