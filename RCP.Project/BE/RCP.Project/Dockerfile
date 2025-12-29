# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.
# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081
# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["RCP.Project/RCP.Project.csproj", "RCP.Project/"]
COPY ["Services/Authentication/RCP.Authentication.ApplicationServices/RCP.Authentication.ApplicationServices.csproj", "Services/Authentication/RCP.Authentication.ApplicationServices/"]
COPY ["Services/Shared/RCP.Shared.ApplicationService/RCP.Shared.ApplicationService.csproj", "Services/Shared/RCP.Shared.ApplicationService/"]
COPY ["Services/Shared/RCP.Shared.Constant/RCP.Shared.Constant.csproj", "Services/Shared/RCP.Shared.Constant/"]
COPY ["Services/Authentication/RCP.Authentication.Infrastructure/RCP.Authentication.Infrastructure.csproj", "Services/Authentication/RCP.Authentication.Infrastructure/"]
COPY ["Services/Authentication/RCP.Authentication.Domain/RCP.Authentication.Domain.csproj", "Services/Authentication/RCP.Authentication.Domain/"]
COPY ["Services/Authentication/RCP.Authentication.Dtos/RCP.Authentication.Dtos.csproj", "Services/Authentication/RCP.Authentication.Dtos/"]
COPY ["Services/Lib/RCP.Lib.ApplicationService/RCP.Lib.ApplicationService.csproj", "Services/Lib/RCP.Lib.ApplicationService/"]
COPY ["Services/Cinema/RCP.Cinema.Infrastructure/RCP.Cinema.Infrastructure.csproj", "Services/Cinema/RCP.Cinema.Infrastructure/"]
COPY ["Services/Cinema/RCP.Cinema.Domain/RCP.Cinema.Domain.csproj", "Services/Cinema/RCP.Cinema.Domain/"]
COPY ["Services/Lib/RCP.Lib.Domain/RCP.Lib.Domain.csproj", "Services/Lib/RCP.Lib.Domain/"]
COPY ["Services/Movie/RCP.Movie.ApplicationServices/RCP.Movie.ApplicationServices.csproj", "Services/Movie/RCP.Movie.ApplicationServices/"]
COPY ["Services/Movie/RCP.Movie.Dtos/RCP.Movie.Dtos.csproj", "Services/Movie/RCP.Movie.Dtos/"]
COPY ["Services/Movie/RCP.Movie.Infrastructure/RCP.Movie.Infrastructure.csproj", "Services/Movie/RCP.Movie.Infrastructure/"]
COPY ["Services/Movie/RCP.Movie.Domain/RCP.Movie.Domain.csproj", "Services/Movie/RCP.Movie.Domain/"]
COPY ["Services/Cinema/RCP.Cinema.ApplicationServices/RCP.Cinema.ApplicationServices.csproj", "Services/Cinema/RCP.Cinema.ApplicationServices/"]
COPY ["Services/Cinema/RCP.Cinema.Dtos/RCP.Cinema.Dtos.csproj", "Services/Cinema/RCP.Cinema.Dtos/"]
RUN dotnet restore "./RCP.Project/RCP.Project.csproj"
COPY . .
WORKDIR "/src/RCP.Project"
RUN dotnet build "./RCP.Project.csproj" -c $BUILD_CONFIGURATION -o /app/build
# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./RCP.Project.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false
# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
RUN mkdir -p wwwroot
ENTRYPOINT ["dotnet", "RCP.Project.dll"]