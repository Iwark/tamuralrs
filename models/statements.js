var mongo = require('mongoskin');
var uri = process.env.MONGOHQ_URL || 'localhost:27017/tamuralrs';
var db = mongo.db(uri);
var statements = db.collection('statements');

exports.pull = function pull(page, cb){
	var p = {};
	var rowsPer = 10;
	var skip;
	var errs;

	page = page || 1;
	skip = (page - 1) * rowsPer;

	statements.findEach({}, {limit: rowsPer, skip: skip }, function(err, doc){
		if(err){ errs = errs || []; errs.push(err); }
		if(doc){
			p[doc._id] = doc;
			delete p[doc._id]._id;
			return;
		}
		cb(errs, p);
	});
};

exports.del = function(statement, cb){
	statements.removeById(statement, cb);
};

exports.add = function(statement, cb){
	console.log('statement:'+JSON.stringify(statement));
	statements.insert(statement.state,cb);
};