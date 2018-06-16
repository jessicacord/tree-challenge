const router = require("express").Router();
const db = require("../models");
const Tree = db.Tree;
const Branch = db.Branch;


//Tree Routes
router.get('/getTrees', (req, res) => {
    Tree.findAll({ include: [{ model: Branch }] }).then(result => {
        return res.json({
            success: true,
            trees: result
        });
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: 'No trees have been created',
            debug: err
        });
    });
});

router.post('/newTree', (req, res) => {
    Tree.create({
        name: req.body.name,
        branches: req.body.branches,
        minLeaves: req.body.minLeaves,
        maxLeaves: req.body.maxLeaves
    }).then(newTree => {
        res.json(newTree)
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "Could not create new tree",
            debug: err
        });
    });
});

router.put('/updateTree/:id', (req, res) => {
    Tree.update({
        name: req.body.name,
        branches: req.body.branches,
        minLeaves: req.body.minLeaves,
        maxLeaves: req.body.maxLeaves
    },{
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: 'Could not update tree',
            debug: err
        });
    });
});

router.delete('/deleteTree/:id', (req, res) => {
    Tree.destroy( {
        where: { id: req.params.id }
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: 'Could not delete tree',
            debug: err
        });
    });
})


//Branch routes
router.get('/getBranches/:id', (req, res) => {
    Branch.findAll({ where: { treeId: req.params.id } }).then(result => {
        return res.json({
            success: true,
            trees: result
        });
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: 'There are no branches for this tree',
            debug: err
        });
    });
});

router.post('/newBranch', (req, res) => {
    Branch.create({
        TreeId: req.body.TreeId,
        leaves: req.body.leaves
    }).then(newBranch => {
        res.json(newBranch)
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "Could not create branch",
            debug: err
        });
    });
});

router.put('/updateBranch/:id', (req, res) => {
    Branch.update({
        leaves: req.body.leaves
    },{
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: 'Could not update branch',
            debug: err
        });
    });
});


module.exports = router;
