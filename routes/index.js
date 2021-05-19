const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { getCocktails, getCocktailZutat, getCocktailsWithPrice } = require('../model/cocktails');

router.get(
  '/cocktails',
  asyncHandler(async (req, res) => {
    const result = await getCocktails();
    res.status(result.code).json(result);
  }),
);

router.get(
  '/cocktails/:name/zutaten',
  asyncHandler(async (req, res) => {
    const result = await getCocktailZutat(req.params.name);
    res.status(result.code).json(result);
  }),
);

router.get(
  '/cocktails/:price',
  asyncHandler(async (req, res) => {
    const result = await getCocktailsWithPrice(req.params.price);
    res.status(result.code).json(result);
  }),
);
module.exports = router;
