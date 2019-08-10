var res='',previouscolor;
var keynum=document.getElementsByClassName('key-op');
var display=document.querySelector('#calculator-display input');
var keys=document.getElementsByClassName('key');
var operators=document.getElementsByClassName('operator')
function changeColor(event){
    previouscolor=event.target.style.backgroundColor;
    event.target.style.backgroundColor='#f0ae4c';
}
function resetColor(event){
    event.target.style.backgroundColor=previouscolor;
}
function addOperands(event){
    res+=event.target.innerText;
    display.value=res;
}
for(var i=0;i<keynum.length;i++)
{
    keynum[i].addEventListener('click',addOperands)
}
for(var i=0;i<keys.length;i++)
{
    keys[i].addEventListener('mousedown',changeColor);
    keys[i].addEventListener('mouseup',resetColor);
}
document.getElementById('clear').addEventListener('click',function(){
    display.value='';
    res='';
});
function sign(){
    res=eval(res+' * -1');
    display.value=res;
   // console.log(res); 
}
document.getElementById('addsign').addEventListener('click',sign);
function equals(){
    if(res.length==0)
    return;
    res=eval(res)+'';   
    display.value=res;
}
document.getElementById('equals').addEventListener('click',equals);
function addDot(){
    if(res[res.length-1]=='.'||
    res[res.length-1]=='%'||
    res[res.length-1]=='*'||
    res[res.length-1]=='-'|| 
    res[res.length-1]=='+'||
    res[res.length-1]=='/')
    return;
    else
    {
        var indexOfOperator=Math.max(res.lastIndexOf('%'),
        res.lastIndexOf('*'),
        res.lastIndexOf('-'),
        res.lastIndexOf('+'),
        res.lastIndexOf('/'));
        var indexOfDot=res.lastIndexOf('.');
        if(indexOfDot>indexOfOperator)
        return;
        res+='.';
        display.value=res;
    }
}
document.getElementById('dot').addEventListener('click',addDot);
function doOperations(event,keycode){
    if(res.length==0||res[res.length-1]=='%'||
       res[res.length-1]=='*'||
       res[res.length-1]=='-'|| 
       res[res.length-1]=='+'||
       res[res.length-1]=='/'||
       res[res.length-1]=='.'
    )
    return;
    if(keycode==undefined)
    res=res+event.target.innerText;
    else
    {
        if(keycode==107)
        res=res+'+';
        else if(keycode==109)
        res=res+'-';
        else
        if(keycode==111)
        res=res+'/';
        else if(keycode==106)
        res=res+'*';
        else if(keycode==53)
        res=res+'%';
    }
    display.value=res;
}
for(var i=0;i<operators.length;i++)
operators[i].addEventListener('click',doOperations);
function keyboardOperations(event){
    var x=event.code[6];
     //console.log(event.keyCode);
    if(x>=0&&x<=9)
    res=res+x;
    else
    if(event.keyCode==8)
     res=res.slice(0,res.length-1);
    else
    if(event.keyCode==13)
    {
        equals();
        return;
    }
    else
    if(event.keyCode==46)
    {
        display.value='';
        res='';
    }
    else
    if(event.keyCode==187)
    {
       equals();
       return;
    }
    else 
    if(event.keyCode==110)
    {
        addDot();
        return;
    }
    if(event.keyCode==107||
        event.keyCode==109||
        event.keyCode==111||
        event.keyCode==106
        )
    {
     doOperations(null,event.keyCode);   
     return;
    }
    display.value=res;
}
document.addEventListener('keyup',keyboardOperations);









