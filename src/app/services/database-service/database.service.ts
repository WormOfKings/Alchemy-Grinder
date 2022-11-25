import { Injectable } from '@angular/core';
import { CraftingRecipe, Herb, InventoryItem } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  allHerbsWeHave: Herb[] = [];
  allPotionsWeHave: InventoryItem[] =[];
  allBarrelRecipiesWeHave: CraftingRecipe[] =[];
  allAlchemyRecipiesWeHave: CraftingRecipe[] = [];

  constructor() {
    this.initializeHerbDatabase(this.allHerbsWeHave);
    this.initializePotionsDatabase(this.allPotionsWeHave);
    this.initializeBarrelRecipes(this.allBarrelRecipiesWeHave);
    this.initializeAlchemyRecipes(this.allAlchemyRecipiesWeHave);
  }


  createHerb(name:string, cost:number, areas: string[], prob:number, harvestMod:number, weight:number, image: string, description: string): Herb {
    return {
        name: name,
        cost: cost,
        areas: areas,
        prob: prob,
        harvestMod: harvestMod,
        weight: weight,
        image: image,
        description: description,
    }
  }

  createPotion(name: string, cost:number, weight:number, quantity: number, keywords: string[], image: string, description: string): InventoryItem{
    return{
      name: name,
      cost: cost,
      weight: weight,
      quantity: quantity,
      keywords: keywords,
      image: image,
      description: description
    }
  }

  createRecipe(name: string, ingridients:[], craftedItemName:string, craftedItemQuantity: number): CraftingRecipe{
    return{
      ingridients: ingridients,
      craftedItemName: craftedItemName,
      craftedItemQuantity: craftedItemQuantity
    }
  }

  initializePotionsDatabase(potionsDatabase: InventoryItem[]): void {
    potionsDatabase.push(this.createPotion('Goo', 0, 200, 1, ['goo'], './assets/Goo.webp', 'Everything is wrong'));
    potionsDatabase.push(this.createPotion('Strange Goo', 0, 200, 1, ['goo'], './assets/Goo.webp', 'Something is wrong'));
    potionsDatabase.push(this.createPotion('Thick Goo', 0, 200, 1, ['goo'], './assets/Goo.webp', 'Something is wrong'));
    potionsDatabase.push(this.createPotion('Liquid Goo', 0, 200, 1, ['goo'], './assets/Goo.webp', 'Maybe, if i increase ammount...'));
    potionsDatabase.push(this.createPotion('Solid Goo', 0, 200, 1, ['goo'], './assets/Goo.webp', 'Maybe, too much...'));
    potionsDatabase.push(this.createPotion('Poison Substance', 0, 1, 1, ['ingridient'], './assets/Poison.webp', 'An extract that the has been used to induce hallucinations for centuries. Poison-making is prohibited, so...'));
    potionsDatabase.push(this.createPotion('Antivenom Salve', 0, 80, 1, ['ingridient'], './assets/Antivenom Salve.webp', 'The neutralized posion from a particularly toxic plant.'));
    potionsDatabase.push(this.createPotion('Strange Water', 4, 200, 0, ['ingridient'], './assets/Strange_water.png', 'Core ingridient for basic potions.'));
    potionsDatabase.push(this.createPotion('Chemical Tube', 18, 100, 0, ['ingridient'], './assets/TUBE_GREEN.webp', 'I can use it, but how?'));
    potionsDatabase.push(this.createPotion('Experimental Substances', 40, 30, 0, ['ingridient'], './assets/EXPERIMENTAL_SUBSTANCE.webp', 'I can use it, but how?'));

    potionsDatabase.push(this.createPotion('Bloodwort Brew', 10, 200, 0, ['potion', 'eff_healing'], './assets/bloodwort_brew.png', 'Sometimes the hardiest plants are what keep you hardy.'));
    potionsDatabase.push(this.createPotion('Mortal Hex', 12, 200, 0, ['potion', 'eff_healing'], './assets/DefaultPotion.webp', 'Healing potion. Dear substance of kin.'));
    potionsDatabase.push(this.createPotion('Spicy Cola', 12, 200, 0, ['potion', 'eff_healing'], './assets/DefaultPotion.webp', 'The desert suffers nothing to live, but we have learned ways to survive'));
    potionsDatabase.push(this.createPotion('Reishi Tea', 12, 200, 0, ['potion', 'eff_healing'], './assets/Reishi_tea_icon.webp', 'A natural drink with healing properties.'));
    potionsDatabase.push(this.createPotion('Ugdenjuice', 12, 200, 0, ['potion', 'eff_healing'], './assets/DefaultPotion.webp', 'The Bog can guide you, nourish you. Drink from this cup, and it will heal you.'));
    potionsDatabase.push(this.createPotion('Royal Jelly Balm', 14, 200, 0, ['potion', 'eff_healing'], './assets/jelly_extract.png', 'A healing concoction made from concentrated Royal Jelly.'));
    potionsDatabase.push(this.createPotion('Medicinal Cola', 12, 200, 0, ['potion', 'eff_healing'], './assets/Soda.webp', 'Mint cola, yep, no mint, i know.'));

    potionsDatabase.push(this.createPotion('White Tea', 10, 200, 0, ['potion', 'eff_rest'], './assets/WHITE_TEA.webp', 'Energy restoring tea. You have to extend you pinky while you drink this, of course, and you should always add a spot of milk.'));
    potionsDatabase.push(this.createPotion('Rose Hip Tea', 10, 200, 0, ['potion', 'eff_rest'], './assets/Rose_hip_tea_icon.webp', 'It has a bite to it, but it will really wake you up.'));
    potionsDatabase.push(this.createPotion('Deep Energy', 10, 200, 0, ['potion', 'eff_rest'], './assets/ENERGOCOLA.webp', 'This concoction can give you stamina beyond measure.'));

    potionsDatabase.push(this.createPotion('Touch of Fever', 12, 200, 0, ['potion', 'eff_touch'], './assets/DefaultPotion.webp', 'Extra sensation.'));
    potionsDatabase.push(this.createPotion('Aroma Green', 12, 200, 0, ['potion', 'eff_smell'], './assets/DefaultPotion.webp', 'A powerful elixir employed by hunters and assassins to better track their prey.'));
    potionsDatabase.push(this.createPotion('Teardrop', 12, 200, 0, ['potion', 'eff_vision'], './assets/DefaultPotion.webp', 'Vision enhansing potion.'));
    potionsDatabase.push(this.createPotion('Red Veil', 12, 200, 0, ['potion', 'eff_hearing'], './assets/DefaultPotion.webp', 'Hearing enhansing potion.'));

    potionsDatabase.push(this.createPotion('Icefruit Juice', 12, 200, 0, ['potion', 'eff_focus'], './assets/DefaultPotion.webp', 'Clarity. Focus. Conviction. Reisum slaughters any who lack these things.'));
    potionsDatabase.push(this.createPotion('Spiceroot Brew', 12, 200, 0, ['potion', 'eff_coldRes'], './assets/spiceroot_brew.png', 'Warming potion.'));
    potionsDatabase.push(this.createPotion('Weeping Water', 12, 200, 0, ['potion', 'eff_waterAdapt'], './assets/hydrocoolant.png', 'Water breathing potion.'));
    potionsDatabase.push(this.createPotion('Greenleaf Tea', 12, 200, 0, ['potion', 'eff_coruptionRes'], './assets/Birch_Bark_Tea_icon.webp', 'To fight against the swamp is to beg at Death feet. The only way to survive is to join it or use it to your advantage'));
    potionsDatabase.push(this.createPotion('Wonder Cola', 12, 200, 0, ['potion', 'eff_nightVision'], './assets/elixir_of_enlightenment.png', 'Night vision potion. if you stare in the void...'));

    potionsDatabase.push(this.createPotion('Dragon Kick', 12, 200, 0, ['potion', 'eff_martial'], './assets/CAN_BEER.webp', 'Learn from those what came first. Pass it on to those what came next. That is how the human race remains a remnant instead of a memory.'));
    potionsDatabase.push(this.createPotion('Steady Cola', 12, 200, 0, ['potion', 'eff_steady'], './assets/mudtooths_tonic.png', 'Potion used by sharpooters, for extra precision.'));
    potionsDatabase.push(this.createPotion('Steel Coffee', 13, 200, 0, ['potion', 'eff_mentalResist'], './assets/mudtooths_stew.png', 'Rejuvenates the mind and spirit.'));
    potionsDatabase.push(this.createPotion('Chicha Morada', 12, 200, 0, ['potion', 'eff_damageReduc'], './assets/CHICHA.webp', 'A corn-based beverage that is both refreshing and nourishing. Very highly regarded in Peru. But, hey... you are probably not Peruvian.'));
    potionsDatabase.push(this.createPotion('Mojito Apocalypto', 12, 200, 0, ['potion', 'eff_refresh'], './assets/Mojito_apoc.webp', 'Like a real Mojito. But without alcohol. Or lemon, mint, and ice. In fact, it is nothing like a Mojito.'));

    potionsDatabase.push(this.createPotion('"Orange" Speed', 30, 200, 0, ['potion', 'eff_pSpeed'], './assets/Orange_potion.webp', 'For running faster.'));
    potionsDatabase.push(this.createPotion('"Green" Balance', 30, 200, 0, ['potion', 'eff_pBalance'], './assets/Green_potion.webp', 'Let you stay upright, even after getting hit hard.'));
    potionsDatabase.push(this.createPotion('"Brown" Defense', 30, 200, 0, ['potion', 'eff_pDefense'], './assets/Brown_potion.webp', 'Reduces damage taken.'));
    potionsDatabase.push(this.createPotion('"Yellow" Energy', 30, 200, 0, ['potion', 'eff_pEnergy'], './assets/Yellow_potion.webp', 'For recovering energy faster after exerting yourself.'));
    potionsDatabase.push(this.createPotion('"Purple" Strength', 30, 200, 0, ['potion', 'eff_pStrength'], './assets/Purple_potion.webp', 'For hitting harder and carrying heavier loads.'));
    potionsDatabase.push(this.createPotion('"Cyan" Ultra-precision', 30, 200, 0, ['potion', 'eff_pPrecision'], './assets/Cyan_potion.webp', 'For making faster precise shots.'));

    potionsDatabase.push(this.createPotion('Antidote', 10, 50, 0, ['potion', 'eff_antidote'], './assets/oilskin_balm.png', 'A sweet-smelling concoction that neutralizes most toxins.'));
    potionsDatabase.push(this.createPotion('Painkiller', 12, 20, 0, ['potion', 'eff_painAway'], './assets/Painkillers_icon.webp', 'A bottle of Painkillers. Take it to reduce pain from injuries.'));
    potionsDatabase.push(this.createPotion('Healing Ointment', 50, 200, 0, ['potion', 'eff_healWound'], './assets/Ico_potent_healing_salve.webp', 'Seals wounds and mends broken bones.'));
    potionsDatabase.push(this.createPotion('Hot Ointment', 45, 200, 0, ['potion', 'eff_healBurn'], './assets/Ico_greater_warmth_balm.webp', 'A foul-smelling concoction which refuses to catch fire.'));
    potionsDatabase.push(this.createPotion('Vilescar Ointment', 50, 200, 0, ['potion', 'eff_stopBleed'], './assets/Ico_greater_nature_salve.webp', 'A viscous concoction that accelerates coagulation.'));
    potionsDatabase.push(this.createPotion('Antibiotics', 65, 300, 0, ['potion', 'eff_cureWeak'], './assets/Antiseptic_icon.webp', 'A bottle of Antibiotics. Take it to stop infections from spreading.'));
    potionsDatabase.push(this.createPotion('Titans Blood', 40, 50, 0, ['potion', 'eff_threshold'], './assets/Lesser_draught.webp', 'Emergency steroid injection. Will provide a short-burst of energy. Then you will collapse from exhaustion. Use as last resort.'));
  }

