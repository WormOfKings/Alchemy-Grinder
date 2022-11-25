import { TimeService } from './../time-service/time.service';
import { DatabaseService } from 'src/app/services/database-service/database.service';
import { SaveService } from 'src/app/services/save-service/save.service';
import { ItemService } from 'src/app/services/item-service/item.service';
import { Injectable } from '@angular/core';
import {
  CraftingInfo,
  CraftingRecipe,
  CraftingRecipeOutputType,
  IngridientQuantityMistakeEnum,
  InventoryItem,
} from 'src/app/models/models';

@Injectable({
  providedIn: 'root',
})
export class CraftingService {

readonly INGRIDIENT_QUANTITY_MINIMUM = 0.5;
readonly INGRIDIENT_QUANTITY_MAXIMUM = 1.5;
displayModeMortar = false;
displayModeBarrel = false;
displayModeAlchWork = false;

  constructor(
    public itemService: ItemService,
    public saveService: SaveService,
    public databaseService: DatabaseService,
    public timeService: TimeService,
  ) { }


  getItemsFromAlchemyWorkbench():InventoryItem []{
    return this.saveService.craftingInfo.alchWorkbenchItems;
  }

  getItemFromBarrel():InventoryItem | null{
    return this.saveService.craftingInfo.barrelItem;
  }

  getAlchemyWorkbenchRecipes(): CraftingRecipe[]{
    return this.databaseService.allAlchemyRecipiesWeHave;
  }

  getBarrelRecipes(): CraftingRecipe[]{
    return this.databaseService.allAlchemyRecipiesWeHave;
  }

  private checkIfRecipeIngridientInWorkbench(recipeIngridient: {name: string, quantity: number}, workbenchItems: InventoryItem[]): boolean {
      const foundIngridient = workbenchItems.find(
        (workbenchItem) =>
        workbenchItem.name == recipeIngridient.name &&
        workbenchItem.quantity > recipeIngridient.quantity*this.INGRIDIENT_QUANTITY_MINIMUM &&
        workbenchItem.quantity < recipeIngridient.quantity*this.INGRIDIENT_QUANTITY_MAXIMUM
      );
      return !!foundIngridient;
  }

  private checkIfItemsMatchRecipe(workbenchItems: InventoryItem[], recipe: CraftingRecipe): boolean {
    if (workbenchItems.length !== recipe.ingridients.length) {
      return false;
    }
    for (let i=0; i < recipe.ingridients.length; i++ ) {
      const result = this.checkIfRecipeIngridientInWorkbench(recipe.ingridients[i], workbenchItems);
      if (!result){
        return false;
      }
    }
    return true;
  }

  private findRecipeIndex(workbenchItems: InventoryItem[], recipeBase: CraftingRecipe[]): number {
    return recipeBase.findIndex(recipe =>
      this.checkIfItemsMatchRecipe(workbenchItems, recipe));
  }

  private checkIfIngridientQuantityMistake(igridient: {name: string, quantity: number}, workbenchItem: InventoryItem): IngridientQuantityMistakeEnum {
    const quantityDifference = workbenchItem.quantity - igridient.quantity;
    if (quantityDifference > 0){
      return IngridientQuantityMistakeEnum.TooHigh;
    }
    if (quantityDifference < 0){
      return IngridientQuantityMistakeEnum.TooLow;
    }
    return IngridientQuantityMistakeEnum.Exact;
  }

  private countIngridienQuantityMistakesArray(recipe: CraftingRecipe, workbenchItems: InventoryItem[]) {
    return recipe.ingridients.map(ingridient => {
      const foundItem = workbenchItems.find(workbenchItem => workbenchItem.name == ingridient.name);
      if (!foundItem){
        return IngridientQuantityMistakeEnum.NotFound;
      }
      return this.checkIfIngridientQuantityMistake(ingridient, foundItem);
    });
  }

