import { Injectable } from '@angular/core';
import { Herb, InventoryItem } from 'src/app/models/models';
import { DatabaseService } from '../database-service/database.service';
import { SaveService } from '../save-service/save.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    public databaseService: DatabaseService,
    public saveService: SaveService
  ) { }

  getRandom(min: number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  addItemQuantity(itemToAddEntry: InventoryItem, quantityToAdd: number): void{
    let checkedItem = this.saveService.gameInfo.inventory.find(itemCheck => itemCheck.name == itemToAddEntry.name);
    if(checkedItem){
    checkedItem.quantity += quantityToAdd;
  }
  }

  createHerbItem(databaseEntry: Herb, quantity: number){
    let item: InventoryItem = {name: 'item', cost: 0, weight: 0, quantity: 0, keywords: ['herb'], image: './assets/DefaultItem.webp', description: 'An unknown herb'}
    item.name = databaseEntry.name;
    item.cost = databaseEntry.cost;
    item.weight = databaseEntry.weight;
    item.quantity = quantity;
    item.keywords = ['herb'];
    item.image = databaseEntry.image;
    item.description = databaseEntry.description;
    return item;
  }

  SellItem(itemToSell: InventoryItem, quantityToSell: number): void{
    if(quantityToSell > itemToSell.quantity){
      quantityToSell = itemToSell.quantity;
    }
    this.saveService.gameInfo.coins += itemToSell.cost*quantityToSell;
    itemToSell.quantity -= quantityToSell;
  }

  discardItem(itemToDiscard: InventoryItem, quantityToDiscard: number): void{
    if(quantityToDiscard > itemToDiscard.quantity){
      quantityToDiscard = itemToDiscard.quantity;
    }
    itemToDiscard.quantity -= quantityToDiscard;
    if(itemToDiscard.quantity <= 0){
      this.clearInventorySlot(itemToDiscard);
    }
  }

  clearInventorySlot(item: InventoryItem): void{
    let indx:number = this.saveService.gameInfo.inventory.findIndex(itemToDel => itemToDel.name == item.name);
    this.saveService.gameInfo.inventory.splice(indx, 1);
  }

  itemPickup(Entry: InventoryItem): void{
  if(this.saveService.gameInfo.inventory.find(itemCheck => itemCheck.name == Entry.name)){
    this.addItemQuantity(Entry, Entry.quantity);
  }
  else {
    this.saveService.gameInfo.inventory.push(Entry);
  }
  this.saveService.writeGameInfo()
}

}
