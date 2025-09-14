1 Migration
Mở terminal tại folder root và chạy lệnh 
dotnet ef migrations add InitialAuthCreate --context AuthenticationDbContext --output-dir Migrations/Authentication
dotnet ef database update --context AuthenticationDbContext
