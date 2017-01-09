import {Component, Input} from "@angular/core";
import {ICategory} from "../models/ICategory";
import {AppService} from "../../app.service";
import {SimpleModel} from "../models/SimpleModel";
import {ShopService} from "../ShopService";

interface FileReaderEventTarget extends EventTarget {
  result: string
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}
const close = require('../resource/images/closeDark.png');
const noImageIcon = require("../resource/images/noImageIcon.png");

@Component({
  selector: 'categories',
  templateUrl: 'categories.template.html',
  styleUrls: ['./categories.less']
})
export class CategoriesComponent {
  @Input() categories: ICategory[];
  file: any;
  category: ICategory = <ICategory>{};
  previewImg: any;
  closeIcon = close;

  constructor(private appService: AppService,
              private shopService: ShopService) {
    this.initNewCategory();
  }

  getPicture() {
    return this.previewImg || noImageIcon;
  }

  onFileChange(event) {
    this.file = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (e: FileReaderEvent) => {
        this.previewImg = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  upload() {
    this.appService.uploadFile('images/upload', this.file)
      .then((imageData: SimpleModel) => {
        this.category.imageId = imageData.id;
        return this.shopService.addCategory(this.category);
      })
      .then(() => this.shopService.getCategories())
      .then((categories: ICategory[]) => {
        this.categories = categories;
      });
  }

  isAddDisabled(): boolean {
    return !this.category.categoryName || !this.file;
  }

  deleteCategory(categoryId: number) {
    this.shopService.deleteCategory(categoryId)
      .then((categories: ICategory[]) => {
        this.categories = categories;
      })
  }

  private initNewCategory() {
    this.file = null;
    this.previewImg = null;
    this.category = <ICategory>{};
  }
}
