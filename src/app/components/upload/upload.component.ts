import { Component, EventEmitter, OnInit, Output,Injector} from '@angular/core';
import { Storage, deleteObject, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
delete() {
  console.log("delete")
    const storage = this.injector.get(Storage)
    const someref = ref(storage, `/images/${this.file.name}`);
  deleteObject(someref)
  .then(()=>{this.onDelete.emit(this.url.toString());console.log("deleted");this.url="";this.filename=""})
}
  getFile(event: any) {
    const storage = this.injector.get(Storage)
    console.log(event.target.files)
    this.file=event.target.files[0];
    this.filename=this.file.name;
    uploadBytesResumable(ref(storage,`/images/${this.file.name}`),this.file)
    .then(async res=>{
      const someref = ref(storage, `/images/${this.file.name}`);
      await getDownloadURL(someref).then(x=>{this.onChange.emit(x.toString());this.url=x;})
      .catch((e)=>console.log(e))
    })
  }
  file!:any;
  filename=""
  @Output() onChange = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();
  url="";
  constructor(private injector: Injector) { }

  ngOnInit(): void {
  }
  
}
