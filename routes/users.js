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



export const getAllUsers = (req, res) => {
  const allUsers = getQueueData()
  console.log(allUsers)
  res.send(allUsers)
}

export const getUsersByStatus = (req, res) => {
  const usersbyname = getQueueData().filter(item => item.queue === req.params.status) || 
  getQueueData().filter(item => item.name == req.params.name) || 
  getQueueData().filter(item => item.GroupSeqNo == req.params.GroupSeqNo)
  //const userStatus = getQueueData()[req.params.status]
  console.log(usersbyname)
  console.log(req.params.status)
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

  const allGroups = getQueueData()//["AwaitSit"]
  const dataGroup = req.body
  allGroups.AwaitSit.push(dataGroup)
  saveQueueData(allGroups);
  const users = Sortedusers()
  // addGroup.splice(0, length(addGroup.AwaitSit), users)
  allGroups.AwaitSit = users
  saveQueueData(allGroups)
  
  res.send({ success: true, msg: `${dataGroup} adding to queue` })
}


export const editGroup= (req, res) => {
  console.log("SitByPriority")
  let afterediting = Queue()
  res.send(afterediting)
    // const editingDataGroup = getQueueData()
    // const RationId = req.params['GroupSeqNo']['queue'];
    // console.log(RationId)
    // editingDataGroup[RationId] = req.body;
    // saveQueueData(editingDataGroup);
    // res.send(`accounts with id ${RationId} has been updated`)

};


export const deleteGroup = (req, res) => {
    const groupTodelet = getQueueData().AwaitBill.filter(item => item.GroupSeqNo !== req.params.GroupSeqNo)
    const usersQueue = getQueueData()
    const GroupSeqNo = req.params['GroupSeqNo'];
    console.log(GroupSeqNo)
    usersQueue.queue = groupTodelet
    saveQueueData(usersQueue);
    res.send(`the gruop ${GroupSeqNo} is deletd`)
}
