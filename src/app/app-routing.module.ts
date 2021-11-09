import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth-guard';
import { AuthService } from './auth/auth.service';

const routes: Routes =[
  {path:'', component:PostListComponent},
  {path:'postCreate', component:PostCreateComponent, canActivate: [AuthGuard]},
  {path:'edit/:postId', component:PostCreateComponent, canActivate: [AuthGuard]},
  {path: 'auth', loadChildren : () => import('./auth/auth.module').then(m=> m.AuthModule) },

  {path:'**', component:PostListComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[ RouterModule ],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
