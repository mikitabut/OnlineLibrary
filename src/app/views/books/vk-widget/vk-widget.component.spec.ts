import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VkWidgetComponent } from './vk-widget.component';

describe('VkWidgetComponent', () => {
  let component: VkWidgetComponent;
  let fixture: ComponentFixture<VkWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VkWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VkWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
