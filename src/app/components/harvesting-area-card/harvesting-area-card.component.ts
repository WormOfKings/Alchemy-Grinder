import { Component, Input, OnInit } from '@angular/core';
import { Herb } from 'src/app/models/models';
import { DatabaseService } from 'src/app/services/database-service/database.service';
import { ItemService } from 'src/app/services/item-service/item.service';
import { SaveService } from 'src/app/services/save-service/save.service';
import { TimeService } from 'src/app/services/time-service/time.service';

@Component({
  selector: 'app-harvesting-area-card[zone][src]',
  templateUrl: './harvesting-area-card.component.html',
  styleUrls: ['./harvesting-area-card.component.scss']
})
export class HarvestingAreaCardComponent implements OnInit {
  @Input() zone!: string;
  @Input() src!: string;
  isCollapsed = true;
  constructor(
    public databaseService: DatabaseService,
    public itemService: ItemService,
    public saveService: SaveService,
    public timeService: TimeService,) { }

  ngOnInit() {
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  getHerbsStringByZone(zone: string): string {
    const herbs = this.databaseService.allHerbsWeHave.filter(h => h.areas.includes(zone)).map(h => h.name);
    return herbs.join(', ') + '.'
  }

  getRandomHerbInZone(area: string): Herb {
    let min = 1
    let max = 0
    let zoneHearbs = this.databaseService.allHerbsWeHave.filter(herb => herb.areas.includes(area))
    zoneHearbs.forEach(herb => {
      max += herb.prob
    })
    let random = this.itemService.getRandom(min, max)
    let lastHerb: Herb = zoneHearbs[0];
    let currentSum = 0;
    zoneHearbs.forEach(herb => {
      if (random > currentSum) {
        currentSum += herb.prob;
        lastHerb = herb;
      }
    })
    return lastHerb;
  }

  addHerbquantity(itemToAddEntry: Herb, quantityToAdd: number): void {
    let checkedItem = this.saveService.gameInfo.inventory.find(itemCheck => itemCheck.name == itemToAddEntry.name);
    if (checkedItem) {
      checkedItem.quantity += quantityToAdd;
    }
  }

  onClickGetRandomHerb(zone: string): void {
    const randomHerbEntry = this.getRandomHerbInZone(zone);
    const harvestQuantity = this.itemService.getRandom(0, 4) * randomHerbEntry.harvestMod + 1;
    if (this.saveService.gameInfo.inventory.find(itemCheck => itemCheck.name == randomHerbEntry.name)) {
      this.addHerbquantity(randomHerbEntry, harvestQuantity);
    }
    else {
      this.saveService.gameInfo.inventory.push(this.itemService.createHerbItem(randomHerbEntry, harvestQuantity));
    }
    this.timeService.skipTime(0, 4);
    this.saveService.writeGameInfo();
  }
}
