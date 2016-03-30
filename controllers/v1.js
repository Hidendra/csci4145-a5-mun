'use strict';

let MlsLookup = require('../models/mls-lookup.js');
let Area = require('../models/area.js');
let Service = require('../models/service.js');

module.exports.getServiceCodes = (req, res) => {
    let mlsId = req.query.mlsId || null;

    if (mlsId === null) {
        res.sendStatus(400);
        return;
    }

    MlsLookup.findOne({mlsId: mlsId}, (err, mlsLookup) => {
        if (mlsLookup === null) {
            res.sendStatus(404);
        } else {
            let areaId = mlsLookup.area;

            Area.findOne({'_id': areaId}, (err, area) => {
                if (area === null) {
                    res.sendStatus(404);
                } else {
                    let result = {
                        'mlsId': mlsId,
                        'area': areaId,
                        'services': [],
                        'serviceNames': {}
                    };

                    Service.find({'_id': {$in: area.services}}, (err, services) => {
                        if (services === null) {
                            res.sendStatus(500);
                        } else {
                            services.forEach((service) => {
                                result['services'].push(service._id);
                                result['serviceNames'][service._id] = service.name;
                            });

                            res.json(result);
                        }
                    });
                }
            });
        }
    });
};

module.exports.getAreas = (req, res) => {
    Area.find((err, results) => {
        if (err !== null) {
            res.sendStatus(500);
        } else {
            res.json(results);
        }
    })
};

module.exports.getServices = (req, res) => {
    Service.find((err, results) => {
        if (err !== null) {
            res.sendStatus(500);
        } else {
            res.json(results);
        }
    })
};
