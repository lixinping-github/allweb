"use strict"
let a,b ,rest;

({a, b=100, ...rest} = {a: 10,  c: 30, d: 40}); //属性a赋值给变量a，属性b赋值给变量b，其余的保存到rest中
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}


