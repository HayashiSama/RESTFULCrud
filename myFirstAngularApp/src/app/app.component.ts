import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  

  title = 'MEAN';
  tasks: [any];
  showEdit = false;
  oneTask: any;
  newTask = {title:"", description: ""};
  pokemon: any;
  pokemonList: [string];
  ability: string;


   constructor(private _httpService: HttpService){}

//Fetch All tasks
   getAllTasks(): void {
     console.log("Clicked")
      let obs = this._httpService.getTasks()
      obs.subscribe(data => this.tasks = (data as any).data)
   }

// Creates New Task
   submitTask(){
     console.log(this.newTask)
     let obs = this._httpService.newTask(this.newTask);
     obs.subscribe(data =>
     {
       console.log(data)
       this.getAllTasks();
     })
     this.newTask = {title: "", description: ""}

   }

//Deletes Task
  deleteTask(delTask){
    let id = (delTask as any)._id
    console.log("deleting ", id)
    let obs = this._httpService.removeTask(id)
    obs.subscribe(data => {
      console.log("task deleted"))
      this.getAllTasks();  
  }


// Loads task to be edited
  editTask(editTask){
      let obs = this._httpService.getOneTask(editTask._id);
      obs.subscribe(data => {
      console.log(data)
        if((data as any).message == "Success"){
          this.oneTask = (data as any).data
          this.showEdit = true;
        }
        else{
          this.oneTask = undefined
        }
      }
    }
//saves edited Task
  saveTask(){
    let obs = this._httpService.editTask(this.oneTask);
     obs.subscribe(data =>
     {
       console.log(data)
       this.getAllTasks();
     })
     this.oneTask = {title: "", description: ""}
     this.getAllTasks();
     this.showEdit = false 
  }


  ngOnInit(){
    this.getAllTasks();
    //this.newTask("Kill Ian");
    
    //this.removeTask("5acfd18f19d2c471d37842e2")
    
    //this.getPokemon(37)
  }

  // getTasks(){
  //  console.log("getting tasks")


  // }




  // getPokemon(id){
  //   let obs = this._httpService.getPokemon(id)
  //   obs.subscribe(data => {
  //     this.pokemon = (data as any); 
  //     var abilityurl = (data as any).abilities[0].ability.url
  //     this.ability =  this.pokemon.abilities[0].ability.name
     
       
  //       let newobs = this._httpService.getAbility(abilityurl)
  //       newobs.subscribe(data =>{
  //          var temp = (data as any);
  //          var pokearray = data["pokemon"]
  //          for(var j = 0; j < pokearray.length; i++){
  //            console.log(pokearray[i]["pokemon"]["name"])
  //          }
       
           
  //       }
  //   }
      
  
  // }
  // getOneTask(id){
  //   console.log(id)
  //   if(id.length>1){
  //     let obs = this._httpService.getOneTask(id);
  //     obs.subscribe(data => {
  //     console.log(data)
  //     if((data as any).message == "Success"){
  //       this.onetask = (data as any).data
  //     }
  //     else{
  //       this.onetask = undefined
  //     }
      

  //    })
  //   }
  //   else{
  //     this.onetask = undefined  
  //   }
  // }
  





}
