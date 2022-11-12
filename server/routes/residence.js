const router = require('express').Router();

router.route('/').get(allResidences);

function allResidences(req, res) {
	const residences = [
		{
			"id": 0,
			"fullName": "Waterfront Residence",
			"shortName": "WFR",
			"enabled": 1
		},
		{
			"id": 1,
			"fullName": "Nadayu28",
			"shortName": "Nadayu",
			"enabled": 1
		},
		{
			"id": 2,
			"fullName": "SunU Residence",
			"shortName": "SunU",
			"enabled": 0
		}
	];
	
	res.json({status: 1, result:residences});
}

module.exports = router;