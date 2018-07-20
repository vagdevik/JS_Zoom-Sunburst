// Add test data here (or make api call for data)
var data = {
"name":"Products",
			"color":"#FFF123",
  "children":[
				{"name": "Packaging Process automation",
				"color":"#20afe8",
		 		 "children": [
					 {"name": "Artworks", "value": 1,"color":"#107da8"},
					 {"name": "Bill of Materials", "value": 1,"color":"#107da8"},
					 {"name": "Specifications", "value": 1,"color":"#107da8"},
					 {"name": "KLD- Die cuts", "value": 1,"color":"#107da8"},
					 {"name": "Vendor Proof", "value": 1,"color":"#107da8"},
					 {"name": "Text Matters", "value": 1,"color":"#107da8"},
					 {"name": "Shade Cards", "value": 1,"color":"#107da8"},
					 {"name": "Bar Codes", "value": 1,"color":"#107da8"},
					 {"name": "Drug Facts", "value": 1,"color":"#107da8"},
					 {"name": "License Codes", "value": 1,"color":"#107da8"},
					 {"name": "Batch Receipts", "value": 1,"color":"#107da8"},
					 {"name": "Analytical Test Reports", "value": 1,"color":"#107da8"}
				   ]
				},
				{"name": "End-To-End-Label Management",
				"color":"#ef979d",
		 		 "children": [
					 {"name": "Artworks", "value": 1,"color":"#CF000F"},
					 {"name": "Text matters", "value": 1,"color":"#CF000F"},
					 {"name": "Label Content Creation", "value": 1,"color":"#CF000F"},
					 {"name": "Content Linking", "value": 1,"color":"#CF000F"},
					 {"name": "Impact Analysis", "value": 1,"color":"#CF000F"},
					 {"name": "Change Tracking", "value": 1,"color":"#CF000F"},
					 {"name": "Post Approval Interactions", "value": 1,"color":"#CF000F"}
				   ]
				},
				{"name": "Integrated Regulatory Tracking",
				"color":"#c0ffb7",
		 		 "children": [
					 {"name": "Product Registrations", "value": 1,"color":"#87D37C"},
					 {"name": "Queries and Deficiencies", "value": 1,"color":"#87D37C"},
					 {"name": "Post Approval Interactions", "value": 1,"color":"#87D37C"},
					 {"name": "Activity Tracking", "value": 1,"color":"#87D37C"},
					 {"name": "Conditional Sheets", "value": 1,"color":"#87D37C"},
					 {"name": "Tender Management", "value": 1,"color":"#87D37C"},
					 {"name": "Order Copy Management", "value": 1,"color":"#87D37C"},
					 {"name": "Technical Arrangements", "value": 1,"color":"#87D37C"}
				
				   ]
				},
				{"name": "Quality and Document Arrangement",
				"color":"#40ede0",
		 		 "children": [
					 {"name": "Deviations", "value": 1,"color":"#149e94"},
					 {"name": "Audits", "value": 1,"color":"#149e94"},
					 {"name": "CAPA", "value": 1,"color":"#149e94"},
					 {"name": "Document Management", "value": 1,"color":"#149e94"},
					 {"name": "Training", "value": 1,"color":"#149e94"},
					 {"name": "Complaints", "value": 1,"color":"#149e94"},
					 {"name": "OOS", "value": 1,"color":"#149e94"}				
				   ]
				},
				{"name": "Portfolio and Project Management",
				"color":"#ffcc8e",
		 		 "children": [
					 {"name": "Ideation", "value": 1,"color":"#f78e0e"},
					 {"name": "Portfolio Management", "value": 1,"color":"#f78e0e"},
					 {"name": "Project Tracking", "value": 1,"color":"#f78e0e"},
					 {"name": "Timesheets", "value": 1,"color":"#f78e0e"}
					]
				}
	]
};

// Size/state related variables
var width = 500,
    height = 500,
    outer_radius = width/2.5,
    arc_transition; // save current arc transition

// Create scales
var x = d3.scale.linear()
      .range([0, 2 * Math.PI]),
    
    y = d3.scale.linear()
      .range([0, width/2]);


// Partition layout
var partition = d3.layout.partition(),
    nodes = partition.nodes(data);

// Arc generator
var arc_generator = d3.svg.arc()
      .startAngle(function(d) { 
        return Math.max(0, Math.min(2 * Math.PI, x(d.x))); 
      })
      .endAngle(function(d) { 
        return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); 
      })
      .innerRadius(function(d) { 
        return Math.max(0, y(d.y)); 
      })
      .outerRadius(function(d) { 
        return Math.max(0, y(d.y + d.dy)); 
      });