  private checkRecipeMistakeTypeIfNotExact(recipe: CraftingRecipe, workbenchItems: InventoryItem[]): CraftingRecipeOutputType {
    const ingridientsCheckResults = this.countIngridienQuantityMistakesArray(recipe, workbenchItems);
    const tooLowMistakesCount = ingridientsCheckResults.filter(mistake => mistake == IngridientQuantityMistakeEnum.TooLow).length;
    const tooHighMistakesCount = ingridientsCheckResults.filter(mistake => mistake == IngridientQuantityMistakeEnum.TooHigh).length;
    const exactCount = ingridientsCheckResults.filter(mistake => mistake == IngridientQuantityMistakeEnum.Exact).length;
    const notFoundMistakesCount = ingridientsCheckResults.filter(mistake => mistake == IngridientQuantityMistakeEnum.NotFound).length;
    const mistakeArrayLength = ingridientsCheckResults.length - exactCount;

    if (notFoundMistakesCount > 0){
      return CraftingRecipeOutputType.WrongRecipe;
    }

    if (exactCount == ingridientsCheckResults.length){
      return CraftingRecipeOutputType.Exact;
    }

    if (tooHighMistakesCount == mistakeArrayLength){
      return CraftingRecipeOutputType.AllTooHigh;
    }
    if (tooLowMistakesCount == mistakeArrayLength){
      return CraftingRecipeOutputType.AllTooLow;
    }

    if (tooHighMistakesCount ==  tooLowMistakesCount){
      return CraftingRecipeOutputType.TooHigh_Equal_TooLow;
    }

    if (tooHighMistakesCount > tooLowMistakesCount){
      return CraftingRecipeOutputType.TooHigh_MoreThan_TooLow;
    }

    if (tooHighMistakesCount < tooLowMistakesCount){
      return CraftingRecipeOutputType.TooHigh_LessThan_TooLow;
    }

    return CraftingRecipeOutputType.WrongRecipe;
  }

  craftInAlchemyWorkbench(): InventoryItem | undefined {
    let result!: InventoryItem;
    const workbenchItems = this.getItemsFromAlchemyWorkbench();
    if (workbenchItems.length == 0){
      return
    }
    const recipes = this.getAlchemyWorkbenchRecipes();
    const recipeIndex = this.findRecipeIndex(workbenchItems, recipes);
    if (recipeIndex == -1){
      result = structuredClone(this.databaseService.allPotionsWeHave[0]);
      result.quantity = 1;
      return result;
    }
    const craftingOutputType = this.checkRecipeMistakeTypeIfNotExact(recipes[recipeIndex], workbenchItems);
    switch(craftingOutputType){
      case(CraftingRecipeOutputType.AllTooHigh): {
        result = structuredClone(this.databaseService.allPotionsWeHave[4]);
        result.quantity = 1;
        break;
      }

      case(CraftingRecipeOutputType.AllTooLow): {
        result = structuredClone(this.databaseService.allPotionsWeHave[3]);
        result.quantity = 1;
        break;
      }
      case(CraftingRecipeOutputType.Exact): {
        let recipe = recipes[recipeIndex];
        let alchResult = this.databaseService.allPotionsWeHave.find(potion => potion.name == recipe.craftedItemName);
        if (alchResult == undefined){
          throw new Error(`Flask from recipe not exists; flask name: ${recipe.craftedItemName}`)
        };
        result = structuredClone(alchResult);
        result.quantity = recipe.craftedItemQuantity;
        break;
      }
      case(CraftingRecipeOutputType.TooHigh_LessThan_TooLow): {
        result = structuredClone(this.databaseService.allPotionsWeHave[1]);
        result.quantity = 1;
        break;
      }
      case(CraftingRecipeOutputType.TooHigh_MoreThan_TooLow): {
        result = structuredClone(this.databaseService.allPotionsWeHave[2]);
        result.quantity = 1;
        break;
      }
      case(CraftingRecipeOutputType.TooHigh_Equal_TooLow): {
        result = structuredClone(this.databaseService.allPotionsWeHave[1]);
        result.quantity = 1;
        break;
      }
    }
    return result;
  }

  foundBarrelRecipeIndex(): number {
    let recipeIndex = -1;
    for (
      let i = 0; i < this.databaseService.allBarrelRecipiesWeHave.length; i++) {
      let isCurrentRecipe = true;
      this.databaseService.allBarrelRecipiesWeHave[i].ingridients.forEach(
        (ingr) => {
          if (this.saveService.craftingInfo.barrelItem && this.saveService.craftingInfo.barrelItem.name == ingr.name &&
            this.saveService.craftingInfo.barrelItem.quantity >= ingr.quantity) {
          }
          else {isCurrentRecipe = false};
        }
      );
      if (isCurrentRecipe) {
        recipeIndex = i;
      }
    }
    return recipeIndex;
  }

