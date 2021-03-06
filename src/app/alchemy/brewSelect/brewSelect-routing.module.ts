import { NgModule } from '@angular/core'
import {Routes, RouterModule} from '@angular/router';

import {BrewSelectPage} from './brewSelect.page';

const routes: Routes = [
    {
        path: '',
        component: BrewSelectPage,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BrewSelectPageRoutingModule {}