#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# Step 1: Build the React frontend
FROM node:22.5.1 AS frontend-build
WORKDIR /app/tariffcomparison.client
COPY tariffcomparison.client/package*.json ./
RUN npm install
COPY tariffcomparison.client/ ./
RUN npm run build

# Step 2: Build the ASP.NET Web API backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /app/TariffComparison.Server
COPY TariffComparison.Server/*.csproj ./
RUN dotnet restore
COPY TariffComparison.Server/ ./
RUN dotnet publish -c Release -o /app/published

# Step 3: Create the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR /app
COPY --from=backend-build /app/published /app
COPY --from=frontend-build /app/tariffcomparison.client/build /app/wwwroot
EXPOSE 80
ENTRYPOINT ["dotnet", "TariffComparison.Server.dll"]