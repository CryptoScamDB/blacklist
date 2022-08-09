const fs = require('fs');
const rimraf = require('rimraf');
const yaml = require('js-yaml');

const readCommands = () => new Promise((reject, resolve) => {
  if (fs.existsSync('./commands')) {
    fs.readdir('./commands', (err, items) => {
      if (err) {
        reject(err);
      } else {
        resolve(items.map((item) => yaml.load(fs.readFileSync(`./commands/${item}`, 'utf8'))));
      }
    });
  } else {
    resolve();
  }
});

(async () => {
  const commands = await readCommands();
  if (commands.length > 0) {
    const urls = yaml.load(fs.readFileSync('./data/urls.yaml', 'utf8'));
    console.log(`${commands.length} commands found`);
    commands.forEach((command) => {
      if (command.type === 'ADD') {
        urls.push(command.data);
      }
    });
    fs.writeFileSync('./data/urls.yaml', yaml.safeDump(urls, { lineWidth: 99999999, indent: 4 }));
    console.log('Wrote to urls.yaml');
    rimraf.sync('./commands');
    console.log('Deleted commands folder');
  } else {
    console.log('No commands found');
  }
})();
