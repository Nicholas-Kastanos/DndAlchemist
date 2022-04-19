import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Character } from '../classes/character/character.class';

@Injectable({
    providedIn: 'root'
})
export class CharacterService{
    public selectedCharacter$: ReplaySubject<Character> = new ReplaySubject<Character>(1);
} 