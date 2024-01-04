import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/contents.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  contentList: any[] = []; // Array to store content data
  editingContent: any = null;
  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.loadContentData();
  }

  loadContentData() {
    this.contentService.getAllContent().subscribe(
      (contentList: any[]) => {
        this.contentList = contentList;
      },
      (error: any) => {
        console.error('Error fetching content data', error);
      }
    );
  }
  editContent(content: any) {
    this.editingContent = { ...content };
  }

  cancelEdit() {
    this.editingContent = null;
  }

  saveContent() {
    if (!this.editingContent) {
      return;
    }

    this.contentService.updateContent(this.editingContent).subscribe(
      () => {
        console.log('Content updated successfully.');

        this.loadContentData();

        this.editingContent = null;
      },
      (error: any) => {
        console.error('Error updating content', error);
      }
    );
  }

  deleteContent(contentId: number) {
    this.contentService.deleteContent(contentId).subscribe(
      () => {
        console.log(`Content with ID ${contentId} deleted successfully.`);

        this.loadContentData();
      },
      (error: any) => {
        console.error(`Error deleting content with ID ${contentId}`, error);
      }
    );
  }
}
