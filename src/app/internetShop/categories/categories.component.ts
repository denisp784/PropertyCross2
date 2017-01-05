import {Component, Input} from "@angular/core";
import {ICategory} from "../models/ICategory";
import {AppService} from "../../app.service";
import {SimpleModel} from "../models/SimpleModel";
import {ShopService} from "../ShopService";
import {IImage} from "../models/IImage";

interface FileReaderEventTarget extends EventTarget {
  result:string
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage():string;
}

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

  constructor(private appService: AppService,
              private shopService: ShopService) {}

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
        this.category.image = <IImage>{id: imageData.id};
        return this.shopService.addCategory(this.category);
      });
  }
}
