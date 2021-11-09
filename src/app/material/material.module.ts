import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';


const materila =[
  MatButtonModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatDialogModule

]

// material is a property which hold the arry of modules 
//import and exports is use to provied the parth between material and app module file 
@NgModule({
  declarations: [],
  imports: [
    materila
  ],
  exports:[materila]

})
export class MaterialModule { }
