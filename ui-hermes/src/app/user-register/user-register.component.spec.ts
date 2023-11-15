import { ComponentFixture, TestBed} from '@angular/core/testing';
import { UserRegisterComponent } from './user-register.component';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('UserRegisterComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRegisterComponent]
    });
    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
