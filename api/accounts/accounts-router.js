const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
    checkAccountPayload,
    checkAccountNameUnique,
    checkAccountId,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
    try {
        const getAccounts = await Accounts.getAll();
        res.status(200).json(getAccounts);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", checkAccountId, async (req, res, next) => { // eslint-disable-line
    res.status(200).json(req.account);
});

router.post(
    "/",
    checkAccountPayload,
    checkAccountNameUnique,
    async (req, res, next) => {
        try {
            const postAccount = await Accounts.create(req.body);
            res.status(201).json(postAccount);
        } catch (error) {
            next(error);
        }
    }
);

router.put(
    "/:id",
    checkAccountPayload,
    checkAccountNameUnique,
    checkAccountId,
    async (req, res, next) => {
        try {
            await Accounts.updateById(req.params.id, req.body);
            const putAccount = await Accounts.getById(req.params.id);
            res.status(200).json(putAccount);
        } catch (error) {
            next(error);
        }
    }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
    try {
        const deleteAccount = await Accounts.deleteById(req.params.id);
        res.status(200).json(deleteAccount);
    } catch (error) {
        next(error);
    }
});

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({ message: err.message });
});

module.exports = router;
