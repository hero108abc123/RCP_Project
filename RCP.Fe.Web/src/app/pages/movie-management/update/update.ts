import { IUpdatePhimByRoom } from '@/models/rcp/movie.models';
import { RCPService } from '@/service/rcp.service';
import { BaseComponent } from '@/shared/components/base/base-component';
import { SharedImports } from '@/shared/import.shared';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-update-phim',
    imports: [SharedImports],
    templateUrl: './update.html',
    styleUrl: './update.scss'
})
export class UpdatePhim extends BaseComponent {
    private _ref = inject(DynamicDialogRef);
    private _rcpService = inject(RCPService);
    private _config = inject(DynamicDialogConfig);
    rcpId: number = this._config.data?.idCinema || 0;
    roomId: number = this._config.data?.idRoom || 0;
    phimId: number = this._config.data?.idPhim || 0;
    idCinemaRoomMovie: number = this._config.data.id || 0;

    override form: FormGroup = new FormGroup({
        thoiGianBatDauChieu: new FormControl('', [Validators.required]),
        thoiGianKetThucChieu: new FormControl('', [Validators.required])
    });
    override ValidationMessages: Record<string, Record<string, string>> = {
        thoiGianBatDauChieu: {
            required: 'Không được bỏ trống'
        },
        thoiGianKetThucChieu: {
            required: 'Không được bỏ trống'
        }
    };

    override ngOnInit(): void {}

    onSubmit() {
        if (this.isFormInvalid()) {
            return;
        }

        this.onSubmitUpdate();
    }

    onSubmitUpdate() {
        const body: IUpdatePhimByRoom = {
            id: this.idCinemaRoomMovie,
            idCinema: this.rcpId,
            idRoom: this.roomId,
            idPhim: this.phimId,
            thoiGianBatDauChieu: this.form.value.thoiGianBatDauChieu,
            thoiGianKetThucChieu: this.form.value.thoiGianKetThucChieu
        };
        this.loading = true;
        this._rcpService.updatePhimToRoomRCP(body).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res, true, 'Đã cập nhật lịch chiếu cho phim vào phòng chiếu thành công!')) {
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
}
