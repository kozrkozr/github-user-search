import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GithubService {

	private searchUrl = 'https://api.github.com/search/users?q=';
	private userUrl = 'https://api.github.com/users/';

	private checkedUsers;

	constructor(private http: HttpClient) {};
	
	getUsersByName(user: String):Observable<any> {
		let url = this.searchUrl + user;
		return this.http.get(url).pipe(map(data => {
			let usersList = data["items"];
			this.checkedUsers = usersList;
      return usersList;
		} ));
	};

	getUserInfo(username: String){
		let url = this.userUrl + username;
		return this.http.get(url);
 }

 	getCheckedUsers(){
		 return this.checkedUsers;
	 }
};
