import { Component, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material";
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Observable, merge } from 'rxjs';

class Todo {
  id: string;
  description: string;
  complete: boolean;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor() {
    const todos: Todo[] = [{ id: '123', description: 'Complete me!', complete: false }];
    this.dataSource = new MatTableDataSource(todos);
  }
  form:FormGroup = new FormGroup({
    id: new FormControl(false),
    description: new FormControl(false)
  });

  id = this.form.get('id');
  description = this.form.get('description');

  cbValues;

  /**
   * Control column ordering and which columns are displayed.
   */

  columnDefinitions = [
    { def: 'id', label: 'ID', hide: this.id.value},
    { def: 'description', label: 'Description', hide: this.description.value}
  ]

  getDisplayedColumns():string[] {
    return this.columnDefinitions.filter(cd=>!cd.hide).map(cd=>cd.def);
  }
  
  dataSource: MatTableDataSource<Todo>;
  ngAfterViewInit() {
   let o1:Observable<boolean> = this.id.valueChanges;
   let o2:Observable<boolean> = this.description.valueChanges;

   merge(o1, o2).subscribe( v=>{
   this.columnDefinitions[0].hide = this.id.value;
   this.columnDefinitions[1].hide = this.description.value;  
      console.log(this.columnDefinitions);
    });
  }
}