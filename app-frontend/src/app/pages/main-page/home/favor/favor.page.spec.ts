import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavorPage } from './favor.page';

describe('FavorPage', () => {
  let component: FavorPage;
  let fixture: ComponentFixture<FavorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
