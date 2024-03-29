import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  

  isloading=false;
private authStatusSub :Subscription;
  

  constructor(public autherService :AuthService) { }
  
  onsigUp(form :NgForm){
      if(form.invalid){
        return;
      }
      this.isloading= true;
        this.autherService.createUser
        (form.value.email, form.value.password)
        
     
  }

  ngOnInit(){
   this.authStatusSub = this.autherService.getAuthStatusListener()
   .subscribe(
   authStatus =>{
     this.isloading= false;
   } );
  }
  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
