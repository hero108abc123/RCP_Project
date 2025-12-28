import { IFindPagingRoom, IViewRoom } from "@/models/rcp/room.models";
import { RoomService } from "@/service/room.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { DataTable } from "@/shared/components/data-table/data-table";
import { CellViewTypes } from "@/shared/constants/data-table.constants";
import { SharedImports } from "@/shared/import.shared";
import { IColumn } from "@/shared/models/data-table.models";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { PaginatorState } from "primeng/paginator";
import { TblAction } from "./tbl-action/tbl-action";

@Component({
    selector: 'app-room',
    imports: [...SharedImports, DataTable],
    templateUrl: './room.html',
    styleUrl: './room.scss'
})
export class Room extends BaseComponent{
    _roomService = inject(RoomService);

    searchForm : FormGroup = new FormGroup({
        search: new FormControl(''),
        name: new FormControl(''),
        location: new FormControl(''),
    });

    columns :IColumn[] = [
        { header: 'STT', cellViewType: CellViewTypes.INDEX, headerContainerStyle: 'width: 6rem', cellStyle: 'text-align:center' },
        { header: 'Tên phòng chiếu', field: 'name',  headerContainerStyle: 'min-width: 12rem', cellClass: 'cursor-pointer hover:text-blue-800 hover:underline', clickable: true ,cellStyle: 'text-align:center' },
        { header: 'Mô tả', field: 'description', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Vị trí', field: 'location', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Tổng số lượng ghế', field: 'tongSoLuongGhe', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Số lượng ghế thường', field: 'soLuongGheThuong', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Số lượng ghế Vip', field: 'soLuongGheVip', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Số lượng ghế đôi ', field: 'SoLuongGheDoi', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Thao tác', headerContainerStyle: 'width: 6rem', cellViewType: CellViewTypes.CUSTOM_COMP, customComponent: TblAction ,cellStyle: 'text-align:center'}
            
    ];

    data: IViewRoom[] =[];

    query: IFindPagingRoom = {
        pageNumber: 1,
        pageSize: this.MAX_PAGE_SIZE,
    };
    override ngOnInit(): void {
        this.getData();
    }
    onSearch() {
       
        this.getData();
    }

    getData() {
        this.loading = true;
        this._roomService.findPaging({...this.query,...this.searchForm.value}).subscribe({
            next: (res) => {
                if(this.isResponseSucceed(res,false)) {
                    this.data = res.data.items;
                    this.totalRecords = res.data.totalItems;
                }
            }
        })
        .add(() =>{
            this.loading = false;
        })
    }

    onPageChanged($event: PaginatorState) {
        this.query.pageNumber = ($event.page ?? 0) +1;
        this.getData();
    }

    onOpenCreate(){
            
        }
    
    onOpenUpdate(){
           
        }
    
    onDelete() {
        }
    onCustomEmit(data: { type: string; data: IViewRoom; field?: string }) {
            
        
        }
        
}