export interface CraftingRecipe {
    ingridients: {name: string, quantity: number}[],
    craftedItemName: string;
    craftedItemQuantity: number;
  }

  export interface CraftingInfo {
    mortarItem: InventoryItem | null;
    barrelItem: InventoryItem | null;
    alchWorkbenchItems: InventoryItem[];
    mortarItemResult: InventoryItem | null;
    barrelItemResult: InventoryItem | null;
    alchWorkbenchItemResult: InventoryItem | null;
  }

  export interface Herb {
    name: string,
    cost: number,
    areas: string[],
    prob: number,
    harvestMod: number,
    weight: number,
    image: string,
    description: string
  }

  export interface InventoryItem {
    name: string,
    cost: number,
    weight: number,
    quantity: number,
    keywords: string[],
    image: string,
    description: string
  }

  export interface GameInfo {
    coins: number,
    inventory: InventoryItem[],
    clock: Clock,
    craftingTimers: CraftingTimer[]
  }

  export interface CraftingTimer {
    minutes: number,
    hours: number,
    days: number,
    result: InventoryItem
  }

  export class Clock {
    private _minutes: number = 0;
    private _hours: number = 0;
    private _days: number = 0;

    constructor(minutes: number,  hours: number,  days: number){
      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
      console.log(`Calling constructor with: ${days} days, ${hours}:${minutes}`)
    }

    public set minutes(minutes: number) {
      if (minutes < 0){
        return;
      }
      const leftoverMinutes = minutes % 60;
      const hours = Math.floor(minutes / 60);
      this._minutes = leftoverMinutes;
      this.hours += hours;
    }

    public get minutes() {
      return this._minutes;
    }

    public set hours(hours: number){
      if (hours < 0){
        return;
      }
      const leftoverHours = hours % 24;
      const days = Math.floor(hours / 24);
      this._hours = leftoverHours;
      this.days += days;
    }

    public get hours() {
      return this._hours;
    }

    public set days(days: number){
      this._days = days;
    }

    public get days() {
      return this._days;
    }
  }

  export enum IngridientQuantityMistakeEnum {
    TooHigh,
    TooLow,
    Exact,
    NotFound
  }

  export enum CraftingRecipeOutputType {
    Exact,
    AllTooHigh,
    AllTooLow,
    TooHigh_MoreThan_TooLow,
    TooHigh_LessThan_TooLow,
    TooHigh_Equal_TooLow,
    WrongRecipe
  }
