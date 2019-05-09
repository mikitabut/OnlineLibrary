import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VkAuthComponent } from './vk-auth.component';

describe('VkAuthComponent', () => {
  let component: VkAuthComponent;
  let fixture: ComponentFixture<VkAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VkAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VkAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