  craftBarrel(indexRecipe: number): void{
    const BARREL_CRAFT_TIME_IN_MINUTES = 0;
    const BARREL_CRAFT_TIME_IN_HOURS = 4;
    const BARREL_CRAFT_TIME_IN_DAYS = 0;
    if (!this.saveService.craftingInfo.barrelItem || this.saveService.craftingInfo.barrelItemResult){
      return;
    }
    const wrongResult = structuredClone(this.databaseService.allPotionsWeHave[3]);
    wrongResult.quantity = 1;

    if (indexRecipe == -1){
      this.timeService.addCraftingTimer(BARREL_CRAFT_TIME_IN_MINUTES, BARREL_CRAFT_TIME_IN_HOURS, BARREL_CRAFT_TIME_IN_DAYS, wrongResult);
      this.saveService.craftingInfo.barrelItem = null;
      return;
    }

    let recipe = this.databaseService.allBarrelRecipiesWeHave[indexRecipe];
    let alchResult = this.databaseService.allPotionsWeHave.find(potion => potion.name == recipe.craftedItemName);
    if (alchResult == undefined) {
      return;
    };

    const craftQuantityMultiplier = Math.floor(this.saveService.craftingInfo.barrelItem.quantity / recipe.ingridients[0].quantity);
    if (craftQuantityMultiplier == 0){
      this.timeService.addCraftingTimer(BARREL_CRAFT_TIME_IN_MINUTES, BARREL_CRAFT_TIME_IN_HOURS, BARREL_CRAFT_TIME_IN_DAYS, wrongResult);
      return;
    }
    const normalResult = structuredClone(alchResult);
    normalResult.quantity = recipe.craftedItemQuantity * craftQuantityMultiplier;
    this.timeService.addCraftingTimer(
      BARREL_CRAFT_TIME_IN_MINUTES*craftQuantityMultiplier,
      BARREL_CRAFT_TIME_IN_HOURS*craftQuantityMultiplier,
      BARREL_CRAFT_TIME_IN_DAYS*craftQuantityMultiplier, normalResult);
    this.saveService.craftingInfo.barrelItem = null;
  }

  public isBarrelCraftAllowed(): boolean {
    return (!this.saveService.craftingInfo.barrelItemResult && this.saveService.gameInfo.craftingTimers.length == 0 && this.saveService.craftingInfo.barrelItem !== null)
  }

  public isMortarCraftAllowed(): boolean {
    return (this.saveService.craftingInfo.mortarItem !== null)
  }

  public isAlchemyCraftAllowed(): boolean {
    return (!this.saveService.craftingInfo.alchWorkbenchItemResult && this.saveService.craftingInfo.alchWorkbenchItems.length !== 0)
  }


  createEssence(ingridient: InventoryItem): InventoryItem {
    if(ingridient.name == 'Deathroot'){
      let essence = structuredClone(this.databaseService.allPotionsWeHave[5]);
      essence.quantity = ingridient.weight;
      return essence;
    }
    let essence: InventoryItem = {
      name: ingridient.name + ' ' + 'Essence',
      cost: 0,
      weight: 0,
      quantity: ingridient.weight,
      keywords: ['ingridient'],
      image: ingridient.image,
      description: ingridient.description + ' Reduced to essence.',
    };
    return essence;
  }

  craftEssence(): void {
    if ( !this.saveService.craftingInfo.mortarItem ||
      !this.saveService.craftingInfo.mortarItem.keywords.includes('herb')
    ) {return}
    let essence = this.createEssence(this.saveService.craftingInfo.mortarItem);
    if (this.saveService.craftingInfo.mortarItemResult &&
      this.saveService.craftingInfo.mortarItemResult.name !== essence.name
    ) {return }
      if(this.saveService.craftingInfo.mortarItemResult){
        if(this.saveService.craftingInfo.mortarItemResult.name == essence.name){
          this.saveService.craftingInfo.mortarItemResult.quantity += essence.quantity;
      };
      }
      else {
        this.saveService.craftingInfo.mortarItemResult = essence;}
      this.saveService.craftingInfo.mortarItem.quantity--;
      if (this.saveService.craftingInfo.mortarItem.quantity <= 0) {
        this.saveService.craftingInfo.mortarItem = null;
      }
      this.timeService.skipTime(5);
      this.saveService.writeCraftingInfo();
      this.saveService.writeGameInfo();
  }

  addItemToSlot(item: InventoryItem, Quantity: number, slot:InventoryItem | null, keyword:string): InventoryItem | undefined{
    if (
      !item.keywords.includes(keyword) ||
      (slot && slot.name !== item.name)
    ) {
      return;
    }
    if(item.quantity < Quantity){
      Quantity = item.quantity
    }
    this.itemService.discardItem(item, Quantity);
    if (slot) {
      slot.quantity += Quantity;
    } else {
      slot = structuredClone(item);
      slot.quantity = Quantity;
      return slot
    }
    return
  }

