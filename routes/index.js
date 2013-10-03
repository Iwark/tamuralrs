
/*
 * GET home page.
 */

var statements = require('../models/statements');

exports.index = function(req, res){
	statements.pull(req.param.pagenum,function(err,statements){
		if(err) console.log(err);
		console.log(JSON.stringify(statements));
		res.render('index', {
			title: 'TamuraLRS',
			statements: statements,
			page: req.params.pagenum
		});
	});
};

exports.state = function(req, res){
	console.log(req.body);
	statements.add(req.body, function(err){
		if(err){ console.log(err); }
		res.redirect(req.header('Referrer') || '/');
	});
}