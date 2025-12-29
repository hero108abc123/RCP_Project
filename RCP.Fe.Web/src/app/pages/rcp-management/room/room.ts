import { IFindPagingRoom, IUpdateRoom, IViewRoom } from "@/models/rcp/room.models";
import { RoomService } from "@/service/room.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { DataTable } from "@/shared/components/data-table/data-table";
import { CellViewTypes } from "@/shared/constants/data-table.constants";
import { SharedImports } from "@/shared/import.shared";
import { IColumn } from "@/shared/models/data-table.models";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { PaginatorState } from "primeng/paginator";
import { TblAction, TblActionTypes } from "./tbl-action/tbl-action";
import { ActivatedRoute } from "@angular/router";
import { CreateRoom } from "./create/create";
import { UpdateRoom } from "./update/update";

@Component({
    selector: 'app-room',
    imports: [...SharedImports, DataTable],
    templateUrl: './room.html',
    styleUrl: './room.scss'
})
export class Room extends BaseComponent{
    _roomService = inject(RoomService);
    private route = inject(ActivatedRoute);

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
        { header: 'Số lượng ghế đôi', field: 'soLuongGheDoi', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Thao tác', headerContainerStyle: 'width: 6rem', cellViewType: CellViewTypes.CUSTOM_COMP, customComponent: TblAction ,cellStyle: 'text-align:center'}
            
    ];

    data: IViewRoom[] =[];

    query: IFindPagingRoom = {
        idCinema: 0,
        pageNumber: 1,
        pageSize: this.MAX_PAGE_SIZE,
    };
    override ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.query.idCinema = +params['id'] || 0; 
            if (this.query.idCinema > 0) {
                this.getData();
            } else {
                this.messageError('Không tìm thấy thông tin rạp chiếu phim');
            }
        });
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
        const ref = this._dialogService.open(CreateRoom, { header: 'Thêm mới phòng chiếu', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false,data: { idCinema: this.query.idCinema } });
                        ref.onClose.subscribe((result) => {
                            if (result) {
                                    this.getData();
                            }
                    });
        }
    
    onOpenUpdate(data:IViewRoom){
        const ref = this._dialogService.open(UpdateRoom, { header: 'Cập nhật thông tin phòng chiếu', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false , data: {data,idCinema: this.query.idCinema }});
                        ref.onClose.subscribe((result) => {
                            if (result) {
                                    this.getData();
                            }
                    });
           
        }
    
    onDelete(data: IViewRoom) {
        this.confirmDelete(
            {
                header: 'Bạn chắc chắn muốn xóa phòng chiếu này?',
                message: 'Không thể khôi phục sau khi xóa'
            },
            () => {
                this._roomService.delete(this.query.idCinema,data.id || 0).subscribe(
                    (res) => {
                        if (this.isResponseSucceed(res, true, 'Đã xóa')) {
                            this.getData();
                        }
                    },
                    (err) => {
                        this.messageError(err?.message);
                    }
                );
            }
        );
    }
    navigateToDetail(data: IViewRoom) {
            //console.log('Navigating with:', danhBa?.id);
            if (data?.id && this.query.idCinema) {
                this.router.navigate(['/rcp-management/movie'], {
                    queryParams: {
                         idRoom: data.id,
                         idCinema: this.query.idCinema  
                }
            });
        }
        }
        
    onCustomEmit(data: { type: string; data: IViewRoom; field?: string }) {
            if (data.type === TblActionTypes.detail) {
                this.navigateToDetail(data.data); 
            }else if (data.type === TblActionTypes.delete) {
                this.onDelete(data.data);
            } else if (data.type === TblActionTypes.update) {
                this.onOpenUpdate(data.data);
            }else if (data.type === 'cellClick' && data.field === 'name') {
            this.navigateToDetail(data.data); 
        } 
        
    }
        
}