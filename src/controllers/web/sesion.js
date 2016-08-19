'use strict';
// vendor library
var Model = require('../../models/jugando.js');
var express = require('express');
var app = express();

exports.index =  function (req, res) {
   var usuario = Model.Usuario.build();
   res.render('web/login/signin',{usuario: usuario});
};

// sign in
// GET
exports.signIn = function(req, res) {
   var usuario = Model.Usuario.build();
   usuario.usuario = req.body.usuario;
   usuario.pass = req.body.pass;
   console.log('pase este 1',usuario.usuario);
   console.log('pase este 1',usuario.pass);
   usuario.autenticar(usuario.usuario,usuario.pass, function (usuarios) {
      console.log('pase este 2');
      if (usuarios) {
        console.log('pase este 3');
        res.redirect('/principal');
      } else {
         res.render('web/login/signin', {errorMessage: 'Email o Password invalido'});
      }
   }, function (error) {
    res.send('Usuario no encontrado');
   });
};

// sign up
// GET

exports.signUp = function (req, res, next) {
   var usuario = Model.Usuario.build();
   res.render('web/login/signup',{usuario: usuario});
};

// sign up
// POST
exports.signUpPost = function (req, res, next) {
   var usuario = req.body.usuario;
   var pass = req.body.pass; 
   var usuarios = Model.Usuario.build();
   usuarios.retrieveUser(req.body.usuario, function (success) {
      if(success) {
         console.log('estoy dentro de success');
         res.render('web/login/signup', {errorMessage: 'El usuario ya existe'});
      } else {
        console.log('estoy dentro de else');
         
        console.log('soy post usuario',usuario);
        console.log('soy post pass',pass);
  
        var index = Model.Usuario.build({
          usuario: usuario,
          pass: pass
        });

        index.add(function (success) {
           res.render('web/login/signin');
        },
        function (err) {
          res.send('Este usuario ya existe', err);
        }); 
      }
   });
};