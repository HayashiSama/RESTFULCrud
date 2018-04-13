import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
  	//this.getTasks()
  }


	getTasks(){
	    return this._http.get('/tasks');  
	 }

	 getOneTask(id){
	 	return this._http.get('/tasks/' + id);	
	 	
	 }
	 newTask(newtask){
	 	return this._http.post('/new/', newtask);
	 }
	 editTask(edittask){
	 	return this._http.post('/update', edittask);
	 }
	 

	 removeTask(id){
	 	return this._http.get('/remove/' + id)
	 }

	 getPokemon(id){
	 	return this._http.get('https://pokeapi.co/api/v2/pokemon/' + id)
	 }

	 getAbility(url){
	 	return this._http.get(url)
	 }

 }