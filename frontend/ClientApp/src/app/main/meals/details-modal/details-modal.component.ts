import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Meal, UserInfo } from '@app/core/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debug } from 'util';
import { UpdateMeal, CreateMeal } from '../meals.actions';
import { AppState } from '@app/app.state';

@Component({
  selector: 'app-meals-details-modal',
  templateUrl: './details-modal.component.html'
})
export class DetailsModalComponent implements OnInit {
  isEditing = false;
  opened = false;

  selectedMeal: Meal = Meal.createNew();
  form: FormGroup;

  @Input() userId!: string;

  constructor(private readonly store: Store, private readonly fb: FormBuilder) { }

  ngOnInit() {
    
  }

  editMeal(meal: Meal) {
    if (!meal) {
      return;
    }
    this.opened = true;
    this.isEditing = true;
    this.selectedMeal = meal;
    this.buildForm();
  }

  openModal() {
    this.opened = true;
    this.isEditing = false;
    this.selectedMeal = Meal.createNew();
    this.buildForm();
  }

  closeModal() {
    this.opened = false;
  }

  buildForm() {
    this.form = this.fb.group({
      date: [this.selectedMeal.date, Validators.required],
      text: [this.selectedMeal.text, Validators.required],
      calories: [this.selectedMeal.calories, Validators.required]
    });
  }

  save(close: boolean) {
    if (this.form.valid) {
      const resultMeal = new Meal(
        this.selectedMeal.id,
        this.form.controls.text.value,
        this.form.controls.date.value,
        this.form.controls.calories.value
      );

      if (this.isEditing) {
        this.store.dispatch(new UpdateMeal(this.userId, resultMeal));
      } else {
        this.store.dispatch(new CreateMeal(this.userId, resultMeal));
      }
      this.form.reset();
      if (close) {
        this.closeModal();
      }
    }
  }
}
