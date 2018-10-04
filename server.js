const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

const issues = [
	{
		id: 1, status: 'Open', owner: 'James Hetfield', created: new Date('2018-09-27'),
		effort: 0, completionDate: undefined, title: 'yeahhhhhhhah!'
	},
	{
		id: 2, status: 'Assigned', owner: 'Dave Mustaine', created: new Date('1987-03-05'),
		effort: 1000, completionDate: new Date('1988-03-05'), title: "I'm not in the band anymore"
	}
];

app.get('/api/issues', (req, res) => {
	const metadata = { total_count: issues.length };
	res.json({ _metadata: metadata, records: issues });
});

app.listen(3000, function(){
	console.log("App started on port 3000");
});

