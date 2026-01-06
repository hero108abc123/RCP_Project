import { IViewHang } from "@/models/kho/hang.models";
import { IViewKho, IViewKhoPaging } from "@/models/kho/kho.models";
import { IFindPagingThongKeKho, IViewThongKeKho } from "@/models/kho/thong-ke.models";
import { IViewCinema } from "@/models/rcp/lich-chieu.models";
import { HangService } from "@/service/hang.service";
import { KhoService } from "@/service/kho.service";
import { RCPService } from "@/service/rcp.service";
import { ThongKeKhoService } from "@/service/thong-ke.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { DataTable } from "@/shared/components/data-table/data-table";
import { CellViewTypes } from "@/shared/constants/data-table.constants";
import { SharedImports } from "@/shared/import.shared";
import { IColumn } from "@/shared/models/data-table.models";
import { Utils } from "@/shared/utils";
import { Component, inject, ViewChild } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { PaginatorState } from "primeng/paginator";
import { Popover } from "primeng/popover";

@Component({
    selector: 'app-thong-ke-kho',
    imports: [...SharedImports, DataTable,Popover],
    templateUrl: './thong-ke.html',
    styleUrl: './thong-ke.scss'
})

export class ThongKeKho extends BaseComponent{
    @ViewChild('filterPanel') filterPanel!: Popover;
    _thongKeService = inject(ThongKeKhoService);
    _rcpService = inject(RCPService);
    _hangService = inject(HangService);
    _khoService = inject(KhoService);
    listCinemas: IViewCinema[] =[];
    listKhos: IViewKhoPaging [] = [];
    listMatHangs :IViewHang [] =[];

    searchForm : FormGroup = new FormGroup({
        search: new FormControl(''),
        idCinema: new FormControl([]),
        idKho: new FormControl([]),
        idMatHang: new FormControl([]),
        ngayNhap: new FormControl(''),
        //denNgay: new FormControl('')
    });
    columns: IColumn[] = [
        { header: 'STT', cellViewType: CellViewTypes.INDEX, headerContainerStyle: 'width: 6rem', cellStyle: 'text-align:center' },
        { header: 'Tên rạp chiếu', field: 'cinema.name', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Tên kho', field: 'kho.tenKho', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Tên mặt hàng', field: 'matHang.tenMon', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Số lượng nhập', field: 'soLuongNhap', headerContainerStyle: 'min-width: 10rem', cellStyle: 'text-align:center' },
        { header: 'Đơn giá nhập', field: 'donGiaNhap', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        { header: 'Tổng giá trị nhập hàng', field: 'tongGiaTriNhapHang', headerContainerStyle: 'min-width: 14rem', cellStyle: 'text-align:center' },
        { header: 'Ngày nhập', field: 'ngayNhap', headerContainerStyle: 'min-width: 12rem', cellStyle: 'text-align:center' },
        //{ header: 'Thao tác', headerContainerStyle: 'width: 6rem', cellViewType: CellViewTypes.CUSTOM_COMP, customComponent: TblAction, cellStyle: 'text-align:center' }
    ];

    data: IViewThongKeKho[] =[];
    query: IFindPagingThongKeKho = {
                pageNumber: 1,
                pageSize: this.MAX_PAGE_SIZE,
    };
    override ngOnInit(): void {
       this.getData();
       this.getListDropDownRCP();
       this.getListKho();
       this.getListMatHang();

      
    }
    onSearch() {
        this.query.pageNumber = 1;
        this.getData();
        this.filterPanel.hide();
    }
    getData() {
    this.loading = true;

    this._thongKeService.findPaging({
        ...this.query,
        keyword: this.searchForm.value.search || '',
        idCinema: this.searchForm.value.idCinema || undefined,
        idKho: this.searchForm.value.idKho || undefined,
        idMatHang: this.searchForm.value.idMatHang || undefined,
        ngayNhap: this.searchForm.value.ngayNhap ? Utils.formatDateCallApi(this.searchForm.value.ngayNhap) : undefined
    }).subscribe({
        next: (res) => {
            if(this.isResponseSucceed(res, false)) {
                const items = res.data?.items || [];
                if (items.length === 0) {
                    this.data = [];
                    this.totalRecords = 0;
                } else {
                    this.data = items;
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
    });
}
onPageChanged($event: PaginatorState) {
        this.query.pageNumber = ($event.page ?? 0) +1;
        this.getData();
    }
    
    onCinemaChange(event: any) {
    const idCinema = event.value;
    if (idCinema) {
        this.searchForm.get('idKho')?.setValue(null);
        this.listKhos = [];
        this.getListKho(idCinema);
    } else {
        this.listKhos = [];
        this.searchForm.get('idKho')?.setValue(null);
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
    getListKho(idCinema?: number){
        if (!idCinema) {
        return;
        }
        this._khoService.getDropDown(idCinema).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res)) {
                    const newKhos = res.data || [];
                    this.listKhos = [...this.listKhos, ...newKhos];
                }
            },
            error: (err) => {
                this.messageError(err?.message);
            }
        });
    }
    getListMatHang(){
        this._hangService.getDropDown().subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res)) {
                    this.listMatHangs = res.data || [];
                }
            },
            error: (err) => {
                this.messageError(err?.message);
            }
        });
    }
}