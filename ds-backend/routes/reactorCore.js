var express = require('express');
var router = express.Router();
var requestHelper = require('../requestHelper');
var incomingHandler = require('../incomingHandler');
var missionHandler = require('../missionHandler');

const xCoordinate = 320;
const yCoordinate = 650;

/**
 * Endpoint to hit the Reactor Core.
 */
router.get('/' + xCoordinate + '/' + yCoordinate + '/:squadName/:microserviceName', function(req, res, next) {
			if (req.params.squadName == 'test') {
				// this is used to test out the endpoint from Postman
				req.params.squadName = 'blue';
				incomingHandler.incomingFire(req.params.squadName, req.params.microserviceName, missionHandler.MISSION.DATABASE);
				res.send('Reactor core hit!');
			} else {
				requestHelper.isFromOracle(req)
					.then( isOracle => {
						if (isOracle) {
							incomingHandler.incomingFire(req.params.squadName, req.params.microserviceName, missionHandler.MISSION.DATABASE);
							res.send('Reactor core hit!');
						} else {
							res.send('Caller is not a fighter!');
						}
					});
			}
});

module.exports = router;