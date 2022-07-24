import express from "express";

const router = express.Router();
import fs from 'fs';
// import dataPath from './../Details/menu.json'
// const menuRoutes = require('./account.js')


// const saveAccountData = (data) => {
//   const stringifyData = JSON.stringify(data)
//   fs.writeFileSync(dataPath, stringifyData)
// }

export const getMenuData = () => {
  const jsonData = fs.readFileSync(process.cwd() + '/Details/menu.json')
  
  return JSON.parse(jsonData)
}

export const getallmenu = (req, res) => {
  const accounts = getMenuData()
  console.log(accounts)
  res.send(accounts)
}

export const getByName = (req, res) => {
  // const menubyid = getMenuData().dishes[req.params.id]
  const menuByName = getMenuData().find(item => item.id == req.params.name) 
  || getMenuData().find(item => item.name === req.params.name) 
  || getMenuData().filter(item => item.category === req.params.name)
  res.send(menuByName)
  res.status(200)
  }

// menuRoutes.post('/menu/add', (req, res) => {

//   var addRoutes = getMenuData()
//   const newRationId = Math.floor(100000 + Math.random() * 900000)

//   addRoutes[newRationId] = req.id

//   console.log(addRoutes);
//   saveAccountData(addRoutes);
//   res.send({ success: true, msg: 'account added successfully' })
// })
// menuRoutes.put('/menu/Ration/:id', (req, res) => {
//   var menuData = getMenuData()
//   fs.readFile(dataPath, 'utf8', (err, data) => {
//     const RationId = req.params['id'];
//     menuData[RationId] = req.body;
//     saveAccountData(menuData);
//     res.send(`accounts with id ${RationId} has been updated`)
//   }, true);
// });
// menuRoutes.delete('/menu/delete/:id', (req, res) => {
//   fs.readFile(dataPath, 'utf8', (err, data) => {
//     var existAccounts = getAccountData()
//     const userId = req.params['id'];
//     delete existAccounts[userId];
//     saveAccountData(existAccounts);
//     res.send(`accounts with id ${userId} has been deleted`)
//   }, true);
// })
