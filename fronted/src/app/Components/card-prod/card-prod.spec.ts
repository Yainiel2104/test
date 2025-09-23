import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProd } from './card-prod';

describe('CardProd', () => {
  let component: CardProd;
  let fixture: ComponentFixture<CardProd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