/*d3.svg.append("image")
  .attr("xlink:href", "../images/2.jpg")
  .attr("x", -650)
  .attr("y", -650);
*/

// Append a centered group for the burst to be added to
var burst_group = d3.select('.chart')
                   .append('svg')
                   .attr({
                     width: width,
                     height: height
                   })
                   .append('g')
                   .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')')
					.text("place");

burst_group.select("svg").append("text")
   .attr("class", "total")
   .attr("text-anchor", "middle")
	 .attr('font-size', '4em')
	 .attr('y', 20);

d3.select(".total").text("Harmony");



/*d3.svg.select("g").append("svg:text")
    .on("click",click)
    .style("font-size","4em")
    .style("font-weight","bold")
    .text(function(d) { return d.name; });
*/
// Append Arcs
var arcs = burst_group.selectAll("path.ark")
    .data( nodes )
    .enter().append("path")
    .attr({
      d: arc_generator,
      class: function(d) { return 'ark -depth-' + d.depth; }
    })
    .style("fill", function(d,i) { 
      if (d.depth > 0){return d.color;} 
		//else{return "#fff123";}
    })
	.style("font-size",function(d){if(d.depth==0){return "4em";}})

	.attr('stroke', '#fff') // <-- THIS (for arc padding)
    .attr('stroke-width', '0.5') // <-- THIS (for arc padding)
	.text(function(d) { if (d.depth>0){return d.name;}else{return "Harmony";} })
    .on("click", click)
    .on('mouseover', function(d) {
      if (d.depth > 0) {
        var names = getNameArray(d);
        fade(arcs, 0.3, names, 'name'); 

        update_crumbs(d);

		console.log(names[0]);

		d3.select("#name")
      .text(names[0]);

		d3.select("#explanation")
      .style("visibility", "");
		
      }
	else{
		var names = ['Harmony'];
        fade(arcs, 0.3, names, 'name');

		d3.select("#name")
		.style("font-weight","bold")
      .text(names[0]);

		d3.select("#explanation")
      .style("visibility", "");
	}
    })
    .on('mouseout', function(d) {
      fade(arcs, 1);
      remove_crumbs();

	d3.select("#explanation")
      .style("visibility", "hidden");
    });











// Updates breadcrumbs
function update_crumbs(d) {
  var crumb_container = d3.select('.crumbs'),
      sections = getNameArray(d);
  
  // Remove existing crumbs
  remove_crumbs();
  
  // Append new crumbs
  sections.reverse().forEach(function(name) {
    crumb_container.append('span')
      .classed('crumb', true)
      .text(name);
  });
};

// Removes all crumb spans
function remove_crumbs() {
  d3.select('.crumbs').selectAll('.crumb').remove();
};

// Handle Clicks
function click(d) {
  arc_transition = arcs.transition('arc_tween')
    .duration(750)
    .attrTween("d", arcTween(d));
};

// Retrieve arc name and parent names
function getNameArray(d, array) {
  array = array || [];

  // Push the current objects name to the array
  array.push(d.name);

  // Recurse to retrieve parent names
  if (d.parent) getNameArray(d.parent, array);

  return array;
};

// Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate( x.domain(), [d.x, d.x + d.dx] ),
      yd = d3.interpolate( y.domain(), [d.y, 1] ),
      yr = d3.interpolate( y.range(), [d.y ? 20 : 0, outer_radius] );

  return function(d, i) {
    return i
        ? function(t) { return arc_generator(d); }
        : function(t) { 
            x.domain( xd(t) ); 
            y.domain( yd(t) ).range( yr(t) ); 
      
            return arc_generator(d); 
        };
  };
};

// Fade a selection filtering out the comparator(s)
function fade(selection, opacity, comparators, comparatee) {
  var type = typeof comparators,
      key = comparatee ? comparatee : 'value';

  selection.filter(function(d, i) {
                // Remove elements based on a string or number
                if (type === "string" || type === "number") {
                  return d[key] !== comparators;

                // Remove elements based on an array
                } else if (type === 'object' && typeof comparators.slice === 'function') {
                  return comparators.indexOf(d[key]) === -1;

                // If there is no comparator keep everything 
                } else return true;
            })
            .transition('fade')
            .duration(250)
            .style('opacity', opacity);
};
