import { IFindPagingPhimByRoom, IViewPhimByRoom, IViewPhimCinema } from "@/models/rcp/movie.models";
import { RCPService } from "@/service/rcp.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { DataTable } from "@/shared/components/data-table/data-table";
import { CellViewTypes } from "@/shared/constants/data-table.constants";
import { SharedImports } from "@/shared/import.shared";
import { IColumn } from "@/shared/models/data-table.models";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PaginatorState } from "primeng/paginator";
import { TblAction, TblActionTypes } from "./tbl-action/tbl-action";
import { CreatePhimRoom } from "./create/create";
import { UpdatePhimRoom } from "./update/update";

@Component({
    selector: 'app-phim-room',
    imports: [...SharedImports, DataTable],
    templateUrl: './movie.html',
    styleUrl: './movie.scss'
})


export class PhimRoomRcp extends BaseComponent{
    _rcpService = inject(RCPService);
    private route = inject(ActivatedRoute);

    searchForm : FormGroup = new FormGroup({
        search: new FormControl('')
        
    });

    columns: IColumn[] =[
        { header: 'STT', cellViewType: CellViewTypes.INDEX, headerContainerStyle: 'width: 6rem', cellStyle: 'text-align:center' },
        { header: 'Tên phim', field: 'tenPhim', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Mô tả', field: 'moTa', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Đạo diễn', field: 'daoDien', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Diễn viên', field: 'dienVien', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Thời lượng (phút)', field: 'thoiLuongPhut', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Ngày khởi chiếu', field: 'ngayKhoiChieu', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Ngôn ngữ', field: 'ngonNgu', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Phân loại độ tuổi', field: 'phanLoaiDoTuoi', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Đang chiếu', field: 'dangChieu', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Thời gian bắt đầu chiếu', field: 'thoiGianBatDauChieu', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Thời gian kết thúc chiếu', field: 'thoiGianKetThucChieu', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Thao tác', headerContainerStyle: 'width: 6rem', cellViewType: CellViewTypes.CUSTOM_COMP, customComponent: TblAction ,cellStyle: 'text-align:center'},
    ];

    data :IViewPhimByRoom [] =[];
    query: IFindPagingPhimByRoom = {
            idCinema: 0,
            idRoom: 0,
            pageNumber: 1,
            pageSize: this.MAX_PAGE_SIZE,
    };
    override ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.query.idCinema = +params['idCinema'] || 0; 
            this.query.idRoom = +params['idRoom'] || 0;
            if (this.query.idCinema > 0 && this.query.idRoom > 0) {
                this.getData();
            } else {
                this.messageError('Không tìm thấy thông tin  phim');
            }
        });
    }
    onSearch() {
       
        this.getData();
    }

    getData() {
        this.loading = true;
        this._rcpService.findPagingPhimRoomRCP({
            ...this.query,
                keyword: this.searchForm.value.keyword || ''
                    }).subscribe({
                        next: (res) => {
                            if(this.isResponseSucceed(res, false)) {
                
                                const responseData = res.data.items[0];
                            if (responseData && responseData.movies) {
                                this.data = responseData.movies; 
                                this.totalRecords = res.data.totalItems;
                            } else {
                                this.data = [];
                            this.totalRecords = 0;
                            }
                        }
                    }
                })
            .add(() => {
                this.loading = false;
            })
    }

    onPageChanged($event: PaginatorState) {
        this.query.pageNumber = ($event.page ?? 0) +1;
        this.getData();
    }

    onOpenCreate(){
         const ref = this._dialogService.open(CreatePhimRoom, { header: 'Thêm mới phim vào phòng chiếu', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false ,data: { idCinema: this.query.idCinema ,idRoom: this.query.idRoom}});
                        ref.onClose.subscribe((result) => {
                            if (result) {
                                    this.getData();
                            }
                    });
            
    }
        
    onOpenUpdate(data:IViewPhimCinema){
        const ref = this._dialogService.open(UpdatePhimRoom, { header: 'Cập nhật lịch chiếu phim', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false , data: {data,idCinema: this.query.idCinema,idRoom:this.query.idRoom,idPhim:data.idPhim ,id: data.idCinemaRoomMovie}});
                        ref.onClose.subscribe((result) => {
                            if (result) {
                                    this.getData();
                            }
                    });
               
    }
        
    onDelete(data:IViewPhimCinema) {
        this.confirmDelete(
                    {
                        header: 'Bạn chắc chắn muốn xóa lịch chiếu này?',
                        message: 'Không thể khôi phục sau khi xóa'
                    },
                    () => {
                        this._rcpService.deletePhimToRoomRCP(data.idCinemaRoomMovie || 0).subscribe(
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

    onCustomEmit(data: { type: string; data: IViewPhimCinema; field?: string }) {

                if (data.type === TblActionTypes.delete) {
                    this.onDelete(data.data);
                } else if (data.type === TblActionTypes.update) {
                    this.onOpenUpdate(data.data);
                          
                }
                
    }



}