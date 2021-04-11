const { Product, Category } = require('../../db.js');
const { Sequelize, Op } = require('sequelize');

module.exports = async (req, res) => {
  let {
    name,
    SKU,
    unitPrice,
    description,
    picture,
    categoryCheck,
    unitsOnStock,
  } = req.body.params;

  try {
    const addProduct = await Product.findOrCreate({
      where: {
        name,
        SKU,
        unitPrice,
        description,
        picture,

        unitsOnStock,
      },
    });

    const findProduct = await Product.findOne({
      where: {
        name,
        SKU,
        unitPrice,
        description,
        picture,

        unitsOnStock,
      },
    });

    const findCategories = await Category.findAll({
      where: {
        name: {
          [Op.in]: categoryCheck,
        },
      },
    });

    await findProduct.setCategories(findCategories);

    return res.json(findProduct);
  } catch (err) {
    console.log(err);
    res.json({ error: 'an error occurred while loading the data' });
  }
};
