import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  myForm!: FormGroup;
  currentStep: number = 1;

  selectedOption: string | undefined;
 
  options=[
    {'name': "option A", id: '1'},
    {'name': "option B", id: '2'},
    {'name': "option C", id: '3'},
  ];

  constructor(private fb: FormBuilder) {
   
  }
  ngOnInit() {
    this.myForm = new FormGroup({
    pre_define_from:new FormControl(),
    content: new FormControl()
   })
  }

  showStep(step: number) {
    this.currentStep = step;
  }

 
  url = 'assets/images/banner/bg.jpg';
  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        console.log(event);
        this.url = event.target.result;
      }
    }
  }
  profileUrl = 'assets/images/profile_image.png';
  selectProfile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        console.log(event);
        this.profileUrl = event.target.result;
      }
    }
  }

  onSubmit(){
    console.log("form value", this.myForm.value);
    
  }
}
