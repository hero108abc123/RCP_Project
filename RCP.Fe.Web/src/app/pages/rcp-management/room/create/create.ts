import { ICreateRoom } from "@/models/rcp/room.models";
import { RoomService } from "@/service/room.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";


@Component({
    selector: 'app-create-room',
    imports: [SharedImports],
    templateUrl: './create.html',
    styleUrl: './create.scss'
})

export class CreateRoom extends BaseComponent{
    private _ref = inject(DynamicDialogRef);
    private _roomService = inject(RoomService);
    private _config = inject(DynamicDialogConfig); 
    rcpId: number = this._config.data?.idCinema || 0;

    override form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', ),
        location: new FormControl('', [Validators.required]),
        tongSoLuongGhe: new FormControl('', [Validators.required]),
        soLuongGheThuong: new FormControl('', [Validators.required]),
        soLuongGheVip :new FormControl('', [Validators.required]),
        soLuongGheDoi :new FormControl('', [Validators.required]),
    });

    override ValidationMessages: Record<string, Record<string, string>> = {
        name: {
            required: 'Không được bỏ trống'
        },
        tongSoLuongGhe: {
            required: 'Không được bỏ trống'
        },
        location: {
            required: 'Không được bỏ trống'
        },
        soLuongGheThuong: {
            required: 'Không được bỏ trống'
        },
        soLuongGheVip: {
            required: 'Không được bỏ trống'
        },
        soLuongGheDoi: {
            required: 'Không được bỏ trống'
        },
     };

    override ngOnInit(): void {
        
    }
    onSubmit() {
        if (this.isFormInvalid()) {
            return;
        }
        this.onSubmitCreate();
    }

    onSubmitCreate() {
                const body: ICreateRoom = {
                    ...this.form.value,
                    idCinema: this.rcpId
                    
                };
                this.loading = true;
                this._roomService.create(body).subscribe({
                    next: (res) => {
                        if (this.isResponseSucceed(res, true, 'Đã thêm phòng chiếu thành công!')) {
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