//Painkiller  Healing Ointment  Hot Ointment  Vilescar Ointment  Antibiotics  Titans Blood
  //

  initializeHerbDatabase(herbsDatabase: Herb[]): void {
    herbsDatabase.push(this.createHerb('Hanging Moss', 1, ['Forest', 'Swamp', 'Mountains', 'Caves'], 8, 2, 20, './assets/hanging_moss.webp', 'A lichen found on trees or cave walls.'));
    herbsDatabase.push(this.createHerb('Bloodwort', 5, ['Forest', 'Swamp', 'Seaside','Plains','Mountains', 'Desert'], 4, 1, 40, './assets/Bloodwort.webp', 'Red leaves of a plant what still grows in cracks and corners.'));
    herbsDatabase.push(this.createHerb('Medicinal Herb', 3, ['Forest'], 6, 1, 12, './assets/Medicinal_Herb.webp', 'Smells like peppermint, tastes like peppermint, not a peppermint.'));
    herbsDatabase.push(this.createHerb('White Shroud', 6, ['Forest','Swamp', 'Plains'], 8, 1, 45, './assets/White_shroud.webp', 'Big white flower, with juicy petals.'));
    herbsDatabase.push(this.createHerb('Yellow Fever', 2, ['Forest', 'Plains'], 4, 3, 15, './assets/Yellow_fever.webp', 'A common flowers.'));
    herbsDatabase.push(this.createHerb('Green Amanita', 8, ['Forest','Swamp'], 6, 1, 60, './assets/Green_amanita.webp', 'A common mushroom.'));
    herbsDatabase.push(this.createHerb('Blue Drop', 4, ['Forest', 'Seaside'], 8, 1, 30, './assets/Bluedrop.webp', 'A common flower.'));
    herbsDatabase.push(this.createHerb('Blood Red', 2, ['Forest', 'Plains'], 4, 3, 15, './assets/Blood_red.webp', 'A common flowers.'));
    herbsDatabase.push(this.createHerb('Grape Corn', 8, ['Forest','Swamp'], 6, 1, 80, './assets/Grape_corn.webp', 'Sweet corn cob, why grape? No one knows.'));
    herbsDatabase.push(this.createHerb('Reishi Mushroom', 10, ['Mountains'], 8, 1, 50, './assets/Reishi_mushroom.webp', 'A large, edible shelf mushroom, found mainly on coniferous trees. Boosts the immune system and demonstrates antibiotic-like behaviour.'));
    herbsDatabase.push(this.createHerb('Rose Hip', 2, ['Mountains'], 8, 3, 8, './assets/Rose_hip.webp', 'A fruit of a wild rose bush.'));
    herbsDatabase.push(this.createHerb('Spiceroot', 4, ['Mountains'], 6, 1, 30, './assets/DefaultItem.webp', 'Roots growing beneath the snow.'));
    herbsDatabase.push(this.createHerb('Icefruit', 35, ['Mountains'], 4, 0, 120, './assets/Icefruit.png', 'Fruit found on lonely trees in the most cold regions.'));
    herbsDatabase.push(this.createHerb('Greenleaf', 6, ['Swamp'], 6, 1, 20, './assets/Greenleaf.png', 'Green glass-like leaves.'));
    herbsDatabase.push(this.createHerb('Weeping Coral', 2, ['Seaside'], 4, 4, 16, './assets/DefaultItem.webp', 'Coral that make strange sounds underwater, as if someone crying. Gives me chills.'));
    herbsDatabase.push(this.createHerb('Ugdenbloom', 10, ['Swamp'], 6, 1, 40, './assets/Ugdenbloom.png', 'For having such vibrant colors, it emits a truly rotten stench.'));
    herbsDatabase.push(this.createHerb('RattlePepper', 6, ['Desert'], 6, 1, 24, './assets/rattle_pepper.png', 'Seasons dishes and cauterizes wounds.'));
    herbsDatabase.push(this.createHerb('Hexxenfinger', 6, ['Desert'], 8, 1, 12, './assets/DefaultItem.webp', 'Looks like fingers, used in rituals, thats all.'));
    herbsDatabase.push(this.createHerb('Wondershroom', 12, ['Desert'], 8, 1, 90, './assets/DefaultItem.webp', 'Mushroom with small glowing orbs in cap.'));
    herbsDatabase.push(this.createHerb('Glibber', 32, ['Desert'], 4, 0, 104, './assets/glibber.jpg', 'Pulp extracted from a big violet flower.'));
    herbsDatabase.push(this.createHerb('Blue Mushroom', 5, ['Caves'], 2, 1, 20, './assets/Blue_Mushroom.jfif', 'Glowing mushroom found in the glow worm caves, said to give of a certain buzz when consumed.'));
    herbsDatabase.push(this.createHerb('Acid Pumkin', 25, ['Desert'], 6, 0, 80, './assets/acid_pumkin.png', 'Somehow manifested from bones of creatures out in the Wash.'));
    herbsDatabase.push(this.createHerb('Deepshroom', 2, ['Caves'], 8, 1, 15, './assets/Deepshroom.webp', 'Small edible mushroom, taste as foam, still better than nothing.'));
    herbsDatabase.push(this.createHerb('Royal Jelly', 20, ['Plains'], 1, 1, 100, './assets/royal_jelly.jpg', 'Concentrated secretion from giant wasps of Old Arkovia. Widely believed to carry restorative properties.'));
    herbsDatabase.push(this.createHerb('Deathroot', 3, ['Forest', 'Swamp','Plains'], 1, 1, 6, './assets/Deathroot.webp', 'A harmless enough plant on its own, deathroot thick leaves contain an extract that the has been used to induce hallucinations for centuries. Sufficiently concentrated, it can be made into a deadly poison.'));
}

