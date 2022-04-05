const { DateTime } = require('luxon');

function readableDate(date, format) {
  // default to America/Chicago Timezone
  const dt = DateTime.fromJSDate(date, { zone: 'UTC-6' });
  if (!format) {
    format = dt.hour + dt.minute > 0 ? 'dd LLL yyyy - HH:mm' : 'dd LLL yyyy';
  }
  return dt.toFormat(format);
}

function dateToFormat(date, format) {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(String(format));
}

function dateToISO(date) {
  return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
    includeOffset: false,
    suppressMilliseconds: true,
  });
}

function dateFromISO(timestamp) {
  return DateTime.fromISO(timestamp, { zone: 'utc' }).toJSDate();
}

module.exports = {
  readableDate,
  dateToFormat,
  dateToISO,
  dateFromISO,
};
