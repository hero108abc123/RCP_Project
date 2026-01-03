import { IFindPagingLichChieu, IViewLichChieu, IViewPhimCinema } from "@/models/rcp/lich-chieu.models";
import { LichChieuService } from "@/service/lich-chieu.service";
import { RCPService } from "@/service/rcp.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { DataTable } from "@/shared/components/data-table/data-table";
import { CellViewTypes } from "@/shared/constants/data-table.constants";
import { SharedImports } from "@/shared/import.shared";
import { IColumn } from "@/shared/models/data-table.models";
import { Component, inject, ViewChild } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PaginatorState } from "primeng/paginator";
import { TblAction, TblActionTypes } from "./tbl-action/tbl-action";
import { CreateLichChieu } from "./create/create";
import { UpdateLichChieu } from "./update/update";
import { Popover } from "primeng/popover";
import { RoomService } from "@/service/room.service";
import { PhimService } from "@/service/movie.service";
import { IGetDropDownRCP } from "@/models/rcp/rcp.models";
import { IGetDropDownRoom } from "@/models/rcp/room.models";
import { IGetDropDownPhim } from "@/models/movie/movie.models";
import { Utils } from "@/shared/utils";
import { IGetDropDownTheLoai } from "@/models/rcp/movie.models";


@Component({
    selector: 'app-lich-chieu',
    imports: [...SharedImports, DataTable,Popover],
    templateUrl: './lich-chieu.html',
    styleUrl: './lich-chieu.scss'
})


export class LichChieu extends BaseComponent{
    @ViewChild('filterPanel') filterPanel!: Popover;
    _rcpService = inject(RCPService);
    _lichChieuService = inject(LichChieuService);
    _roomService = inject(RoomService);
    _phimService = inject(PhimService);
    private route = inject(ActivatedRoute);

    listCinemas: IGetDropDownRCP[] = [];
    listRooms: IGetDropDownRoom[] = [];
    listTheLoai: IGetDropDownTheLoai[] = [];

    searchForm : FormGroup = new FormGroup({
        search: new FormControl(''),
        idCinema: new FormControl([]),
        idRoom: new FormControl([]),
        idTheLoai: new FormControl([]),
        tuNgay: new FormControl(''),
        denNgay: new FormControl('')
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
        { header: 'Tên rạp chiếu', field: 'cinema.name',  headerContainerStyle: 'min-width: 12rem',cellStyle: 'text-align:center' },
        { header: 'Tên phòng chiếu', field: 'room.name',  headerContainerStyle: 'min-width: 12rem',cellStyle: 'text-align:center' },
        { header: 'Đang chiếu', field: 'dangChieu', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Thời gian bắt đầu chiếu', field: 'thoiGianBatDauChieu', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Thời gian kết thúc chiếu', field: 'thoiGianKetThucChieu', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Thao tác', headerContainerStyle: 'width: 6rem', cellViewType: CellViewTypes.CUSTOM_COMP, customComponent: TblAction ,cellStyle: 'text-align:center'},
    ];

    data: IViewPhimCinema[] = [];
    query: IFindPagingLichChieu = {
            pageNumber: 1,
            pageSize: this.MAX_PAGE_SIZE,
    };
    
    override ngOnInit(): void {
       this.getData();
       this.getListDropDownRCP();
       this.getListTheLoai();

       this.searchForm.get('idCinema')?.valueChanges.subscribe(idCinemas => {
            if (idCinemas && idCinemas.length > 0) {
                this.searchForm.get('idRoom')?.setValue([]);
                this.listRooms = [];
                idCinemas.forEach((idCinema: number) => {
                    this.getListDropDownRoom(idCinema);
                });
            } else {
                this.listRooms = [];
                this.searchForm.get('idRoom')?.setValue([]);
            }
        });
    }
    
    onSearch() {
        this.query.pageNumber = 1;
        this.getData();
        this.filterPanel.hide();
    }

    getData() {
        this.loading = true;
    
        this._lichChieuService.findPagingPhimRoomRCP({
            ...this.query,
            keyword: this.searchForm.value.search || '',
            idCinema: this.searchForm.value.idCinema && this.searchForm.value.idCinema.length > 0 ? this.searchForm.value.idCinema : undefined,
            idRoom: this.searchForm.value.idRoom && this.searchForm.value.idRoom.length > 0 ? this.searchForm.value.idRoom : undefined,
            idTheLoai: this.searchForm.value.idTheLoai && this.searchForm.value.idTheLoai.length > 0 ? this.searchForm.value.idTheLoai : undefined,
            tuNgay: this.searchForm.value.tuNgay ? Utils.formatDateCallApi(this.searchForm.value.tuNgay) : undefined,
            denNgay: this.searchForm.value.denNgay ? Utils.formatDateCallApi(this.searchForm.value.denNgay) : undefined
        }).subscribe({
            next: (res) => {
                if(this.isResponseSucceed(res, false)) {
                    const items = res.data?.items || [];
                    if (items.length === 0) {
                        this.data = [];
                        this.totalRecords = 0;
                    } else {
                        this.data = items.flatMap((item: IViewLichChieu) => 
                            (item.movies || []).map(movie => ({
                                ...movie,
                                cinema: item.cinema,
                                room: item.room
                            }))
                        );
                        this.totalRecords = res.data?.totalItems || 0;
                    }
                } else {
                    this.data = [];
                    this.totalRecords = 0;
                }
            },
            error: () => {
                this.data = [];
                this.totalRecords = 0;
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
        const ref = this._dialogService.open(CreateLichChieu, { header: 'Thêm mới thông tin lịch chiếu', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false });
                                ref.onClose.subscribe((result) => {
                                    if (result) {
                                            this.getData();
                                    }
                            }); 
         
            
    }
        
    onOpenUpdate(data: IViewPhimCinema){
        const ref = this._dialogService.open(UpdateLichChieu, { header: 'Cập nhật thông tin lịch chiếu', closable: true, modal: true, styleClass: 'w-[600px]', focusOnShow: false , data: data});
                        ref.onClose.subscribe((result) => {
                            if (result) {
                                    this.getData();
                            }
                    });
        
    }
        
    onDelete(data: IViewPhimCinema) {
        this.confirmDelete(
                    {
                        header: 'Bạn chắc chắn muốn xóa thông tin lịch chiếu này?',
                        message: 'Không thể khôi phục sau khi xóa'
                    },
                    () => {
                        this._lichChieuService.deletePhimToRoomRCP(data.idCinemaRoomMovie || 0).subscribe(
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

    getListDropDownRCP(){
        this.loading = true;
        this._rcpService.getListDropDown().subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res)) {
                    this.listCinemas = res.data || [];
                }
            },
            error: (err) => {
                this.messageError(err?.message);
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    getListDropDownRoom(idCinema: number){
        this._roomService.getListDropDown(idCinema).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res)) {
                    const newRooms = res.data || [];
                    this.listRooms = [...this.listRooms, ...newRooms];
                }
            },
            error: (err) => {
                this.messageError(err?.message);
            }
        });
    }

    getListTheLoai(){
        this.loading = true;
        this._phimService.getTheLoai().subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res)) {
                    this.listTheLoai = res.data || [];
                }
            },
            error: (err) => {
                this.messageError(err?.message);
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
}