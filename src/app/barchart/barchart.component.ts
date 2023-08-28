import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from "../services/api.service";
import { ToastrService } from 'ngx-toastr';
import * as d3 from 'd3';
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {
  formSet!: FormGroup;
  chartData: any[] = [];
  submitted = false;
  constructor(private fb: FormBuilder,  private api: ApiService,private toastr: ToastrService) { }

 ngOnInit(): void {
  this.formSet = this.fb.group({
    country:['', [Validators.required]],
    valuenumber:['', [Validators.required]],
  })
    this.createSvg();
    this.fetchChartData();
  }
  get f(){
    return this.formSet.controls;
  }

  countryFilter: string = ''; // Property to store the filter value

sortChartData() {
  this.chartData.sort((a, b) => b.valuenumber - a.valuenumber); // Sort data by number in descending order
  this.svg.selectAll("rect").remove();
  this.drawBars();
}

applyFilter() {
  const filteredData = this.chartData.filter(item => item.country.includes(this.countryFilter));
  this.svg.selectAll("rect").remove();
  this.drawBars(filteredData);
}

  fetchChartData(): void {
    this.api.GET().subscribe(val => {
      this.chartData = val; // Accessing the correct data property
      console.log("service data", this.chartData);
      this.drawBars(); // Draw the bars after fetching data
    });
  }

  private svg: any;
  private margin = { top: 50, right: 20, bottom: 50, left: 50 };
  private containerWidth!: number;
  private containerHeight = 400; // Set a fixed height or adjust as needed

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
  const container = d3.select("figure#bar");
  this.containerWidth = +container.style("width").slice(0, -2);  // Remove 'px'

  this.svg = container
    .append("svg")
    .attr("width", this.containerWidth)
    .attr("height", this.containerHeight)
    .append("g")
    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

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

private drawBars(data = this.chartData): void {
  this.svg.selectAll("rect").remove();
  const y = d3.scaleBand()
    .range([0, this.containerHeight - this.margin.top - this.margin.bottom])
    .domain(data.map(d => d.country))
    .padding(0.3);

  this.svg.append("g")
    .call(d3.axisLeft(y));

  const x = d3.scaleLinear()
    .domain([0, 100]) // Set the X-axis domain to [0, 100]
    .range([0, this.containerWidth - this.margin.left - this.margin.right]);

  this.svg.append("g")
    .attr("transform", "translate(0," + (this.containerHeight - this.margin.top - this.margin.bottom) + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  const bars = this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d: any) => y(d.country))
    .attr("width", (d: any) => x(d.valuenumber))
    .attr("height", y.bandwidth())
    .attr("fill", (d: any) => this.getColor(d.valuenumber))
    

  // Add mouseover and mouseout events to show/hide the tooltip
  bars
    .on("mouseover", (event: any, d: any) => {
      this.tooltip.transition()
        .duration(200)
        .style("opacity", 1);
      this.tooltip.html(`Value: ${d.valuenumber}`)
        .style("left", (event.pageX - this.margin.left) + "px")
        .style("top", (event.pageY - this.margin.top - 30) + "px");
    })
    .on("mouseout", () => {
      this.tooltip.transition()
        .duration(200)
        .style("opacity", 0);
    });
}


submit() {
  this.submitted = true;
  if (this.formSet.valid) {
    const newcountry = this.formSet.value.country;
    const newValuenumber = parseInt(this.formSet.value.valuenumber, 10);

    if (newValuenumber > 100) {
      this.toastr.error('value cannot be greater than 100', 'Invalid Value');
      return; 
    }

    const postData = { country: newcountry, valuenumber: newValuenumber };

    this.api.POST(postData).subscribe(response => {
      this.chartData.push(postData);

      this.svg.selectAll("rect").remove();
      this.drawBars();
      this.toastr.success("Added Successfully!", "Barchart");
    });   
    
  }
 
}






}
