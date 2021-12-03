import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import {PhotosService} from '../photos.service';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate, sequence } from '@angular/animations';

const  rowsAnimation =
trigger('rowsAnimation', [
  transition('void => *', [
    style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
    sequence([
      animate(".35s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'  })),
      animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
    ])
  ])
]);

@Component({
  selector: 'app-list-photos',
  templateUrl: './list-photos.component.html',
  styleUrls: ['./list-photos.component.scss'],
  animations:[rowsAnimation]
})

export class ListPhotosComponent implements OnInit,AfterViewInit {

  @ViewChild('comparePaginator') paginator:MatPaginator;
  listingName:string = "Photo Listing";
  tableHeading:string = "Comparison table";
  pageEvent:PageEvent
  pageNo= 1;
  photoList:any;
  photosGet=[];
  action='Compare';
  dataSource:MatTableDataSource<any>;
  comparedPhotos:any=[];

  displayedColumns:string[];
  pageSize:number=5;
  divPageSize:number=5;
  count:number=200;
  columns: string[];
  constructor(
    private photoService:PhotosService,
  ) { }

  ngOnInit(): void {
    this.displayedColumns=["thumbnailUrl","id","url","title"];
    this.getPhotos(this.pageNo,this.divPageSize);
    this.dataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getPhotos(pageIndex,limit){
    let totalPhotos = this.photosGet.length;
    if(this.photosGet.length<(pageIndex*limit) && this.photosGet.length<=((pageIndex-1)*limit)){
      this.photoService.getPhotos(pageIndex,limit).subscribe(resp=>{
        this.photoList = resp;
        this.photosGet=this.photosGet.concat(this.photoList);
      },
      err=>{
        console.log("something went wrong ",err.message);
      })
    }
    else if(this.photosGet.length<(pageIndex*limit) && this.photosGet.length>((pageIndex-1)*limit)){
      let limit1 = ((pageIndex*limit) - this.photosGet.length)
      let pageIndex1 = (totalPhotos/limit1)+1
      this.photoService.getPhotos(pageIndex1,limit1).subscribe(resp=>{
        this.photosGet=this.photosGet.concat(resp);
        this.photoList =this.photosGet.slice((pageIndex-1)*limit,limit*pageIndex); ;
      })
    }
    else{
      this.photoList = this.photosGet.slice((pageIndex-1)*limit,limit*pageIndex);
    }
  }
  onPageEvent(event:PageEvent){
    this.pageNo = event.pageIndex+1;
    this.divPageSize=event.pageSize
    this.getPhotos(this.pageNo,this.divPageSize);
  }
  addOrRemovePhoto(photo,action,index){
    if(action=='add'){
      photo['remove']=true;
      this.comparedPhotos.push(photo);
    }
    if(action=='remove'){
      let i = this.comparedPhotos.indexOf(photo)
      this.comparedPhotos.splice(i,1);
      photo['remove']=false;
    }

   this.dataSource.data = [...this.comparedPhotos];
  }


}

