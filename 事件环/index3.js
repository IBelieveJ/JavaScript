


const oBtn = document.getElementById('btn')
// 宏任务中，事件处理函数 -> 回调
/**
 * 执行栈
 * script
 * 1
 * 2
 * m1
 * m2
 * 宏任务   addEvent 
 *            addEvent cb 
 *          addEvent
 *            addEvent cb
 * 微任务   m1Promise
 *            m1Promise.then cb
 *          m2Promise
 *            m2Promise.then cb
 */
oBtn.addEventListener('click', () => {
    console.log(1);
    Promise.resolve('m1').then((str) => {
        console.log(str);
    })
},false)
oBtn.addEventListener('click', () => {
    console.log(2);
    Promise.resolve('m2').then((str) => {
        console.log(str);
    })
},false)

oBtn.click()

/**
 * 执行栈
 * script
 * m1
 * m2
 * 1
 * 2
 * 宏任务  addEvent1
 *           addEvent1 cb
 *         addEvent2
 *           addEvent2 cb
 *         setTimeout1
 *           setTimeout1 cb
 * 
 * 微任务  Promise1
 *           Promise1.then cb
 *         Promise2
 *           Promise2.then cb
 */

oBtn.addEventListener('click', () => {
    setTimeout(() => {
        console.log(1);
    }, 0);
    Promise.resolve('m1').then((str) => {
        console.log(str);
    })
},false)
oBtn.addEventListener('click', () => {
    setTimeout(() => {
        console.log(2);
    }, 0);
    Promise.resolve('m2').then((str) => {
        console.log(str);
    })
},false)

oBtn.click()

// -------------------
/**
 * 执行栈
 * script
 * start
 * promise 1
 * promise 2
 * setInterval
 * setTimeout 1
 * promise 3
 * promise 4
 * setInterval
 * setTimeout2
 * promise5
 * promise 6
 * 
 * 宏任务  interval1      x   setTimeout1    x  setTimeout2     x  interval1
 *           interval1 cb x   setTimeout1 cb x   setTimeout2 cb x    interval1 cb
 * 微任务  Promise1           x  Promise2             x  Promise3      x Promise4      x Promise5      x  Promise6      x Promise7     x Promise8    x
 *           Promise1.then cb x    Promise2.then cb x    Promise3 cb x   Promise4 cb x   Promise5 cb x    Promise6 cb x  Promise7 cb x  Promise8cb x
 */

console.log('start');
// interval1
const interval = setInterval(() => {
    console.log('setInterval');
},0)
// setTimeout1
setTimeout(() => {
   console.log('setTimeout 1'); 

   Promise.resolve()
        //    Promise3
        .then(() => {
            console.log('promise 3');
        })
        //    Promise4
        .then(() => {
            console.log('promise 4');
        })
        //    Promise5
        .then(() => {
            // setTimeout2
            setTimeout(() => {
               console.log('setTimeout2'); 
               Promise.resolve()
            //    Promise6
                 .then(() => {
                     console.log('promise5');
                 })
                //  Promise7
                 .then(() => {
                     console.log('promise 6');
                 })
                 //  Promise8
                 .then(() => {
                     clearInterval(interval)
                 })
            }, 0);
        })
}, 0);
Promise.resolve()
    // Promise1
    .then(() => {
        console.log('promise 1');
    })
    // Promise2
    .then(() => {
        console.log('promise 2');
    })

// -------------------
/**
 * 执行栈
 * 2
 * then1
 * then4
 * then2
 * then5
 * then
 * setTimeout1
 * then3
 * setTimeout2
 * setTimeout3
 * 
 * 宏任务  setTimeout      x setTimeout2      x  setTimeout3
 *           setTimeout cb x   setTimeout2 cb x    setTimeout3 cb
 * 微任务  Promise1      x Promise2     x  Promise3     x  Promise4      x
 *           Promise1 cb x  Promise2 cb x   Promise3 cb x    Promise4 cb x
 * 
 */

setTimeout(() => {
  console.log('setTimeout1');
//   setTimeout3
  setTimeout(() => {
      console.log('setTimeout3');
  }, 1000);
//   Promise4
  Promise.resolve().then(data => {
      console.log('then3');
  })
},1000);
// Promise1
Promise.resolve().then(data => {
    console.log('then1');
    console.log('then4');
    // Promise3
    Promise.resolve().then(data11 => console.log('then'))
})
// Promise2
Promise.resolve().then(data => {
    console.log('then2');
    console.log('then5');
    // setTimeout2
    setTimeout(() => {
        console.log('setTimeout2');
    }, 1000);
})
console.log(2);