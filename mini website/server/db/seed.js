const db = require("./db");
const { validWord, letterValue } = require("./models");
const JsonletterValues = require('../../../letter_values.json');
const letterValuesString = JSON.stringify(JsonletterValues);
const letterValues = JSON.parse(letterValuesString);
const fs = require('fs');
const path = require('path');
const allowedWords = {};
const data = fs.readFileSync(path.join(__dirname, 'sowpods.txt'));
const words = data.toString().replace(/\r\n/g,'\n').split('\n');
words.forEach(word => allowedWords[word] = true);

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  for(key in letterValues){
    await letterValue.create({
      letter: key,
      value: letterValues[key]
    })
  }
  
  for(key in allowedWords){
    await validWord.create({
      word: key
    })
  }

  console.log(`seeded data`);
}



async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}
