import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateLinkPage } from './create-link.page';

describe('CreateLinkPage', () => {
  let component: CreateLinkPage;
  let fixture: ComponentFixture<CreateLinkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLinkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
