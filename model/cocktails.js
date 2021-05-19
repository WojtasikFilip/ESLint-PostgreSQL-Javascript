const db = require('../db');

async function getCocktails() {
  const { rows } = await db.query('SELECT cname, preis FROM cocktail');
  return {
    code: 200,
    data: rows,
  };
}

async function getCocktailZutat(cName) {
  try {
    const { rows } = await db.query(
      'select zbez from cocktail join besteht b on cocktail.cid = b.cid join zutat z on b.zid = z.zid where cname = $1;',
      [cName],
    );
    return {
      code: 200,
      data: rows,
    };
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getCocktails,
  getCocktailZutat,
};
