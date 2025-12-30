import { PhimService } from '@/service/movie.service';
import { DataTable } from '@/shared/components/data-table/data-table';
import { CellViewTypes } from '@/shared/constants/data-table.constants';
import { SharedImports } from '@/shared/import.shared';
import { IColumn } from '@/shared/models/data-table.models';
import { Component, inject } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { TblAction, TblActionTypes } from './tbl-action/tbl-action';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { CreatePhim } from './create/create';
import { IViewPhim } from '@/models/movie/movie.models';
import { UpdatePhim } from './update/update';

@Component({
    selector: 'app-movie-management',
    imports: [...SharedImports, DataTable],
    templateUrl: './movie-management.html',
    styleUrl: './movie-management.scss'
})
export class MovieManagement extends BaseComponent {
    _movieService = inject(PhimService);
    private route = inject(ActivatedRoute);

    searchForm: FormGroup = new FormGroup({
        search: new FormControl('')
    });

    columns: IColumn[] = [
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
        { header: 'Thao tác', headerContainerStyle: 'width: 6rem', cellViewType: CellViewTypes.CUSTOM_COMP, customComponent: TblAction, cellStyle: 'text-align:center' }
    ];

    data: IViewPhim[] = [];
}
