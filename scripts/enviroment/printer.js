/* eslint-disable no-buffer-constructor */
const fs = require('fs');

const strVariables = process.argv[3];
const pathDestiny = process.argv[4];
const variables = Object.entries(JSON.parse(strVariables)[0].variables)
  .filter((key) => !/dd/gi.test(key))
  .map(([key, value]) => `${key}= ${value.value}`);
const template = variables.join('\n');

function writeFile(path, data) {
  return fs.writeFileSync(path, data, {
    encoding: 'utf8',
  });
}
writeFile(pathDestiny, template);
