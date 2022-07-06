import console, { table } from 'console';
import { writeFileSync, readFileSync, readFile } from 'fs';
import {Sortedusers, Queue} from '../user_Management/user_Management.js'


const saveQueueData = (data) => {
  const stringifyData = JSON.stringify(data)
  writeFileSync(process.cwd() + '/Details/queue.json', stringifyData)
}

const getQueueData = () => {
  const jsonData = readFileSync(process.cwd() + '/Details/queue.json')
  return JSON.parse(jsonData)
}

const getTabelData = () => {
  const jsonData = readFileSync(process.cwd() + '/Details/tabela.json')
  return JSON.parse(jsonData)
}



export const getAllUsers = (req, res) => {
  const allUsers = getQueueData()
  //console.log(allUsers)
  res.send(allUsers)
}

export const getUsersByStatus = (req, res) => {
  const usersbyname = getQueueData().filter(item => item.queue === req.params.status) || 
  getQueueData().filter(item => item.name == req.params.name) || 
  getQueueData().filter(item => item.GroupSeqNo == req.params.GroupSeqNo)
  //const userStatus = getQueueData()[req.params.status]
  //console.log(usersbyname)
  //console.log(req.params.status)
  res.send(usersbyname)
}
// export const getUsersByName = (req, res) =>{
//   const usersbyname = getQueueData()[req.params.status].find(item => item.GroupSeqNo == req.params.status.name)
//   console.log(usersbyname)
//   const userByName = usersbyname().status.find(item => item.name == req.params.name) || 
//   getQueueData().status.find(item => item.GroupSeqNo == req.params.name) || 
//   getQueueData().status.filter(item => item.queue == req.params.name)
//   res.send(usersbyname)

// }

export const createGroup = (req, res) => {

  const allGroups = getQueueData()
  const dataGroup = req.body
  dataGroup.queue = "AwaittSit"
  dataGroup.GroupSeqNo = new Date()
  console.log(dataGroup)
  dataGroup.table = null
  allGroups.push(dataGroup)
  saveQueueData(allGroups);
  Sortedusers()
  // addGroup.splice(0, length(addGroup.AwaitSit), users)
  // allGroups = users
  console.log("allGroups:",allGroups)
  // saveQueueData(allGroups)
  
  res.send({ success: true, msg: `${dataGroup} adding to queue` })
  res.status(200)
}


export const editGroup = (req, res) => {
  console.log("SitByPriority")
  let afterediting = Queue()
  res.send(afterediting)
  res.status(200)
    // const editingDataGroup = getQueueData()
    // const RationId = req.params['GroupSeqNo']['queue'];
    // console.log(RationId)
    // editingDataGroup[RationId] = req.body;
    // saveQueueData(editingDataGroup);
    // res.send(`accounts with id ${RationId} has been updated`)

};

export const goToPay = (req, res) => {
  const GroupTopay = getQueueData().find(item => item.GroupSeqNo == req.body.GroupSeqNo)
  GroupTopay.dishs
}

export const editOneGroup = (req, res) => {
  const GroupToSite = getQueueData().find(item => item.GroupSeqNo == req.body.GroupSeqNo)
  for (tableToSit of getTabelData()) {
    if (tableToSit.table == null && tableToSit.capacity == GroupToSite.size){
      tableToSit.GroupSeqNum = GroupToSite.GroupSeqNo
      GroupToSite.table = tableToSit.table
      GroupToSite.queue = "sitting"
      const data = getQueueData().push(GroupToSite)

    }
  }
  // GroupToSite.size
  
}


export const deleteGroup = (req, res) => {
    const groupTodelet = getQueueData().filter(item => item.GroupSeqNo !== req.params.GroupSeqNo)
    const usersQueue = getQueueData()
    const GroupSeqNo = req.params.GroupSeqNo;
    console.log(GroupSeqNo)
    // usersQueue.queue = groupTodelet
    console.log(groupTodelet)
    saveQueueData(groupTodelet);
    res.status(400)
    res.send(`the gruop ${GroupSeqNo} is deletd`)
}
