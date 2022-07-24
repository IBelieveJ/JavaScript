/**
 * 同步代码：bgColor: orange -> 没渲染
 *                   console.log(1);
 *                   console.log(4);
 * 宏任务队列：setTimeout cb
 *            bgColor: green -> 没渲染
 * 
 * 微任务队列：Promise.then cb
 *            bgColor: purple -> 渲染
 */
document.body.style.backgroundColor = 'orange'
console.log(1);

setTimeout(() => {
    document.body.style.backgroundColor = 'green'
    console.log(2);
}, 300);

Promise.resolve(3).then(num => {
    document.body.style.backgroundColor = 'purple'
    console.log(num);
})
console.log(4);

/**
 * 执行栈
 * promise1.then cb   -> p1
 * setTimeout1 cb     -> s1
 * promise2.then cb  -> p2
 * setTimeout2 cb    -> s2
 * 宏任务           setTimeout1 x    setTimeout2
 *   回调队列  ->   setTimeout1 cb x  setTimeout2 cb
 * 
 * 微任务           promise1 x        promise2
 *   回调队列  ->   promise1.then cb x  promise2 cb
 * 
 */
Promise.resolve().then(() => {
    console.log('p1');

    setTimeout(() => {
        console.log('s2');
    }, 100);
})

setTimeout(() => {
   console.log('s1');   
   Promise.resolve().then(() => {
       console.log('p2');
   })
});

// -------------------

// Promise.resolve().then(() => {
//     console.log('p1');

//     setTimeout(() => {
//         console.log('s2-1');
//     }, 0);

//     setTimeout(() => {
//         console.log('s2-2');
//     }, 0);
// })

// setTimeout(() => {
//    console.log('s1');   
//    Promise.resolve().then(() => {
//        console.log('p2');
//    })
// });

// -------------------
/**
 * 执行栈
 *  1
 *  3
 *  4
 *  Promise1 cb -> 3
 * 
 * 宏任务  setTimeout
 *    回调队列：setTimeout cb 
 * 微任务  Promise1
 *    回调队列：Promise1 cb    
 */

// console.log(1);
// setTimeout(() => {
//     console.log(2);
// }, 10);
// // Promise(exexutor)  执行器 同步代码
// new Promise(function(resolve,reject){
//     console.log(3);
//     resolve('')
//     console.log(4);
// }).then(res => {
//     console.log(5);
// })
// console.log(6);

// -------------------
/**
 * 执行栈
 *  3
 *  1
 *  2
 *  5
 *  6
 *  7
 *  4
 * 宏任务   
 *    回调队列：  
 * 微任务         awaitPromise1 
 *    回调队列：  awaitPromise1 cb   
 */
let res = function(){
    console.log(1);
    return new Promise((resolve,reject) => {
        console.log(2);
        resolve(4)
    })
}

new Promise(async (resolve,reject) => {
    console.log(3);
    let test = await res()
    /**
     * await res()
     * 
     * new Promise((resolve,reject) => {
            console.log(2);
            resolve(4)
       }).then((res) => {
            console.log(res);
       })
     */
    console.log(test);
})

console.log(5);

new Promise((resolve,reject) => {
    console.log(6);
})

console.log(7);

// -------------------
/**
 * 执行栈
 *  1
 *  3
 *  4
 *  undefined
 *  2
 *  6
 *  5
 * 
 * 宏任务        setTimeout1      x  setTimeout2      x
 *   回调队列      setTimeout1 cb x   setTimeout2 cb  x
 * 微任务
 *   回调队列    Promise1       x  Promise2      x  Promise3      x  Promise4      x 
 *                 Promise1 cb  x   Promise2 cb  x   Promise3 cb  x    Promise4 cb x  
 */

console.log(1);
	setTimeout(()=>{
	    console.log(2);
	    Promise.resolve().then(()=>{
	        console.log(6);
	    });
	}, 0);
	  
	Promise.resolve(3).then((data)=>{
	    console.log(data);  
	    return data + 1;
	}).then((data)=>{
	    console.log(data)	
	    setTimeout(()=>{
	        console.log(data+1)	
	        return data + 1;
	    }, 1000)
	}).then((data)=>{
	    console.log(data);
	});


// -------------------
/**
 * 执行栈
 *  1
 *  4
 *  5
 *  3
 *  undefined
 *  2
 * 宏任务      setTimeout1      x
 *   回调队列    setTimeout1 cb x
 * 微任务      Promise1       x  Promise2    x 
 *   回调队列    Promise1 cb  x  Promise2 cb x
 */

console.log(1);
setTimeout(()=>console.log(2));
new Promise((resolve, reject)=>{
    // Promise1
    Promise.resolve(3).then((result)=>{
        console.log(result);
    });
    resolve();
    console.log(4);
}).then((result)=>{
  console.log(result);
}, (error)=>{
  console.log(error);
});
console.log(5);

