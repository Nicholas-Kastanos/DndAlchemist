import { Injectable } from '@angular/core';
import { SQLite, SQLiteDatabaseConfig, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Observable, ReplaySubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { BaseConcoction, IBaseConcoction, IBaseConcoctionEssence } from '../classes/base-concoction/base-concoction.class';
import { Biome, IBiome } from '../classes/biome/biome.class';
import { Character, ICharacter } from '../classes/character/character.class';
import { Concoction, ConcoctionIngredient, IConcoction, IConcoctionEssence, IConcoctionImport, IConcoctionIngredient } from '../classes/concoction/concoction.class';
import { DamageType, IDamageType } from '../classes/damage-type/damage-type.class';
import { INamedEntity, Lookup } from '../classes/entity/named-entity.class';
import { Essence, IEssence } from '../classes/essence/essence.class';
import { IIngredient, IIngredientBiome, IIngredientEssence, IIngredientImport, Ingredient } from '../classes/ingredient/ingredient.class';
import { IRarity, Rarity } from '../classes/rarity/rarity.class';
import { ISaveType, SaveType } from '../classes/save-type/save-type.class';
import baseConcoctionJson from '../../../../data/base_concoctions.json';
import concoctionsJson from '../../../../data/concoctions.json';
import ingredientsJson from '../../../../data/ingredients.json';
import migrationsArray from './migrations.json';
import { CreateAlchemyItem, AlchemyItem, IAlchemyItem } from '../classes/alchemy-item/alchemy-item.class';

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
    public async getCharacters(): Promise<Character[]> {
        await this.initialiseSubject.toPromise();
        return this._characters$.toPromise();
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
    public refreshCharacters() {
        this._characters$ = this.cache(this._getCharacters());
    }

    public createCharacter(name: string, year: number, month: number, day: number) {
        return new Promise<Character>((resolve, reject) => {
            this.db.executeSql("INSERT INTO " + Character.tableName + "(Name, Year, Month, Day) " +
                "VALUES (?, ?, ?, ?)",
                [name, year, month, day]).then((result: IInsertResults<ICharacter>) => {
                    this.refreshCharacters();
                    resolve(new Character(name, year, month, day));
                }).catch(reject);
        });
    }


    public async createAlchemyItem({ baseConcoction, bombRadius, dustArea, oilUses,
        concoction, dieType, dieNumber, DC,
        damageType, durationLength, disadvantageDex, disadvantageCon,
        disadvantageWis, disadvantageSaves }: CreateAlchemyItem) : Promise<AlchemyItem>
    {
        await this.initialiseSubject.toPromise();
        return new Promise<AlchemyItem>((resolve, reject) => {
            this.db.executeSql("INSERT INTO " + AlchemyItem.tableName + " (\
                BaseConcoctionName, \
                ConcoctionName, \
                DieType, \
                DieNumber, \
                DC, \
                DamageTypeName, \
                DurationLength, \
                BombRadius, \
                DustArea, \
                OilUses, \
                DisadvantageDex, \
                DisadvantageCon, \
                DisadvantageWis, \
                DisadvantageSaves) " + 
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
                baseConcoction.name,
                concoction.name,
                dieType,
                dieNumber,
                DC,
                damageType.name,
                durationLength,
                bombRadius,
                dustArea,
                oilUses,
                disadvantageDex,
                disadvantageCon,
                disadvantageWis,
                disadvantageSaves
            ]).then((resultSet: IInsertResults<IAlchemyItem>) => {
                resolve(new AlchemyItem(resultSet.insertId, { baseConcoction, bombRadius, dustArea, oilUses,
                    concoction, dieType, dieNumber, DC,
                    damageType, durationLength, disadvantageDex, disadvantageCon,
                    disadvantageWis, disadvantageSaves }));
            }).catch(reject)
        })
    }

    // Only works on NamedEntities
    public async Lookup(tableName: string): Promise<Lookup[]> {
        await this.initialiseSubject.toPromise();
        return new Observable<Lookup[]>((observer) => {
            this.db.executeSql("SELECT Id, Name FROM " + tableName + ";", []).then((resultSet: IQueryResults<INamedEntity>) => {
                let iNameEntities = this.queryResultToArray<INamedEntity>(resultSet);
                let lookup: Lookup[] = [];
                iNameEntities.forEach(iNamedEntity => {
                    lookup.push(new Lookup(iNamedEntity));
                });
                observer.next(lookup);
                observer.complete();
            });
        }).toPromise();
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

    private _setLookups() {
        this._essences$ = this.cache(this._getEssences());
        this._saveTypes$ = this.cache(this._getSaveTypes());
        this._biomes$ = this.cache(this._getBiomes());
        this._rarities$ = this.cache(this._getRarities());
        this._damageTypes$ = this.cache(this._getDamageTypes());
    }

    private _essences$: Observable<Essence[]>;
    private _getEssences(): Observable<Essence[]> {
        return new Observable<Essence[]>(observer => {
            this.db.executeSql("SELECT * FROM Essences", [])
                .then((resultSet: IQueryResults<IEssence>) => {
                    let iEssences = this.queryResultToArray<IEssence>(resultSet);
                    let essences: Essence[] = [];
                    iEssences.forEach(iEssence => {
                        essences.push(new Essence(iEssence.Name));
                    });
                    observer.next(essences);
                    observer.complete();
                });
        });
    }

    private _saveTypes$: Observable<SaveType[]>;
    private _getSaveTypes(): Observable<SaveType[]> {
        return new Observable<SaveType[]>((observer) => {
            this.db.executeSql("SELECT * FROM SaveTypes", [])
                .then((resultSet: IQueryResults<ISaveType>) => {
                    let iSaveTypes = this.queryResultToArray<ISaveType>(resultSet);
                    let saveTypes: SaveType[] = [];
                    iSaveTypes.forEach(iSaveType => {
                        saveTypes.push(new SaveType(iSaveType.Name));
                    });
                    observer.next(saveTypes);
                    observer.complete()
                });
        });
    }

    private _biomes$: Observable<Biome[]>;
    private _getBiomes(): Observable<Biome[]> {
        return new Observable<Biome[]>(observer => {
            this.db.executeSql("SELECT * FROM Biomes", [])
                .then((resultSet: IQueryResults<IBiome>) => {
                    let iBiomes = this.queryResultToArray<IBiome>(resultSet);
                    let biomes: Biome[] = [];
                    iBiomes.forEach(iBiome => {
                        biomes.push(new Biome(iBiome.Name));
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
                        rarities.push(new Rarity(iRarity.Name));
                    });
                    observer.next(rarities);
                    observer.complete();
                });
        });
    }

    private _damageTypes$: Observable<DamageType[]>;
    private _getDamageTypes(): Observable<DamageType[]> {
        return new Observable<DamageType[]>(observer => {
            this.db.executeSql("SELECT * FROM DamageTypes", []).then((resultSet: IQueryResults<IDamageType>) => {
                let iDamageTypes = this.queryResultToArray<IDamageType>(resultSet);
                let damageTypes: DamageType[] = [];
                iDamageTypes.forEach(iDamageType => {
                    damageTypes.push(new DamageType(iDamageType.Name));
                });
                observer.next(damageTypes);
                observer.complete();
            });
        });
    }

    private _baseConcoctions$: Observable<BaseConcoction[]>;
    private _getBaseConcoctions(): Observable<BaseConcoction[]> {
        return new Observable<BaseConcoction[]>(observer => {
            this.db.executeSql("SELECT * FROM " + BaseConcoction.tableName, [])
                .then(async (resultSet: IQueryResults<IBaseConcoction>) => {
                    let iBaseConcoctions = this.queryResultToArray<IBaseConcoction>(resultSet);
                    let baseConcoctions: BaseConcoction[] = [];
                    let essences = await this._essences$.toPromise();
                    for (let i = 0; i < iBaseConcoctions.length; i++) {
                        let iBaseConcoction = iBaseConcoctions[i];
                        let essenceSet = (await this.db.executeSql("SELECT * FROM " + BaseConcoction.essenceTableName + " WHERE BaseConcoctionName=?", [iBaseConcoction.Name])) as IQueryResults<IBaseConcoctionEssence>;
                        let iEssence = this.queryResultToArray<IBaseConcoctionEssence>(essenceSet);
                        let baseEssences = iEssence.map(ie => essences.find(e => e.name === ie.EssenceName));
                        baseConcoctions.push(new BaseConcoction(iBaseConcoction.Name, iBaseConcoction.BaseEffect, baseEssences, iBaseConcoction.BombRadius, iBaseConcoction.DustArea, iBaseConcoction.OilUses));
                    }
                    observer.next(baseConcoctions);
                    observer.complete();
                });
        });
    }

    private _ingredients$: Observable<Ingredient[]>;
    private _getIngredients(): Observable<Ingredient[]> {
        return new Observable<Ingredient[]>(observer => {
            this.db.executeSql("SELECT * FROM " + Ingredient.tableName + ";", [])
                .then(async (resultSet: IQueryResults<IIngredient>) => {
                    let iIngredients = this.queryResultToArray<IIngredient>(resultSet);
                    let ingredients: Ingredient[] = [];

                    let essences = await this._essences$.toPromise();
                    let biomes = await this._biomes$.toPromise();
                    let damageTypes = await this._damageTypes$.toPromise();
                    let rarities = await this._rarities$.toPromise();

                    for (let i = 0; i < iIngredients.length; i++) {
                        let iIngredient = iIngredients[i];
                        let essenceSet = (await this.db.executeSql("SELECT * FROM " + Ingredient.essenceTableName + " WHERE IngredientName=?", [iIngredient.Name])) as IQueryResults<IIngredientEssence>;
                        let iEssence = this.queryResultToArray<IIngredientEssence>(essenceSet);
                        let ingredientEssences = iEssence.map(ie => essences.find(e => e.name === ie.EssenceName));

                        let biomeSet = (await this.db.executeSql("SELECT * FROM " + Ingredient.biomeTableName + " WHERE IngredientName=?", [iIngredient.Name])) as IQueryResults<IIngredientBiome>;
                        let iBiome = this.queryResultToArray<IIngredientBiome>(biomeSet);
                        let ingredientBiomes = iBiome.map(ib => biomes.find(b => b.name === ib.BiomeName));

                        let rarity = rarities.find(r => r.name === iIngredient.RarityName) || null;
                        let damageType = damageTypes.find(d => d.name === iIngredient.DamageTypeName) || null;

                        let ingredient = new Ingredient(
                            iIngredient.Name,
                            ingredientEssences,
                            ingredientBiomes,
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
                            iIngredient.Details,
                            rarity,
                            damageType
                        );
                        ingredients.push(ingredient);
                    }
                    observer.next(ingredients);
                    observer.complete();
                });
        });
    }

    private _concoctions$: Observable<Concoction[]>;
    private _getConcoctions(): Observable<Concoction[]> {
        return new Observable<Concoction[]>((observer) => {
            this.db.executeSql("SELECT * FROM " + Concoction.tableName + ";", [])
                .then(async (resultSet: IQueryResults<IConcoction>) => {
                    let iConcoctions = this.queryResultToArray<IConcoction>(resultSet);
                    let concoctions: Concoction[] = [];

                    let saveTypes = await this._saveTypes$.toPromise();
                    let damageTypes = await this._damageTypes$.toPromise();
                    let essences = await this._essences$.toPromise();
                    let ingredients = await this._ingredients$.toPromise();

                    for (let i = 0; i < iConcoctions.length; i++) {
                        let iConcoction = iConcoctions[i];

                        let iConcoctionEssenceSet = (await this.db.executeSql("SELECT * FROM " + Concoction.essenceTableName + " WHERE ConcoctionName=?", [iConcoction.Name])) as IQueryResults<IConcoctionEssence>;
                        let iConcoctionEssences = this.queryResultToArray<IConcoctionEssence>(iConcoctionEssenceSet);
                        let concoctionEssences = iConcoctionEssences.map(iConcoctionEssence => essences.find(e => e.name === iConcoctionEssence.EssenceName));

                        let iConcoctionIngredientSet = (await this.db.executeSql("SELECT * FROM " + Concoction.ingredientTableName + " WHERE ConcoctionName=?", [iConcoction.Name])) as IQueryResults<IConcoctionIngredient>;
                        let iConcoctionIngredients = this.queryResultToArray<IConcoctionIngredient>(iConcoctionIngredientSet);
                        let concoctionIngredients = iConcoctionIngredients.map(iConcoctionIngredient =>
                            new ConcoctionIngredient(
                                iConcoctionIngredient.Id,
                                iConcoctionIngredient.ConcoctionName,
                                ingredients.filter(ingredient =>
                                    ingredient.name === iConcoctionIngredient.IngredientName ||
                                    ingredient.name === iConcoctionIngredient.PrimaryAlternateIngredientName ||
                                    ingredient.name === iConcoctionIngredient.SecondaryAlternateIngredientName)
                            )
                        );

                        let saveType = saveTypes.find(s => s.name === iConcoction.SaveTypeName) || null;
                        let damageType = damageTypes.find(d => d.name === iConcoction.DamageTypeName) || null;

                        let newConcoction = new Concoction(iConcoction.Name, iConcoction.Effect, concoctionEssences,
                            concoctionIngredients, iConcoction.DieType, iConcoction.DieNumber, iConcoction.DC, saveType, damageType,
                            iConcoction.DurationLength, iConcoction.DurationType);
                        concoctions.push(newConcoction);
                    }

                    observer.next(concoctions);
                    observer.complete();
                });
        });
    }

    private _characters$: Observable<Character[]>;
    private _getCharacters(): Observable<Character[]> {
        return new Observable<Character[]>(observer => {
            this.db.executeSql("SELECT * FROM " + Character.tableName + ";", []).then((resultSet: IQueryResults<ICharacter>) => {
                let iCharacters = this.queryResultToArray<ICharacter>(resultSet);
                let characters: Character[] = [];
                iCharacters.forEach(iCharacter => {
                    characters.push(new Character(iCharacter.Name, iCharacter.Year, iCharacter.Month, iCharacter.Day));
                })
                observer.next(characters);
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
                await this.db.executeSql("INSERT INTO " + BaseConcoction.tableName + " (Name, BaseEffect, BombRadius, DustArea, OilUses) VALUES (?, ?, ?, ?, ?);", [jsonBaseConcoction.name, jsonBaseConcoction.baseEffect, jsonBaseConcoction.bombRadius, jsonBaseConcoction.dustArea, jsonBaseConcoction.oilUses]);
                for (let j = 0; j < jsonBaseConcoction.baseEssences.length; j++) {
                    let newEssence = jsonBaseConcoction.baseEssences[j];
                    let newEssenceName = essences.find(e => e.name === newEssence).name;
                    await this.db.executeSql("INSERT INTO " + BaseConcoction.essenceTableName + " (BaseConcoctionName, EssenceName) VALUES (?, ?);", [jsonBaseConcoction.name, newEssenceName]);
                }
            } else { // There is a match
                await this.db.executeSql("UPDATE " + BaseConcoction.tableName + " SET BaseEffect=?, BombRadius=?, DustArea=?, OilUses=? WHERE Name=?;", [jsonBaseConcoction.baseEffect, jsonBaseConcoction.bombRadius, jsonBaseConcoction.dustArea, jsonBaseConcoction.oilUses, existingBaseConcoction.name]);
                await this.db.executeSql("DELETE FROM " + BaseConcoction.essenceTableName + " WHERE BaseConcoctionName=?;", [existingBaseConcoction.name]);
                for (let j = 0; j < jsonBaseConcoction.baseEssences.length; j++) {
                    let newEssence = jsonBaseConcoction.baseEssences[j];
                    let newEssenceName = essences.find(e => e.name === newEssence).name;
                    await this.db.executeSql("INSERT INTO " + BaseConcoction.essenceTableName + " (BaseConcoctionName, EssenceName) VALUES (?, ?);", [existingBaseConcoction.name, newEssenceName]);
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

            let rarityName = null;
            if (jsonIngredient.rarity) {
                let rarity = rarities.find(r => r.name.toLowerCase() === jsonIngredient.rarity!.toLowerCase());
                if (rarity != null) {
                    rarityName = rarity.name;
                } else {
                    throw new Error("No rarity " + jsonIngredient.rarity);
                }
            }

            let damageTypeName = null;
            if (jsonIngredient.damageType) {
                let damageType = damageTypes.find(d => d.name.toLowerCase() === jsonIngredient.damageType!.toLowerCase());
                if (damageType != null) {
                    damageTypeName = damageType.name;
                } else {
                    throw new Error("No damage type " + jsonIngredient.damageType);
                }
            }

            let ingredientName = null;
            let existingIngredient = existingIngredients.find(existing => existing.name === jsonIngredient.name);
            if (existingIngredient == null) { // There was no match

                await this.db.executeSql("INSERT INTO Ingredients(Name, Details, RarityName, DamageTypeName, IncreaseHealing, " +
                    "IncreaseArcaneRecovery, IncreaseDamageNumber, IncreaseDamageSize, IncreaseSave, DoubleDuration, DoubleBombRadius, DoubleDustArea, " +
                    "ExtraOilUse, DisadvantageDex, DisadvantageCon, DisadvantageWis, DisadvantageSaves)" +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
                    jsonIngredient.name,
                    jsonIngredient.details,
                    rarityName,
                    damageTypeName,
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
                    jsonIngredient.disadvantageSaves ?? false
                ]);
                ingredientName = jsonIngredient.name;
            } else { // There is a match
                ingredientName = existingIngredient.name;
                await this.db.executeSql("UPDATE Ingredients SET Details=?, RarityName=?, DamageTypeName=?, IncreaseHealing=?, " +
                    "IncreaseArcaneRecovery=?, IncreaseDamageNumber=?, IncreaseDamageSize=?, IncreaseSave=?, DoubleDuration=?, DoubleBombRadius=?, DoubleDustArea=?, " +
                    "ExtraOilUse=?, DisadvantageDex=?, DisadvantageCon=?, DisadvantageWis=?, DisadvantageSaves=?" +
                    "WHERE Name=?;", [
                    jsonIngredient.details,
                    rarityName,
                    damageTypeName,
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
                    ingredientName
                ]);
                await this.db.executeSql("DELETE FROM " + Ingredient.essenceTableName + " WHERE IngredientName=?;", [ingredientName]);
                await this.db.executeSql("DELETE FROM " + Ingredient.biomeTableName + " WHERE IngredientName=?;", [ingredientName]);
            }

            for (let j = 0; j < jsonIngredient.essences.length; j++) {
                let newEssence = jsonIngredient.essences[j];
                let newEssenceName = essences.find(e => e.name === newEssence).name;
                await this.db.executeSql("INSERT INTO " + Ingredient.essenceTableName + " (IngredientName, EssenceName) VALUES (?, ?);", [ingredientName, newEssenceName]);
            }
            for (let j = 0; j < jsonIngredient.locations.length; j++) {
                let newLocation = jsonIngredient.locations[j];
                let newLocationName = biomes.find(b => b.name === newLocation).name;
                await this.db.executeSql("INSERT INTO " + Ingredient.biomeTableName + " (IngredientName, BiomeName) VALUES (?, ?);", [ingredientName, newLocationName]);
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

            let damageTypeName: string = null;
            if (jsonConcoction.damageType) {
                let damage = damageTypes.find(d => d.name.toLowerCase() === jsonConcoction.damageType.toLowerCase());
                if (damage != null) {
                    damageTypeName = damage.name;
                } else {
                    throw new Error("No damage type " + jsonConcoction.damageType);
                }
            }

            let saveTypeName: string = null;
            if (jsonConcoction.save) {
                let save = saveTypes.find(s => s.name.toLowerCase() === jsonConcoction.save.toLowerCase());
                if (save != null) {
                    saveTypeName = save.name;
                } else {
                    throw new Error("No save type " + jsonConcoction.save);
                }
            }

            let concoctionName = null;
            let existingConcoction = existingConcoctions.find(existing => existing.name === jsonConcoction.name);
            if (existingConcoction == null) { // There was no match
                await this.db.executeSql("INSERT INTO " + Concoction.tableName + " (Name, DieType, DieNumber, DC, SaveTypeName, DamageTypeName, Effect, DurationLength, DurationType) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);", [
                    jsonConcoction.name, jsonConcoction.dieType, jsonConcoction.dieNumber, jsonConcoction.DC, saveTypeName, damageTypeName, jsonConcoction.effect, jsonConcoction.durationLength, jsonConcoction.durationType
                ]);
                concoctionName = jsonConcoction.name;

            } else { // There is a match
                concoctionName = existingConcoction.name;


                await this.db.executeSql("UPDATE " + Concoction.tableName + " " +
                    "SET DieType=?, DieNumber=?, DC=?, SaveTypeName=?, DamageTypeName=?, Effect=?, DurationLength=?, DurationType=?" +
                    "WHERE Name=?",
                    [jsonConcoction.dieType, jsonConcoction.dieNumber, jsonConcoction.DC, saveTypeName, damageTypeName, jsonConcoction.effect, jsonConcoction.durationLength, jsonConcoction.durationType, concoctionName]);
                await this.db.executeSql("DELETE FROM " + Concoction.essenceTableName + " WHERE ConcoctionName=?", [concoctionName]);
                await this.db.executeSql("DELETE FROM " + Concoction.ingredientTableName + " WHERE ConcoctionName=?", [concoctionName]);
            }

            for (let j = 0; j < jsonConcoction.essences.length; j++) {
                let newEssence = jsonConcoction.essences[j];
                let newEssenceName = essences.find(e => e.name === newEssence).name;
                await this.db.executeSql("INSERT INTO " + Concoction.essenceTableName + " (ConcoctionName, EssenceName) VALUES (?, ?);", [concoctionName, newEssenceName]);
            }

            for (let j = 0; j < jsonConcoction.requiredIngredients.length; j++) {
                let newRequiredIngredients = jsonConcoction.requiredIngredients[j].split(" OR ");
                let ingredient = ingredients.find(i => i.name.toLowerCase() === newRequiredIngredients[0].toLowerCase())
                let ingredientName = ingredient.name || null;
                let primaryAlternateIngredient = null;
                let primaryAlternateIngredientName = null;
                let secondaryAlternateIngredient = null;
                let secondaryAlternateIngredientName = null;
                if (newRequiredIngredients.length >= 2) {
                    primaryAlternateIngredient = ingredients.find(i => i.name.toLowerCase() === newRequiredIngredients[1].toLowerCase())
                    primaryAlternateIngredientName = primaryAlternateIngredient.name || null;
                }
                if (newRequiredIngredients.length >= 3) {
                    secondaryAlternateIngredient = ingredients.find(i => i.name.toLowerCase() === newRequiredIngredients[2].toLowerCase())
                    secondaryAlternateIngredientName = secondaryAlternateIngredient.name || null;
                }
                await this.db.executeSql("INSERT INTO " + Concoction.ingredientTableName + " (ConcoctionName, IngredientName, PrimaryAlternateIngredientName, SecondaryAlternateIngredientName) " +
                    "VALUES(?, ?, ?, ?);",
                    [concoctionName, ingredientName, primaryAlternateIngredientName, secondaryAlternateIngredientName]);
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
                    let result = await this.db.sqlBatch([missingMigrations[i].RawSql.join("")]);
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

    private async _deleteDatabase(): Promise<void> {
        await this.db.close()
        await this.sqlite.deleteDatabase(this.sqliteConfig)
        console.debug("Deleted Database")
    }

    public async initialise(): Promise<void> {
        this.db = await this._openDb();

        // await this._deleteDatabase();
        // this.db = await this._openDb();

        await this._createMigrationsTable();
        await this._runMigrations();

        // Must be called after _runMigrations so that the tables exist
        this._setLookups(); // Must be called to set the caches
        this.refreshBaseConcoctions();// Must be called to set the cache, is also set at the end of the UpdateFromJson
        this.refreshIngredients();// Must be called to set the cache, is also set at the end of the UpdateFromJson
        this.refreshConcoctions();// Must be called to set the cache, is also set at the end of the UpdateFromJson
        this.refreshCharacters();// Must be called to set the cache

        // await this.updateBaseConcoctionsFromJson();
        // await this.updateIngredientsFromJson();
        // await this.updateConcoctionsFromJson();
        this.initialiseSubject.next();
        this.initialiseSubject.complete();
    }
}

interface IMigration {
    Name: string;
    RawSql?: string[] | undefined;
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