initializeAlchemyRecipes(alchemyRecipiesBase: CraftingRecipe[]): void {
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Bloodwort Essence', quantity: 24}],
      craftedItemName: 'Bloodwort Brew',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Hexxenfinger Essence', quantity: 12}],
      craftedItemName: 'Mortal Hex',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'RattlePepper Essence', quantity: 12}],
      craftedItemName: 'Spicy Cola',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Reishi Mushroom Essence', quantity: 15}],
      craftedItemName: 'Reishi Tea',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Ugdenbloom Essence', quantity: 12}],
      craftedItemName: 'Ugdenjuice',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Royal Jelly Essence', quantity: 15}],
      craftedItemName: 'Royal Jelly Balm',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Medicinal Herb Essence', quantity: 12}],
      craftedItemName: 'Medicinal Cola',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'White Shroud Essence', quantity: 22}],
      craftedItemName: 'White Tea',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Deepshroom Essence', quantity: 22}],
      craftedItemName: 'Deep Energy',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Rose Hip Essence', quantity: 12}],
      craftedItemName: 'Rose Hip Tea',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Yellow Fever Essence', quantity: 22}],
      craftedItemName: 'Touch of Fever',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Green Amanita Essence', quantity: 22}],
      craftedItemName: 'Aroma Green',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Blue Drop Essence', quantity: 22}],
      craftedItemName: 'Teardrop',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Blood Red Essence', quantity: 22}],
      craftedItemName: 'Red Veil',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'White Shroud Essence', quantity: 10}, {name: 'Blood Red Essence', quantity: 22}, {name: 'Yellow Fever Essence', quantity: 22}],
      craftedItemName: '"Orange" Speed',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'White Shroud Essence', quantity: 10}, {name: 'Blue Drop Essence', quantity: 22}, {name: 'Yellow Fever Essence', quantity: 22}],
      craftedItemName: '"Green" Balance',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'White Shroud Essence', quantity: 10}, {name: 'Green Amanita Essence', quantity: 22}, {name: 'Yellow Fever Essence', quantity: 22}],
      craftedItemName: '"Brown" Defense',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'White Shroud Essence', quantity: 10}, {name: 'Green Amanita Essence', quantity: 22}, {name: 'Blood Red Essence', quantity: 22}],
      craftedItemName: '"Yellow" Energy',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'White Shroud Essence', quantity: 10}, {name: 'Blue Drop Essence', quantity: 22}, {name: 'Blood Red Essence', quantity: 22}],
      craftedItemName: '"Purple" Strength',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'White Shroud Essence', quantity: 10}, {name: 'Blue Drop Essence', quantity: 22}, {name: 'Green Amanita Essence', quantity: 22}],
      craftedItemName: '"Cyan" Ultra-precision',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Icefruit Essence', quantity: 10}],
      craftedItemName: 'Icefruit Juice',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Spiceroot Essence', quantity: 22}],
      craftedItemName: 'Spiceroot Brew',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Weeping Coral Essence', quantity: 25}],
      craftedItemName: 'Weeping Water',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Greenleaf Essence', quantity: 10}],
      craftedItemName: 'Greenleaf Tea',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Wondershroom Essence', quantity: 22}],
      craftedItemName: 'Wonder Cola',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Blue Drop Essence', quantity: 11}, {name: 'Hexxenfinger Essence', quantity: 6}],
      craftedItemName: 'Dragon Kick',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Icefruit Essence', quantity: 5}, {name: 'Blue Drop Essence', quantity: 11}],
      craftedItemName: 'Steady Cola',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Hexxenfinger Essence', quantity: 4}, {name: 'Rose Hip Essence', quantity: 8}],
      craftedItemName: 'Steel Coffee',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Grape Corn Essence', quantity: 30}],
      craftedItemName: 'Chicha Morada',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Medicinal Herb Essence', quantity: 6}, {name: 'Poison Substance', quantity: 3}],
      craftedItemName: 'Mojito Apocalypto',
      craftedItemQuantity: 1
    },
  );

  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Strange Water', quantity: 1}, {name: 'Antivenom Salve', quantity: 1}, {name: 'Hanging Moss Essence', quantity: 10}],
      craftedItemName: 'Antidote',
      craftedItemQuantity: 4
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Chemical Tube', quantity: 1}, {name: 'Hexxenfinger Essence', quantity: 40}],
      craftedItemName: 'Painkiller',
      craftedItemQuantity: 4
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Chemical Tube', quantity: 1}, {name: 'Rose Hip Essence', quantity: 40}],
      craftedItemName: 'Painkiller',
      craftedItemQuantity: 4
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Chemical Tube', quantity: 1}, {name: 'Medicinal Herb Essence', quantity: 40}],
      craftedItemName: 'Healing Ointment',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Chemical Tube', quantity: 1}, {name: 'Ugdenbloom Essence', quantity: 40}],
      craftedItemName: 'Healing Ointment',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Chemical Tube', quantity: 1}, {name: 'Bloodwort Essence', quantity: 80}],
      craftedItemName: 'Healing Ointment',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Chemical Tube', quantity: 1}, {name: 'Blue Mushroom Essence', quantity: 20}, {name: 'RattlePepper Essence', quantity: 20}],
      craftedItemName: 'Hot Ointment',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Chemical Tube', quantity: 1}, {name: 'Ugdenbloom Essence', quantity: 40}, {name: 'Poison Substance', quantity: 20}],
      craftedItemName: 'Vilescar Ointment',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Chemical Tube', quantity: 1}, {name: 'Reishi Mushroom Essence', quantity: 100}, {name: 'Acid Pumkin Essence', quantity: 60}],
      craftedItemName: 'Antibiotics',
      craftedItemQuantity: 1
    },
  );
  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Experimental Substances', quantity: 1}, {name: 'Hexxenfinger Essence', quantity: 40}, {name: 'Wondershroom Essence', quantity: 40}],
      craftedItemName: 'Titans Blood',
      craftedItemQuantity: 4
    },
  );

  alchemyRecipiesBase.push(
    {
      ingridients: [{name: 'Experimental Substances', quantity: 1}, {name: 'Blood Red Essence', quantity: 22}, {name: 'Blue Drop Essence', quantity: 15}, {name: 'Green Amanita Essence', quantity: 15}, {name: 'Yellow Fever Essence', quantity: 8}],
      craftedItemName: 'Titans Blood',
      craftedItemQuantity: 4
    },
  );

}

