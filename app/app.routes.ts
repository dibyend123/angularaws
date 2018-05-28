import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {NewPasswordComponent} from "./new-password/new-password.component";
import {SecurehomeComponent} from "./securehome/securehome.component";
import { AdminusercreationComponent } from './adminusercreation/adminusercreation.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';

const homeRoutes: Routes = [
	{
		path:'',
		redirectTo:'/login',
		pathMatch:'full'

	},
	{
		path:'login',
		component:LoginComponent,		

	},
	{
		path:'forget',
		component:ForgetpasswordComponent,
	}
];


const secureHomeRoutes: Routes = [
    {

        path: '',
        redirectTo: '/securehome',
        pathMatch: 'full'
    },
    {
        path: 'securehome', component: SecurehomeComponent, children: [
        {path: 'usercreation', component: AdminusercreationComponent}
        ]
    }
];


const routes:Routes = [
{
	path:'',
	children:[
		...homeRoutes,
		...secureHomeRoutes,
		{
			path:'',
			component:LoginComponent
		}
	]

},
{
	path:'home',
	children:[
		 {path: 'newPassword', component: NewPasswordComponent}
	]	
}


];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);