const CX = 500,
	CY = 500;
p5.disableFriendlyErrors = true;
const cool_words = ["luǒ", "huà", "bǐng", "xiào", "dà", "bào", "tiào", "tiàn", "kǒng", "fèng", "fǒng", "nǐng", "pǐng", "lǒ", "fèi", "chàng", "mào", "duǒ", "xǐong", "gè", "gúo", "buǒ", "xiè", "pàng", "duàn", "lǐng", "huǒ", "suè", "fàng", "miàn", "yǒng", "gǒng", "qing", "wà", "kú", "frǒg"];

function setup() {
	lake = [random(CX * 0.25, CX * 0.75), random(CY * 0.25, CY * 0.75)];
	createCanvas(CX, CY);
	// background(100);
	frameRate(60);
	noCursor();
	m = {};
	m.full = null;
	c = [];
	for (var j = 0; j < 10; j++) {
		newc(random(CX * 0.25, CX * 0.75), random(CY * 0.25, CY * 0.75), 0);
	}
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
	text(Math.floor(frameRate()),50,50);
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
	drawhouse();

	push();
	fill("rgba(0,0,0,0.25)");
	triangle(m.x - 5, m.y + 5, m.x + 15, m.y + 15, m.x + 5, m.y + 25);
	fill(255);
	triangle(m.x, m.y, m.x + 20, m.y + 10, m.x + 10, m.y + 20);

	pop();
}

function chicktick() {
	push();

	for (var i = 0; i < c.length; i++) {
		b = c[i];

		if (b.x < 0 || b.x > CX - 0 || b.y < 0 || b.y > CY - 0) {
			c.splice(i, 1);
			i = 0;
		}

		if (frameCount % 10 == 0) {
			b.age++;
		}
		if (b.age < 255) {
			fill("rgb(255,255," + b.age + ")");
		} else {
			fill(510 - b.age);
			if (510 - b.age < 1) {
				b.live = false;
			}
		}
		if (b.x < 20 || b.x > CX - 20 || b.y < 20 || b.y > CY - 20) {
			push();
			fill("rgba(255,0,0,0.5)");
			circle(b.x + ran(-2, 2), b.y + ran(-2, 2), 20);
			pop();
		}

		if (m.d == false) {
			b.held = false;
			m.full = null;
		}
		if (b.held == true && m.d == true) {
			b.x = m.x;
			b.y = m.y;
			push();
			fill("rgba(0,0,0,0.2)");
			circle(m.x - 15, m.y, b.size * 1.5);
			pop();
			push();
			textSize(10);
			fill(255);

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
		} else if (b.live == true && b.md < b.mvt && b.x > 20 && b.x < CX - 20 && b.y > 20 && b.y < CY - 20 && b.mating == false) {

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
			if (b.mating == false && b.live == true) {
				b.x += b.s * Math.cos(b.d);
				b.y += b.s * Math.sin(b.d);
			}
			c[i].md++;
		}


		if (b.sex == "M" && b.age >= 200) {
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
					if (ran(0, 100) < 15) {
						c[b.sextarget[0]].pregnant = true;
					}
					b.sextarget = [];
				}
			}
			if (b.sextarget.length == 1) {
				if (b.live == true && b.mating == false && c[b.sextarget[0]].mating == false) {
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
				b.mating_endurance = ran(25, 50);
				for (var o = 0; o < c.length; o++) {
					if (c[o].sex == "F" && c[o].sextarget.length == 0 && c[o].age >= 200 && c[o].pregnant == false) {
						b.sextarget[0] = o;
						c[o].sextarget.push(i);
						o = c.length;
					}
				}
				if (b.sextarget.length == 0) {
					for (var r = 0; r < c.length; r++) {
						if (c[r].sex == "F" && c[r].age >= 200 && c[r].pregnant == false) {
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
			push();
			textSize(10);
			fill(255);
			text(b.name, b.x - 20, b.y - 10);
			pop();
		}
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
		live: true
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
