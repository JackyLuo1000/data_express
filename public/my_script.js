var Q1A1 = mufasa;
var Q1A2 = simba;
var Q1A3 = scar;
var Q1A4 = nala;
var Q2A1 = leo;
var Q2A2 = van;
var Q2A3 = frida;
var Q2A4 = claude;
var Q3A1 = luigi;
var Q3A2 = wario;
var Q3A3 = jumpman;
var Q3A4 = hiro;
var scaler = 28;
var barWidth = 30;
var startX = 100;
var startY = 150;
var c = document.getElementById('my_canvas');
var ctx = c.getContext('2d');
var cWidth = c.height;
var cHeight = 338;
var header = "Answers to Questions in % "

ctx.font="18px Arial";
ctx.fillText(header, 210, 15);
ctx.fillText("(Question and Answer Number)", 210, 370);
ctx.fillText("Q1", startX + barWidth*1.5, cHeight);
ctx.fillText("Q2", startX + barWidth*6.5, cHeight);
ctx.fillText("Q3", startX + barWidth*11.5, cHeight);
ctx.fillText("10", startX - barWidth, cHeight - barWidth);
ctx.fillText("20", startX - barWidth, cHeight - barWidth*2);
ctx.fillText("30", startX - barWidth, cHeight - barWidth*3);
ctx.fillText("40", startX - barWidth, cHeight - barWidth*4);
ctx.fillText("50", startX - barWidth, cHeight - barWidth*5);
ctx.fillText("60", startX - barWidth, cHeight - barWidth*6);
ctx.fillText("70", startX - barWidth, cHeight - barWidth*7);
ctx.fillText("80", startX - barWidth, cHeight - barWidth*8);
ctx.fillText("90", startX - barWidth, cHeight - barWidth*9);
ctx.fillText("100", startX - barWidth - 5, cHeight - barWidth*10);
ctx.font="14px arial";
ctx.fillText("(Percent", 5, cHeight/2);
ctx.fillText("Guessed)", 5, cHeight/2+20);


function drawAnswers(x, y, w, h, color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}
//Question 1
ctx.font='16px arial';
drawAnswers(startX, cHeight - barWidth, barWidth, ((-Q1A1 * scaler)/q1total)*10, '#ff7936');
ctx.fillText("A1", startX, cHeight - barWidth/2);
drawAnswers(startX + barWidth, cHeight - barWidth, barWidth, ((-Q1A2 * scaler)/q1total)*10, '#00B2A5');
ctx.fillText("A2", startX + barWidth, cHeight - barWidth/2);
drawAnswers(startX + (barWidth*2), cHeight - barWidth, barWidth, ((-Q1A3 * scaler) / q1total)*10, '#ff7936');
ctx.fillText("A3", startX + barWidth*2, cHeight - barWidth/2);
drawAnswers(startX + (barWidth*3), cHeight - barWidth, barWidth, ((-Q1A4 * scaler)/q1total)*10, '#00B2A5');
ctx.fillText("A4", startX + barWidth*3, cHeight - barWidth/2);

//Question 2
drawAnswers(startX + barWidth*5, cHeight - barWidth, barWidth, ((-Q2A1 * scaler)/q2total)*10, '#ff7936');
ctx.fillText("A1", startX + barWidth*5, cHeight - barWidth/2);
drawAnswers(startX + barWidth*6, cHeight - barWidth, barWidth, ((-Q2A2 * scaler)/q2total)*10, '#00B2A5');
ctx.fillText("A2", startX + barWidth*6, cHeight - barWidth/2);
drawAnswers(startX + (barWidth*7), cHeight - barWidth, barWidth, ((-Q2A3 * scaler) / q2total)*10, '#ff7936');
ctx.fillText("A3", startX + barWidth*7, cHeight - barWidth/2);
drawAnswers(startX + (barWidth*8), cHeight - barWidth, barWidth, ((-Q2A4 * scaler)/q2total)*10, '#00B2A5');
ctx.fillText("A4", startX + barWidth*8, cHeight - barWidth/2);

//Question 3
drawAnswers(startX + barWidth*10, cHeight - barWidth, barWidth, ((-Q3A1 * scaler)/q3total)*10, '#ff7936');
ctx.fillText("A1", startX + barWidth*10, cHeight - barWidth/2);
drawAnswers(startX + barWidth*11, cHeight - barWidth, barWidth, ((-Q3A2 * scaler)/q3total)*10, '#00B2A5');
ctx.fillText("A2", startX + barWidth*11, cHeight - barWidth/2);
drawAnswers(startX + (barWidth*12), cHeight - barWidth, barWidth, ((-Q3A3 * scaler) / q3total)*10, '#ff7936');
ctx.fillText("A3", startX + barWidth*12, cHeight - barWidth/2);
drawAnswers(startX + (barWidth*13), cHeight - barWidth, barWidth, ((-Q3A4 * scaler) / q3total)*10, '#00B2A5');
ctx.fillText("A4", startX + barWidth*13, cHeight - barWidth/2);

