import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from "../services/api.service";
import * as d3 from 'd3';
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {
  formSet!: FormGroup;
  chartData: any[] = [];

  constructor(private fb: FormBuilder,  private api: ApiService,   ) { }

 ngOnInit(): void {
  this.formSet = this.fb.group({
    framework:['', [Validators.required]],
    stars:['', [Validators.required]],
  })
    this.createSvg();
    this.fetchChartData();
  }

  fetchChartData(): void {
    this.api.GET().subscribe(val => {
      this.chartData = val; // Accessing the correct data property
      console.log("service data", this.chartData);
      this.drawBars(); // Draw the bars after fetching data
    });
  }




private svg: any;
private margin = 50;
private width = 750 - (this.margin * 2);
private height = 400 - (this.margin * 2);

// Define a tooltip
private tooltip: any;

private getColor(value: number): string {
  const colorScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 1]); // Numeric range for color interpolation

  const color = d3.interpolateRgb("#dc3545", "#198754")(colorScale(value));
  return color;
}

private createSvg(): void {
  this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

  // Initialize the tooltip
  this.tooltip = d3.select("figure#bar")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px");
}

private drawBars(): void {
  this.svg.selectAll("rect").remove();
  const y = d3.scaleBand()
    .range([0, this.height])
    .domain(this.chartData.map(d => 
      d.framework    
    ))
    .padding(0.2);

  this.svg.append("g")
    .call(d3.axisLeft(y));

  const x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, this.width]);

  this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x));

  const bars = this.svg.selectAll("bars")
    .data(this.chartData)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d: any) => y(d.framework)) // Use lowercase 'framework'
    .attr("width", (d: any) => x(d.stars)) // Use lowercase 'stars'
    .attr("height", y.bandwidth())
    .attr("fill", (d: any) => this.getColor(d.stars))  // Set color based on value

  // Add mouseover and mouseout events to show/hide the tooltip
  bars
    .on("mouseover", (event: any, d: any) => {
      this.tooltip.transition()
        .duration(200)
        .style("opacity", 1);
      this.tooltip.html(`Stars: ${d.stars}`) // Use lowercase 'stars'
        .style("left", (event.pageX - 50) + "px")
        .style("top", (event.pageY - 80) + "px");
    })
    .on("mouseout", () => {
      this.tooltip.transition()
        .duration(200)
        .style("opacity", 0);
    });
}


submit() {
  if (this.formSet.valid) {
    const newFramework = this.formSet.value.framework;
    const newStars = parseInt(this.formSet.value.stars, 10);
    
    const postData = { framework: newFramework, stars: newStars }; // Create the object to be posted
    
    this.api.POST(postData).subscribe(response => {
      console.log("POST response:", response); // Log the response if needed
      
      // Add the new data to the chartData array and redraw the bars
      this.chartData.push(postData);
      this.drawBars();
      
      this.formSet.reset();
    });
  }
}

submitold() {
  if (this.formSet.valid) {
    const newFramework = this.formSet.value.framework;
    const newStars = parseInt(this.formSet.value.stars, 10);   
    this.chartData.push({"framework": newFramework, "stars": newStars}); 
    this.drawBars();   
    this.formSet.reset();
  }
}




}
