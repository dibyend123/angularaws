import { Injectable } from '@angular/core';
import { CognitoCallback,CognitoService } from './cognito.service';
import { CognitoUser,AuthenticationDetails,CognitoUserAttribute }  from "amazon-cognito-identity-js";
import { NewPasswordUser } from '../new-password/new-password.component';
import { UserCreation } from '../adminusercreation/adminusercreation.component';
import { forgotpassword } from '../forgetpassword/forgetpassword.component';

import * as CognitoIdentity from "aws-sdk/clients/cognitoidentity";

import * as AWS from "aws-sdk/global";


@Injectable()
export class UserregistrationService {

  constructor(public cognitoservice:CognitoService) { }

  forgetPassword(fg:forgotpassword,callback:CognitoCallback){

    console.log("Old password "+fg.oldpassword);
    console.log("Old password "+fg.newpassword);
    console.log("Old password "+fg.username);

    console.log(this.cognitoservice.getUserPool());

     let userData = {
            Username: fg.username.toString(),
            Pool: this.cognitoservice.getUserPool()
  };

  let cognitoUser = new CognitoUser(userData);


  cognitoUser.changePassword(fg.oldpassword, fg.newpassword, function(err, result) {
        if (err) {
            console.log(err);
        }else{
            console.log('call result: ' + result);
        }
        
    });

  }


  usercreationadmin(usercreation:UserCreation,callback:CognitoCallback){

      console.log("aaaa = "+usercreation.username);
      console.log("bbbb = "+usercreation.password);
      console.log("cccc = "+usercreation.email);
      console.log("dddd = "+usercreation.phone);

      let attributeList = [];
    
        var dataEmail = {
            Name : 'email',
            Value : usercreation.email
        };
        var dataPhoneNumber = {
            Name : 'phone_number',
            Value : usercreation.phone
        };
        var dataPhoneNumber = {
            Name : 'name',
            Value : usercreation.email
        };

        var emailverified = {
            Name : 'email_verified',
            Value :  '0'
        };

        var phoneverified = {
            Name : 'phone_number_verified',
            Value :  'true'
        };

         attributeList.push(new CognitoUserAttribute(dataEmail)); 
         attributeList.push(new CognitoUserAttribute(dataPhoneNumber));
        // attributeList.push(new CognitoUserAttribute(emailverified));
        // attributeList.push(new CognitoUserAttribute(phoneverified));



         this.cognitoservice.getUserPool().signUp(usercreation.username.toString(),usercreation.password,  attributeList, null, function (err, result){
           if (err) {
               callback.cognitoCallback(err.message, null);
           }else{
                callback.cognitoCallback(null, 'done');                                              
           }
         });

}s

  newpassword(registeruser:NewPasswordUser,callback:CognitoCallback){

  console.log("kkk"+registeruser.username);

  	
  	let authenticationData = {
            Username: registeruser.username,
            Password: registeruser.existingPassword,
	};

	let authenticationDetails = new AuthenticationDetails(authenticationData);

    let userData = {
            Username: registeruser.username,
            Pool: this.cognitoservice.getUserPool()
	};

	let cognitoUser = new CognitoUser(userData);

	cognitoUser.authenticateUser(authenticationDetails,{


		newPasswordRequired: function (userAttributes, requiredAttributes) {

				console.log('newpassword required');
				//userAttributes.Username = registeruser.username;
				//userAttributes.Password = registeruser.password;

				userAttributes.name = registeruser.username;
				delete userAttributes.email_verified;
				delete userAttributes.phone_number_verified;
                cognitoUser.completeNewPasswordChallenge(registeruser.password, userAttributes, {
                    onSuccess: function (result) {

                    	console.log('ssss');
                        callback.cognitoCallback(null, userAttributes);
                    },
                    onFailure: function (err) {
                    console.log('ffff');
                    callback.cognitoCallback(err.message, null);
                    }
                });
		},

		onSuccess: function (result) {
            callback.cognitoCallback(null, result);
            console.log('succesfull');
         },
        onFailure: function (err) {
            callback.cognitoCallback(err.message, null);
            console.log('failure'+err);
		}

	});

  }



}
