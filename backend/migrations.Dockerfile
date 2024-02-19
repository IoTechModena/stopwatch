FROM mcr.microsoft.com/dotnet/sdk:8.0.101-alpine3.19-amd64
WORKDIR /app

COPY . ./
RUN dotnet tool install --global dotnet-ef --version 8.0.1
ENV PATH="$PATH:/root/.dotnet/tools"
ENV ASPNETCORE_ENVIRONMENT="Production"
ENTRYPOINT ["dotnet", "ef", "database", "update"]
