import { Component, OnInit, Input } from '@angular/core';
import { UploadFileService } from '../../services/upload-fileService';
import { FileListService } from '../../services/fileListService';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from "read-appsettings-json";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['../product/product.component.css'],
  providers: [UploadFileService]
})
export class UploadFileComponent implements OnInit {
  @Input() SdsidNumber: string;
  imageUrl: string = "../../assets/images/default-image.png";
  SdsId: string = "DID NOT WORK123ABCDEGG";
  //files: Observable<Object> | undefined;
  files: any[] | undefined;
  fileAPIURL: string = "";
  fileToUpload: File = null;

  constructor(private fileUploadService: UploadFileService, private fileListService: FileListService) { }

  ngOnInit() {
    //  this.files = this.fileListService.getAllFiles();
    this.fileListService.getAllFiles().subscribe(data => {
      this.files = data;
    });

    this.fileListService.getAllFiles().subscribe(data => {

      this.files = data.filter(data => data.Sdsfid == this.SdsidNumber);
    });

    this.fileAPIURL = AppSettings.Current().ConnectionStrings["FileAPIURL"];
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }


  OnSubmit(File) {

    this.fileUploadService.postFile(this.SdsidNumber, this.fileToUpload).subscribe(
      data => {
        console.log('done process that file');
        //Caption.value = null;
        File.value = null;
        this.fileListService.getAllFiles().subscribe(data => {
          this.files = data.filter(data => data.Sdsfid == this.SdsidNumber);
        });
        //  this.imageUrl = "../../assets/images/default-image.png";
      }
    );

  }

  /**call service to delete a file item?.fid, item?.fileName**/
  public deleteFile(fileId: string, fileName: string) {
    if (confirm("Confirm deletion?")) {
      this.fileUploadService.deleteFile(fileName).subscribe(response => {
        console.log('target file.' + fileName);
        this.fileListService.getAllFiles().subscribe(data => {
          this.files = data.filter(data => data.Sdsfid == this.SdsidNumber);
        });
      }, error => console.log('Could not delete the file.' + fileName + ' '));
      this.fileListService.removeItem(fileId).subscribe(response => {
      }, error => console.log('Could not delete file record.' + fileId + ' '));
      //location.reload();
    }
  }
}
