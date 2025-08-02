"use strict"

const snake =document.getElementById('snake');//蛇
const snakes=snake.getElementsByTagName('div');//全部
const food =document.getElementById('food'); //食物 
const score=document.getElementById('score');//分数
const level=document.getElementById('level');//等级
let level_num=1;
let contral={
    left:false,
    right:false,
    top:false,
    bottom:false
}
let snake_key;  //控制方向
let Keyactive=true;//控制按键
let snake_key_object={
    a:"d",
    s:"w",
    w:"s",
    d:"a"
}
const keyarrey=['a','s','w','d',' '];//按键检测

//禁止掉头，不能是相反的方向
document.addEventListener('keydown',function(e){ //控制方向
    e.preventDefault();
    if(Keyactive && keyarrey.includes(e.key)){
        if(snakes.length<2 ||snake_key_object[snake_key] !==e.key){
            snake_key=e.key;
            Keyactive=false;
        }
    }
        
});

let isgameover=false;
let timer_num=150; //控制速度 难度增加
setTimeout(function move(){ //分离运动 通过定时器来分离
const snakehead=snakes[0];//蛇头
let x=snakehead.offsetLeft;
let y=snakehead.offsetTop;
    if(snake_key=="a"){
        x-=10;
    }else if(snake_key=="d"){
        x+=10;
    }else if(snake_key=="s"){
        y+=10;
    }else if(snake_key=="w"){
        y-=10;
    }else if(snake.key==" "){
        
    }
    if(food.offsetTop == snakehead.offsetTop && food.offsetLeft == snakehead.offsetLeft){ 
        console.log("碰到了");
        //改变食物位置  坐标  0--290 必须是整10倍数；  随机生成坐标
        changefood();
        //增加蛇长度
        snake.insertAdjacentHTML("beforeend","<div></div>");
        //在此需要加分
        score.innerHTML=parseInt(score.innerHTML)+1;
        if((parseInt(score.innerHTML)+1) % 10 ==0){ //判断是否到达10分
            level_num++;
            level.innerHTML=level_num;
            timer_num-=16;

            if(timer_num<150){
                timer_num=150;
            }//进行限速

            if(level_num>23){//二十三级为最终成绩等级
                alert(`恭喜你，游戏结束，你已获得最终成绩${parseInt(score.innerHTML)}分,等级23级`);
                alert("吃到身体了，游戏结束");
            isgameover=true;
            x=0;
            y=0;
            snake.innerHTML="<div></div>"; //清空蛇尾
            snake.key=" ";
            }
        }

    }
    if(x<0 || x>290 || y<0 || y>290){
        alert("撞墙了，游戏结束");
        isgameover=true;
        x=0;
        y=0;
        snake.innerHTML="<div></div>"; //清空蛇尾
        snake.key=" ";
        
    }

    for(let i=0;i<snakes.length-1;i++){
        if(i>1&&snakes[i].offsetLeft == x && snakes[i].offsetTop == y){
            alert("吃到身体了，游戏结束");
            isgameover=true;
        x=0;
        y=0;
        snake.innerHTML="<div></div>"; //清空蛇尾
        snake.key=" ";
        
        }
        
    }

    const tail=snakes[snakes.length-1];
    tail.style.left=x+'px';
    tail.style.top=y+'px';

    snake.insertAdjacentElement("afterbegin",tail);//蛇头变身蛇尾，同时改html结构
    for(let i=0;i<snakes.length;i++){
        snakes[i].classList.remove("head_imgleft","head_imgright","head_imgdown","head_imgup");
    }
    if(snake_key == "a"){
        tail.classList.add("head_imgleft");
    }else if(snake_key == "d"){
        tail.classList.add("head_imgright");
    }else if(snake_key == "s"){
        tail.classList.add("head_imgdown");
    }else if(snake_key == "w"){
        tail.classList.add("head_imgup");
    }

    Keyactive=true; //控制按键BUG功能flag
    !isgameover && setTimeout(move, timer_num);//解决阻塞问题和时长问题
    
    
}, timer_num);


function changefood(){//吃到食物时，食物需要改变位置
    food.style.top=Math.floor(Math.random()*29)*10+'px';
    food.style.left=Math.floor(Math.random()*29)*10+'px';
    console.log(food.style.top,food.style.left);
}   



//老代码
// setInterval(() => {
//     if(contral.left){
//         snakehead.style.left=snakehead.offsetLeft-10+'px';
//     }else if(contral.right){
//         snakehead.style.left=snakehead.offsetLeft+10+'px';
//     }else if(contral.bottom){
//         snakehead.style.top=snakehead.offsetTop+10+'px';
//     }else if(contral.top){
//         snakehead.style.top=snakehead.offsetTop-10+'px';
//     }
// }, 500);


// document.addEventListener('keydown',function(e){ 
//     console.log(e.key);
//     switch(e.key){
//         case 'a':
//         contral.left=true;
//         contral.top=false;
//         contral.right=false;
//         contral.bottom=false;
//             break;
//         case 'w':
//             contral.left=false;
//             contral.top=true;
//             contral.right=false;
//             contral.bottom=false;
//             break;
//         case 'd':
//             contral.left=false;
//             contral.top=false;
//             contral.right=true;
//             contral.bottom=false;
//             break;
//         case 's':
//             contral.left=false;
//             contral.top=false;
//             contral.right=false;
//             contral.bottom=true;
//             break; 
//     }
// })