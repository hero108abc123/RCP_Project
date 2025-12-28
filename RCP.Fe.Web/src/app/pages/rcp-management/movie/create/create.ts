import { ICreateRCP } from "@/models/rcp/rcp.models";
import { RCPService } from "@/service/rcp.service";
import { BaseComponent } from "@/shared/components/base/base-component";
import { SharedImports } from "@/shared/import.shared";
import { IDistrictOption, IProvince, IProvinceOptions, IWard } from "@/shared/models/vietnam-province.models";
import { Component, inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { FileUpload } from "primeng/fileupload";
import { Select } from "primeng/select";
import addressData from 'vietnam-address-database';

@Component({
    selector: 'app-create-rcp',
    imports: [SharedImports, Select,FileUpload],
    templateUrl: './create.html',
    styleUrl: './create.scss'
})

export class CreateRCP extends BaseComponent{
    private _ref = inject(DynamicDialogRef);
    private _rcpService= inject(RCPService);
    
    provinceOptions: IProvinceOptions[] = [];
    districtOptions: IDistrictOption[] = [];
    selectedFile: File | null = null;
    
    private provinces: IProvince[] = [];
    private wards: IWard[] = [];

    override form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        location: new FormControl('', [Validators.required]),
        district: new FormControl('', [Validators.required]),
        soLuongPhongChieu: new FormControl('', [Validators.required]),
        fileAnhCinema :new FormControl('', [Validators.required]),
    });

    override ValidationMessages: Record<string, Record<string, string>> = {
        name: {
            required: 'Không được bỏ trống'
        },
        city: {
            required: 'Không được bỏ trống'
        },
        location: {
            required: 'Không được bỏ trống'
        },
        district: {
            required: 'Không được bỏ trống'
        },
        soLuongPhongChieu: {
            required: 'Không được bỏ trống'
        },
        fileAnhCinema: {
            required: 'Không được bỏ trống'
        },
     };

    override ngOnInit(): void {
        this.parseAddressData();
        this.loadProvinces();
        this.form.get('location')?.disable();
    }

    parseAddressData(): void {
        addressData.forEach((item: any) => {
            if (item.type === 'table') {
                if (item.name === 'provinces') {
                    this.provinces = item.data;
                } else if (item.name === 'wards') {
                    this.wards = item.data;
                }
            }
        });
    }

    loadProvinces(): void {
        this.provinceOptions = this.provinces.map(p => ({ label: p.name, value: p.name, code: p.province_code }));
    }

    onCityChange(event: any): void {
        const selectedProvince = this.provinceOptions.find(p => p.value === event.value);
            if (selectedProvince) {
                this.districtOptions = this.wards.filter(d => d.province_code === selectedProvince.code).map(d => ({ label: d.name, value: d.name }));
                this.form.get('location')?.enable();
            } else {
                this.districtOptions = [];
                this.form.get('location')?.disable();
            }
        this.form.patchValue({ location: '' });
    }
    onSelectFile(event: any): void {
        this.selectedFile = event.files[0];
        this.form.patchValue({ fileAnhCinema: this.selectedFile });
    }

    onSubmit() {
        if (this.isFormInvalid()) {
            return;
        }
        this.onSubmitCreate();
    }

    onSubmitCreate() {
            const body: ICreateRCP = {
                ...this.form.value,
                fileAnhCinema: this.selectedFile
            };
            this.loading = true;
            this._rcpService.create(body).subscribe({
                next: (res) => {
                    if (this.isResponseSucceed(res, true, 'Đã thêm rạp chiếu phim thành công!')) {
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