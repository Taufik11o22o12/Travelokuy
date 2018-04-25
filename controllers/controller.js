const router = require('express').Router();
const Model = require('../models');
const hashPassword = require('../helpers/helper_hash_password');
var session = require('express-session')

class Controller {
  constructor() {

  }

  static register(req, res){

    const new_account = {
      name: req.body.name,
      phone: req.body.phone_number,
      email: req.body.email,
      password: req.body.password
    }

    Model.Customer.create(new_account)

    .then(response => {
      res.render('login/login')
    })

  }

  static login(req, res){

    Model.Customer.findOne({where:{email : req.body.email}})

    .then(response => {

      if (hashPassword(req.body.password, response.password)){

        req.session.email = response.email

        req.session.idCustomer = response.id

        res.send('berhasil')

      } else {

        res.send('gagal')

      }

    })

  }

}

module.exports = Controller;
