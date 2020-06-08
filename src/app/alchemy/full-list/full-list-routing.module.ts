import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import {FullListPage} from './full-list.page';

const routes: Routes = [
    {
        path: '',
        component: FullListPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FullListPageRoutingModule {}