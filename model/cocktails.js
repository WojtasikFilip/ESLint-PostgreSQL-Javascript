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

async function getCocktailsWithPrice(price) {
  try {
    const { rows } = await db.query('select cname, preis from cocktail where preis <= $1;', [price]);
    return {
      code: 200,
      data: rows,
    };
  } catch (err) {
    console.error(err);
  }
}

async function deleteCocktail(name) {
  try {
    const { rows } = await db.query('select * from cocktail where cname = $1;', [name]);

    if (rows.length > 0) {
      await db.query('delete from besteht where cid = (select cid from cocktail where cname = $1)', [name]);
      await db.query('delete from bestellt where cid = (select cid from cocktail where cname = $1)', [name]);
      await db.query('DELETE from cocktail where cname = $1;', [name]);
      return {
        data: `Cocktail ${name} deleted!`,
        status: 200,
      };
    }
    return {
      data: `Cocktail ${name} not found `,
      status: 500,
    };
  } catch (err) {
    console.error(err);
  }
}

async function insertCocktail(cocktail) {
  const { rows } = await db.query('SELECT Max(cid) as max from cocktail');
  const newCID = rows[0].max + 1;
  await db.query(
    'INSERT INTO cocktail (cid, cname, preis, zubereitung, kid, zgid, sgid) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [
      newCID,
      cocktail.name,
      cocktail.preis,
      cocktail.zubereitung,
      cocktail.kid,
      cocktail.zgid,
      cocktail.sgid,
    ],
  );
  return {
    status: 200,
    data: `Inserted ${newCID}`,
  };
};

async function updateCocktailPrice(cocktail, name) {
  const { rows } = await db.query('SELECT * from cocktail where cname = $1', [name]);
  if (rows.length > 0) {
    await db.query('UPDATE cocktail SET preis = $1 where cname = $2;', [cocktail.preis, name]);
    return {
      code: 200,
      data: `Cocktail ${name} updated to ${cocktail.preis}`,
    };
  }
  return {
    code: 404,
    data: `Cocktail ${name} not found`,
  };
}


module.exports = {
  getCocktails,
  getCocktailZutat,
  getCocktailsWithPrice,
  deleteCocktail,
  insertCocktail,
  updateCocktailPrice,
};
