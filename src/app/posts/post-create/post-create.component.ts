
import { Component,  OnDestroy,  OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { PostModel } from 'src/app/model';
import { PostServiceService } from 'src/app/post-service.service';
import { mineType } from './mine-type-validator';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit,  OnDestroy{

  title="";
  content =""; 
  description = "";
  post : PostModel;
  form : FormGroup;
  isloading = false;
  imagePreview : string;
  private mode ="create";
  private postId :string;
  private authStatuSub :Subscription;
   
  constructor( public postService : PostServiceService, 
    public route :ActivatedRoute,
    public authService: AuthService ) { }

  ngOnInit(){
    this.authStatuSub =this.authService.getAuthStatusListener()
    .subscribe(
    authStatus => {
      this.isloading=false;
    });
    this.form = new FormGroup({
     'title': new FormControl(null,
               {validators: [Validators.required]}),
      'content' :new FormControl(null,
               {validators: [Validators.required]}),
      'description' : new FormControl(null, 
              {validators :[Validators.required]}),
     'image' : new FormControl(null,
                 {validators:[Validators.required],
                   asyncValidators:[mineType]})
    });
 this.route.paramMap.subscribe((paramap: ParamMap)=> {
     if(paramap.has('postId')) {
       this.mode ="edit";
       this.postId =paramap.get('postId');
       this.isloading= true;
        this.postService.getPost(this.postId).subscribe(postData => {
         this.isloading=false;
          this.post ={ 
            id:postData._id,
            title :postData.title,
             content:postData.content, 
             description:postData.description,
              imagePath:postData.imagePath,
             creator: postData.creator
            };
             this.form.setValue({
               'title' : this.post.title, 
                          'content': this.post.content, 
                          'description': this.post.description,
                          'image' :this.post.imagePath
                        });

           
        });
     }
     else {
       this.mode= "create";
       this.postId= null;
     }
 });
  }
  onImagePicked(event : Event){
    const file =(event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }  
  onPostInput( ){
    if(this.form.invalid){
      return;
    }
    this.isloading= true;
    if(this.mode === 'create'){
    this.postService.addPost(
     this.form.value.title,
      this.form.value.content,
      this.form.value.description,
      this.form.value.image )
      
    this.isloading= false;
    
    }else{
      this.postService.updatedPost(
        this.postId,
         this.form.value.title, this.form.value.content,
          this.form.value.description,
          this.form.value.image
          
          );
    }
      this.form.reset();
    //postservies is reciveing the object from html form.value.enterpost
   /* 
   const  post :PostModel =
    {title : form.value.enterPost, 
  content : form.value.enterContent, 
  description : form.value.enterDescription}
  console.log(post)

  //recived post object is send to app.component.ts file by using outPut decoratorn

    */
   }
ngOnDestroy(){
  this.authStatuSub.unsubscribe();
}  

}
