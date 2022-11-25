import { TimeService } from './services/time-service/time.service';
import { ItemService } from 'src/app/services/item-service/item.service';
import { SaveService } from './services/save-service/save.service';
import { DatabaseService } from './services/database-service/database.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alchemy-grinder';
  currentOpenedIndex = -1;
  constructor(
    public databaseService: DatabaseService,
    public saveService: SaveService,
    public itemService: ItemService,
    public timeService: TimeService,
  ) {
  }

  onOpenTooltip(event: any, index: number) {
    if (this.currentOpenedIndex == index) {
      this.currentOpenedIndex = -1;
      return;
    }
    this.currentOpenedIndex = index
  }
}
// ng serve
// npm install -g "@angular/cli"
//Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
//ng add @angular/material

// cd src/app/services/database-service
  // ng generate service database
  // OR
  // ng generate component myComponent
