import { Component, OnInit } from '@angular/core';
import { UserregistrationService } from '../service/userregistration.service';
import { CognitoCallback,CognitoService } from '../service/cognito.service';
import {Router} from "@angular/router";



export class UserCreation {
    username:number;
	password:string;
	email:string;
	phone:string;
}

@Component({
  selector: 'app-adminusercreation',
  templateUrl: './adminusercreation.component.html',
  styleUrls: ['./adminusercreation.component.css']
})
export class AdminusercreationComponent implements OnInit,CognitoCallback {

	usercreation:UserCreation;
  errorMessage:string;
  router: Router;

  constructor(public userregisterSrvc:UserregistrationService,router: Router) { 
  this.router = router;
  	 this.onInit();
  }

  ngOnInit() {

  		
  }

  onInit(){
  	this.usercreation = new UserCreation();

  }

  createUser(){
  		console.log("Register user");
  		this.userregisterSrvc.usercreationadmin(this.usercreation,this);
  }

  onCancel(){
    this.router.navigate(['securehome']);
  }

   cognitoCallback(message: string, result: any) {

      if(message!=null){
       this.errorMessage = message;
      }else{
      this.errorMessage = 'usercreated succesfully';
        console.log("User created");
      }

   }

}
