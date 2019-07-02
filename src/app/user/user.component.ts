import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubService } from '../shared/services/github.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  private name;
	private user;
	private error;

	aSub: Subscription;
	
	constructor(private GithubService: GithubService, private route: ActivatedRoute) { }

  ngOnInit() {
		const login = this.route.snapshot.params['login'];
    this.aSub = this.GithubService.getUserInfo(login).subscribe(
			data => { this.user = data, this.name = this.user.name ? this.user.name : 'User without name' },
			err => this.error = err
		)
	}
	
	ngOnDestroy(){
		if(this.aSub){
			this.aSub.unsubscribe();
		}
	}

	

}
