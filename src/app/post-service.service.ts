import { Injectable } from '@angular/core';

import { PostModel} from '../app/model';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map }from 'rxjs/operators'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
 


const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({
  providedIn: 'root'
})

export class PostServiceService {
    private posts : PostModel [] =[];
    private postUpdate= new Subject<{posts:PostModel[], postCount: number}>();
    //Subject is fron rxjs which is use to subscribe the data in postmodel every new one
    constructor(private http :HttpClient , private router : Router) { }

  getPosts( postsPerPage :number, currentPage:number){
    const querryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
    .get<{message:string, posts:any, maxPosts:number}>(BACKEND_URL + querryParams)
    .pipe(map(postData =>{
      return {
        posts:postData.posts.map(post => {
        return {
          id: post._id,
          title : post.title,
          content: post.content,
          description :post.description,
          imagePath: post.imagePath,
          creator  : post.creator
        };
      }),
       maxPosts:postData.maxPosts };
    }))
    .subscribe((transformedPostData)=> {
       this.posts = transformedPostData.posts;
       this.postUpdate.next({
         posts:[...this.posts],
          postCount: transformedPostData.maxPosts});
    });

    //[...this.posts] is javascript method which hold set of arry of object
  }
  
  getPostUpdateListener(){
    return this.postUpdate.asObservable();  }
    
  getPost(id:string){
    return this.http.get<{
      _id:string ;
      title:string;
       content:string;
       description:string;
       imagePath:string;
       creator:string;          }>
    (BACKEND_URL +id);
  }

  updatedPost(id:string, title:string, content:string,description:string, image:File |string){
   // const post : PostModel ={id:id,title:title,content:content,description:description,imagePath:null};
   let postData;
   if(typeof(image)=== 'object'){
      postData = new FormData();

      postData.append("id", id);
     postData.append("title", title);
     postData.append("content", content);
     postData.append("description", description);
     postData.append("image", image, title);
   } else{
      postData={
       id:id,
       title:title,
       content:content,
       description:description,
       imagePath:image,
       creator:null
     };

   }
   this.http.put(BACKEND_URL + id, postData).
    subscribe(response => {
    //   const updatedPosts =[...this.posts];
    //   const oldPostIndex = updatedPosts.findIndex(p =>  p.id === id);
    //   const post: PostModel ={
    //   //   id:id,
    //   //   title:title,
    //   //   content:content,
    //   //   description:description,
    //   //   imagePath:""  // response.imagePath
    //   // }
    //   // updatedPosts[oldPostIndex]= post;
    //   // this.posts= updatedPosts;
    //   // this.postUpdate.next([...this.posts]);
    //   this.router.navigate(["/"]);
    // });
    this.router.navigate(["/"]);
  });
  }

    
    

    addPost(title:string, content : string, description :string, image:File){
     const postData = new FormData();
     postData.append("title", title);
     postData.append("content",content);
     postData.append("description",description);
     postData.append("image", image, title);
    // const  post : PostModel={id :null ,title:title,  description:description,content:content };
     // post in addPost method,  is stored the argument of object reciving 
     
    this.http.post<{message: string, post : PostModel}>
    (BACKEND_URL,postData)
    .subscribe((respondDate) => {
    //   const post :PostModel ={id:respondDate.post.id,
    //      title:title, content:content,
    //     description:description, 
    //     imagePath:respondDate.post.imagePath };
    //   //-- const id = respondDate.postId;
    //   //-- post.id= id;
    // this.posts.push(post);
    // return this.postUpdate.next([...this.posts]);
     this.router.navigate(["/"]);
    });
     //push method is used to push the data server for add new one    
     // we return the posts which stored by subject every next value
  }      

 deletePost(postId: string){
  return this.http.delete(BACKEND_URL + "/" + postId);
 }


}
