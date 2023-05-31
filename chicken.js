/*
e ~ spawn egg
click ~ pick up chicken
click + ctrl ~ control chicken
arrow keys to move chicken
f ~ change time speed

*/

const STARTING_CHICKENS = 0, CHILDHOOD = 255, DEATHAGE = 1000, GONEAGE = 500, PREGNANCYDURATION = 500, HATCHTIME = 100, FERTILITYRATE = 15, ENDURANCE_MIN = 50, ENDURANCE_MAX = 100, CHICKENWIRE = 0.05;
var AGINGSPEED = 10;
const CX = 500,
	CY = 500;
p5.disableFriendlyErrors = true;
const cool_words = ["luǒ", "huà", "bǐng", "xiào", "dà", "bào", "tiào", "tiàn", "kǒng", "fèng", "fǒng", "nǐng", "pǐng", "lǒ", "fèi", "chàng", "mào", "duǒ", "xǐong", "gè", "gúo", "buǒ", "xiè", "pàng", "duàn", "lǐng", "huǒ", "suè", "fàng", "miàn", "yǒng", "gǒng", "qǐng", "wà", "kú", "frǒg", "yǐ", "èr", "sàn", "sǐ", "wu", "lǐu", "qǐ", "bà", "jǐu", "shǐ"];

function setup() {
	lake = [random(CX * 0.25, CX * 0.75), random(CY * 0.25, CY * 0.75)];
	createCanvas(CX, CY);
	// background(100);
	frameRate(60);
	noCursor();
	m = {};
	param = {
		names: 0,
		control: null,
	};
	eggs = [];
	food = 0;
	m.full = null;
	c = [];
	sawblade = [];
	foodbin = {
		x:200,
		y:200
	};
	day = 0;
	for (var j = 0; j < STARTING_CHICKENS; j++) {
		newc(random(CX * 0.25, CX * 0.75), random(CY * 0.25, CY * 0.75), 0);
	}
	addblade(400, CY - 50, 20);
}

function draw() {


	m.x = mouseX;
	m.y = mouseY;
	clear();
	background("#9b7653");
	push();
	fill("rgba(0,100,255,0.5)");
	ellipse(lake[0], lake[1], 80, 30);
	pop();
	push();
	textSize(10);
	fill(255);
	text(Math.floor(frameRate()), 25, 50);
	text("day: " + day, 25, 60);
	text(AGINGSPEED, 25, 70);
	pop();
	stroke("rgba(0,0,0,0)");
	push();
	fill(200);
	for (var n = 0; n < CY; n++) {
		circle(15 * Math.sin(0.5 * n), n, 2);
	}
	for (var p = 0; p < CX; p++) {
		circle(p, 15 * Math.sin(0.5 * p), 2);
	}
	for (var q = 0; q < CY; q++) {
		circle(15 * Math.sin(0.5 * q) + CX, q, 2);
	}
	pop();
	chicktick();
	for (var s = 0; s < eggs.length; s++) {

		push();
		fill(255);
		textSize(10);
		text(HATCHTIME - eggs[s].eggtime, eggs[s].x - 7, eggs[s].y - 7);
		circle(eggs[s].x, eggs[s].y, 5);
		eggs[s].eggtime++;
		if (eggs[s].eggtime > HATCHTIME) {
			newc(eggs[s].x, eggs[s].y, 0);
			eggs.splice(s, 1);
			continue;
		}
		pop();
	}

	for (var v = 0; v < sawblade.length; v++) {
		var x = sawblade[v].x;
		var y = sawblade[v].y;
		var w = sawblade[v].w;
		var h = (w * Math.sin(45));
		push();

		translate(x, y);
		rotate(frameCount * 10);
		// translate(w/2,h/2);
		// translate(x,y);
		triangle(0 - (w / 2), 0 + (h / 2), 0, 0 - (h / 2), 0 + (w / 2), 0 + (h / 2));

		pop();
	}
	drawhouse();
push();
fill(225,225,0);
textSize(25);
	text(food,25,37);
pop();
	push();
	fill("rgba(0,0,0,0.25)");
	triangle(m.x - 5, m.y + 5, m.x + 15, m.y + 15, m.x + 5, m.y + 25);
	fill(255);
	triangle(m.x, m.y, m.x + 20, m.y + 10, m.x + 10, m.y + 20);

	pop();
}

