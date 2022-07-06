import { Router } from "express";
const router = Router();
import { writeFileSync, readFileSync, readFile } from 'fs';


const saveTabelData = (data) => {
  const stringifyData = JSON.stringify(data)
  writeFileSync(process.cwd() + '/Details/tabela.json', stringifyData)
}

const getTabelData = () => {
  const jsonData = readFileSync(process.cwd() + '/Details/tabela.json')
  return JSON.parse(jsonData)
}

export const getAllTabals = (req, res) => {
  const allTabals = getTabelData()
  res.send(allTabals)
}

export const getTabelBystatus = (req, res) => {
  // const menubyid = getMenuData().dishes[req.params.id]
  const tabelBystatus = getTabelData().find(item => item.GroupSeqNum == req.params.GroupSeqNum)// ||
  console.log(tabelBystatus)
  res.send(tabelBystatus)
}

// post('/tabel/add', (req, res) => {

//   var addTabel = getTabelData()
//   console.log(addRoutes);
//   saveTabelData(addTabel);
//   res.send({ success: true, msg: 'account added successfully' })
// })
// export const aditTabel= (req, res) => {
//   var menuData = saveTabelData()
//   readFile(dataPath, 'utf8', (err, data) => {
//     const RationId = req.params['id'];
//     menuData[RationId] = req.body;
//     saveTabelData(menuData);
//     res.send(`accounts with id ${RationId} has been updated`)
//   }, true);
// };
// menuRoutes.delete('/menu/delete/:id', (req, res) => {
//   readFile(dataPath, 'utf8', (err, data) => {
//     var existAccounts = getAccountData()
//     const userId = req.params['id'];
//     delete existAccounts[userId];
//     saveTabelData(existAccounts);
//     res.send(`accounts with id ${userId} has been deleted`)
//   }, true);
// })
