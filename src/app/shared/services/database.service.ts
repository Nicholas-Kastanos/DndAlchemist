import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite/ngx';
import { Essence, IEssence } from '../classes/essence/essence.class';
import { BaseConcoction, IBaseConcoction, IBaseConcoctionEssence } from '../classes/base-concoction/base-concoction.class';
import migrationsArray from './migrations.json';
import baseConcoctionJson from '../../../../data/base_concoctions.json';
import ingredientsJson from '../../../../data/ingredients.json';
import concoctionsJson from '../../../../data/concoctions.json';
import { Biome, IBiome } from '../classes/biome/biome.class';
import { Rarity, IRarity } from '../classes/rarity/rarity.class';
import { DamageType, IDamageType } from '../classes/damage-type/damage-type.class';
import { Ingredient, IIngredient, IIngredientEssence, IIngredientBiome, IIngredientImport } from '../classes/ingredient/ingredient.class';
import { ReplaySubject, Observable} from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { SaveType, ISaveType } from '../classes/save-type/save-type.class';
import { IConcoction, Concoction, IConcoctionEssence, IConcoctionIngredient, ConcoctionIngredient, IConcoctionImport } from '../classes/concoction/concoction.class';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private sqlite: SQLite) { }

  public initialiseSubject = new ReplaySubject<void>();

  public async getEssences(): Promise<Essence[]> { 
    await this.initialiseSubject.toPromise();
    return this._essences$.toPromise(); 
  }
  public async getSaveTypes(): Promise<SaveType[]> { 
    await this.initialiseSubject.toPromise();
    return this._saveTypes$.toPromise(); 
  }
  public async getBiomes(): Promise<Biome[]> { 
    await this.initialiseSubject.toPromise();
    return this._biomes$.toPromise(); 
  }
  public async getRarities(): Promise<Rarity[]> {
    await this.initialiseSubject.toPromise(); 
    return this._rarities$.toPromise(); 
  }
  public async getDamageTypes(): Promise<DamageType[]> { 
    await this.initialiseSubject.toPromise();
    return this._damageTypes$.toPromise(); 
  }
  public async getBaseConcoctions(): Promise<BaseConcoction[]> { 
    await this.initialiseSubject.toPromise();
    return this._baseConcoctions$.toPromise();
  }
  public async getIngredients(): Promise<Ingredient[]> { 
    await this.initialiseSubject.toPromise();
    return this._ingredients$.toPromise(); 
  }
  public async getConcoctions(): Promise<Concoction[]> { 
    await this.initialiseSubject.toPromise();
    return this._concoctions$.toPromise(); 
  }

  public refreshBaseConcoctions() {
    this._baseConcoctions$ = this.cache(this._getBaseConcoctions());
  }
  public refreshIngredients() {
    this._ingredients$ = this.cache(this._getIngredients());
  }
  public refreshConcoctions() {
    this._concoctions$ = this.cache(this._getConcoctions());
  }

  private db: SQLiteObject;
  private sqliteConfig: SQLiteDatabaseConfig = {
    name: "alchemy.db",
    location: 'default'
  }
  private readonly SqlMigrationsTableName: string = 'SQLMigrations';

  private cache<T>(arr$: Observable<T[]>) {
    return arr$.pipe(
      shareReplay(1)
    )
  };



  private async _openDb(): Promise<SQLiteObject> {
    return this.sqlite.create(this.sqliteConfig);
  }

  // public async getLookup<Model, IModel>(tableName: string): Promise<Array<Model>>{
  //   let resultSet: IQueryResults<IModel> = await this.db.executeSql("SELECT * FROM " + tableName +";", []);
  //   let iResultSet = this.queryResultToArray<IModel>(resultSet);
  //   let results: Array<Model> = new Array<Model>();
  //   iResultSet.forEach((iResult: IModel) => {
  //     results.push(new Model(iResult.Id, iResult.Name));
  //   })
  //   return results;
  // }

  private _setLookups(){
    this._essences$ = this.cache(this._getEssences());
    this._saveTypes$ = this.cache(this._getSaveTypes());
    this._biomes$ = this.cache(this._getBiomes());
    this._rarities$ = this.cache(this._getRarities());
    this._damageTypes$ = this.cache(this._getDamageTypes());
  }

  private _essences$: Observable<Essence[]>;
  private _getEssences(): Observable<Essence[]>{
    return new Observable<Essence[]>(observer => {
      this.db.executeSql("SELECT * FROM Essences", [])
        .then((resultSet: IQueryResults<IEssence>) => {
          let iEssences = this.queryResultToArray<IEssence>(resultSet);
          let essences: Essence[] = [];
          iEssences.forEach(iEssence => {
            essences.push(new Essence(iEssence.Id, iEssence.Name));
          });
          observer.next(essences);
          observer.complete();
        });
    });
  }

  private _saveTypes$: Observable<SaveType[]>;
  private _getSaveTypes(): Observable<SaveType[]>{
    return new Observable<SaveType[]>((observer) => {
      this.db.executeSql("SELECT * FROM SaveTypes", [])
        .then((resultSet: IQueryResults<ISaveType>) => {
          let iSaveTypes = this.queryResultToArray<ISaveType>(resultSet);
          let saveTypes: SaveType[] = [];
          iSaveTypes.forEach(iSaveType => {
            saveTypes.push(new DamageType(iSaveType.Id, iSaveType.Name));
          });
          observer.next(saveTypes);
          observer.complete()
        });
    });
  }

  private _biomes$: Observable<Biome[]>;
  private _getBiomes(): Observable<Biome[]>{
    return new Observable<Biome[]>(observer => {
      this.db.executeSql("SELECT * FROM Biomes", [])
        .then((resultSet: IQueryResults<IBiome>) => {
          let iBiomes = this.queryResultToArray<IBiome>(resultSet);
          let biomes: Biome[] = [];
          iBiomes.forEach(iBiome => {
            biomes.push(new Biome(iBiome.Id, iBiome.Name));
          });
          observer.next(biomes);
          observer.complete();
        });
    });
  }

  private _rarities$: Observable<Rarity[]>;
  private _getRarities(): Observable<Rarity[]> {
    return new Observable<Rarity[]>(observer => {
      this.db.executeSql("SELECT * FROM Rarities", [])
        .then((resultSet: IQueryResults<IRarity>) => {
          let iRarities = this.queryResultToArray<IRarity>(resultSet);
          let rarities: Rarity[] = [];
          iRarities.forEach(iRarity => {
            rarities.push(new Rarity(iRarity.Id, iRarity.Name));
          });
          observer.next(rarities);
          observer.complete();
        });
    });
  }

  private _damageTypes$: Observable<DamageType[]>;
  private _getDamageTypes(): Observable<DamageType[]>{
    return new Observable<DamageType[]>(observer => {
      this.db.executeSql("SELECT * FROM DamageTypes", []).then((resultSet: IQueryResults<IDamageType>) => {
        let iDamageTypes = this.queryResultToArray<IDamageType>(resultSet);
        let damageTypes: DamageType[] = [];
        iDamageTypes.forEach(iDamageType => {
          damageTypes.push(new DamageType(iDamageType.Id, iDamageType.Name));
        });
        observer.next(damageTypes);
        observer.complete();
      });
    });
  }

  private _baseConcoctions$: Observable<BaseConcoction[]>;
  private _getBaseConcoctions(): Observable<BaseConcoction[]> {
    return new Observable<BaseConcoction[]>(observer => {
      this.db.executeSql("SELECT * FROM BaseConcoctions", [])
        .then(async (resultSet: IQueryResults<IBaseConcoction>) => {
          let iBaseConcoctions = this.queryResultToArray<IBaseConcoction>(resultSet);
          let baseConcoctions: BaseConcoction[] = [];
          let essences = await this._essences$.toPromise();
          for (let i = 0; i < iBaseConcoctions.length; i++) {
            let iBaseConcoction = iBaseConcoctions[i];
            let essenceSet = (await this.db.executeSql("SELECT * FROM BaseConcoctionEssences WHERE BaseConcoctionId=?", [iBaseConcoction.Id])) as IQueryResults<IBaseConcoctionEssence>;
            let iEssence = this.queryResultToArray<IBaseConcoctionEssence>(essenceSet);
            let baseEssences = iEssence.map(ie => essences.find(e => e.id === ie.EssenceId));
            baseConcoctions.push(new BaseConcoction(iBaseConcoction.Id, iBaseConcoction.Name, iBaseConcoction.BaseEffect, baseEssences));
          }
          observer.next(baseConcoctions);
          observer.complete();
        });
    });
  }

  private _ingredients$: Observable<Ingredient[]>;
  private _getIngredients(): Observable<Ingredient[]>{
    return new Observable<Ingredient[]>(observer => {
      this.db.executeSql("SELECT * FROM Ingredients;", [])
        .then(async (resultSet: IQueryResults<IIngredient>) => {
          let iIngredients = this.queryResultToArray<IIngredient>(resultSet);
          let ingredients: Ingredient[] = [];

          let essences = await this._essences$.toPromise();
          let biomes = await this._biomes$.toPromise();
          let damageTypes = await this._damageTypes$.toPromise();
          let rarities = await this._rarities$.toPromise();

          for (let i = 0; i < iIngredients.length; i++) {
            let iIngredient = iIngredients[i];

            let essenceSet = (await this.db.executeSql("SELECT * FROM IngredientEssences WHERE IngredientId=?", [iIngredient.Id])) as IQueryResults<IIngredientEssence>;
            let iEssence = this.queryResultToArray<IIngredientEssence>(essenceSet);
            let ingredientEssences = iEssence.map(ie => essences.find(e => e.id === ie.EssenceId));

            let biomeSet = (await this.db.executeSql("SELECT * FROM IngredientBiomes WHERE IngredientId=?", [iIngredient.Id])) as IQueryResults<IIngredientBiome>;
            let iBiome = this.queryResultToArray<IIngredientBiome>(biomeSet);
            let ingredientBiomes = iBiome.map(ib => biomes.find(b => b.id === ib.BiomeId));

            let rarity = rarities.find(r => r.id === iIngredient.RarityId) || null;
            let damageType = damageTypes.find(d => d.id === iIngredient.DamageTypeId) || null;

            let ingredient = new Ingredient(
              iIngredient.Id,
              iIngredient.Name,
              ingredientEssences,
              ingredientBiomes,
              iIngredient.Details,
              rarity,
              damageType,
              iIngredient.IncreaseHealing,
              iIngredient.IncreaseArcaneRecovery,
              iIngredient.IncreaseDamageNumber,
              iIngredient.IncreaseDamageSize,
              iIngredient.IncreaseSave,
              iIngredient.DoubleDuration,
              iIngredient.DoubleBombRadius,
              iIngredient.DoubleDustArea,
              iIngredient.ExtraOilUse,
              iIngredient.DisadvantageDex,
              iIngredient.DisadvantageCon,
              iIngredient.DisadvantageWis,
              iIngredient.DisadvantageSaves,
              iIngredient.AddDamageTypeBomb,
              iIngredient.AddDamageTypeDust,
              iIngredient.AddDamageTypeOil,
              iIngredient.AddDamageTypePotion
            );
            ingredients.push(ingredient);
          }
          observer.next(ingredients);
          observer.complete();
        });
    });
  }

  private _concoctions$: Observable<Concoction[]>;
  private _getConcoctions(): Observable<Concoction[]>{
    return new Observable<Concoction[]>((observer) => {
      this.db.executeSql("SELECT * FROM Concoctions;", [])
        .then(async (resultSet: IQueryResults<IConcoction>) => {
          let iConcoctions = this.queryResultToArray<IConcoction>(resultSet);
          let concoctions: Concoction[] = [];

          let saveTypes = await this._saveTypes$.toPromise();
          let damageTypes = await this._damageTypes$.toPromise();
          let essences = await this._essences$.toPromise();
          let ingredients = await this._ingredients$.toPromise();

          for (let i = 0; i < iConcoctions.length; i++) {
            let iConcoction = iConcoctions[i];

            let iConcoctionEssenceSet = (await this.db.executeSql("SELECT * FROM ConcoctionEssences WHERE ConcoctionId=?", [iConcoction.Id])) as IQueryResults<IConcoctionEssence>;
            let iConcoctionEssences = this.queryResultToArray<IConcoctionEssence>(iConcoctionEssenceSet);
            let concoctionEssences = iConcoctionEssences.map(iConcoctionEssence => essences.find(e => e.id === iConcoctionEssence.EssenceId));

            let iConcoctionIngredientSet = (await this.db.executeSql("SELECT * FROM ConcoctionIngredients WHERE ConcoctionId=?", [iConcoction.Id])) as IQueryResults<IConcoctionIngredient>;
            let iConcoctionIngredients = this.queryResultToArray<IConcoctionIngredient>(iConcoctionIngredientSet);
            let concoctionIngredients = iConcoctionIngredients.map(iConcoctionIngredient =>
              new ConcoctionIngredient(
                iConcoctionIngredient.Id,
                iConcoctionIngredient.ConcoctionId,
                ingredients.filter(ingredient =>
                  ingredient.id === iConcoctionIngredient.IngredientId ||
                  ingredient.id === iConcoctionIngredient.PrimaryAlternateIngredientId ||
                  ingredient.id === iConcoctionIngredient.SecondaryAlternateIngredientId)
              )
            );

            let saveType = saveTypes.find(s => s.id === iConcoction.SaveTypeId) || null;
            let damageType = damageTypes.find(d => d.id === iConcoction.DamageTypeId) || null;

            let newConcoction = new Concoction(iConcoction.Id, iConcoction.Name, iConcoction.Effect, concoctionEssences,
              concoctionIngredients, iConcoction.DieType, iConcoction.DieNumber, iConcoction.DC, saveType, damageType,
              iConcoction.DurationLength, iConcoction.DurationType);
            concoctions.push(newConcoction);
          }

          observer.next(concoctions);
          observer.complete();
        });
    });
  }

  public async updateBaseConcoctionsFromJson() {
    console.debug("Updating BaseConcoctions")
    let essences = await this._essences$.toPromise();

    let existingBaseConcoctions = await this._baseConcoctions$.toPromise();
    for (let i = 0; i < baseConcoctionJson.length; i++) {
      let jsonBaseConcoction = baseConcoctionJson[i];
      let existingBaseConcoction = existingBaseConcoctions.find(existing => existing.name === jsonBaseConcoction.name);
      if (existingBaseConcoction == null) { // There is no match
        let insertResult = await this.db.executeSql("INSERT INTO BaseConcoctions (Name, BaseEffect) VALUES (?, ?);", [jsonBaseConcoction.name, jsonBaseConcoction.baseEffect]) as IInsertResults<IBaseConcoction>;
        for (let j = 0; j < jsonBaseConcoction.baseEssences.length; j++) {
          let newEssence = jsonBaseConcoction.baseEssences[j];
          let newEssenceId = essences.find(e => e.name === newEssence).id;
          await this.db.executeSql("INSERT INTO BaseConcoctionEssences (BaseConcoctionId, EssenceId) VALUES (?, ?);", [insertResult.insertId, newEssenceId]);
        }
      } else { // There is a match
        await this.db.executeSql("UPDATE BaseConcoctions SET BaseEffect=? WHERE Id=?;", [jsonBaseConcoction.baseEffect, existingBaseConcoction.id]);
        await this.db.executeSql("DELETE FROM BaseConcoctionEssences WHERE BaseConcoctionId=?;", [existingBaseConcoction.id]);
        for (let j = 0; j < jsonBaseConcoction.baseEssences.length; j++) {
          let newEssence = jsonBaseConcoction.baseEssences[j];
          let newEssenceId = essences.find(e => e.name === newEssence).id;
          await this.db.executeSql("INSERT INTO BaseConcoctionEssences (BaseConcoctionId, EssenceId) VALUES (?, ?);", [existingBaseConcoction.id, newEssenceId]);
        }
      }
    }
    this._baseConcoctions$ = this.cache(this._getBaseConcoctions());
  }

  public async updateIngredientsFromJson() {
    console.debug("Updating Ingredients")
    let essences = await this._essences$.toPromise();
    let rarities = await this._rarities$.toPromise();
    let damageTypes = await this._damageTypes$.toPromise();
    let biomes = await this._biomes$.toPromise();
    let existingIngredients = await this._ingredients$.toPromise();
    let ingredientsImportJson = ingredientsJson as IIngredientImport[];
    for (let i = 0; i < ingredientsImportJson.length; i++) {
      let jsonIngredient = ingredientsImportJson[i];

      let rarityId = null;
      if (jsonIngredient.rarity) {
        let rarity = rarities.find(r => r.name.toLowerCase() === jsonIngredient.rarity!.toLowerCase());
        if (rarity != null) {
          rarityId = rarity.id;
        } else {
          throw new Error("No rarity " + jsonIngredient.rarity);
        }
      }

      let damageTypeId = null;
      if (jsonIngredient.damageType) {
        let damageType = damageTypes.find(d => d.name.toLowerCase() === jsonIngredient.damageType!.toLowerCase());
        if (damageType != null) {
          damageTypeId = damageType.id;
        } else {
          throw new Error("No damage type " + jsonIngredient.damageType);
        }
      }

      let ingredientId = null;
      let existingIngredient = existingIngredients.find(existing => existing.name === jsonIngredient.name);
      if (existingIngredient == null) { // There was no match

        let insertResult = await this.db.executeSql("INSERT INTO Ingredients(Name, Details, RarityId, DamageTypeId, IncreaseHealing, " +
          "IncreaseArcaneRecovery, IncreaseDamageNumber, IncreaseDamageSize, IncreaseSave, DoubleDuration, DoubleBombRadius, DoubleDustArea, " +
          "ExtraOilUse, DisadvantageDex, DisadvantageCon, DisadvantageWis, DisadvantageSaves, AddDamageTypeBomb, AddDamageTypeDust, AddDamageTypeOil, " +
          "AddDamageTypePotion)" +
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
          jsonIngredient.name,
          jsonIngredient.details,
          rarityId,
          damageTypeId,
          jsonIngredient.increaseHealing ?? false,
          jsonIngredient.increaseArcaneRecovery ?? false,
          jsonIngredient.increaseDamageNumber ?? false,
          jsonIngredient.increaseDamageSize ?? false,
          jsonIngredient.increaseSave ?? false,
          jsonIngredient.doubleDuration ?? false,
          jsonIngredient.doubleBombRadius ?? false,
          jsonIngredient.doubleDustArea ?? false,
          jsonIngredient.extraOilUse ?? false,
          jsonIngredient.disadvantageDex ?? false,
          jsonIngredient.disadvantageCon ?? false,
          jsonIngredient.disadvantageWis ?? false,
          jsonIngredient.disadvantageSaves ?? false,
          jsonIngredient.addDamageTypeBomb ?? false,
          jsonIngredient.addDamageTypeDust ?? false,
          jsonIngredient.addDamageTypeOil ?? false,
          jsonIngredient.addDamageTypePotion ?? false
        ]) as IInsertResults<IIngredient>;
        ingredientId = insertResult.insertId;
      } else { // There is a match
        ingredientId = existingIngredient.id;
        await this.db.executeSql("UPDATE Ingredients SET Details=?, RarityId=?, DamageTypeId=?, IncreaseHealing=?, " +
          "IncreaseArcaneRecovery=?, IncreaseDamageNumber=?, IncreaseDamageSize=?, IncreaseSave=?, DoubleDuration=?, DoubleBombRadius=?, DoubleDustArea=?, " +
          "ExtraOilUse=?, DisadvantageDex=?, DisadvantageCon=?, DisadvantageWis=?, DisadvantageSaves=?, AddDamageTypeBomb=?, AddDamageTypeDust=?, AddDamageTypeOil=?, " +
          "AddDamageTypePotion=?" +
          "WHERE Id=?;", [
          jsonIngredient.details,
          rarityId,
          damageTypeId,
          jsonIngredient.increaseHealing ?? false,
          jsonIngredient.increaseArcaneRecovery ?? false,
          jsonIngredient.increaseDamageNumber ?? false,
          jsonIngredient.increaseDamageSize ?? false,
          jsonIngredient.increaseSave ?? false,
          jsonIngredient.doubleDuration ?? false,
          jsonIngredient.doubleBombRadius ?? false,
          jsonIngredient.doubleDustArea ?? false,
          jsonIngredient.extraOilUse ?? false,
          jsonIngredient.disadvantageDex ?? false,
          jsonIngredient.disadvantageCon ?? false,
          jsonIngredient.disadvantageWis ?? false,
          jsonIngredient.disadvantageSaves ?? false,
          jsonIngredient.addDamageTypeBomb ?? false,
          jsonIngredient.addDamageTypeDust ?? false,
          jsonIngredient.addDamageTypeOil ?? false,
          jsonIngredient.addDamageTypePotion ?? false,
          ingredientId
        ]);
        await this.db.executeSql("DELETE FROM IngredientEssences WHERE IngredientId=?;", [ingredientId]);
        await this.db.executeSql("DELETE FROM IngredientBiomes WHERE IngredientId=?;", [ingredientId]);
      }

      for (let j = 0; j < jsonIngredient.essences.length; j++) {
        let newEssence = jsonIngredient.essences[j];
        let newEssenceId = essences.find(e => e.name === newEssence).id;
        await this.db.executeSql("INSERT INTO IngredientEssences (IngredientId, EssenceId) VALUES (?, ?);", [ingredientId, newEssenceId]);
      }
      for (let j = 0; j < jsonIngredient.locations.length; j++) {
        let newLocation = jsonIngredient.locations[j];
        let newLocationId = biomes.find(b => b.name === newLocation).id;
        await this.db.executeSql("INSERT INTO IngredientBiomes (IngredientId, BiomeId) VALUES (?, ?);", [ingredientId, newLocationId]);
      }
    }

    this._ingredients$ = this.cache(this._getIngredients());
  }

  public async updateConcoctionsFromJson() {
    console.debug("Updating Concoctions")
    let saveTypes = await this._saveTypes$.toPromise();
    let damageTypes = await this._damageTypes$.toPromise();
    let essences = await this._essences$.toPromise();
    let ingredients = await this._ingredients$.toPromise();

    let existingConcoctions = await this._concoctions$.toPromise();
    let concoctionsImportJson = concoctionsJson as IConcoctionImport[];
    for (let i = 0; i < concoctionsImportJson.length; i++) {
      let jsonConcoction = concoctionsImportJson[i];

      let damageTypeId: number = null;
      if (jsonConcoction.damageType) {
        let damage = damageTypes.find(d => d.name.toLowerCase() === jsonConcoction.damageType.toLowerCase());
        if (damage != null) {
          damageTypeId = damage.id;
        } else {
          throw new Error("No damage type " + jsonConcoction.damageType);
        }
      }

      let saveTypeId: number = null;
      if (jsonConcoction.save) {
        let save = saveTypes.find(s => s.name.toLowerCase() === jsonConcoction.save.toLowerCase());
        if (save != null) {
          saveTypeId = save.id;
        } else {
          throw new Error("No save type " + jsonConcoction.save);
        }
      }

      let concoctionId = null;
      let existingConcoction = existingConcoctions.find(existing => existing.name === jsonConcoction.name);
      if (existingConcoction == null) { // There was no match
        let insertResult = await this.db.executeSql("INSERT INTO Concoctions (Name, DieType, DieNumber, DC, SaveTypeId, DamageTypeId, Effect, DurationLength, DurationType) " +
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);", [
          jsonConcoction.name, jsonConcoction.dieType, jsonConcoction.dieNumber, jsonConcoction.DC, saveTypeId, damageTypeId, jsonConcoction.effect, jsonConcoction.durationLength, jsonConcoction.durationType
        ]) as IInsertResults<IConcoction>;
        concoctionId = insertResult.insertId;

      } else { // There is a match
        concoctionId = existingConcoction.id;


        await this.db.executeSql("UPDATE Concoctions " +
          "SET DieType=?, DieNumber=?, DC=?, SaveTypeId=?, DamageTypeId=?, Effect=?, DurationLength=?, DurationType=?" +
          "WHERE Id=?",
          [jsonConcoction.dieType, jsonConcoction.dieNumber, jsonConcoction.DC, saveTypeId, damageTypeId, jsonConcoction.effect, jsonConcoction.durationLength, jsonConcoction.durationType, concoctionId]);
        await this.db.executeSql("DELETE FROM ConcoctionEssences WHERE ConcoctionId=?", [concoctionId]);
        await this.db.executeSql("DELETE FROM ConcoctionIngredients WHERE ConcoctionId=?", [concoctionId]);
      }

      for (let j = 0; j < jsonConcoction.essences.length; j++) {
        let newEssence = jsonConcoction.essences[j];
        let newEssenceId = essences.find(e => e.name === newEssence).id;
        await this.db.executeSql("INSERT INTO ConcoctionEssences (ConcoctionId, EssenceId) VALUES (?, ?);", [concoctionId, newEssenceId]);
      }

      for (let j = 0; j < jsonConcoction.requiredIngredients.length; j++) {
        let newRequiredIngredients = jsonConcoction.requiredIngredients[j].split(" OR ");
        let ingredient = ingredients.find(i => i.name.toLowerCase() === newRequiredIngredients[0].toLowerCase())
        let ingredientId = ingredient.id || null;
        let primaryAlternateIngredient = null;
        let primaryAlternateIngredientId = null;
        let secondaryAlternateIngredient = null;
        let secondaryAlternateIngredientId = null;
        if (newRequiredIngredients.length >= 2) {
          primaryAlternateIngredient = ingredients.find(i => i.name.toLowerCase() === newRequiredIngredients[1].toLowerCase())
          primaryAlternateIngredientId = primaryAlternateIngredient.id || null;
        }
        if (newRequiredIngredients.length >= 3) {
          secondaryAlternateIngredient = ingredients.find(i => i.name.toLowerCase() === newRequiredIngredients[2].toLowerCase())
          secondaryAlternateIngredientId = secondaryAlternateIngredient.id || null;
        }
        await this.db.executeSql("INSERT INTO ConcoctionIngredients(ConcoctionId, IngredientId, PrimaryAlternateIngredientId, SecondaryAlternateIngredientId) " +
          "VALUES(?, ?, ?, ?);",
          [concoctionId, ingredientId, primaryAlternateIngredientId, secondaryAlternateIngredientId]);
      }
    }

    this._concoctions$ = this.cache(this._getConcoctions());
  }

  queryResultToArray<T>(resultSet: IQueryResults<T>): T[] {
    let arr = [];
    for (let i = 0; i < resultSet.rows.length; i++) {
      arr.push(resultSet.rows.item(i));
    }
    return (arr as T[]);
  }

  private _createMigrationsTable(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.sqlBatch(
        ["CREATE TABLE IF NOT EXISTS " + this.SqlMigrationsTableName + "(Name TEXT PRIMARY KEY NOT NULL)"]
      ).then(() => {
        resolve();
      }).catch(err => {
        console.error(err);
        reject()
      })
    });
  }

  private _runMigrations(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let migrations: IMigration[] = migrationsArray;
      if (migrations == null) {
        console.error("Cannot find migrations.");
        reject();
      }
      if (migrations.length === 0) {
        console.error("No migrations found.");
        reject();
      }
      this.db.executeSql("SELECT * FROM " + this.SqlMigrationsTableName, []
      ).then(async (resultSet: IQueryResults<IMigration>) => {

        let existingMigrations = this.queryResultToArray<IMigration>(resultSet);

        console.debug("Existing Migrations:");
        for (let i = 0; i < existingMigrations.length; i++) {
          console.debug(existingMigrations[i].Name);
        }
        console.debug("Done");

        let missingMigrations = migrations.filter((item: IMigration) => {
          let found = true;
          for (let i = 0; i < existingMigrations.length; i++) {
            if (item.Name === existingMigrations[i].Name) {
              found = false;
              break;
            }
          }
          return found;
        });
        console.debug("Missing Migrations:");
        for (let i = 0; i < missingMigrations.length; i++) {
          console.debug(missingMigrations[i].Name);
        }
        console.debug("Done");
        console.debug("Applying Migrations:");
        for (let i = 0; i < missingMigrations.length; i++) {
          console.debug("Applying Migration: " + missingMigrations[i].Name);
          let result = await this.db.sqlBatch([missingMigrations[i].RawSql]);
          result = await this.db.executeSql("INSERT INTO " + this.SqlMigrationsTableName + " VALUES (?)", [missingMigrations[i].Name]);
        }
        console.debug("Done");
        resolve();
      }).catch((err: any) => {
        console.error(JSON.stringify(err));
        reject();
      })
    });
  }

  private async _deleteDatabase(): Promise<void>{
    await this.db.close()
    await this.sqlite.deleteDatabase(this.sqliteConfig)
    console.debug("Deleted Database")
  }

  public async initialise(): Promise<void> {
    this.db = await this._openDb();
    await this._createMigrationsTable();
    await this._runMigrations();

    // Must be called after _runMigrations so that the tables exist
    this._setLookups(); // Must be called to set the caches
    this.refreshBaseConcoctions();// Must be called to set the cache, is also set at the end of the UpdateFromJson
    this.refreshIngredients();// Must be called to set the cache, is also set at the end of the UpdateFromJson
    this.refreshConcoctions();// Must be called to set the cache, is also set at the end of the UpdateFromJson

    await this.updateBaseConcoctionsFromJson();
    await this.updateIngredientsFromJson();
    await this.updateConcoctionsFromJson();
    this.initialiseSubject.next();
    this.initialiseSubject.complete();
    // await this._deleteDatabase();
    // this.initialiseSubject.error("Reset");
  }
}

interface IMigration {
  Name: string;
  RawSql?: string | undefined;
}

export interface IQueryResultRows<T> {
  length: number;
  item(i: number): T;
}
export interface IQueryResults<T> {
  rows: IQueryResultRows<T>;
  rowsAffected: number;
}

export interface IInsertResults<T> {
  rows: IQueryResultRows<T>;
  rowsAffected: number;
  insertId: any; // the id of an inserted and maybe updated record.
}