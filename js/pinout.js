// Convenience function that creates an SVG element from type, value and text strings
function svgen(n, v, t) {
	n = document.createElementNS("http://www.w3.org/2000/svg", n);
	for (var p in v)
		if(p == "xlink:href") { n.setAttributeNS("http://www.w3.org/1999/xlink", p, v[p]); }
		else if(p == "xmlns:xlink") { n.setAttributeNS("http://www.w3.org/2000/xmlns/", p, v[p]); }
		else if(p == "xmlns") { n.setAttributeNS("http://www.w3.org/2000/xmlns/", p, v[p]); }
		else if(p == "xml:space") { n.setAttributeNS("http://www.w3.org/XML/1998/namespace", p, v[p]); }
		else { n.setAttributeNS(null, p, v[p]); }
	if(t) n.innerHTML = t;
	return n
}

function drawPinout(svg, params) {
	var width = 2;
	var length = 2;
	var names = null;
	var colors = null;
	var widthCounter = 0;
	var lengthCounter = 0;
	var yoffset = 40;
	var group;

	for (var param in params) {
		if(param == "width") {width = params[param]; }
		if(param == "length") {length = params[param]; }
		if(param == "names") {names = params[param]; }
		if(param == "colors") {colors = params[param]; }
	}

	group = svgen('g', {transform:"scale(2)" });

	// Background
	group.appendChild(svgen('rect', { x: 40, y: yoffset, width: 14 * length, height: 14 * width, stroke:'#333333', fill:'#333333' }));

	while (widthCounter != width) {
		while (lengthCounter != length) {
			group.appendChild(svgen('rect', { x: 42 + lengthCounter * 14, y: yoffset + 2 + widthCounter * 14, width: 10, height: 10, stroke:'#222222', fill:'#222222' }));
			group.appendChild(svgen('rect', { x: 44 + lengthCounter * 14, y: yoffset + 4 + widthCounter * 14, width: 8, height: 8, stroke:'#000000', fill:'#000000' }));
			
			if(widthCounter == 0) {
				drawRoundedParallelogram(group, 50 + lengthCounter * 14, yoffset - 13, true, ((length - lengthCounter) * width - 1).toString(), 11);
			}
			if(widthCounter == 1) {
				drawRoundedParallelogram(group, 42 + lengthCounter * 14, yoffset + 30, false, (((length - lengthCounter) * width)).toString(), 11);
			}

			if(names) {
				if(names[lengthCounter + (widthCounter * length)]) {
					var label_color = "#626463";
					var text_color = "#000000";

					if(colors) {
						if(colors[lengthCounter + (widthCounter * length)]) {
							label_color = colors[lengthCounter + (widthCounter * length)];
						}
					}

					if(names[lengthCounter + (widthCounter * length)] == "PWR") {text_color = "#FFFFFF";}
					if(names[lengthCounter + (widthCounter * length)] == "GND") {text_color = "#FFFFFF";}

					if(widthCounter == 0) {
						drawRoundedParallelogram(group, 69 + lengthCounter * 14, yoffset - 36, true, names[lengthCounter + (widthCounter * length)], 20, label_color, text_color);
					}
					if(widthCounter == 1) {
						drawRoundedParallelogram(group, 30 + lengthCounter * 14, yoffset + 44, false, names[lengthCounter + (widthCounter * length)], 20, label_color, text_color);
					}
				}
			}
			
			lengthCounter = lengthCounter + 1;
		}
		widthCounter = widthCounter + 1;
		lengthCounter = 0;
	}

	svg.appendChild(group)
}

function drawRoundedParallelogram(svg, x, y, top, label, label_length, label_color = "#626463", text_color = "#FFFFFF") {
	var group;	

	group = svgen('g', {transform:"translate(" + x + ", " + y + ") skewX(-40) " });
	group.appendChild(svgen('rect', { x: 0, y: 0, width: 10, height: label_length, rx: 2, ry: 2, stroke:'#333333', fill: label_color }));
	
	if(top) {
		group.appendChild(svgen('text', { x: -1 * label_length + 1, y: 7, style: "font-family:Arial; font-size:7", "text-anchor":"start", "transform":"rotate(-90 0,0)", fill: text_color }, label ));
	} else {
		group.appendChild(svgen('text', { x: -2, y: 7, style: "font-family:Arial; font-size:7", "text-anchor":"end", "transform":"rotate(-90 0,0)", fill: text_color }, label ));
	}

	svg.appendChild(group)
}

