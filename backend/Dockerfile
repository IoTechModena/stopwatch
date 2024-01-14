FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build-env /app/out .
RUN apt update
RUN apt install -y curl
RUN mkdir -p ./Data/recordings
ENTRYPOINT ["dotnet", "backend.dll"]
