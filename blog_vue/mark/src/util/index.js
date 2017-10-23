import javascriptList from './javascriptList'
import htmltList from './htmlList'
import linuxList from './linuxList'


const pushIn = (arrTarget = [],arrIn = []) => {
  arrIn.forEach((e) => {
    arrTarget.push(e)
  })
  return arrTarget
}

export default pushIn(pushIn(pushIn([],javascriptList),htmltList),linuxList)
