# Migration

## Hướng dẫn thực hiện Migration

### Bước 1: Tạo Migration
Mở terminal tại folder root và chạy lệnh:

```bash
dotnet ef migrations add InitialAuthCreate --context AuthenticationDbContext --output-dir Migrations/Authentication
```

### Bước 2: Cập nhật Database
Tiếp tục chạy lệnh:

```bash
dotnet ef database update --context AuthenticationDbContext
```

## Lưu ý
- Đảm bảo đã cài đặt Entity Framework CLI tools
- Kiểm tra connection string trong appsettings.json
- Chạy các lệnh từ thư mục root của project
