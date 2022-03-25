/** Converts the given date string to ISO8610 format. */
const toISOString = (dateString) => new Date(dateString).toISOString();

module.exports = {
  toISOString,
};
