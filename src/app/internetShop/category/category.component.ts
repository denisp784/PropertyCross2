import {Component, Input, Output} from "@angular/core";
import {ICategory} from "../models/ICategory";
import {AppService} from "../../app.service";
import {SimpleModel} from "../models/SimpleModel";
import {ShopService} from "../ShopService";
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs";

const close = require('../resource/images/closeDark.png');
const noImageIcon = require("../resource/images/noImageIcon.png");

@Component({
  selector: 'category',
  templateUrl: 'category.template.html',
  styleUrls: ['category.less']
})
export class CategoriesComponent {

  @Input() category: ICategory;
  @Output() deleteCategory: (category: ICategory) => void;

  constructor(private shopService: ShopService) {
  }
  /*file: any;
  categories: ICategory[];
  category: ICategory = <ICategory>{};
  previewImg: any;
  closeIcon = close;
  sectionId: string;
  private subscription: Subscription;

  constructor(private appService: AppService,
              private shopService: ShopService,
              private route: ActivatedRoute,
              private parentRouter: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.sectionId = params['sectionId'];
    });

    this.loadCategories();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadCategories() {
    if (!this.sectionId) {
      this.parentRouter.navigateByUrl("");
      return;
    }

    this.initNewCategory();
    this.shopService.getSectionCategories(this.sectionId)
      .then((categories: ICategory[]) => {
        this.categories = categories;
      });
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
      .then(() => this.shopService.getSectionCategories(this.sectionId))
      .then((categories: ICategory[]) => {
        this.categories = categories;
        this.initNewCategory();
      });
  }

  isAddDisabled(): boolean {
    return !this.category.categoryName || !this.file;
  }

  deleteCategory(categoryId: number, event) {
    event.stopPropagation();

    this.shopService.deleteCategory(categoryId)
      .then((categories: ICategory[]) => {
        this.categories = categories;
      });
  }

  private initNewCategory() {
    this.file = null;
    this.previewImg = null;
    this.category = <ICategory>{};
    this.category.sectionId = +this.sectionId;
  }*/
}
