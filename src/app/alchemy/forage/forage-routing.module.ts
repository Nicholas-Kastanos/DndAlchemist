import { NgModule } from '@angular/core'
import {Routes, RouterModule} from '@angular/router';

import {ForagePage} from './forage.page';

const routes: Routes = [
    {
        path: '',
        component: ForagePage,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ForagePageRoutingModule {}