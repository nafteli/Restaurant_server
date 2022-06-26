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
  const users = getQueueData()["AwaitSit"]
  const sorted = users.sort((a, b) => b.size - a.size);
  // saveQueueData(users)
  return sorted
}

const SortedQueue = () => {
  const tabalsToSort = getTabelData()["null"]
  const sorted = tabalsToSort.sort((a, b) => b.capacity - a.capacity)
  saveTabelData(sorted)
  // return sorted
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function Filehandling() {
  let tabalshandling = getTabelData()
  let usershandling = getQueueData()
  const tabeltosave = tabalshandling["null"].find(item => item.GroupSeqNum != null)
  const queuetosave = usershandling["AwaitSit"].find(item => item.table != null)
  tabalshandling.Catch.push(tabeltosave)
  saveTabelData(tabalshandling)
  sleep(2000)
  usershandling.AwaitService.push(queuetosave)
  saveQueueData(usershandling)
  sleep(2000)
  console.log("push")
  usershandling.AwaitSit.pop(queuetosave)
  saveQueueData(usershandling)
  sleep(2000)
  tabalshandling.null.pop(tabeltosave)
  saveTabelData(tabalshandling)
  sleep(2000)
  console.log("pop")
}

export const Queue = () => {
  const queueusers = getQueueData()
  const tabelstosave = getTabelData()
  // if (tabelstosave == ){
  //   return "No place to sit for any group"
  // }
  for (let indexQueue of queueusers){
    for (let indextabels of tabelstosave){
      if (indextabels.GroupSeqNum == null && indextabels.capacity >= indexQueue.size){
        console.log("indexQueue:", indexQueue, "indextabels", indextabels, "null", indextabels.GroupSeqNum, "indextabels.capacity", indextabels.capacity, "indexQueue.size", indexQueue.size, indextabels.capacity >= indexQueue.size)
        indextabels.GroupSeqNum = indexQueue.GroupSeqNo
        console.log(indextabels.GroupSeqNum )
        indexQueue.table = indextabels.table
        indexQueue.queue = "sitting"
        console.log(indexQueue.table)
        saveTabelData(tabelstosave)
        saveQueueData(queueusers)
        return "im finish"
      }
    }
  }
}

export const aQueue = () => {

  const queueusers = getQueueData()["AwaitSit"]//.filter(item => item.table == null)
  const queueuserstosave = getQueueData()
  console.log(queueusers)
  const tabels = getTabelData()["null"]//.filter(item => item.GroupSeqNum == null)
  const tabelstosave = getTabelData()

  console.log(tabels)
  
  
  let index = 0
  
  let indexQueue = queueusers.length-1
  let indextabels = tabels.length-1
  if (indextabels < 0){

    return "There are no tables available"
  }
  if(indexQueue < 0){
    return "The queue is empty Do not confuse the mind"
  }
  while (indexQueue >= 0 || indextabels >= 0) {
    index ++
    console.log("rotasin number: ", index)
    console.log("indexQueue:",indexQueue, "indextabels:",indextabels)
    if(indexQueue < 0){
      return "The queue is empty Do not confuse the mind"
    }
    if (indextabels < 0){
      
      return "There are no tables available"
    }
    
    
    
    console.log("tabels[indextabels].capacity:", tabels[indextabels].capacity, "queueusers[indexQueue].size:", queueusers[indexQueue].size)
    // if(tabels[indextabels] == undefined){ indextabels--}
    // if(queueusers[indexQueue] == undefined){indexQueue--}
    
    if (tabels[indextabels].capacity >= queueusers[indexQueue].size) {
      
      // console.log("tabels[indextabels]", tabels[indextabels])
      tabels[indextabels].GroupSeqNum = queueusers[indexQueue].GroupSeqNo
      // console.log("tabelstosave:",tabelstosave, "queueuserstosave:",queueuserstosave)
      sleep(2000)
      queueusers[indexQueue].table = tabels[indextabels].table
      // console.log("queueuserstosave:", queueuserstosave, "tabelstosave:", tabelstosave)
      sleep(2000)
      // tabelstosave.null.pop(tabelstosave.null[indexQueue])
      // sleep(2000)
      // tabelstosave.Catch.push(tabelstosave.null[indexQueue])
      // sleep(2000)
      // queueuserstosave.AwaitSit.pop(indextabels)
      // sleep(2000)
      // queueuserstosave.AwaitService.push(queueusers[indextabels])
      // sleep(2000)
      saveQueueData(queueusers)
      sleep(2000)
      saveTabelData(tabels)
      sleep(2000)
      Filehandling()
      sleep(2000)
      // console.log("queueusers[indextabels]:", queueusers[indexQueue])
      // indexQueue = queueusers.length-1
      // console.log(`i'm goneg beck to queue length: ${indexQueue}`)
      // indextabels--
      // indexQueue--
    // if (indexQueue <= 0 ){
    //   if (queueusers.length >= 0){
    //     indexQueue = queueusers.length-1
    //   }
    // }
  }

    // if (tabels[indextabels].capacity >= queueusers[indexQueue].size) {
    //     console.log(`tabels: ${indextabels}:`, tabels[indextabels])
    //     console.log(`queueusers: ${indexQueue}:`, queueusers[indexQueue])
    //     // indexQueue = queueusers.length-1
    //     indexQueue--
    //     // indextabels ++
      
    //   }
      else {
        indexQueue--
        console.log(`qeueu index its diminishing end new its: ${indexQueue}`)
        // indextabels--
        // console.log(`tabele index its diminishing end new its: ${indextabels}`)
        console.log("bla")
      }
      
    }
  }
  
  
  
    // queueusers.forEach(function(queue, index){
    //   var queueSize = queue.size
    //   // tabels.forEach(function(tabela, tabelIndex){
    //   for (const [tabele, tabelIndex] of tabels.entries()) {
    //     var tabeleSize = tabelIndex.capacity
    //     // console.log(queueSize)
    //     // console.log(tabeleSize)
  
    //     if(queueSize === tabeleSize){
    //       const tabelsBeforPop = getTabelData()
    //       let queueBeforPush = getQueueData()
  
    //       tabelsBeforPop.null[tabele].GroupSeqNum = queueBeforPush.AwaitSit[index].GroupSeqNo
    //       // queueBeforPush.AwaitSit[index-1].table = tabelsBeforPop.null[tabele].table
    //       let b = tabelsBeforPop.null[tabele].table
    //       let a = queueBeforPush.AwaitSit[index].table
  
    //       tabelsBeforPop.null.pop(tabelsBeforPop.null[tabele])
    //       tabelsBeforPop.Catch.push(tabelsBeforPop.null[tabele])
  
    //       queueBeforPush.AwaitSit.pop(index)
    //       queueBeforPush.AwaitService.push(queue)
  
    //       queueBeforPush.AwaitSit[index-1].table = tabelsBeforPop.null[tabele].table
    //       console.log("aaaaaaaaaaaaaa:",a)
    //       console.log(b)
    //       return res.send("test")
    //       // saveTabelData(tabelsBeforPop)
    //       //saveQueueData(queueBeforPush)
    //       // SortedQueue()
    //       break
    //     }
    //   }
    // });