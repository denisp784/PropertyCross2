import {Component, OnInit} from "@angular/core";
import {ShopService} from "../ShopService";
import {ICategoryGroup} from "../models/ICategoryGroup";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ICategory} from "../models/ICategory";
import {SimpleModel} from "../models/SimpleModel";
import {AppService} from "../../app.service";

const noImageIcon = require("../resource/images/noImageIcon.png");

interface FileReaderEventTarget extends EventTarget {
  result: string
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}

@Component({
  selector: 'categoryGroup',
  templateUrl: 'categoryGroup.template.html',
  styleUrls: ['categoryGroup.less']
})
export class CategoryGroupComponent implements OnInit {

  categoryGroups: ICategoryGroup[];
  category: ICategory = <ICategory>{};
  sectionId: number;
  previewImg: any;
  file: any;
  private subscription: Subscription;

  constructor(
    private appService: AppService,
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

    // this.initNewCategory();

    this.shopService.getCategoryGroupBySection(this.sectionId)
      .then((categoryGroups) => {
        this.categoryGroups = categoryGroups;
      });
  }

  getPicture() {
    return this.previewImg || noImageIcon;
  }

  isAddDisabled(): boolean {
    return !this.category.categoryName || !this.file;
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

  upload(group: ICategoryGroup) {
    this.appService.uploadFile('images/upload', this.file)
      .then((imageData: SimpleModel) => {
        this.category.imageId = imageData.id;
        this.category.categoryGroup = group;
        return this.shopService.addCategory(this.category);
      })
      .then(() => this.shopService.getCategoryGroupBySection(this.sectionId))
      .then((categoryGroups: ICategoryGroup[]) => {
        this.categoryGroups = categoryGroups;
        // this.initNewCategory();
      });
  }
}