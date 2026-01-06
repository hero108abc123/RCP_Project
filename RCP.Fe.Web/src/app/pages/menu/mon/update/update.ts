import { IUpdateMon } from "@/models/menu/mon.models";
import { IViewHang } from "@/models/kho/hang.models";
import { MonService } from "@/service/mon.service";
import { HangService } from "@/service/hang.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { LoaiMonStatuses } from "@/shared/constants/mon.constants";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { FileUpload } from "primeng/fileupload";
import { Select } from "primeng/select";

@Component({
    selector: 'app-update-mon',
    imports: [SharedImports, Select, FileUpload],
    templateUrl: './update.html',
    styleUrl: './update.scss'
})

export class UpdateMon extends BaseComponent {
    private _ref = inject(DynamicDialogRef);
    private _monService = inject(MonService);
    private _hangService = inject(HangService);
    private _config = inject(DynamicDialogConfig);

    id: number = this._config.data?.id || 0;
    listMatHangs: IViewHang[] = [];
    selectedFile: File | null = null;

    loaiMonOptions = LoaiMonStatuses.getAllLoai();

   override form: FormGroup = new FormGroup({
        idHang: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        moTa: new FormControl('', [Validators.required]),
        soLuong: new FormControl('', [Validators.required]),
        loai: new FormControl('', [Validators.required]),
        anhMinhHoa: new FormControl('')
    });

    override ValidationMessages: Record<string, Record<string, string>> = {
        idHang: {
            required: 'Không được bỏ trống'
        },
        name: {
            required: 'Không được bỏ trống'
        },
        soLuong: {
            required: 'Không được bỏ trống'
        },
        loai: {
            required: 'Không được bỏ trống'
        }
    };

    override ngOnInit(): void {
        this.getListMatHang();
        this.getById();
    }

    onSelectFile(event: any): void {
        this.selectedFile = event.files[0];
        this.form.patchValue({ anhMinhHoa: this.selectedFile });
    }

    onSubmit() {
        if (this.isFormInvalid()) {
            return;
        }
        this.onSubmitUpdate();
    }

    onSubmitUpdate() {
        const formData = new FormData();
        
        formData.append('id', this.id.toString());
        formData.append('idHang', this.form.value.idHang?.toString() || '');
        formData.append('name', this.form.value.name || '');
        formData.append('moTa', this.form.value.moTa || '');
        formData.append('soLuong', this.form.value.soLuong?.toString() || '');
        formData.append('loai', this.form.value.loai?.toString() || '');
        
        if (this.selectedFile) {
            formData.append('anhMinhHoa', this.selectedFile);
        }

        this.loading = true;
        this._monService.update(formData).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res, true, 'Đã cập nhật món thành công!')) {
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

    getListMatHang() {
        this.loading = true;
        this._hangService.getDropDown().subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res)) {
                    this.listMatHangs = res.data || [];
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
        this._monService.getById(this.id).subscribe({
            next: (res) => {
                if (this.isResponseSucceed(res)) {
                    const data = res.data;
                    this.form.patchValue({
                        idHang: data.idHang,
                        moTa: data.moTa,
                        soLuong: data.soLuong,
                        loai: data.loai
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