import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GithubService } from '../shared/services/github.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

	form: FormGroup;
	username: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]);
	aSub: Subscription;
	showMessage: boolean = false;

	//table data settings
	displayedColumns: string[] = ['id', 'login'];
	dataSource;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	
  constructor(private GithubService: GithubService) { }
   
  ngOnInit() {
		this.form = new FormGroup({
			username: this.username
		})
		
		//check for already exsiting users list
		if(this.GithubService.getCheckedUsers()){
			let users = this.GithubService.getCheckedUsers();
			this.dataSource = new MatTableDataSource<any>(users);
			this.dataSource.paginator = this.paginator
		}
	}

	ngOnDestroy(){
		if(this.aSub){
			this.aSub.unsubscribe();
		}
	}

	getErrorMessage() {
		return this.username.hasError('required') ? 'You must enter a value' :
			this.username.hasError('pattern') ? 'Only letters or numbers' :
				'';
	}

	getUsersByName(user: String){
		this.aSub = this.GithubService.getUsersByName(user).subscribe(
			data => {
					if(data.length === 0) {
						this.showMessage = true;
					} else { 
						this.showMessage = false;
						this.dataSource = new MatTableDataSource<any>(data),
						this.dataSource.paginator = this.paginator 
					}
				}, 
			err => console.log(err)
		);
	}

	

}