//111111111111111111111111111111111111111111111111 11111111111111111111111111111111111111111111111111111111111111111111111111

initializeBarrelRecipes(barrelRecipiesBase: CraftingRecipe[]): void {
  barrelRecipiesBase.push(
    {
      ingridients: [{name: 'Hanging Moss Essence', quantity: 25}],
      craftedItemName: 'Strange Water',
      craftedItemQuantity: 1
    },
  );
  barrelRecipiesBase.push(
    {
      ingridients: [{name: 'Glibber Essence', quantity: 10}],
      craftedItemName: 'Strange Water',
      craftedItemQuantity: 1
    },
  );
  barrelRecipiesBase.push(
    {
      ingridients: [{name: 'White Shroud Essence', quantity: 25}],
      craftedItemName: 'Strange Water',
      craftedItemQuantity: 1
    },
  );
  barrelRecipiesBase.push(
    {
      ingridients: [{name: 'Deepshroom Essence', quantity: 25}],
      craftedItemName: 'Strange Water',
      craftedItemQuantity: 1
    },
  );
  barrelRecipiesBase.push(
    {
      ingridients: [{name: 'Grape Corn Essence', quantity: 50}],
      craftedItemName: 'Strange Water',
      craftedItemQuantity: 1
    },
  );
  barrelRecipiesBase.push(
    {
      ingridients: [{name: 'Poison Substance', quantity: 40}],
      craftedItemName: 'Antivenom Salve',
      craftedItemQuantity: 1
    },
  );
  barrelRecipiesBase.push(
    {
      ingridients: [{name: 'Acid Pumkin Essence', quantity: 50}],
      craftedItemName: 'Chemical Tube',
      craftedItemQuantity: 1
    },
  );
  barrelRecipiesBase.push(
    {
      ingridients: [{name: 'Green Amanita Essence', quantity: 140}],
      craftedItemName: 'Chemical Tube',
      craftedItemQuantity: 1
    },
  );
  barrelRecipiesBase.push(
    {
      ingridients: [{name: 'Blue Mushroom Essence', quantity: 120}],
      craftedItemName: 'Experimental Substances',
      craftedItemQuantity: 1
    },
  );
}
//Experimental Substances
}

//herbsDatabase.push(this.createHerb('Root', 1, ['Forest', 'Swamp', 'Seaside','Plains','Mountains'], 8, 2, 18));
