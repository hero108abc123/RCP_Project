import { ICreateMon } from "@/models/menu/mon.models";
import { IViewHang } from "@/models/kho/hang.models";
import { MonService } from "@/service/mon.service";
import { HangService } from "@/service/hang.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { LoaiMonStatuses } from "@/shared/constants/mon.constants";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { FileUpload } from "primeng/fileupload";
import { Select } from "primeng/select";

@Component({
    selector: 'app-create-mon',
    imports: [SharedImports, Select, FileUpload],
    templateUrl: './create.html',
    styleUrl: './create.scss'
})

export class CreateMon extends BaseComponent {
    private _ref = inject(DynamicDialogRef);
    private _monService = inject(MonService);
    private _hangService = inject(HangService);

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
    }

    onSelectFile(event: any): void {
        this.selectedFile = event.files[0];
        this.form.patchValue({ anhMinhHoa: this.selectedFile });
    }

    onSubmit() {
        if (this.isFormInvalid()) {
            return;
        }
        this.onSubmitCreate();
    }

    onSubmitCreate() {
    const formData = new FormData();
    
    formData.append('idHang', this.form.value.idHang?.toString() || '');
    formData.append('name', this.form.value.name || '');
    formData.append('moTa', this.form.value.moTa || '');
    formData.append('soLuong', this.form.value.soLuong?.toString() || '');
    formData.append('loai', this.form.value.loai?.toString() || '');
    
    if (this.selectedFile) {
        formData.append('anhMinhHoa', this.selectedFile);
    }

    this.loading = true;
    this._monService.create(formData).subscribe({
        next: (res) => {
            if (this.isResponseSucceed(res, true, 'Đã thêm món thành công!')) {
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
}