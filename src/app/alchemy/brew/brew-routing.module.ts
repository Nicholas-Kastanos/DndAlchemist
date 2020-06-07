import { NgModule } from '@angular/core'
import {Routes, RouterModule} from '@angular/router';

import {BrewPage} from './brew.page';

const routes: Routes = [
    {
        path: '',
        component: BrewPage,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BrewPageRoutingModule {}