  addItemToMortar(item: InventoryItem, Quantity: number): void{
    let result = this.addItemToSlot(item, Quantity, this.saveService.craftingInfo.mortarItem, 'herb');
    if(result){
      this.saveService.craftingInfo.mortarItem = result;
    }
    this.saveService.writeCraftingInfo();
    this.saveService.writeGameInfo();
  }

  addItemToBarrel(item: InventoryItem, Quantity:number): void {
    if(this.saveService.gameInfo.craftingTimers.length !== 0){
      return
    }
    let result = this.addItemToSlot(item, Quantity, this.saveService.craftingInfo.barrelItem, 'ingridient');
    if(result){
      this.saveService.craftingInfo.barrelItem = result;
    }
    this.saveService.writeCraftingInfo();
    this.saveService.writeGameInfo();
  }

  removeItemFromMortar(): void {
    if (!this.saveService.craftingInfo.mortarItem) {
      return;
    }
    this.itemService.itemPickup(this.saveService.craftingInfo.mortarItem);
    this.saveService.craftingInfo.mortarItem = null;
    this.saveService.writeCraftingInfo();
    this.saveService.writeGameInfo();
  }

  removeItemFromMortarResult(): void {
    if (!this.saveService.craftingInfo.mortarItemResult) {
      return;
    }
    this.itemService.itemPickup(this.saveService.craftingInfo.mortarItemResult);
    this.saveService.craftingInfo.mortarItemResult = null;
    this.saveService.writeCraftingInfo();
    this.saveService.writeGameInfo();
  }

  removeItemFromBarrel(): void {
    if (!this.saveService.craftingInfo.barrelItem) {
      return;
    }
    this.itemService.itemPickup(this.saveService.craftingInfo.barrelItem);
    this.saveService.craftingInfo.barrelItem = null;
    this.saveService.writeCraftingInfo();
    this.saveService.writeGameInfo();
  }

  removeItemFromBarrelResult(): void {
    if (!this.saveService.craftingInfo.barrelItemResult) {
      return;
    }
    this.itemService.itemPickup(this.saveService.craftingInfo.barrelItemResult);
    this.saveService.craftingInfo.barrelItemResult = null;
    this.saveService.writeCraftingInfo();
    this.saveService.writeGameInfo();
  }

  removeItemAlchemyWorkbenchResult(): void {
    if (!this.saveService.craftingInfo.alchWorkbenchItemResult) {
      return;
    }
    this.itemService.itemPickup(this.saveService.craftingInfo.alchWorkbenchItemResult);
    this.saveService.craftingInfo.alchWorkbenchItemResult = null;
    this.saveService.writeCraftingInfo();
    this.saveService.writeGameInfo();
  }

  addItemAlchemyWorkbench(item: InventoryItem, Quantity:number): void {
    if (this.saveService.craftingInfo.alchWorkbenchItemResult) {return }
    if (!item.keywords.includes('ingridient')) {
      return;
    }
    if (item.quantity < Quantity){
      Quantity = item.quantity;
    }
    let WorkbenchItem = this.saveService.craftingInfo.alchWorkbenchItems.find(
      (itemCheck) => itemCheck.name == item.name
    );
    if (WorkbenchItem) {
      WorkbenchItem.quantity += Quantity;
      this.itemService.discardItem(item, Quantity);
    } else if (this.saveService.craftingInfo.alchWorkbenchItems.length <= 4) {
      WorkbenchItem = structuredClone(item);
      this.saveService.craftingInfo.alchWorkbenchItems.push(WorkbenchItem);
      WorkbenchItem.quantity = Quantity;
      this.itemService.discardItem(item, Quantity);
    }
    this.saveService.writeCraftingInfo();
    this.saveService.writeGameInfo();
  }

  removeItemAlchemyWorkbench(index:number): void {
    if (this.saveService.craftingInfo.alchWorkbenchItems.length == 0) {
      return;
    }
    this.itemService.itemPickup(this.saveService.craftingInfo.alchWorkbenchItems[index]);
    this.saveService.craftingInfo.alchWorkbenchItems.splice(index, 1);
    this.saveService.writeCraftingInfo();
    this.saveService.writeGameInfo();
  }

  itemToResult(Entry: InventoryItem, WorkbenchSlot: InventoryItem | null, Quantity: number): void{
    if(WorkbenchSlot){
      if(WorkbenchSlot.name == Entry.name){
         WorkbenchSlot.quantity += Quantity;
    };
    }
    else {
      WorkbenchSlot = structuredClone(Entry);
      WorkbenchSlot.quantity = Quantity;
    }
    this.saveService.writeCraftingInfo()
  }

}
