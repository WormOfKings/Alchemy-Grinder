import { InventoryItem } from 'src/app/models/models';
import { ItemService } from 'src/app/services/item-service/item.service';
import { CraftingService } from './../../../services/crafting-service/crafting.service';
import { SaveService } from './../../../services/save-service/save.service';
import { Component, OnInit } from '@angular/core';
import { TimeService } from 'src/app/services/time-service/time.service';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.scss']
})
export class CraftingComponent implements OnInit {

  constructor(
    public craftingService: CraftingService,
    public saveService: SaveService,
    public itemService: ItemService,
    public timeService: TimeService,
  ) { }

  ngOnInit(): void {
  }

  changeDisplayModeMortar(): void {
    this.craftingService.displayModeMortar = !this.craftingService.displayModeMortar;
    this.craftingService.displayModeBarrel = false;
    this.craftingService.displayModeAlchWork = false;
  }

  changeDisplayModeBarrel(): void {
    this.craftingService.displayModeBarrel = !this.craftingService.displayModeBarrel;
    this.craftingService.displayModeMortar = false;
    this.craftingService.displayModeAlchWork = false;
  }

  changeDisplayModeAlchemyWorkbench(): void {
    this.craftingService.displayModeAlchWork = !this.craftingService.displayModeAlchWork;
    this.craftingService.displayModeBarrel = false;
    this.craftingService.displayModeMortar = false;
  }

  getQuantityOrEmptyStringIfEmpty(object: any) {
    if (!object) {
      return ''
    }
    return object.quantity;
  }

  getImageOrEmptySlot(object: any) {
    if (!object) {
      return './assets/empty_slot.jfif'
    }
    return object.image;
  }

  getNameOrEmptyString(object: any) {
    if (!object) {
      return ''
    }
    return object.name;
  }

  onClickCraftBarrel() {
    let index = this.craftingService.foundBarrelRecipeIndex();
    if (index !== undefined) {
      this.craftingService.craftBarrel(index)
      this.saveService.writeCraftingInfo();
      this.saveService.writeGameInfo();
    }
  }

  onClickCraftAlchemyWorkbench() {
    let craftSlot = this.saveService.craftingInfo.alchWorkbenchItemResult;
    if (craftSlot) { return }
    let result = this.craftingService.craftInAlchemyWorkbench();
    if (result) {
      this.saveService.craftingInfo.alchWorkbenchItemResult = result;
      this.saveService.craftingInfo.alchWorkbenchItems = [];
      this.timeService.skipTime(30);
      this.saveService.writeCraftingInfo();
      this.saveService.writeGameInfo();
    }
  }


}
