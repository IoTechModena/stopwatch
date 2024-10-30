FROM mcr.microsoft.com/dotnet/sdk:8.0.403-alpine3.20-amd64 AS build-env
WORKDIR /app

COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0.10-alpine3.20-composite-amd64
WORKDIR /app

COPY --from=build-env /app/out .
RUN apk update
RUN apk --no-cache add curl
RUN mkdir -p ./public/videos
ENTRYPOINT ["dotnet", "backend.dll"]
