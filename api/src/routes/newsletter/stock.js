const express = require("express");
const {
  User,
  Newsletter,
  Product,
  Category,
  Wishlist,
} = require("../../db.js");
const { HandlerEmail } = require("./email/handlerEmail.js");
const { InfoEmail } = require("./email/InfoEmail.js");



module.exports = async (req, res) => {
    const { productId, motive } = req.body;
  
    try {
      const product = await Product.findOne({
        where: {
          id: productId,
        },
        include: [
          {
            model: Category,
          },
          {
            model: Wishlist,
          },
        ],
      });
      
      if (!product)
        return res.status(400).json({ message: "Producto no encontrado" });
      if(product.wishlists.length===0) return res.status(400).json({ message: "Producto no esta en Wishlist" });
      const {
        id,
        name,
        unitPrice,
        picture,
        score,
        unitsOnStock,
        categories,
        wishlists,
      } = product;
      const cat = categories.map((c) => c.dataValues.name); //filter categories for send in props to email
      //filter&find section xD
      const wish = wishlists.map((w) => w.dataValues.userId);
      const users = await User.findAll({ where: { id: wish } });
      const arrUsers = users.map((u) => u.dataValues);
      const arrFilter = arrUsers.filter((u) => u.information);//opciones de envio
      const arrWish = arrFilter.map((u) => u.id);
      ////////////
      const htmlType = InfoEmail(
        "usuario",
        0,
        name,
        unitPrice,
        picture,
        score,
        unitsOnStock,
        cat
      ); //email tipo a guardar
  
      const [news, created] = await Newsletter.findOrCreate({
        where: {
          type: motive,
          html: htmlType,
        },
      });
      await news.addUser(arrWish);
  
      for (let i = 0; i < arrFilter.length; i++) {
        let html = InfoEmail(
          arrFilter[i].firstName,
          id,
          name,
          unitPrice,
          picture,
          score,
          unitsOnStock,
          cat
        );
  
        await HandlerEmail(
          html,
          arrUsers[i].email,
          "Aprovecha nuestro nuevo stock!" //podria venir desde el front
        );
      }
  
      return res.status(200).json({ message: "Newsletter enviados!" });
    } catch (e) {
      return res.status(400).json(e);
    }
  }