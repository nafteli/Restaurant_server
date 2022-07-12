import { writeFileSync, readFileSync, readFile } from 'fs';
import { getallmenu, getByName } from './../routes/Routesmenu.js'
import { getAllTabals, getTabelBystatus } from './../routes/RoutTabales.js'
import {
  getAllUsers,
  getUsersByStatus,
  createGroup,
  deleteGroup,
  editGroup
} from './../routes/users.js'

const saveTabelData = (data) => {
  const stringifyData = JSON.stringify(data)
  writeFileSync(process.cwd() + '/Details/tabela.json', stringifyData)
}

const getTabelData = () => {
  const jsonData = readFileSync(process.cwd() + '/Details/tabela.json')
  return JSON.parse(jsonData)
}

const saveQueueData = (data) => {
  const stringifyData = JSON.stringify(data)
  writeFileSync(process.cwd() + '/Details/queue.json', stringifyData)
}

const getQueueData = () => {
  const jsonData = readFileSync(process.cwd() + '/Details/queue.json')
  return JSON.parse(jsonData)
}

export const Sortedusers = () => {
  const users = getQueueData()
  const sorted = users.sort((a, b) => b.size - a.size);
  console.log("sorted:", sorted)
  saveQueueData(sorted)
  // return sorted
}

export const addDishesToTabele = (req, res) => {
  const alldata = getQueueData()
  const userdata = getQueueData().find(item => item.GroupSeqNo == req.params.GroupSeqNo)
  const index = alldata.findIndex(object => {return object.GroupSeqNo == req.params.GroupSeqNo})
  // console.log("req.params.GroupSeqNo:", req.params.GroupSeqNo)
  // console.log(index)
  // console.log("userdata:", userdata)
  if (userdata.table != null && userdata.queue === "sitting") {
    userdata.dishs = req.body
    alldata.splice(index, 1, userdata)
    // console.log(item)
    saveQueueData(alldata)
    res.send(`the dish's adding to table: ${userdata.table}`)
  }
  else {
  res.status(403)
  // alldata.push(userdata)
  //console.log(alldata)
  }
}

export const goToPay = () => {

}

// const SortedQueue = () => {
//   const tabalsToSort = getTabelData()
//   const sorted = tabalsToSort.sort((a, b) => a.capacity - b.capacity)
//   saveTabelData(sorted)
//   // return sorted
// }

// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// function Filehandling() {
//   let tabalshandling = getTabelData()
//   let usershandling = getQueueData()
//   const tabeltosave = tabalshandling["null"].find(item => item.GroupSeqNum != null)
//   const queuetosave = usershandling["AwaitSit"].find(item => item.table != null)
//   tabalshandling.Catch.push(tabeltosave)
//   saveTabelData(tabalshandling)
//   sleep(2000)
//   usershandling.AwaitService.push(queuetosave)
//   saveQueueData(usershandling)
//   sleep(2000)
//   console.log("push")
//   usershandling.AwaitSit.pop(queuetosave)
//   saveQueueData(usershandling)
//   sleep(2000)
//   tabalshandling.null.pop(tabeltosave)
//   saveTabelData(tabalshandling)
//   sleep(2000)
//   console.log("pop")
// }

export const Queue = () => {
  const queueusers = getQueueData()
  const tabelstosave = getTabelData()
  if (tabelstosave.length == 0) {
    return "No place to sit for any group"
  }
  for (let indexQueue of queueusers) {
    for (let indextabels of tabelstosave) {
      if (indextabels.GroupSeqNum == null && indextabels.capacity >= indexQueue.size && indexQueue.queue === "AwaittSit") {
        // console.log("indexQueue:", indexQueue,
        //   "indextabels", indextabels,
        //   "null", indextabels.GroupSeqNum,
        //   "indextabels.capacity", indextabels.capacity,
        //   "indexQueue.size", indexQueue.size, indextabels.capacity >= indexQueue.size)
        indextabels.GroupSeqNum = indexQueue.GroupSeqNo
        console.log(indextabels.GroupSeqNum)
        indexQueue.table = indextabels.table
        indexQueue.queue = "sitting"
        indexQueue.dishs = {}
        //console.log(indexQueue.table)
        saveTabelData(tabelstosave)
        saveQueueData(queueusers)
        // break
        // return "im finish"
      }
    }
  }
}