function chicktick() {
	push();
	if (frameCount % AGINGSPEED == 0) {
		day++;
	}


	for (var i = 0; i < c.length; i++) {

		b = c[i];
		// console.log(sawblade.length);
		for (var v = 0; v < sawblade.length; v++) {
			var x = sawblade[v].x;
			var y = sawblade[v].y;
			var w = sawblade[v].w;
			var h = (w * Math.sin(45));
			// console.log("frog");
			if (b.x > (x - (w / 2)) && b.x < (x + (w / 2)) && b.y > y - (h / 2) && b.y < y + (h / 2)) {
				c[i].live = false;
			}
		}

		if (b.x < 0 || b.x > CX - 0 || b.y < 0 || b.y > CY - 0) {
			for (var t = 0; t < c.length; t++) {
				c[t].sextarget = [];
			}
			c.splice(i, 1);
			continue;
		}

		if (frameCount % AGINGSPEED == 0) {
			b.age++;

		}

		if (b.age < CHILDHOOD) {
			b.color = "rgb(255,255," + b.age + ")";

			b.size = 5 + (5 * (b.age / CHILDHOOD));
		} else {
			b.color = DEATHAGE - b.age;
			if (DEATHAGE - b.age < 1) {
				b.live = false;
			}
		}
		if (b.x < 20 || b.x > CX - 20 || b.y < 20 || b.y > CY - 20) {
			push();
			fill("rgba(255,0,0,0.5)");
			circle(b.x + ran(-2, 2), b.y + ran(-2, 2), 20);
			pop();

		}
		if (b.live == false) {
			if (b.deathtimer == null) {
				b.deathtimer = 0;
			}
			b.deathtimer++;
			push();
			fill("rgba(255,0,0,0.5)");
			circle(b.x, b.y, b.deathtimer / GONEAGE * 20);
			pop();
			if (b.deathtimer > GONEAGE) {
				for (var u = 0; u < c.length; u++) {
					c[u].sextarget = [];
				}
				c.splice(i, 1);
				continue;
			}
		}
		if (b.x < 20) {
			b.x += CHICKENWIRE;
		}

		if (b.x > CX - 20) {
			b.x -= CHICKENWIRE;
		}
		if (b.y < 20) {
			b.y += CHICKENWIRE;
		}

		if (b.y > CY - 20) {
			b.y -= CHICKENWIRE;
		}

		if (m.d == false) {
			b.held = false;
			m.full = null;
		}

		if (b.held == true && m.d == true && (b.live == true || b.deathtimer < DEATHAGE - 20)) {
			b.x = m.x;
			b.y = m.y;
			push();
			fill("rgba(0,0,0,0.2)");
			circle(m.x - 15, m.y, b.size * 1.5);
			pop();
			push();
			textSize(10);
			fill(255);
			if (b.pregnant == true) {
				text("pregtime: " + b.pregtime, m.x - 10, m.y - 80);
			}
			text("alive: " + b.live, m.x - 10, m.y - 70);
			text("sex: " + b.sex, m.x - 10, m.y - 60);
			if (b.sex == "M" && b.sextarget.length != 0) {
				text("sextarget: " + c[b.sextarget[0]].name, m.x - 10, m.y - 50);
			} else {
				text("sextarget: " + b.sextarget, m.x - 10, m.y - 50);
			}
			text("mating: " + b.mating, m.x - 10, m.y - 40);
			text("pregnant: " + b.pregnant, m.x - 10, m.y - 30);
			text("age: " + b.age, m.x - 10, m.y - 20);
			text("name: " + b.name, m.x - 10, m.y - 10);
			pop();
			if (keyIsDown(17) == true) {
				param.control = i;
			}
		} else if (i != param.control && b.live == true && b.md < b.mvt && b.x > 20 && b.x < CX - 20 && b.y > 20 && b.y < CY - 20 && b.mating == false) {

			if (b.r == 1) {
				b.x += b.s * Math.cos(b.d);
				b.y += b.s * Math.sin(b.d);
			}
			c[i].md++;
		} else {
			if (ran(1, 100) < 75) {
				b.r = 0;
			} else {

				b.r = 1;
			}
			b.d = ran(0, 360);
			b.md = 0;
			b.mvt = ran(10, 50);
			if (i != param.control && b.mating == false && b.live == true) {
				b.x += b.s * Math.cos(b.d);
				b.y += b.s * Math.sin(b.d);
			}
			c[i].md++;
		}

		if (b.sex == "F" && b.pregnant == true) {
			if (b.pregtime == null) {
				b.pregtime = 0;
			}
			b.pregtime++;
			if (b.pregtime > PREGNANCYDURATION) {
				eggs.push({
					x: b.x,
					y: b.y,
					eggtime: 0
				});
				b.pregnant = false;
			}

		}
		if (b.sex == "M" && b.age >= CHILDHOOD) {
			push();
			fill("rgb(255,0,0)");
			triangle(b.x, b.y + 10, b.x + 5, b.y + 5, b.x - 5, b.y + 5);
			pop();
			// while(b.sextarget==null){
			if (b.mating == true) {
				b.mating_timer++;
				b.size += 0.75 * Math.sin(0.5 * b.mating_timer);
				if (b.mating_timer > b.mating_endurance) {
					b.mating = false;
					c[b.sextarget[0]].mating = false;
					if (ran(0, 100) < FERTILITYRATE) {
						c[b.sextarget[0]].pregnant = true;
					}
					b.sextarget = [];
				}
			}
			if (b.sextarget.length == 1) {
				if (i != param.control && b.live == true && b.mating == false && c[b.sextarget[0]].mating == false) {
					if (b.x - c[b.sextarget[0]].x < 0) {
						b.x += b.drive;
					} else {
						b.x -= b.drive;
					}

					if (b.y - c[b.sextarget[0]].y < 0) {
						b.y += b.drive;
					} else {
						b.y -= b.drive;
					}
				}
				if (c[b.sextarget[0]].mating == false && b.x > c[b.sextarget[0]].x - 5 && b.x < c[b.sextarget[0]].x + 5 && b.y > c[b.sextarget[0]].y - 5 && b.y < c[b.sextarget[0]].y + 5) {
					b.mating = true;
					c[b.sextarget[0]].mating = true;
				}
			}
			if (b.sextarget.length == 0) {
				b.drive = random(0.1, 0.3);
				b.mating_endurance = ran(ENDURANCE_MIN, ENDURANCE_MAX);
				for (var o = 0; o < c.length; o++) {
					if (c[o].live == true && c[o].sex == "F" && c[o].sextarget.length == 0 && c[o].age >= CHILDHOOD && c[o].pregnant == false) {
						b.sextarget[0] = o;
						c[o].sextarget.push(i);
						o = c.length;
					}
				}
				if (b.sextarget.length == 0) {
					for (var r = 0; r < c.length; r++) {
						if (c[r].live == true && c[r].sex == "F" && c[r].age >= CHILDHOOD && c[r].pregnant == false) {
							b.sextarget[0] = r;
							c[r].sextarget.push(i);
							r = c.length - 1;
						}
					}
				}


			}

		}
		if (m.full == null && m.d == true && m.x > b.x - 5 && m.x < b.x + 5 && m.y > b.y - 5 && m.y < b.y + 5) {
			b.held = true;
			m.full = i;
		}
		if (b.held == false) {
			push();
			fill("rgba(0,0,0,0.2)");
			circle(b.x - 5, b.y, b.size);
			pop();
			if (param.names == 0) {
				push();
				textSize(10);
				if (b.live == false) {
					stroke("rgb(255, 0, 0)");
					strokeWeight(0.5);
					fill(255);
				} else {
					fill(255);
				}
				text(b.name, b.x - 20, b.y - 10);
				pop();
			} else if (param.names == 1) {
				push();
				textSize(10);

				if (b.live == false) {
					stroke("rgb(255, 0, 0)");
					strokeWeight(0.5);
				} else {
					fill(255);
				}
				text(i, b.x - 5, b.y - 10);
				pop();
			}
		}
		if (param.control != null) {
			if (i == param.control) {
				fill(0, 255, 0);
				if (keyIsDown(16)) {
					CONTROLSPEED = 2;
				} else {
					CONTROLSPEED = 1;
				}
				if (keyIsDown(LEFT_ARROW)) {
					b.x -= CONTROLSPEED;
				}
				if (keyIsDown(RIGHT_ARROW)) {
					b.x += CONTROLSPEED;
				}
				if (keyIsDown(UP_ARROW)) {
					b.y -= CONTROLSPEED;
				}
				if (keyIsDown(DOWN_ARROW)) {
					b.y += CONTROLSPEED;
				}
			}
		}
		if (b.pregnant == true) {
			b.color = "rgb(255,150,150)";
		}
		fill(b.color);
		circle(b.x, b.y, b.size);

	}

	pop();
}

