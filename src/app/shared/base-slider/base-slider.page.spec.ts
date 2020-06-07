import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BaseSliderPage } from './base-slider.page';

describe('BaseSliderPage', () => {
  let component: BaseSliderPage;
  let fixture: ComponentFixture<BaseSliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseSliderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BaseSliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
