import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { PostModel } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 /*
 storedPost : PostModel[]=[];

 // onPostAdd method which push the rescived object of post into storedPost
  onPostAdd(post){
    this.storedPost.push(post);
  }
*/
constructor(private authService :AuthService){}

ngOnInit(){
this.authService.autoAuthUser();
}
}