function newc(x, y, age) {
	var move_amt = ran(0, 10);
	var speed_amt = ran(1, 1);
	var sex_amt;
	//lett_c[ran(0,lett_c.length-1)]    lett_v[ran(0,lett_v.length-1)]

	var namee = cool_words[ran(0, cool_words.length - 1)] + "-" + cool_words[ran(0, cool_words.length - 1)] + " " + romanize(c.length + 1);

	if (ran(1, 2) == 1) {
		sex_amt = "M";
	} else {
		sex_amt = "F";

	}
	c.push({
		name: namee,
		x: x,
		y: y,
		age: age,
		size: 10,
		sex: sex_amt,
		drive: 0,
		sextarget: [],
		d: 270,
		md: 0,
		mvt: move_amt,
		s: speed_amt,
		r: 1,
		held: false,
		mating: false,
		mating_timer: 0,
		pregnant: false,
		live: true,
		color: "rgb(255,255,255)"
	});
}

function drawhouse() {
	push();
	fill("rgba(0,0,0,0.15)");
	rect(CX * 0.2, CY * 0.85, CX * 0.4, CY * 0.13);
	pop();

	push();
	fill("rgb(200,0,0)");
	rect(CX * 0.3, CY * 0.85, CX * 0.4, CY * 0.1);
	pop();

	push();
	fill(50);
	arc(CX * 0.5, CY * 0.85, 50, 50, 0, PI);
	pop();


	push();
	fill(100);
	// rect(CX*0.25,CY*0.85,CX*0.5,CY*0.1)
	beginShape();
	vertex(CX * 0.25, CY * 0.85);
	vertex(CX * 0.5, CY * 0.9);
	vertex(CY * 0.5, CY);
	vertex(CX * 0.25, CY * 0.95);
	endShape(CLOSE);
	fill(150);
	beginShape();
	vertex(CX * 0.5, CY * 0.9);
	vertex(CX * 0.75, CY * 0.85);
	vertex(CY * 0.75, CY * 0.95);
	vertex(CX * 0.5, CY);
	endShape(CLOSE);
	pop();


}

function ran(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function mousePressed() {
	m.d = true;
}

function mouseReleased() {
	m.d = false;
}

function romanize(num) {
	if (isNaN(num))
		return NaN;
	var digits = String(+num).split(""),
		key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
			"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
			"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
		],
		roman = "",
		i = 3;
	while (i--)
		roman = (key[+digits.pop() + (i * 10)] || "") + roman;
	return Array(+digits.join("") + 1).join("M") + roman;
}
function keyPressed() {

	switch (keyCode) {
		case 78:
			param.names++;
			if (param.names > 2) {
				param.names = 0;
			}
			break;
		case 70:
			AGINGSPEED--;
			if (AGINGSPEED < 0) {
				AGINGSPEED = 10;
			}
			break;
		case 69:
			eggs.push({
				x: m.x,
				y: m.y,
				eggtime: 0
			});
			break;
	}
}
function addblade(x, y, w) {
	sawblade.push({
		x: x,
		y: y,
		w: w,
	});
}