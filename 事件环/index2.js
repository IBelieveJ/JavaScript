// console.log(1);
// setTimeout(()=>console.log(2));
// new Promise((resolve, reject)=>{
//     // Promise1
//     Promise.resolve(3).then((result)=>{
//         console.log(result);
//     });
//     resolve();
//     console.log(4);
// }).then((result)=>{
//   console.log(result);
// }, (error)=>{
//   console.log(error);
// });
// console.log(5);

/**
 * 执行栈
 *  
 * 宏任务         
 *   回调队列       
 * 微任务         
 *   回调队列       
 */
async function async1(){
    console.log('async1 start')
    // Promise1
    await async2()
    /**
     * async2().then((res) => {
     *   console.log('async2')
     *   console.log('async1 end')
     * })
     */
    console.log('async1 end')
}

async function async2(){
    console.log('async2')
}

console.log('script start')

setTimeout(function(){
    console.log('setTimeOut')
}, 0)

async1()

new Promise(function(resolve){
    console.log('promise1') 
    resolve()
}).then(function(){
    console.log('promise2') 
})

console.log('script end')
