import { IUpdatePhim } from '@/models/movie/movie.models';

import { PhimService } from '@/service/movie.service';

import { BaseComponent } from '@/shared/components/base/base-component';
import { NgonNguStatuses } from '@/shared/constants/movie.constants';
import { SharedImports } from '@/shared/import.shared';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { Select } from 'primeng/select';

@Component({
    selector: 'app-update-phim',
    imports: [SharedImports, Select, FileUpload],
    templateUrl: './update.html',
    styleUrl: './update.scss'
})
export class UpdatePhim extends BaseComponent {
    private _ref = inject(DynamicDialogRef);
    private _movieService = inject(PhimService);

    private _config = inject(DynamicDialogConfig);
    
    id: number = this._config.data?.id || 0;
    selectedFile: File | null = null;
    listTheLoai: any[] = [];

    phanLoaiDoTuoiOptions = [
        { value: 'P', label: 'P - Mọi lứa tuổi' },
        { value: 'K', label: 'K - Trẻ em có phụ huynh' },
        { value: 'T13', label: 'T13 - Từ 13 tuổi' },
        { value: 'C13', label: 'C13 - Từ 13 tuổi' },
        { value: 'T16', label: 'T16 - Từ 16 tuổi' },
        { value: 'C16', label: 'C16 - Từ 16 tuổi' },
        { value: 'T18', label: 'T18 - Từ 18 tuổi' },
        { value: 'C18', label: 'C18 - Từ 18 tuổi' },
        { value: 'C', label: 'C - Cấm chiếu' }
    ];

    ngonNguOptions = NgonNguStatuses.getAllLanguages();

    override form: FormGroup = new FormGroup({
        tenPhim: new FormControl('', [Validators.required]),
        moTa: new FormControl(''),
        daoDien: new FormControl(''),
        dienVien: new FormControl(''),
        anhBia: new FormControl(''),
        trailerUrl: new FormControl(''),
        thoiLuongPhut: new FormControl('', [Validators.required]),
        ngayKhoiChieu: new FormControl('', [Validators.required]),
        ngonNgu: new FormControl('', [Validators.required]),
        phanLoaiDoTuoi: new FormControl('', [Validators.required]),
        theLoaiIds: new FormControl('')
    });

    override ValidationMessages: Record<string, Record<string, string>> = {
        tenPhim: {
            required: 'Không được bỏ trống'
        },
        thoiLuongPhut: {
            required: 'Không được bỏ trống'
        },
        ngayKhoiChieu: {
            required: 'Không được bỏ trống'
        },
        ngonNgu: {
            required: 'Không được bỏ trống'
        },
        phanLoaiDoTuoi: {
            required: 'Không được bỏ trống'
        }
    };

    override ngOnInit(): void {
        this.getListTheLoai();
        this.getById();
    }

    onSelectFile(event: any): void {
        this.selectedFile = event.files[0];
        this.form.patchValue({ anhBia: this.selectedFile });
    }

    onSubmit() {
        if (this.isFormInvalid()) {
            return;
        }
        this.onSubmitUpdate();
    }

    onSubmitUpdate() {
        const body: IUpdatePhim = {
            id: this.id,
            ...this.form.value,
            anhBia: this.selectedFile
        };
        this.loading = true;
        this._movieService.update(body).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res, true, 'Đã cập nhật phim thành công!')) {
                    this._ref?.close(true);
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

    onCancel() {
        this._ref.close();
    }

    getListTheLoai() {
        this.loading = true;
        this._movieService.getTheLoai().subscribe({
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

    getById() {
        this.loading = true;
        this._movieService.getById(this.id).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res)) {
                    const data = res.data;
                    this.form.patchValue({
                        tenPhim: data.tenPhim,
                        moTa: data.moTa,
                        daoDien: data.daoDien,
                        dienVien: data.dienVien,
                        trailerUrl: data.trailerUrl,
                        thoiLuongPhut: data.thoiLuongPhut,
                        ngayKhoiChieu: data.ngayKhoiChieu ? new Date(data.ngayKhoiChieu) : null,
                        ngonNgu: data.ngonNgu,
                        phanLoaiDoTuoi: data.phanLoaiDoTuoi,
                        theLoaiIds: data.theLoais?.map((tl: any) => tl.id) || []
                    });
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