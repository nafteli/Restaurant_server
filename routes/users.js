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

const getMenuData = () => {
  const jsonData = readFileSync(process.cwd() + '/Details/menu.json')
  
  return JSON.parse(jsonData)
}



export const getAllUsers = (req, res) => {
  const allUsers = getQueueData()
  //console.log(allUsers)
  res.send(allUsers)
}

export const getUsersByStatus = (req, res) => {
  const usersbyname =getQueueData().find(item => item.GroupSeqNo == req.params.status) 
  || getQueueData().find(item => item.name === req.params.status) 
  || getQueueData().filter(item => item.queue === req.params.status)
  const userStatus = getQueueData()[1].GroupSeqNo
  console.log(userStatus)
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

  const allGroups = getQueueData()
  const dataGroup = req.body
  dataGroup.queue = "AwaittSit"
  // const date = new Date()
  // console.log(date)
  dataGroup.GroupSeqNo = new Date().getTime()
  dataGroup.arrivalTime = new Date().toLocaleString()
  console.log(dataGroup)
  dataGroup.table = null
  allGroups.push(dataGroup)
  saveQueueData(allGroups);
  Sortedusers()
  // addGroup.splice(0, length(addGroup.AwaitSit), users)
  // allGroups = users
  //console.log("allGroups:",allGroups)
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
  const GroupToPay = getQueueData().find(item => item.GroupSeqNo == req.params.GroupSeqNo)
  const menuData = getMenuData()
  let total = 0
  // console.log("req.body.GroupSeqNo:", req.params.GroupSeqNo)
  // console.log(Object.keys(GroupToPay.dishs))
  // console.log(Object.values(GroupToPay.dishs))
  // console.log(menuData[0].price)
  total = menuData[0].price*Object.values(GroupToPay.dishs)[0]
  console.log(total)
  for(let i in menuData){
    let pay = menuData[i].price*Object.values(GroupToPay.dishs)[i]
    console.log(pay)
    total = total + pay
    console.log(total)
  }
  res.send({ success: true, msg: `the total pay is: ${total}`})
  res.status(200)
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
    const groupTodele = getQueueData().filter(item => item.GroupSeqNo != req.params.GroupSeqNo)
    // const gropToDelet = getQueueData().find(item => item.GroupSeqNo == req.params.GroupSeqNo)
    // if (gropToDelet.table != null && gropToDelet.dishs == undefined){
    //   saveQueueData(groupTodele)
    //   res.send(`the gruop ${req.params.GroupSeqNo} is deletd`)
    // }
    // else if(gropToDelet.table != null && gropToDelet.dishs != {}){res.status(400)}
    // else if(gropToDelet.table != null && gropToDelet.dishs == {}){
    //   saveQueueData(groupTodele)
    //   res.send(`the gruop ${req.params.GroupSeqNo} is deletd`)
    // }
    // console.log(groupTodele)
    saveQueueData(groupTodele)
    res.send(`the gruop ${req.params.GroupSeqNo} is deletd`)
}
