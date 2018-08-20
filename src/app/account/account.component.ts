import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Account} from './account.model';
import {AccountService} from '../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  displayedColumns = ['name', 'owner'];
  dataSource = new MatTableDataSource();
  accounts: Array<any>;
  constructor(private router: Router, private accountService: AccountService) {
  }
  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(
      data => {
        console.log(data);
        console.log(data);
        this.accounts = data;
        this.dataSource.data = data;
      }
    );
  }
}

