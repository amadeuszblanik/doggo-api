/* eslint-disable no-magic-numbers,@typescript-eslint/no-unsafe-return */
const bufferToText = (buffer: Buffer): string => buffer.toString();

const toJson = (content: string, delimiter = ',') => {
  const response = [];

  const rows = content.split('\n');

  const keys = rows.shift().split(delimiter);

  rows.forEach((row) => {
    const singleElement = {};

    const values = row.split(delimiter);

    values.forEach((value, index) => {
      const key = keys[index];

      if (key === 'id') {
        return;
      }

      singleElement[keys[index]] = value;
    });

    response.push(singleElement);
  });

  return response;
};

const readCsvUtils = (buffer: Buffer) => {
  const text = bufferToText(buffer);

  return toJson(text);
};

export default readCsvUtils;
