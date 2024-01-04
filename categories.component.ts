// categories.component.ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Import NgForm
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {}

  onSubmit(categoryForm: NgForm) {
    const categoryData = {
      category: categoryForm.value.category,
    };

    this.categoryService.addCategory(categoryData).subscribe(() => {
      console.log('Category added successfully');
      // Reset the form after submission
      categoryForm.reset();
    });
  }
}
