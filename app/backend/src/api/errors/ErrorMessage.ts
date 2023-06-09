export const ID_NOT_FOUND = { status: 400, message: 'Id not Found' };

export const TOKEN_NOT_FOUND = { status: 401, message: 'Token not found' };

export const USER_NOT_FOUND = { status: 400, message: 'User not found' };

export const MATCH_NOT_FOUND = { status: 400, message: 'Match not found' };

export const ALL_FIELDS_REQUIRED = { status: 400, message: 'All fields must be filled' };

export const INVALID_TOKEN = { status: 401, message: 'Token must be a valid token' };

export const INVALID_LOGIN = { status: 401, message: 'Invalid email or password' };

export const BAD_REQUEST = { status: 400,
  message: 'The request could not be understood by the server due to malformed syntax' };

export const MATCH_ENTITY_ERROR = { status: 422,
  message: 'It is not possible to create a match with two equal teams' };

export const TEAM_ID_NOT_FOUND = { status: 404,
  message: 'There is no team with such id!' };
