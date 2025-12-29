import { IUpdateRoom, IViewRoom } from "@/models/rcp/room.models";
import { RoomService } from "@/service/room.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { FileUpload } from "primeng/fileupload";
import { Select } from "primeng/select";

@Component({
    selector: 'app-update-room',
    imports: [SharedImports],
    templateUrl: './update.html',
    styleUrl: './update.scss'
})

export class UpdateRoom extends BaseComponent{
    private _ref = inject(DynamicDialogRef);
    private _config = inject(DynamicDialogConfig); 

    private _roomService = inject(RoomService);
    data: IViewRoom | undefined;
    rcpId: number = this._config.data?.idCinema || 0;
    roomId: number = this._config.data?.data?.id || 0;

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

        this.getRoomData();
    }

    onSubmit() {
            if (this.isFormInvalid()) {
                return;
            }
            this.onSubmitUpdate();
    }

    getRoomData() {
        this.loading = true;
        this._roomService.findById(this.rcpId, this.roomId).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res, false)) {
                    this.data = res.data;
                    this.form.patchValue({
                        name: this.data?.name,
                        description: this.data?.description,
                        location: this.data?.location,
                        tongSoLuongGhe: this.data?.tongSoLuongGhe,
                        soLuongGheThuong: this.data?.soLuongGheThuong,
                        soLuongGheVip: this.data?.soLuongGheVip,
                        soLuongGheDoi: this.data?.soLuongGheDoi

                    });
                }
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
    onSubmitUpdate(){
                const body :IUpdateRoom = {
                    id: this.roomId,
                    idCinema:this.rcpId,
                    ...this.form.value,
                };
                this.loading = true;
                this._roomService.update(body).subscribe({
                    next:(res) => {
                        if(this.isResponseSucceed(res,true,'Đã cập nhật thông tin phòng chiếu thành công')){
                            this._ref?.close(true);
                        }
                    },
                    error: (err) =>{
                        this.messageError(err?.message);
                    },
                    complete:() =>{
                        this.loading = false;
                    }
                });
            }
    
            onCancel(){
                this._ref.close();
            }
    
            
    

}