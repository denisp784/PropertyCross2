import {Component, Input} from "@angular/core";
import {ICategory} from "../models/ICategory";
import {AppService} from "../../app.service";
import {SimpleModel} from "../models/SimpleModel";

@Component({
  selector: 'categories',
  templateUrl: 'categories.template.html',
  styleUrls: ['./categories.less']
})
export class CategoriesComponent {
  @Input() categories: ICategory[];
  file: any;

  constructor(private appService: AppService) {}

  onFileChange(event) {
    this.file = event.target.files[0];
  }

  upload() {
    this.appService.uploadFile('images/upload', this.file)
      .then((imageData: SimpleModel) => {
        console.log(imageData.id);
      });
  }
}
