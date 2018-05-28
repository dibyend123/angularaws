import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { UserregistrationService } from '../service/userregistration.service';
import { CognitoCallback,CognitoService } from '../service/cognito.service';


export class forgotpassword {
  username:number;
  oldpassword:string;
  newpassword:string;
}


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit ,CognitoCallback {

	errorMessage:string;
  router: Router;
  fg:forgotpassword;


  constructor(public userregisterSrvc:UserregistrationService,router: Router) {
      this.router = router;
       this.onInit();
   }

  ngOnInit() {
  }

  onInit(){
      this.fg = new forgotpassword();
  }

  changepassword(){
  	this.userregisterSrvc.forgetPassword(this.fg,this);
  }

  onCancel(){
       this.router.navigate(['']);
  }

  cognitoCallback(message: string, result: any) {

      if(message!=null){
       this.errorMessage = message;
      }else{
      this.errorMessage = 'Password reset';
        console.log("Forgot password initiated  ");
      }

   }

}
