const express =require('express');
const issueRouter = require('./issues');
const seriesRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE ||'./database.sqlite');

seriesRouter.get('/', (req, res, next) => {
    db.all("SELECT * FROM Series;", (err, series) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({series: series});
        }
    })
});

seriesRouter.param('seriesId', (req, res, next, seriesId) => {
    const sql = 'SELECT * FROM Series WHERE Series.id = $seriesId';
    const values = {$seriesId: seriesId};
    db.get(sql, values, (err, series) => {
        if (err) {
            next(err);
        } else if (series) {
            req.series = series;
            next();
        } else {
            res.sendStatus(404);
        }
    });
});

const validateSeries = (req, res, next) => {
    req.name = req.body.series.name;
    req.description = req.body.series.description;
    if (!req.name || !req.description) {
        return res.sendStatus(400);
    } else {
        next();
    }
};

seriesRouter.use('/:seriesId/issues', issueRouter);

seriesRouter.get('/:seriesId', (req, res, next) => {
    res.status(200).json({series: req.series});
});

seriesRouter.post('/', validateSeries, (req, res, next) => {
    if (!req.name || !req.description) {
        return res.sendStatus(400);
    };
    const sql = 'INSERT INTO Series (name, description) VALUES ($name, $description)';
    const values = {
      $name: req.name,
      $description: req.description
    };
    db.run(sql, values, function(err) {
        if (err) {
            next(err);
        } else {
            db.get(`SELECT * FROM Series WHERE id = ${this.lastID}`, (err, series) => {
                res.status(201).json({series: series});
           });        
        }
    });    
});

seriesRouter.put('/:seriesId', validateSeries, (req, res, next) => {
    if (!req.name || !req.description) {
        return res.sendStatus(400);
    };
    const sql = 'UPDATE Series SET name = $name, description = $description WHERE id = $seriesId';
    const values = {
        $name: req.name,
        $description: req.description,
        $seriesId: req.params.seriesId
    };
    db.run(sql, values, (err) => {
        if (err) {
            next(err);
        } else {
            db.get(`SELECT * FROM Series WHERE id = ${req.params.seriesId}`, (err, series) => {
                res.status(200).json({series: series});
           });        
        }
    });

});

seriesRouter.delete('/:seriesId', (req, res, next) => {
    const sql = "SELECT * FROM Issue WHERE series_id = $seriesId;";
    const values = {$seriesId: req.params.seriesId};
    db.get(sql, values, (err, issues) => {
        if (err) {
            next(err);
        } else {
            if (issues) {
                res.sendStatus(400); // Cannot delete series with related issues
            } else {
                const sql = "DELETE FROM Series WHERE id = $seriesId;";
                const values = {$seriesId: req.params.seriesId};
                db.run(sql, values, (err) => {
                    if (err) {
                        next(err);
                    } else {
                        res.sendStatus(204);
                    }
                });
            }
        }
    });
});

module.exports = seriesRouter;