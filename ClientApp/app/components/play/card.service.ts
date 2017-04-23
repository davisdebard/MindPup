import { Injectable } from '@angular/core';
import { Card } from './card';
import { CARD1, CARD2, CARD3 } from './mock-cards';

@Injectable()
export class CardService {

    // Get cards using Promise.
    getCards(tenset:number): Promise<Card[]> 
    {
        switch (tenset)
        {
            case 1:
                return Promise.resolve(CARD1);
            case 2:
                return Promise.resolve(CARD2);
            case 3:
                return Promise.resolve(CARD3);
        }
    }
}