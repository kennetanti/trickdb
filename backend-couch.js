const NodeCouchDb = require('node-couchdb');

const couch = new NodeCouchDb({
    host: 'couchdb',
    protocol: 'https',
    port: 5984,
    auth: {
		user: "security",
		pass: "isimportant"
	}
});

