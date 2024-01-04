import { ElementRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { ContentService } from 'src/app/services/contents.service';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
  @ViewChild('contentForm') contentForm!: NgForm;

  contentData: any = {
    title: '',
    description: '',
    author: '',
    // category: '',
    date: '',
    tags: '',
    selectedCategory: '',
    content: '',
  };
  imageFile: File | null = null;
  categories: string[] = [];
  url = './assets/images/img1.jpg';
  constructor(
    private contentService: ContentService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }
  // onFileSelected(event: any) {
  //   const fileInput = event.target as HTMLInputElement;
  //   this.imageFile = (fileInput.files && fileInput.files[0]) || null;

  //   if (this.imageFile) {
  //     console.log('Selected file:', this.imageFile);
  //   }
  // }
  onFileSelected(e: Event): void {
    const inputElement = e.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(inputElement.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;

        // Update the image property in contentData
        this.contentData.image = this.url;
      };
    }
  }
  onSubmit() {
    if (this.contentForm.invalid) {
      return;
    }

    const contentData = {
      title: this.contentData.title,
      description: this.contentData.description,
      author: this.contentData.author,
      category: this.contentData.category,
      date: this.contentData.date,
      tags: this.contentData.tags,
      selectedCategory: this.contentData.selectedCategory,
      content: this.contentData.content,
      image: this.contentData.image,
    };

    this.contentService.addContent(contentData).subscribe(() => {
      console.log('Content added successfully');
      this.contentForm.resetForm();
    });
  }
  updateContent(contentData: any) {
    console.log('Updating content:', contentData);
  }
}
