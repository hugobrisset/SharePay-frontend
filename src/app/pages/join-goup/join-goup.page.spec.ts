import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinGoupPage } from './join-goup.page';

describe('JoinGoupPage', () => {
  let component: JoinGoupPage;
  let fixture: ComponentFixture<JoinGoupPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinGoupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
