const fs = require('fs');
const rimraf = require('rimraf');
const yaml = require('js-yaml');
 
if (fs.existsSync("./commands")) {
	const urls = yaml.safeLoad(fs.readFileSync('./data/urls.yaml', 'utf8'));
	fs.readdir("./commands", (err, items) => {
		items.forEach(item => {
			const command = yaml.safeLoad(fs.readFileSync('./commands/' + item, 'utf8'));
			if(command.type == "ADD") {
				urls.push(command.data);
			}
		});
		fs.writeFileSync('./data/urls.yaml',yaml.safeDump(urls,{ lineWidth: 99999999, indent: 4 }));
		rimraf.sync('./commands');
	});
}